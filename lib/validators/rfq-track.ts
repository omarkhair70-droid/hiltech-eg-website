export type RFQTrackInputKind = 'email' | 'phone';

export interface ValidatedRFQTrackInput {
  requestCode: string;
  inputKind: RFQTrackInputKind;
  normalizedContact: string;
}

const REQUEST_CODE_MAX = 64;
const CONTACT_MAX = 160;

function fail(message: string): never {
  throw new Error(message);
}

export function normalizeRequestCode(value: string) {
  return value.trim().toUpperCase();
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizePhoneDigits(value: string) {
  return value.replace(/\D/g, '');
}

export function validateRFQTrackPayload(payload: unknown): ValidatedRFQTrackInput {
  const raw = (payload || {}) as Record<string, unknown>;
  const requestCode = typeof raw.request_code === 'string' ? normalizeRequestCode(raw.request_code) : '';
  const phoneOrEmail = typeof raw.phone_or_email === 'string' ? raw.phone_or_email.trim() : '';

  if (!requestCode) fail('Request reference is required.');
  if (requestCode.length > REQUEST_CODE_MAX) fail('Request reference is too long.');

  if (!phoneOrEmail) fail('Phone or email is required.');
  if (phoneOrEmail.length > CONTACT_MAX) fail('Phone or email is too long.');

  if (phoneOrEmail.includes('@')) {
    const email = normalizeEmail(phoneOrEmail);
    if (!email.includes('@') || email.startsWith('@') || email.endsWith('@')) fail('Please enter a valid email address.');
    return { requestCode, inputKind: 'email', normalizedContact: email };
  }

  const phone = normalizePhoneDigits(phoneOrEmail);
  if (phone.length < 7) fail('Please enter a valid phone number.');
  if (phone.length > 20) fail('Please enter a valid phone number.');

  return { requestCode, inputKind: 'phone', normalizedContact: phone };
}
