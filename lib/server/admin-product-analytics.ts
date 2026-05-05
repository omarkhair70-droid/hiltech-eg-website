import 'server-only';

type ProductAnalyticsRange = 7 | 30 | 90 | 365;
const ALLOWED_RANGES: ProductAnalyticsRange[] = [7, 30, 90, 365];

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function parseProductAnalyticsRange(value: string | undefined): ProductAnalyticsRange {
  const parsed = Number(value);
  if (ALLOWED_RANGES.includes(parsed as ProductAnalyticsRange)) return parsed as ProductAnalyticsRange;
  return 30;
}

export function isAdminProductAnalyticsBackendConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function isUuid(value: string): boolean { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value); }
function asText(value: unknown, fallback = 'Unspecified') { const v = String(value ?? '').trim(); return v || fallback; }
function asNum(value: unknown) { const n = Number(value ?? 0); return Number.isFinite(n) ? n : 0; }
function getBaseUrl() { if (!SUPABASE_URL) throw new Error('SUPABASE_URL is not configured'); return SUPABASE_URL.replace(/\/$/, ''); }
function getHeaders() { if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured'); return { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json' }; }
async function supabaseFetch(path: string) { const response = await fetch(`${getBaseUrl()}/rest/v1/${path}`, { headers: getHeaders(), cache: 'no-store' }); if (!response.ok) throw new Error(`Supabase product analytics request failed: ${response.status}`); return response; }

export async function getAdminProductAnalyticsData(range: ProductAnalyticsRange) {
  const now = new Date();
  const start = new Date(now);
  start.setUTCDate(start.getUTCDate() - range + 1);
  const startIso = start.toISOString();

  const [productRes, itemRes] = await Promise.all([
    supabaseFetch('products?select=id,product_code,name,brand,category,status,stock_status,stock_quantity,low_stock_threshold,updated_at&limit=5000'),
    supabaseFetch(`rfq_request_items?select=id,rfq_request_id,product_id,name,brand,category,quantity,unit,quoted_unit_price,quoted_line_total,created_at&created_at=gte.${encodeURIComponent(startIso)}&created_at=lte.${encodeURIComponent(now.toISOString())}&limit=10000`),
  ]);

  const products = await productRes.json() as Array<any>;
  const items = await itemRes.json() as Array<any>;

  const byId = new Map<string, any>();
  const byCode = new Map<string, any>();
  for (const p of products) {
    byId.set(p.id, p);
    if (p.product_code) byCode.set(String(p.product_code), p);
  }

  const productAgg = new Map<string, any>();
  const categoryAgg = new Map<string, { category: string; requestCount: number; totalQuantity: number; quotedValue: number }>();
  const rfqSet = new Set<string>();
  const trend = new Map<string, { requestedItemCount: number; rfqSet: Set<string>; quotedValue: number }>();

  for (const item of items) {
    const rfqId = String(item.rfq_request_id || '');
    if (rfqId) rfqSet.add(rfqId);
    const pid = String(item.product_id || '').trim();
    const matched = (pid && ((isUuid(pid) && byId.get(pid)) || byCode.get(pid))) || null;

    const name = matched?.name || asText(item.name, 'Unnamed item');
    const category = asText(matched?.category || item.category, 'Uncategorized');
    const brand = asText(matched?.brand || item.brand, '');
    const qty = asNum(item.quantity);
    const quoted = asNum(item.quoted_line_total);
    const key = matched ? `matched:${matched.id}` : `unmatched:${name.toLowerCase()}::${category.toLowerCase()}`;

    if (!productAgg.has(key)) {
      productAgg.set(key, {
        key, matched: Boolean(matched), productId: matched?.id || null, productCode: matched?.product_code || null,
        name, category, brand, stockStatus: matched?.stock_status || 'unknown', stockQuantity: matched?.stock_quantity ?? null,
        lowStockThreshold: matched?.low_stock_threshold ?? null, requestCount: 0, totalQuantity: 0, quotedValue: 0,
      });
    }
    const row = productAgg.get(key)!;
    row.requestCount += 1;
    row.totalQuantity += qty;
    row.quotedValue += quoted;

    if (!categoryAgg.has(category)) categoryAgg.set(category, { category, requestCount: 0, totalQuantity: 0, quotedValue: 0 });
    const c = categoryAgg.get(category)!;
    c.requestCount += 1;
    c.totalQuantity += qty;
    c.quotedValue += quoted;

    const day = String(item.created_at || '').slice(0, 10);
    if (day) {
      if (!trend.has(day)) trend.set(day, { requestedItemCount: 0, rfqSet: new Set<string>(), quotedValue: 0 });
      const t = trend.get(day)!;
      t.requestedItemCount += 1;
      if (rfqId) t.rfqSet.add(rfqId);
      t.quotedValue += quoted;
    }
  }

  const productRows = [...productAgg.values()];
  const categoryRows = [...categoryAgg.values()].sort((a, b) => b.requestCount - a.requestCount);
  const quotedProducts = [...productRows].filter((x) => x.quotedValue > 0).sort((a, b) => b.quotedValue - a.quotedValue).slice(0, 10);
  const quotedCategories = [...categoryRows].filter((x) => x.quotedValue > 0).sort((a, b) => b.quotedValue - a.quotedValue).slice(0, 10);
  const risk = productRows.filter((x) => ['low_stock', 'out_of_stock', 'backorder', 'unknown'].includes(x.stockStatus));

  return {
    range,
    kpis: {
      totalRequestedItems: items.length,
      uniqueRequestedItems: productRows.length,
      uniqueRequestedCategories: categoryRows.length,
      rfqsWithDemand: rfqSet.size,
      quotedProductValue: productRows.reduce((s, r) => s + r.quotedValue, 0),
      requestedLowStock: productRows.filter((r) => r.stockStatus === 'low_stock').length,
      requestedOutBackorder: productRows.filter((r) => ['out_of_stock', 'backorder'].includes(r.stockStatus)).length,
      requestedUnknownStock: productRows.filter((r) => r.stockStatus === 'unknown').length,
      unmatchedRequestedItems: productRows.filter((r) => !r.matched).length,
    },
    topRequestedItems: [...productRows].sort((a, b) => b.requestCount - a.requestCount).slice(0, 15),
    topRequestedCategories: categoryRows.slice(0, 10),
    topQuotedProducts: quotedProducts,
    topQuotedCategories: quotedCategories,
    inventoryRisk: [...risk].sort((a, b) => b.requestCount - a.requestCount),
    insights: {
      mostRequestedCategory: categoryRows[0]?.category || 'n/a',
      unknownStockDemanded: productRows.filter((r) => r.stockStatus === 'unknown').length,
      outBackorderDemanded: productRows.filter((r) => ['out_of_stock', 'backorder'].includes(r.stockStatus)).length,
      topQuotedDemand: quotedProducts[0] ? { name: quotedProducts[0].name, value: quotedProducts[0].quotedValue } : null,
      unmatchedExists: productRows.some((r) => !r.matched),
    },
    trends: [...trend.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([date, v]) => ({ date, requestedItemCount: v.requestedItemCount, rfqCount: v.rfqSet.size, quotedValue: v.quotedValue })),
  };
}
