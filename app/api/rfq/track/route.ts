import { NextResponse } from 'next/server';
import { getTrackingFailureMessage, lookupRFQTracking } from '@/lib/server/rfq-track';
import { validateRFQTrackPayload } from '@/lib/validators/rfq-track';
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit';

const noStoreHeaders = { 'Cache-Control': 'no-store' };

export async function POST(request: Request) {

  const ip = getClientIp(request);
  const rate = checkRateLimit({ key: `rfq-track:${ip}`, windowMs: 10 * 60 * 1000, maxRequests: 30 });
  if (!rate.allowed) {
    return NextResponse.json({ ok: false, error: 'Too many tracking attempts. Please wait and try again.' }, { status: 429, headers: { ...noStoreHeaders, 'Retry-After': String(rate.retryAfter) } });
  }

  try {
    const payload = await request.json();
    const validated = validateRFQTrackPayload(payload);
    const tracked = await lookupRFQTracking(validated);

    if (!tracked) {
      return NextResponse.json({ ok: false, error: getTrackingFailureMessage() }, { status: 404, headers: noStoreHeaders });
    }

    return NextResponse.json({ ok: true, request: tracked }, { headers: noStoreHeaders });
  } catch (error) {
    if (error instanceof Error && (
      error.message.includes('required')
      || error.message.includes('valid')
      || error.message.includes('too long')
    )) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400, headers: noStoreHeaders });
    }

    console.error('RFQ track error', error);
    return NextResponse.json({ ok: false, error: getTrackingFailureMessage() }, { status: 500, headers: noStoreHeaders });
  }
}
