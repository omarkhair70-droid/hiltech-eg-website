export const PRODUCT_STATUSES = ['active', 'hidden', 'archived'] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export const PRODUCT_STOCK_STATUSES = ['in_stock', 'low_stock', 'out_of_stock', 'backorder', 'unknown'] as const;

export type ProductStockStatus = (typeof PRODUCT_STOCK_STATUSES)[number];

export interface ProductRow {
  id: string;
  product_code: string;
  name: string;
  slug: string;
  category: string;
  category_slug: string | null;
  brand: string | null;
  short_specs: string | null;
  use_case: string | null;
  description: string | null;
  image_path: string | null;
  status: ProductStatus;
  sort_order: number | null;
  is_featured: boolean;
  source: string;
  price_note: string | null;
  availability_note: string | null;
  datasheet_url: string | null;
  technical_notes: string | null;
  created_at: string;
  updated_at: string;
  stock_status: ProductStockStatus;
  stock_quantity: number | null;
  low_stock_threshold: number | null;
  inventory_notes: string | null;
  last_stock_checked_at: string | null;
}

export interface ProductAdminFilters {
  status?: ProductStatus;
  category?: string;
  brand?: string;
  search?: string;
  stock_status?: ProductStockStatus;
  limit?: number;
}

export interface ProductAdminWritePayload {
  product_code: string;
  name: string;
  slug: string;
  category: string;
  category_slug?: string | null;
  brand?: string | null;
  short_specs?: string | null;
  use_case?: string | null;
  description?: string | null;
  image_path?: string | null;
  status?: ProductStatus;
  sort_order?: number | null;
  is_featured?: boolean;
  source?: string;
  price_note?: string | null;
  availability_note?: string | null;
  datasheet_url?: string | null;
  technical_notes?: string | null;
  stock_status?: ProductStockStatus;
  stock_quantity?: number | null;
  low_stock_threshold?: number | null;
  inventory_notes?: string | null;
  last_stock_checked_at?: string | null;
}
