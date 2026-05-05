import 'server-only';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type RFQActionRow = {
  id: string;
  request_code: string;
  full_name: string | null;
  company_name: string | null;
  status: string | null;
  urgency: string | null;
  sales_priority: string | null;
  created_at: string;
  quotation_status: string | null;
  next_follow_up_at: string | null;
  quote_sent_at: string | null;
  quote_customer_last_viewed_at: string | null;
};

type InventoryRow = {
  id: string;
  product_code: string | null;
  name: string;
  category: string | null;
  stock_status: string | null;
  stock_quantity: number | null;
  low_stock_threshold: number | null;
};

export function isAdminActionCenterConfigured() {
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

async function supabaseFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${getBaseUrl()}/rest/v1/${path}`, { headers: getHeaders(), cache: 'no-store' });
  if (!response.ok) throw new Error(`Action center query failed: ${response.status}`);
  return response.json() as Promise<T>;
}

const safeRFQFields = 'id,request_code,full_name,company_name,status,urgency,sales_priority,created_at,quotation_status,next_follow_up_at,quote_sent_at,quote_customer_last_viewed_at';

export async function getAdminActionCenterData() {
  const nowIso = new Date().toISOString();

  const [
    newRFQs,
    overdueFollowUps,
    quotesReadyToPublish,
    publishedAwaitingResponse,
    quoteViewedNoResponse,
    highValueUrgent,
    waitingSupplierCustomer,
    inventoryAttention,
  ] = await Promise.all([
    supabaseFetch<RFQActionRow[]>(`rfq_requests?select=${safeRFQFields}&status=in.(new,in_review)&order=created_at.asc&limit=10`),
    supabaseFetch<RFQActionRow[]>(`rfq_requests?select=${safeRFQFields}&next_follow_up_at=not.is.null&next_follow_up_at=lte.${encodeURIComponent(nowIso)}&order=next_follow_up_at.asc&limit=10`),
    supabaseFetch<RFQActionRow[]>(`rfq_requests?select=${safeRFQFields}&quotation_status=eq.ready&or=(quote_customer_visible.is.null,quote_customer_visible.eq.false)&order=updated_at.desc&limit=10`),
    supabaseFetch<RFQActionRow[]>(`rfq_requests?select=${safeRFQFields}&quote_customer_visible=eq.true&or=(quote_customer_response_status.is.null,quote_customer_response_status.eq.no_response)&order=quote_sent_at.asc.nullslast&limit=10`),
    supabaseFetch<RFQActionRow[]>(`rfq_requests?select=${safeRFQFields}&quote_customer_last_viewed_at=not.is.null&or=(quote_customer_response_status.is.null,quote_customer_response_status.eq.no_response)&order=quote_customer_last_viewed_at.desc&limit=10`),
    supabaseFetch<RFQActionRow[]>(`rfq_requests?select=${safeRFQFields}&sales_priority=in.(high_value,urgent)&status=not.in.(closed,lost,won)&order=updated_at.desc&limit=10`),
    supabaseFetch<RFQActionRow[]>(`rfq_requests?select=${safeRFQFields}&sales_priority=in.(waiting_customer,waiting_supplier)&order=next_follow_up_at.asc.nullslast&limit=10`),
    supabaseFetch<InventoryRow[]>('products?select=id,product_code,name,category,stock_status,stock_quantity,low_stock_threshold&stock_status=in.(low_stock,out_of_stock,backorder,unknown)&order=updated_at.desc&limit=15'),
  ]);

  return {
    newRFQs,
    overdueFollowUps,
    quotesReadyToPublish,
    publishedAwaitingResponse,
    quoteViewedNoResponse,
    highValueUrgent,
    waitingSupplierCustomer,
    inventoryAttention,
  };
}
