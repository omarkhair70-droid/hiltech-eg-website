ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS stock_status text NOT NULL DEFAULT 'unknown',
  ADD COLUMN IF NOT EXISTS stock_quantity integer,
  ADD COLUMN IF NOT EXISTS low_stock_threshold integer,
  ADD COLUMN IF NOT EXISTS inventory_notes text,
  ADD COLUMN IF NOT EXISTS last_stock_checked_at timestamptz;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'products_stock_status_check'
      AND conrelid = 'public.products'::regclass
  ) THEN
    ALTER TABLE public.products
      ADD CONSTRAINT products_stock_status_check
      CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock', 'backorder', 'unknown'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'products_stock_quantity_non_negative_check'
      AND conrelid = 'public.products'::regclass
  ) THEN
    ALTER TABLE public.products
      ADD CONSTRAINT products_stock_quantity_non_negative_check
      CHECK (stock_quantity IS NULL OR stock_quantity >= 0);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'products_low_stock_threshold_non_negative_check'
      AND conrelid = 'public.products'::regclass
  ) THEN
    ALTER TABLE public.products
      ADD CONSTRAINT products_low_stock_threshold_non_negative_check
      CHECK (low_stock_threshold IS NULL OR low_stock_threshold >= 0);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS products_stock_status_idx ON public.products (stock_status);
