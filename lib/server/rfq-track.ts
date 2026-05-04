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
    select: 'id,request_code,full_name,phone,email,project_location,status,created_at,updated_at,last_status_changed_at,quotation_status,quotation_currency,quotation_valid_until,quotation_payment_terms,quotation_delivery_terms,quotation_notes,quotation_discount_amount,quotation_tax_amount,quote_customer_visible,quote_customer_response_status,quote_customer_response_notes,quote_customer_responded_at,quote_public_message',
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
    select: 'name,quantity,unit,quoted_unit_price,quoted_line_total',
    rfq_request_id: `eq.${row.id}`,
    limit: '10',
    order: 'created_at.asc',
  });
  const itemsRes = await supabaseFetch(`rfq_request_items?${itemParams.toString()}`);
  const itemsRows = await itemsRes.json() as Array<{ name: string }>;

  const quoteVisible = Boolean(row.quote_customer_visible) && ['ready', 'sent', 'revised'].includes(String(row.quotation_status || ''));
  if (quoteVisible) {
    fetch(`${getBaseUrl()}/rest/v1/rfq_requests?id=eq.${row.id}`, { method: 'PATCH', headers: { ...getHeaders(), Prefer: 'return=minimal' }, body: JSON.stringify({ quote_customer_last_viewed_at: new Date().toISOString() }) }).catch(() => {});
  }
  const subtotal = quoteVisible ? itemsRows.reduce((sum, item: any) => sum + Number(item.quoted_line_total || 0), 0) : null;
  const discount = quoteVisible ? Number(row.quotation_discount_amount || 0) : null;
  const tax = quoteVisible ? Number(row.quotation_tax_amount || 0) : null;
  const grandTotal = quoteVisible && subtotal != null && discount != null && tax != null ? subtotal - discount + tax : null;
  return {
    requestId: row.id,
    requestCode: row.request_code,
    status: row.status,
    statusExplanation: STATUS_EXPLANATIONS[row.status] || 'Request is being processed',
    createdAt: row.created_at,
    lastUpdatedAt: row.last_status_changed_at || row.updated_at,
    customerDisplayName: getDisplayName(String(row.full_name || 'Customer')),
    projectLocation: row.project_location || null,
    itemCount: itemsRows.length,
    items: itemsRows.map((item: any) => ({ name: item.name, quantity: item.quantity, unit: item.unit, quotedUnitPrice: item.quoted_unit_price, quotedLineTotal: item.quoted_line_total })),
    quote: quoteVisible ? {
      quotationStatus: row.quotation_status,
      quotationCurrency: row.quotation_currency || 'EGP',
      quotationValidUntil: row.quotation_valid_until,
      quotationPaymentTerms: row.quotation_payment_terms,
      quotationDeliveryTerms: row.quotation_delivery_terms,
      quotationNotes: row.quotation_notes,
      quotePublicMessage: row.quote_public_message,
      customerResponseStatus: row.quote_customer_response_status || 'no_response',
      customerResponseNotes: row.quote_customer_response_notes,
      customerRespondedAt: row.quote_customer_responded_at,
      subtotal,
      discount,
      tax,
      grandTotal,
    } : null,
  };
}

export async function submitQuoteCustomerResponse(input: ValidatedRFQTrackInput, responseStatus: 'accepted' | 'rejected' | 'changes_requested', responseNotes: string | null) {
  const tracked = await lookupRFQTracking(input);
  if (!tracked?.quote) throw new Error('This quotation is not currently available for customer response.');
  if (tracked.quote.customerResponseStatus !== 'no_response') throw new Error('A response was already submitted for this quotation.');
  const notes = responseNotes?.trim() || null;
  const now = new Date().toISOString();
  const patchRes = await fetch(`${getBaseUrl()}/rest/v1/rfq_requests?id=eq.${tracked.requestId}&quote_customer_visible=is.true`, {
    method: 'PATCH',
    headers: { ...getHeaders(), Prefer: 'return=minimal' },
    body: JSON.stringify({
      quote_customer_response_status: responseStatus,
      quote_customer_response_notes: notes,
      quote_customer_responded_at: now,
      last_admin_action_at: now,
      ...(responseStatus === 'changes_requested' ? { sales_priority: 'waiting_customer' } : {}),
    }),
  });
  if (!patchRes.ok) throw new Error('Unable to save your response at this time.');
  return { status: responseStatus, respondedAt: now };
}
