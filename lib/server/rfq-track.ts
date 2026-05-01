import 'server-only';

import { normalizeEmail, normalizePhoneDigits, type ValidatedRFQTrackInput } from '@/lib/validators/rfq-track';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const STATUS_EXPLANATIONS: Record<string, string> = {
  new: 'Request received',
  in_review: 'HILTECH is reviewing your request',
  quoted: 'Quotation prepared or being shared',
  waiting_client: 'Waiting for client response',
  won: 'Confirmed',
  lost: 'Closed',
  closed: 'Closed',
};

const TRACK_FAILURE_MESSAGE = 'We couldn’t verify this request. Please check the reference code and contact details.';

function getHeaders() {
  if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  };
}

function getBaseUrl() {
  if (!SUPABASE_URL) throw new Error('SUPABASE_URL is not configured');
  return SUPABASE_URL.replace(/\/$/, '');
}

async function supabaseFetch(path: string) {
  const response = await fetch(`${getBaseUrl()}/rest/v1/${path}`, {
    headers: getHeaders(),
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`Supabase request failed: ${response.status} ${await response.text()}`);
  return response;
}

function getDisplayName(fullName: string) {
  const first = fullName.trim().split(/\s+/)[0] || 'Customer';
  return first.slice(0, 48);
}

export function getTrackingFailureMessage() {
  return TRACK_FAILURE_MESSAGE;
}

export async function lookupRFQTracking(input: ValidatedRFQTrackInput) {
  const params = new URLSearchParams({
    select: 'id,request_code,full_name,phone,email,project_location,status,created_at,updated_at,last_status_changed_at',
    request_code: `eq.${input.requestCode}`,
    limit: '1',
  });

  const requestRes = await supabaseFetch(`rfq_requests?${params.toString()}`);
  const rows = await requestRes.json() as Array<any>;
  const row = rows[0];
  if (!row) return null;

  const matched = input.inputKind === 'email'
    ? normalizeEmail(String(row.email || '')) === input.normalizedContact
    : normalizePhoneDigits(String(row.phone || '')) === input.normalizedContact;

  if (!matched) return null;

  const itemParams = new URLSearchParams({
    select: 'name',
    rfq_request_id: `eq.${row.id}`,
    limit: '10',
    order: 'created_at.asc',
  });
  const itemsRes = await supabaseFetch(`rfq_request_items?${itemParams.toString()}`);
  const itemsRows = await itemsRes.json() as Array<{ name: string }>;

  return {
    requestCode: row.request_code,
    status: row.status,
    statusExplanation: STATUS_EXPLANATIONS[row.status] || 'Request is being processed',
    createdAt: row.created_at,
    lastUpdatedAt: row.last_status_changed_at || row.updated_at,
    customerDisplayName: getDisplayName(String(row.full_name || 'Customer')),
    projectLocation: row.project_location || null,
    itemCount: itemsRows.length,
    items: itemsRows.map((item) => ({ name: item.name })),
  };
}
