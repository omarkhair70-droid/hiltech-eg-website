import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { sendNewRFQInternalNotification } from '@/lib/server/rfq-notifications';
import { insertRFQItems, insertRFQRequest, isSupabaseConfigured, updateRFQNotificationAudit } from '@/lib/server/supabase-admin';
import { validateRFQPayload } from '@/lib/validators/rfq';
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit';

function generateRequestCode(now = new Date()) {
  const year = now.getUTCFullYear();
  const month = `${now.getUTCMonth() + 1}`.padStart(2, '0');
  const day = `${now.getUTCDate()}`.padStart(2, '0');
  const hour = `${now.getUTCHours()}`.padStart(2, '0');
  const minute = `${now.getUTCMinutes()}`.padStart(2, '0');
  const second = `${now.getUTCSeconds()}`.padStart(2, '0');
  const suffix = randomBytes(3).toString('base64url').replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
  return `RFQ-${year}${month}${day}-${hour}${minute}${second}-${suffix}`;
}

export async function POST(request: Request) {

  const ip = getClientIp(request);
  const rate = checkRateLimit({ key: `rfq-submit:${ip}`, windowMs: 60 * 60 * 1000, maxRequests: 10 });
  if (!rate.allowed) {
    return NextResponse.json({ ok: false, error: 'Too many RFQ submissions. Please wait and try again.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'RFQ backend is temporarily unavailable. Please use WhatsApp to continue.' }, { status: 503 });
  }

  try {
    const payload = await request.json();
    const validated = validateRFQPayload(payload);
    const requestCode = generateRequestCode();

    const created = await insertRFQRequest({
      request_code: requestCode,
      full_name: validated.customer.fullName,
      company_name: validated.customer.companyName,
      phone: validated.customer.phone,
      email: validated.customer.email,
      project_location: validated.customer.projectLocation,
      project_notes: validated.customer.projectNotes,
      request_type: validated.customer.requestType,
      source: validated.source,
      status: 'new',
      urgency: validated.urgency,
      whatsapp_message: validated.whatsappMessage,
    });

    await insertRFQItems(
      validated.items.map((item) => ({
        rfq_request_id: created.id,
        product_id: item.productId,
        name: item.name,
        category: item.category,
        brand: item.brand,
        quantity: item.quantity,
        unit: item.unit,
        urgency: item.urgency,
        notes: item.notes,
      })),
    );

    const attemptedAt = new Date().toISOString();

    try {
      const result = await sendNewRFQInternalNotification({
        id: created.id,
        requestCode: created.request_code,
        customerName: validated.customer.fullName,
        companyName: validated.customer.companyName,
        phone: validated.customer.phone,
        email: validated.customer.email,
        projectLocation: validated.customer.projectLocation,
        urgency: validated.urgency,
        source: validated.source,
        requestType: validated.customer.requestType,
        items: validated.items.map((item) => ({ name: item.name, quantity: item.quantity, unit: item.unit })),
      });

      const sentAt = result.ok ? new Date().toISOString() : null;
      await updateRFQNotificationAudit(created.id, {
        notification_attempted_at: attemptedAt,
        notification_sent_at: sentAt,
        notification_provider: result.provider,
        notification_message_id: result.ok ? (result.messageId || null) : null,
        notification_error: result.ok ? null : result.error,
      });

      if (!result.ok) {
        console.error('RFQ notification send failed', {
          requestCode: created.request_code,
          id: created.id,
          provider: result.provider,
          error: result.error,
        });
      }
    } catch (notificationError) {
      console.error('RFQ notification pipeline error', {
        requestCode: created.request_code,
        id: created.id,
        error: notificationError,
      });

      try {
        await updateRFQNotificationAudit(created.id, {
          notification_attempted_at: attemptedAt,
          notification_sent_at: null,
          notification_provider: (process.env.EMAIL_PROVIDER || 'none').trim().toLowerCase() || 'none',
          notification_message_id: null,
          notification_error: notificationError instanceof Error ? notificationError.message : 'Unknown notification error',
        });
      } catch (auditError) {
        console.error('RFQ notification audit update failed', {
          requestCode: created.request_code,
          id: created.id,
          error: auditError,
        });
      }
    }

    return NextResponse.json({ ok: true, id: created.id, requestCode: created.request_code });
  } catch (error) {
    if (error instanceof Error && (
      error.message.includes('required')
      || error.message.includes('invalid')
      || error.message.includes('maximum')
      || error.message.includes('too large')
      || error.message.includes('must be')
      || error.message.includes('At least one')
      || error.message.includes('Each RFQ item')
    )) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    console.error('RFQ submission error', error);
    return NextResponse.json({ ok: false, error: 'We could not save your RFQ right now. Please continue via WhatsApp.' }, { status: 500 });
  }
}
