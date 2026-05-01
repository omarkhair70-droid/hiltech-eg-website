export const PRODUCT_STATUSES = ['active', 'hidden', 'archived'] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

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
}

export interface ProductAdminFilters {
  status?: ProductStatus;
  category?: string;
  brand?: string;
  search?: string;
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
}
