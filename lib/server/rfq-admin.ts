import 'server-only';

import { cache } from 'react';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const RFQ_STATUSES = ['new', 'in_review', 'quoted', 'waiting_client', 'won', 'lost', 'closed'] as const;
export const RFQ_SALES_PRIORITIES = ['normal', 'urgent', 'high_value', 'waiting_customer', 'waiting_supplier'] as const;
export const RFQ_QUOTATION_STATUSES = ['not_started', 'draft', 'ready', 'sent', 'revised', 'cancelled'] as const;
export type RFQStatus = (typeof RFQ_STATUSES)[number];
export type RFQSalesPriority = (typeof RFQ_SALES_PRIORITIES)[number];
export type RFQQuotationStatus = (typeof RFQ_QUOTATION_STATUSES)[number];

export function isRFQAdminBackendConfigured() { return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY); }
function isUuid(value: string): boolean { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value); }
function getHeaders() { if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured'); return { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' }; }
function getBaseUrl() { if (!SUPABASE_URL) throw new Error('SUPABASE_URL is not configured'); return SUPABASE_URL.replace(/\/$/, ''); }
async function supabaseFetch(path: string, init?: RequestInit) { const response = await fetch(`${getBaseUrl()}/rest/v1/${path}`, { ...init, headers: { ...getHeaders(), ...(init?.headers || {}) }, cache: 'no-store' }); if (!response.ok) throw new Error(`Supabase request failed: ${response.status} ${await response.text()}`); return response; }

export interface RFQListFilters { status?: string; source?: string; urgency?: string; search?: string; quick?: string; sales_priority?: string; }

export const listRFQRequests = cache(async (filters: RFQListFilters = {}) => {
  const params = new URLSearchParams({ select: 'id,request_code,full_name,company_name,phone,email,project_location,source,urgency,status,created_at,sales_priority,next_follow_up_at,quotation_status,rfq_request_items(count)', order: 'created_at.desc', limit: '100' });
  if (filters.status && RFQ_STATUSES.includes(filters.status as RFQStatus)) params.set('status', `eq.${filters.status}`);
  if (filters.source) params.set('source', `eq.${filters.source}`);
  if (filters.urgency) params.set('urgency', `eq.${filters.urgency}`);
  if (filters.sales_priority && RFQ_SALES_PRIORITIES.includes(filters.sales_priority as RFQSalesPriority)) params.set('sales_priority', `eq.${filters.sales_priority}`);
  if (filters.search) { const value = filters.search.replace(/,/g, ' ').trim(); if (value) params.set('or', `(request_code.ilike.*${value}*,full_name.ilike.*${value}*,company_name.ilike.*${value}*,phone.ilike.*${value}*)`); }
  const response = await supabaseFetch(`rfq_requests?${params.toString()}`); const rows = await response.json() as Array<any>;
  const baseRows = rows.map((row) => ({ ...row, item_count: Array.isArray(row.rfq_request_items) ? Number(row.rfq_request_items[0]?.count || 0) : 0 }));
  if (filters.quick === 'new_pending') return baseRows.filter((r) => ['new', 'in_review'].includes(r.status));
  if (filters.quick === 'followup_due') return baseRows.filter((r) => r.next_follow_up_at && new Date(r.next_follow_up_at).getTime() <= Date.now());
  if (filters.quick === 'quotation_drafts') return baseRows.filter((r) => r.quotation_status === 'draft');
  if (filters.quick === 'quotation_ready') return baseRows.filter((r) => r.quotation_status === 'ready');
  if (filters.quick && RFQ_SALES_PRIORITIES.includes(filters.quick as RFQSalesPriority)) return baseRows.filter((r) => r.sales_priority === filters.quick);
  return baseRows;
});

