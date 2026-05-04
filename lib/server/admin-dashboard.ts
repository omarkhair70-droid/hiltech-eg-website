import 'server-only';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isAdminDashboardBackendConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function getBaseUrl() {
  if (!SUPABASE_URL) throw new Error('SUPABASE_URL is not configured');
  return SUPABASE_URL.replace(/\/$/, '');
}

function getHeaders() {
  if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  };
}

async function supabaseFetch(path: string) {
  const response = await fetch(`${getBaseUrl()}/rest/v1/${path}`, { headers: getHeaders(), cache: 'no-store' });
  if (!response.ok) throw new Error(`Supabase admin dashboard request failed: ${response.status} ${await response.text()}`);
  return response;
}

export async function getAdminDashboardSummary() {
  const nowIso = new Date().toISOString();

  const [rfqRes, productRes, recentRFQsRes, followUpDueRes, inventoryAttentionRes] = await Promise.all([
    supabaseFetch('rfq_requests?select=id,status,sales_priority,quotation_status,next_follow_up_at'),
    supabaseFetch('products?select=id,status,stock_status'),
    supabaseFetch('rfq_requests?select=id,request_code,full_name,company_name,status,sales_priority,quotation_status,next_follow_up_at,created_at,rfq_request_items(count)&order=created_at.desc&limit=8'),
    supabaseFetch(`rfq_requests?select=id,request_code,full_name,company_name,status,sales_priority,next_follow_up_at&next_follow_up_at=not.is.null&next_follow_up_at=lte.${encodeURIComponent(nowIso)}&order=next_follow_up_at.asc&limit=8`),
    supabaseFetch('products?select=id,product_code,name,category,stock_status,stock_quantity,low_stock_threshold&stock_status=in.(low_stock,out_of_stock,backorder)&order=updated_at.desc&limit=8'),
  ]);

  const rfqRows = await rfqRes.json() as Array<any>;
  const productRows = await productRes.json() as Array<any>;
  const recentRFQsRaw = await recentRFQsRes.json() as Array<any>;

  const rfqCounts = {
    total: rfqRows.length,
    new: rfqRows.filter((r) => r.status === 'new').length,
    in_review: rfqRows.filter((r) => r.status === 'in_review').length,
    quoted: rfqRows.filter((r) => r.status === 'quoted').length,
    waiting_client: rfqRows.filter((r) => r.status === 'waiting_client').length,
    won: rfqRows.filter((r) => r.status === 'won').length,
    closed_lost: rfqRows.filter((r) => r.status === 'closed' || r.status === 'lost').length,
  };

  const workflowCounts = {
    urgent: rfqRows.filter((r) => r.sales_priority === 'urgent').length,
    high_value: rfqRows.filter((r) => r.sales_priority === 'high_value').length,
    waiting_customer: rfqRows.filter((r) => r.sales_priority === 'waiting_customer').length,
    waiting_supplier: rfqRows.filter((r) => r.sales_priority === 'waiting_supplier').length,
    follow_up_due: rfqRows.filter((r) => r.next_follow_up_at && new Date(r.next_follow_up_at).getTime() <= Date.now()).length,
  };

  const quotationCounts = {
    not_started: rfqRows.filter((r) => (r.quotation_status || 'not_started') === 'not_started').length,
    draft: rfqRows.filter((r) => r.quotation_status === 'draft').length,
    ready: rfqRows.filter((r) => r.quotation_status === 'ready').length,
    sent: rfqRows.filter((r) => r.quotation_status === 'sent').length,
    revised: rfqRows.filter((r) => r.quotation_status === 'revised').length,
    cancelled: rfqRows.filter((r) => r.quotation_status === 'cancelled').length,
  };

  const productCounts = {
    total: productRows.length,
    active: productRows.filter((p) => p.status === 'active').length,
    low_stock: productRows.filter((p) => p.stock_status === 'low_stock').length,
    out_of_stock: productRows.filter((p) => p.stock_status === 'out_of_stock').length,
    backorder: productRows.filter((p) => p.stock_status === 'backorder').length,
    unknown: productRows.filter((p) => p.stock_status === 'unknown').length,
  };

  return {
    rfqCounts,
    workflowCounts,
    quotationCounts,
    productCounts,
    recentRFQs: recentRFQsRaw.map((row) => ({ ...row, item_count: Array.isArray(row.rfq_request_items) ? Number(row.rfq_request_items[0]?.count || 0) : 0 })),
    followUpDueRFQs: await followUpDueRes.json() as Array<any>,
    inventoryAttentionProducts: await inventoryAttentionRes.json() as Array<any>,
  };
}
