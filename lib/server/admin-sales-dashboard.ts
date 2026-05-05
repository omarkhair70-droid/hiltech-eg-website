import 'server-only';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type SalesRange = 7 | 30 | 90 | 365;

const ALLOWED_RANGES: SalesRange[] = [7, 30, 90, 365];

export function parseSalesRange(value: string | undefined): SalesRange {
  const parsed = Number(value);
  if (ALLOWED_RANGES.includes(parsed as SalesRange)) return parsed as SalesRange;
  return 30;
}

export function isAdminSalesDashboardBackendConfigured() {
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
  if (!response.ok) throw new Error(`Supabase admin sales request failed: ${response.status} ${await response.text()}`);
  return response;
}

function asMoney(n: number) { return Number.isFinite(n) ? n : 0; }
function itemSubtotal(items: Array<{ quoted_line_total: number | null }>) { return items.reduce((sum, i) => sum + asMoney(Number(i.quoted_line_total || 0)), 0); }

function rfqGrandTotal(row: { rfq_request_items: Array<{ quoted_line_total: number | null }>; quotation_discount_amount: number | null; quotation_tax_amount: number | null }) {
  const subtotal = itemSubtotal(Array.isArray(row.rfq_request_items) ? row.rfq_request_items : []);
  const discount = asMoney(Number(row.quotation_discount_amount || 0));
  const tax = asMoney(Number(row.quotation_tax_amount || 0));
  return Math.max(0, subtotal - discount + tax);
}

export async function getAdminSalesDashboardData(range: SalesRange) {
  const now = new Date();
  const start = new Date(now);
  start.setUTCDate(start.getUTCDate() - range + 1);
  const startIso = start.toISOString();
  const nowIso = now.toISOString();

  const rfqRes = await supabaseFetch(`rfq_requests?select=id,request_code,full_name,company_name,status,sales_priority,next_follow_up_at,quotation_status,quotation_discount_amount,quotation_tax_amount,quotation_currency,quote_customer_visible,quote_customer_response_status,quote_customer_last_viewed_at,created_at,rfq_request_items(quoted_line_total,name,category)&created_at=gte.${encodeURIComponent(startIso)}&created_at=lte.${encodeURIComponent(nowIso)}&order=created_at.desc&limit=1000`);

  const rows = await rfqRes.json() as Array<any>;

  const enriched = rows.map((row) => ({ ...row, grand_total: rfqGrandTotal(row) }));
  const quotedRows = enriched.filter((r) => ['draft', 'ready', 'sent', 'revised'].includes(r.quotation_status || ''));
  const publishedRows = enriched.filter((r) => r.quote_customer_visible || r.quotation_status === 'sent');
  const wonRows = enriched.filter((r) => r.status === 'won' || r.quote_customer_response_status === 'accepted');
  const rejectedRows = enriched.filter((r) => ['lost', 'closed'].includes(r.status) || ['rejected', 'changes_requested'].includes(r.quote_customer_response_status));

  const quotedValue = quotedRows.reduce((s, r) => s + r.grand_total, 0);
  const wonValue = wonRows.reduce((s, r) => s + r.grand_total, 0);

  const trendBuckets = new Map<string, { rfqCount: number; quotedValue: number; wonValue: number }>();
  for (const r of enriched) {
    const day = String(r.created_at || '').slice(0, 10);
    if (!day) continue;
    if (!trendBuckets.has(day)) trendBuckets.set(day, { rfqCount: 0, quotedValue: 0, wonValue: 0 });
    const bucket = trendBuckets.get(day)!;
    bucket.rfqCount += 1;
    if (['draft', 'ready', 'sent', 'revised'].includes(r.quotation_status || '')) bucket.quotedValue += r.grand_total;
    if (r.status === 'won' || r.quote_customer_response_status === 'accepted') bucket.wonValue += r.grand_total;
  }

  const topByRequestCount = new Map<string, number>();
  const topByQuotedValue = new Map<string, number>();
  for (const r of enriched) {
    for (const item of (r.rfq_request_items || [])) {
      const key = item.category || item.name || 'Uncategorized';
      topByRequestCount.set(key, (topByRequestCount.get(key) || 0) + 1);
      if (['draft', 'ready', 'sent', 'revised'].includes(r.quotation_status || '')) {
        const rowSubtotal = itemSubtotal(Array.isArray(r.rfq_request_items) ? r.rfq_request_items : []);
        const itemSubtotalValue = asMoney(Number(item.quoted_line_total || 0));
        const allocatedValue = rowSubtotal > 0 ? (itemSubtotalValue / rowSubtotal) * r.grand_total : 0;
        const current = topByQuotedValue.get(key) || 0;
        topByQuotedValue.set(key, current + allocatedValue);
      }
    }
  }

  return {
    range,
    kpis: {
      totalRfqs: enriched.length,
      quotedRfqs: quotedRows.length,
      publishedQuotes: publishedRows.length,
      acceptedWon: wonRows.length,
      rejectedLost: rejectedRows.length,
      openPipelineValue: enriched.filter((r) => !['won', 'lost', 'closed'].includes(r.status)).reduce((s, r) => s + r.grand_total, 0),
      quotedValue,
      wonValue,
      avgQuotationValue: quotedRows.length ? quotedValue / quotedRows.length : 0,
      acceptanceRate: publishedRows.length ? (wonRows.length / publishedRows.length) * 100 : 0,
    },
    pipeline: {
      newInReview: enriched.filter((r) => ['new', 'in_review'].includes(r.status)).reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
      quotationDraft: enriched.filter((r) => r.quotation_status === 'draft').reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
      quotationReady: enriched.filter((r) => r.quotation_status === 'ready').reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
      quotationSent: publishedRows.reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
      customerViewed: enriched.filter((r) => !!r.quote_customer_last_viewed_at).reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
      customerAccepted: enriched.filter((r) => r.quote_customer_response_status === 'accepted').reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
      customerRejectedChanges: enriched.filter((r) => ['rejected', 'changes_requested'].includes(r.quote_customer_response_status)).reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
      won: enriched.filter((r) => r.status === 'won').reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
      lostClosed: enriched.filter((r) => ['lost', 'closed'].includes(r.status)).reduce((acc, r) => ({ count: acc.count + 1, value: acc.value + r.grand_total }), { count: 0, value: 0 }),
    },
    highValue: [...enriched].sort((a, b) => b.grand_total - a.grand_total).slice(0, 10),
    followup: {
      overdueFollowups: enriched.filter((r) => r.next_follow_up_at && new Date(r.next_follow_up_at).getTime() <= now.getTime()).length,
      waitingCustomer: enriched.filter((r) => r.sales_priority === 'waiting_customer').length,
      waitingSupplier: enriched.filter((r) => r.sales_priority === 'waiting_supplier').length,
      publishedNoResponse: enriched.filter((r) => r.quote_customer_visible && (r.quote_customer_response_status || 'no_response') === 'no_response').length,
      viewedNoResponse: enriched.filter((r) => r.quote_customer_last_viewed_at && (r.quote_customer_response_status || 'no_response') === 'no_response').length,
    },
    trends: [...trendBuckets.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([date, data]) => ({ date, ...data })),
    topRequested: [...topByRequestCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => ({ name, count })),
    topQuoted: [...topByQuotedValue.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, value]) => ({ name, value })),
  };
}