export async function getRFQRequest(id: string) {
  const params = new URLSearchParams({ select: 'id,request_code,full_name,company_name,phone,email,project_location,project_notes,request_type,source,urgency,status,sales_priority,next_follow_up_at,internal_notes,last_admin_action_at,whatsapp_message,created_at,updated_at,last_status_changed_at,notification_attempted_at,notification_sent_at,notification_provider,notification_message_id,notification_error,quotation_status,quotation_currency,quotation_valid_until,quotation_payment_terms,quotation_delivery_terms,quotation_notes,quotation_discount_amount,quotation_tax_amount,quotation_updated_at,rfq_request_items(id,product_id,name,quantity,unit,brand,category,urgency,notes,quoted_unit_price,quoted_line_total,quoted_item_notes,created_at)', id: `eq.${id}`, limit: '1' });
  const response = await supabaseFetch(`rfq_requests?${params.toString()}`); const rows = await response.json() as Array<any>; const rfq = rows[0] ?? null; if (!rfq) return null;
  const productIdValues: string[] = (rfq.rfq_request_items || []).map((item: any) => item.product_id).filter((v: unknown): v is string => typeof v === 'string' && v.length > 0);
  const productUuidIds: string[] = [...new Set(productIdValues.filter((id) => isUuid(id)))];
  const productCodes: string[] = [...new Set(productIdValues.filter((id) => !isUuid(id) && id.length <= 64))];
  const byId = new Map(); const byCode = new Map();
  if (productUuidIds.length || productCodes.length) {
    const clauses = productUuidIds.map((id: string) => `id.eq.${id}`).concat(productCodes.map((c: string) => `product_code.eq.${c}`));
    try {
      const productParams = new URLSearchParams({ select: 'id,product_code,name,stock_status,stock_quantity,low_stock_threshold,last_stock_checked_at', or: `(${clauses.join(',')})`, limit: '200' });
      const pRes = await supabaseFetch(`products?${productParams.toString()}`); const products = await pRes.json() as Array<any>; products.forEach((p) => { byId.set(p.id, p); byCode.set(p.product_code, p); });
    } catch (error) {
      console.error('RFQ admin product inventory lookup failed', error);
    }
  }
  rfq.rfq_request_items = (rfq.rfq_request_items || []).map((item: any) => ({ ...item, matched_product: (item.product_id && byId.get(item.product_id)) || (item.product_id && byCode.get(item.product_id)) || null }));
  return rfq;
}

export async function getRFQSummaryCounts() { const response = await supabaseFetch('rfq_requests?select=status'); const rows = await response.json() as Array<{ status: string }>; return rows.reduce((acc, row) => { acc.total += 1; if (row.status === 'new') acc.new += 1; if (row.status === 'in_review') acc.in_review += 1; if (row.status === 'quoted') acc.quoted += 1; return acc; }, { new: 0, in_review: 0, quoted: 0, total: 0 }); }

export async function updateRFQRequestWorkflow(id: string, payload: { status: RFQStatus; salesPriority: RFQSalesPriority; nextFollowUpAt: string | null; internalNotes: string | null; }) {
  if (!RFQ_STATUSES.includes(payload.status)) throw new Error('Invalid status value');
  if (!RFQ_SALES_PRIORITIES.includes(payload.salesPriority)) throw new Error('Invalid sales priority value');
  await supabaseFetch(`rfq_requests?id=eq.${id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: payload.status, sales_priority: payload.salesPriority, next_follow_up_at: payload.nextFollowUpAt, internal_notes: payload.internalNotes, last_status_changed_at: new Date().toISOString(), last_admin_action_at: new Date().toISOString() }) });
}


function parseNullableMoney(value: unknown) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) throw new Error('Money values must be non-negative numbers.');
  return Number(n.toFixed(2));
}

function parseCappedText(value: unknown, maxLength: number) {
  const text = String(value ?? '').trim();
  if (!text) return null;
  if (text.length > maxLength) throw new Error(`Text value exceeds ${maxLength} characters.`);
  return text;
}

export async function updateRFQQuotationDraft(id: string, payload: {
  quotationStatus: RFQQuotationStatus;
  quotationCurrency: string;
  quotationValidUntil: string | null;
  quotationPaymentTerms: string | null;
  quotationDeliveryTerms: string | null;
  quotationNotes: string | null;
  quotationDiscountAmount: unknown;
  quotationTaxAmount: unknown;
  items: Array<{ id: string; quotedUnitPrice: unknown; quotedLineTotal: unknown; quotedItemNotes: string | null }>;
}) {
  if (!RFQ_QUOTATION_STATUSES.includes(payload.quotationStatus)) throw new Error('Invalid quotation status value');
  const currency = String(payload.quotationCurrency || 'EGP').trim().toUpperCase().slice(0, 8) || 'EGP';
  const now = new Date().toISOString();
  await supabaseFetch(`rfq_requests?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      quotation_status: payload.quotationStatus,
      quotation_currency: currency,
      quotation_valid_until: payload.quotationValidUntil || null,
      quotation_payment_terms: parseCappedText(payload.quotationPaymentTerms, 1000),
      quotation_delivery_terms: parseCappedText(payload.quotationDeliveryTerms, 1000),
      quotation_notes: parseCappedText(payload.quotationNotes, 2000),
      quotation_discount_amount: parseNullableMoney(payload.quotationDiscountAmount),
      quotation_tax_amount: parseNullableMoney(payload.quotationTaxAmount),
      quotation_updated_at: now,
      last_admin_action_at: now,
    }),
  });

  for (const item of payload.items) {
    await supabaseFetch(`rfq_request_items?id=eq.${item.id}&rfq_request_id=eq.${id}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        quoted_unit_price: parseNullableMoney(item.quotedUnitPrice),
        quoted_line_total: parseNullableMoney(item.quotedLineTotal),
        quoted_item_notes: parseCappedText(item.quotedItemNotes, 1000),
      }),
    });
  }
}
