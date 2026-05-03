import 'server-only';

import { PRODUCT_STATUSES, PRODUCT_STOCK_STATUSES, type ProductAdminFilters, type ProductAdminWritePayload, type ProductRow, type ProductStatus } from '@/lib/types/products';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

async function supabaseFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${getBaseUrl()}/rest/v1/${path}`, {
    ...init,
    headers: { ...getHeaders(), ...(init?.headers ?? {}) },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Supabase products request failed: ${response.status} ${await response.text()}`);
  }

  return response;
}

export function isProductsAdminBackendConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

export async function listProductsAdmin(filters: ProductAdminFilters = {}): Promise<ProductRow[]> {
  const params = new URLSearchParams({
    select: '*',
    order: 'sort_order.asc.nullslast,created_at.asc',
    limit: String(filters.limit ?? 250),
  });

  if (filters.status && PRODUCT_STATUSES.includes(filters.status)) params.set('status', `eq.${filters.status}`);
  if (filters.category) params.set('category', `eq.${filters.category}`);
  if (filters.stock_status && PRODUCT_STOCK_STATUSES.includes(filters.stock_status)) params.set('stock_status', `eq.${filters.stock_status}`);
  if (filters.brand) params.set('brand', `eq.${filters.brand}`);
  if (filters.search) {
    const value = filters.search.replace(/,/g, ' ').trim();
    if (value) params.set('or', `(product_code.ilike.*${value}*,name.ilike.*${value}*,slug.ilike.*${value}*)`);
  }

  const response = await supabaseFetch(`products?${params.toString()}`);
  return await response.json() as ProductRow[];
}

export async function getProductAdmin(idOrProductCode: string): Promise<ProductRow | null> {
  const encoded = idOrProductCode.replace(/,/g, ' ').trim();
  const params = new URLSearchParams({
    select: '*',
    limit: '1',
    or: `(id.eq.${encoded},product_code.eq.${encoded})`,
  });

  const response = await supabaseFetch(`products?${params.toString()}`);
  const rows = await response.json() as ProductRow[];
  return rows[0] ?? null;
}

export async function createProductAdmin(payload: ProductAdminWritePayload): Promise<ProductRow> {
  const response = await supabaseFetch('products', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  });
  const rows = await response.json() as ProductRow[];
  const row = rows[0];
  if (!row) throw new Error('Product create failed: missing created row');
  return row;
}

export async function updateProductAdmin(id: string, payload: Partial<ProductAdminWritePayload>): Promise<ProductRow> {
  const response = await supabaseFetch(`products?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  });
  const rows = await response.json() as ProductRow[];
  const row = rows[0];
  if (!row) throw new Error('Product update failed: product not found or no changes returned');
  return row;
}

export async function updateProductStatus(id: string, status: ProductStatus): Promise<ProductRow> {
  if (!PRODUCT_STATUSES.includes(status)) throw new Error('Invalid product status value');
  return updateProductAdmin(id, { status });
}
