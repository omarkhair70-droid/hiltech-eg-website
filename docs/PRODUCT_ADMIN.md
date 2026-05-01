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

## Phase 25C.2 Product Admin UI

### Admin routes
- `/admin/products` (list + filter + summary)
- `/admin/products/new` (create)
- `/admin/products/[id]` (edit/status)

### Access and security
- Admin session is required for all product admin routes.
- Unauthenticated users are redirected to `/admin/login`.
- Product admin writes use server-only helpers and keep `SUPABASE_SERVICE_ROLE_KEY` server-side.

### Product create/edit notes
- Required fields: `product_code`, `name`, `slug`, `category`.
- `status` values: `active`, `hidden`, `archived`.
- `image_path` must be empty or start with `/products/` (example: `/products/example.png`).
- Image upload/storage is not included in this phase.

### Public catalog behavior
- Public `/products-partners` remains static in Phase 25C.2.
- DB-backed public read remains planned for Phase 25C.3.

## Phase 25C.3 Public catalog DB read with static fallback

### New public catalog mode flag
- `PRODUCTS_DB_PUBLIC_MODE=static` (default): `/products-partners` uses static catalog only.
- `PRODUCTS_DB_PUBLIC_MODE=db_with_fallback`: `/products-partners` attempts server-side Supabase read for public catalog.

### Fallback behavior
When `PRODUCTS_DB_PUBLIC_MODE=db_with_fallback`, the public catalog falls back to static catalog if:
- Supabase env vars are missing,
- Supabase query fails,
- or DB returns zero active products.

Fallback is permanent and intentional for resilience.

### Admin/public visibility rules
In DB mode:
- only `status='active'` products are shown publicly,
- `hidden` and `archived` products are excluded from `/products-partners`.

Admin edits to name/specs/use case/image path appear on the public page only when DB mode is enabled.

### Deploy note
After updating `PRODUCTS_DB_PUBLIC_MODE` in Vercel, trigger a redeploy so the new mode is applied consistently.
