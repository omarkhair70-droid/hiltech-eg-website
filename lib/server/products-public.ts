import 'server-only';

import { productVisuals } from '@/content/product-visuals';
import { products as staticProducts, type ProductItem } from '@/content/products';
import type { ProductRow } from '@/lib/types/products';

export type PublicProductsSource = 'static' | 'db' | 'fallback';

export interface PublicProductsResult {
  products: ProductItem[];
  source: PublicProductsSource;
  count: number;
}

type ProductsDbPublicMode = 'static' | 'db_with_fallback';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const visualsByProductId = new Map(productVisuals.map((visual) => [visual.productId, visual]));

function getPublicMode(): ProductsDbPublicMode {
  return process.env.PRODUCTS_DB_PUBLIC_MODE === 'db_with_fallback' ? 'db_with_fallback' : 'static';
}

function getStaticResult(source: PublicProductsSource): PublicProductsResult {
  return { products: staticProducts, source, count: staticProducts.length };
}

function mapDbRowToProduct(row: ProductRow): ProductItem {
  const fallbackVisual = visualsByProductId.get(row.product_code);

  return {
    id: row.product_code,
    name: row.name,
    category: row.category as ProductItem['category'],
    brand: row.brand ?? 'Generic / Multi-brand',
    shortSpecs: row.short_specs ?? 'Specifications available upon request.',
    useCase: row.use_case ?? 'Project supply support.',
    image: row.image_path ?? fallbackVisual?.imagePath ?? '',
  };
}

async function listPublicDbProducts(): Promise<ProductItem[]> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Supabase env vars are not configured for public products mode.');

  const params = new URLSearchParams({
    select: 'product_code,name,category,brand,short_specs,use_case,image_path,status,sort_order',
    status: 'eq.active',
    order: 'sort_order.asc.nullslast,name.asc,product_code.asc',
    limit: '500',
  });

  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/products?${params.toString()}`, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Supabase public products fetch failed: ${response.status} ${await response.text()}`);
  }

  const rows = await response.json() as ProductRow[];
  return rows.filter((row) => row.status === 'active').map(mapDbRowToProduct);
}

export async function getPublicProducts(): Promise<PublicProductsResult> {
  const mode = getPublicMode();
  if (mode === 'static') return getStaticResult('static');

  try {
    const dbProducts = await listPublicDbProducts();
    if (dbProducts.length === 0) return getStaticResult('fallback');
    return { products: dbProducts, source: 'db', count: dbProducts.length };
  } catch (error) {
    console.error('Public products: DB fetch failed, using static fallback.', error);
    return getStaticResult('fallback');
  }
}
