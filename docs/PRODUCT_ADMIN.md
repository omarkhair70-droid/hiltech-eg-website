# Product Admin Foundation (Phase 25C.1)

## Purpose
Phase 25C.1 introduces a safe backend foundation for product catalog management in Supabase while preserving current public behavior.

## What is included
- New table: `public.products`
- Product seed migration from static catalog source
- Server-only admin helper functions for future UI phase

## What is intentionally not switched yet
- `/products-partners` remains static-content driven in Phase 25C.1.
- No public DB read switch in this phase.
- No product image upload/storage workflow in this phase.
- No pricing/inventory UI in this phase.

## Product identity and RFQ continuity
- `product_code` is mapped to legacy static product IDs.
- This keeps logical identity stable for RFQ flows that currently use product item IDs.

## Image path convention
- `image_path` values should reference public assets (example: `/products/fiber-leviton-om3.png`).
- Existing product images under `/public/products` remain unchanged.

## Migrations
1. `supabase/migrations/20260501182000_create_products.sql`
2. `supabase/migrations/20260501183000_seed_products_from_static.sql`

## Seed source
- Static source files:
  - `content/products.ts`
  - `content/product-visuals.ts`
- Generator script:
  - `scripts/generate-product-seed.mjs`

## Server-side helper module
- `lib/server/products-admin.ts`

Prepared helper APIs:
- `listProductsAdmin(filters)`
- `getProductAdmin(idOrProductCode)`
- `createProductAdmin(payload)`
- `updateProductAdmin(id, payload)`
- `updateProductStatus(id, status)`

## Environment
Required:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional future (not required in 25C.1):
- `PRODUCTS_DB_ENABLED`
- `PRODUCTS_DB_PUBLIC_MODE`

## Security notes
- Service role key remains server-only.
- No client-side Supabase admin writes.
- RLS is enabled; public write policies are not added in this phase.
