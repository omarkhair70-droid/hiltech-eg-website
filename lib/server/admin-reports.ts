import 'server-only';

import { getAdminActionCenterData } from '@/lib/server/admin-action-center';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type AdminReportType = 'rfqs' | 'sales' | 'product_demand' | 'inventory_attention' | 'actions';
export type AdminReportRange = 7 | 30 | 90 | 365;

const ALLOWED_RANGES: AdminReportRange[] = [7, 30, 90, 365];
const ALLOWED_REPORTS: AdminReportType[] = ['rfqs', 'sales', 'product_demand', 'inventory_attention', 'actions'];

export function isAdminReportsBackendConfigured() { return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY); }
export function parseReportType(value: string | undefined): AdminReportType { return ALLOWED_REPORTS.includes(value as AdminReportType) ? (value as AdminReportType) : 'rfqs'; }
export function parseReportRange(value: string | undefined): AdminReportRange { const parsed = Number(value); return ALLOWED_RANGES.includes(parsed as AdminReportRange) ? (parsed as AdminReportRange) : 30; }

function getBaseUrl() { if (!SUPABASE_URL) throw new Error('SUPABASE_URL is not configured'); return SUPABASE_URL.replace(/\/$/, ''); }
function getHeaders() { if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured'); return { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' }; }
async function supabaseFetch<T>(path: string): Promise<T> { const response = await fetch(`${getBaseUrl()}/rest/v1/${path}`, { headers: getHeaders(), cache: 'no-store' }); if (!response.ok) throw new Error(`Admin report query failed: ${response.status}`); return response.json() as Promise<T>; }

function asNum(v: unknown) { const n = Number(v ?? 0); return Number.isFinite(n) ? n : 0; }
function asText(v: unknown, fallback = '—') { const s = String(v ?? '').trim(); return s || fallback; }
function dateRange(range: AdminReportRange) { const now = new Date(); const start = new Date(now); start.setUTCDate(start.getUTCDate() - range + 1); return { nowIso: now.toISOString(), startIso: start.toISOString() }; }
function grandTotal(subtotal: number, discount: number, tax: number) { return Math.max(0, subtotal - discount + tax); }

