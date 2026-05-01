import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { insertRFQItems, insertRFQRequest, isSupabaseConfigured } from '@/lib/server/supabase-admin';
import { validateRFQPayload } from '@/lib/validators/rfq';

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
