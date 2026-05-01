-- Phase 25C.1: Product catalog database foundation

CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code text NOT NULL UNIQUE,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  category_slug text,
  brand text,
  short_specs text,
  use_case text,
  description text,
  image_path text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'archived')),
  sort_order integer,
  is_featured boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'seed_static',
  price_note text,
  availability_note text,
  datasheet_url text,
  technical_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_status_category_brand_sort
  ON public.products (status, category, brand, sort_order);

CREATE INDEX IF NOT EXISTS idx_products_product_code ON public.products (product_code);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);

CREATE OR REPLACE FUNCTION public.set_products_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_products_set_updated_at ON public.products;
CREATE TRIGGER trg_products_set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.set_products_updated_at();

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.products IS 'Phase 25C.1 product catalog source of truth for admin-managed products (public catalog still static in this phase).';
COMMENT ON COLUMN public.products.product_code IS 'Logical product identity preserved from static catalog IDs for RFQ continuity.';
COMMENT ON COLUMN public.products.image_path IS 'Public path such as /products/*.png; uploads/storage are out of scope for Phase 25C.1.';
COMMENT ON COLUMN public.products.status IS 'active = visible candidate, hidden = temporarily not listed, archived = retired.';
