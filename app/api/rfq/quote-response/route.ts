import { NextResponse } from 'next/server';
import { submitQuoteCustomerResponse, getTrackingFailureMessage } from '@/lib/server/rfq-track';
import { validateRFQTrackPayload } from '@/lib/validators/rfq-track';
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit';

const noStoreHeaders = { 'Cache-Control': 'no-store' };
const RESPONSE_STATUSES = ['accepted', 'rejected', 'changes_requested'] as const;

export async function POST(request: Request) {

  const ip = getClientIp(request);
  const rate = checkRateLimit({ key: `rfq-quote-response:${ip}`, windowMs: 10 * 60 * 1000, maxRequests: 10 });
  if (!rate.allowed) {
    return NextResponse.json({ ok: false, error: 'Too many quote response attempts. Please wait and try again.' }, { status: 429, headers: { ...noStoreHeaders, 'Retry-After': String(rate.retryAfter) } });
  }

  try {
    const payload = await request.json() as Record<string, unknown>;
    const validatedTrack = validateRFQTrackPayload(payload);
    const responseStatus = String(payload.response_status || '');
    const notes = String(payload.response_notes || '').trim();
    if (!RESPONSE_STATUSES.includes(responseStatus as (typeof RESPONSE_STATUSES)[number])) {
      return NextResponse.json({ ok: false, error: 'Please choose a valid quote response.' }, { status: 400, headers: noStoreHeaders });
    }
    if (notes.length > 1000) {
      return NextResponse.json({ ok: false, error: 'Response notes must be 1000 characters or less.' }, { status: 400, headers: noStoreHeaders });
    }

    const result = await submitQuoteCustomerResponse(validatedTrack, responseStatus as (typeof RESPONSE_STATUSES)[number], notes || null);
    return NextResponse.json({ ok: true, response: result }, { headers: noStoreHeaders });
  } catch (error) {
    if (error instanceof Error && (error.message.includes('already submitted') || error.message.includes('not currently available'))) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 409, headers: noStoreHeaders });
    }
    if (error instanceof Error && (error.message.includes('required') || error.message.includes('valid') || error.message.includes('too long'))) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400, headers: noStoreHeaders });
    }
    console.error('RFQ quote response error', error);
    return NextResponse.json({ ok: false, error: getTrackingFailureMessage() }, { status: 500, headers: noStoreHeaders });
  }
}