function csvSafe(value: unknown) {
  const raw = value == null ? '' : String(value);
  const injected = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  const escaped = injected.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function buildSafeCsv(columns: string[], rows: Array<Record<string, unknown>>) {
  const header = columns.map(csvSafe).join(',');
  const body = rows.map((row) => columns.map((col) => csvSafe(row[col])).join(','));
  return [header, ...body].join('\n');
}

export async function getRFQReportRows(range: AdminReportRange) {
  const { startIso, nowIso } = dateRange(range);
  const rows = await supabaseFetch<Array<any>>(`rfq_requests?select=request_code,full_name,company_name,status,urgency,sales_priority,quotation_status,quote_customer_visible,quote_customer_response_status,next_follow_up_at,created_at,updated_at&created_at=gte.${encodeURIComponent(startIso)}&created_at=lte.${encodeURIComponent(nowIso)}&order=created_at.desc&limit=3000`);
  return rows.map((r) => ({ request_code: r.request_code, display_name_or_company_name: r.company_name || r.full_name || '—', status: r.status || '—', urgency: r.urgency || '—', sales_priority: r.sales_priority || 'normal', quotation_status: r.quotation_status || 'not_started', quote_customer_visible: Boolean(r.quote_customer_visible), quote_customer_response_status: r.quote_customer_response_status || 'no_response', next_follow_up_at: r.next_follow_up_at || '', created_at: r.created_at || '', updated_at: r.updated_at || '' }));
}

export async function getSalesReportRows(range: AdminReportRange) {
  const { startIso, nowIso } = dateRange(range);
  const rows = await supabaseFetch<Array<any>>(`rfq_requests?select=request_code,full_name,company_name,status,quotation_status,quote_customer_visible,quote_customer_response_status,quotation_currency,quotation_discount_amount,quotation_tax_amount,sales_priority,next_follow_up_at,created_at,rfq_request_items(quoted_line_total)&created_at=gte.${encodeURIComponent(startIso)}&created_at=lte.${encodeURIComponent(nowIso)}&order=created_at.desc&limit=3000`);
  return rows.map((r) => {
    const subtotal = (Array.isArray(r.rfq_request_items) ? r.rfq_request_items : []).reduce((s: number, i: any) => s + asNum(i.quoted_line_total), 0);
    const discount = asNum(r.quotation_discount_amount);
    const tax = asNum(r.quotation_tax_amount);
    return { request_code: r.request_code, display_name_or_company_name: r.company_name || r.full_name || '—', status: r.status || '—', quotation_status: r.quotation_status || 'not_started', quote_customer_visible: Boolean(r.quote_customer_visible), quote_customer_response_status: r.quote_customer_response_status || 'no_response', quotation_currency: r.quotation_currency || 'EGP', quoted_subtotal: subtotal, quotation_discount_amount: discount, quotation_tax_amount: tax, quotation_grand_total: grandTotal(subtotal, discount, tax), sales_priority: r.sales_priority || 'normal', next_follow_up_at: r.next_follow_up_at || '', created_at: r.created_at || '' };
  });
}

export async function getProductDemandReportRows(range: AdminReportRange) {
  const { startIso, nowIso } = dateRange(range);
  const [items, products] = await Promise.all([
    supabaseFetch<Array<any>>(`rfq_request_items?select=rfq_request_id,product_id,name,category,brand,quantity,quoted_line_total,created_at&created_at=gte.${encodeURIComponent(startIso)}&created_at=lte.${encodeURIComponent(nowIso)}&limit=12000`),
    supabaseFetch<Array<any>>('products?select=id,product_code,name,category,brand,stock_status&limit=6000'),
  ]);
  const byId = new Map<string, any>(); const byCode = new Map<string, any>();
  for (const p of products) { byId.set(String(p.id), p); if (p.product_code) byCode.set(String(p.product_code), p); }
  const agg = new Map<string, any>();
  for (const i of items) {
    const pid = String(i.product_id || '').trim();
    const matched = byId.get(pid) || byCode.get(pid) || null;
    const name = matched?.name || asText(i.name, 'Unnamed item');
    const category = asText(matched?.category || i.category, 'Uncategorized');
    const brand = asText(matched?.brand || i.brand, '');
    const key = matched ? `matched:${matched.id}` : `unmatched:${name.toLowerCase()}::${category.toLowerCase()}`;
    if (!agg.has(key)) agg.set(key, { item_or_product_name: name, product_code: matched?.product_code || '', category, brand, matched_status: matched ? 'matched' : 'unmatched', request_ids: new Set<string>(), total_quantity: 0, quoted_value: 0, stock_status: matched?.stock_status || '' });
    const row = agg.get(key)!;
    const req = String(i.rfq_request_id || '').trim(); if (req) row.request_ids.add(req);
    row.total_quantity += asNum(i.quantity); row.quoted_value += asNum(i.quoted_line_total);
  }
  return [...agg.values()].map((r) => ({ item_or_product_name: r.item_or_product_name, product_code: r.product_code, category: r.category, brand: r.brand, matched_status: r.matched_status, request_count: r.request_ids.size, total_quantity: r.total_quantity, quoted_value: r.quoted_value, stock_status: r.stock_status })).sort((a,b)=>b.request_count-a.request_count);
}

export async function getInventoryAttentionRows() {
  const rows = await supabaseFetch<Array<any>>('products?select=product_code,name,category,brand,status,stock_status,stock_quantity,low_stock_threshold,updated_at&stock_status=in.(low_stock,out_of_stock,backorder,unknown)&order=updated_at.desc&limit=5000');
  return rows.map((r) => ({ product_code: r.product_code || '', name: r.name || '', category: r.category || '', brand: r.brand || '', status: r.status || '', stock_status: r.stock_status || 'unknown', stock_quantity: r.stock_quantity ?? '', low_stock_threshold: r.low_stock_threshold ?? '', updated_at: r.updated_at || '' }));
}

export async function getActionsReportRows() {
  const data = await getAdminActionCenterData();
  const rows: Array<Record<string, unknown>> = [];
  const addRFQ = (actionType: string, list: Array<any>, detail: (r: any)=>string, relevant: (r:any)=>string) => { for (const r of list) rows.push({ action_type: actionType, request_or_product_code: r.request_code, display_name_or_name: r.company_name || r.full_name || '—', status: r.status || '—', priority_or_stock_status: detail(r), relevant_date: relevant(r), detail_link_path: `/admin/rfq/${r.id}` }); };
  addRFQ('new_rfq', data.newRFQs, (r)=>`${r.urgency || '—'} / ${r.sales_priority || 'normal'}`, (r)=>r.created_at || '');
  addRFQ('overdue_follow_up', data.overdueFollowUps, (r)=>r.sales_priority || 'normal', (r)=>r.next_follow_up_at || '');
  addRFQ('quote_ready', data.quotesReadyToPublish, (r)=>r.quotation_status || 'ready', (r)=>r.created_at || '');
  addRFQ('awaiting_response', data.publishedAwaitingResponse, (r)=>r.quotation_status || 'sent', (r)=>r.quote_sent_at || '');
  addRFQ('viewed_no_response', data.quoteViewedNoResponse, (r)=>r.quotation_status || 'sent', (r)=>r.quote_customer_last_viewed_at || '');
  addRFQ('high_value_urgent', data.highValueUrgent, (r)=>r.sales_priority || 'normal', (r)=>r.created_at || '');
  addRFQ('waiting_customer_supplier', data.waitingSupplierCustomer, (r)=>r.sales_priority || 'normal', (r)=>r.next_follow_up_at || '');
  for (const p of data.inventoryAttention) rows.push({ action_type: 'inventory_attention', request_or_product_code: p.product_code || '—', display_name_or_name: p.name || '—', status: 'inventory', priority_or_stock_status: p.stock_status || 'unknown', relevant_date: '', detail_link_path: `/admin/products/${p.id}` });
  return rows;
}
