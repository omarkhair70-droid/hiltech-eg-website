# Product Catalog Pricing & Completion Audit (Phase P1)

Date: 2026-05-08

## Scope and safety checks

This audit reviewed current product catalog implementation and seed/static assets without changing RFQ logic, API behavior, auth, search/filtering, analytics, or migrations.

## Inspected product system

- `lib/types/products.ts`
- `lib/server/products-csv.ts`
- `lib/server/products-public.ts`
- `app/products-partners/page.tsx`
- `app/products-partners/ProductsClient.tsx`
- `supabase/migrations/20260501182000_create_products.sql`
- `supabase/migrations/20260501183000_seed_products_from_static.sql`
- `supabase/migrations/20260503110000_add_product_inventory_fields.sql`
- `scripts/generate-product-seed.mjs`
- `content/products.ts`
- `content/product-visuals.ts`
- `public/products/*`

## Summary of current product data source

- Public products page currently resolves from static catalog by default (`PRODUCTS_DB_PUBLIC_MODE=static`) with optional DB mode + fallback to static.  
- Static source of truth for catalog cards: `content/products.ts` (+ visuals in `content/product-visuals.ts`).
- DB table `public.products` exists and includes `price_note` and `availability_note` fields, but public catalog cards currently show a generic message (`Price and availability upon request`) rather than row-level `price_note`.

## Current product count (discoverable)

- Static product count discovered in `content/products.ts`: **38 products**.
- Seed migration generated from static also maps the same product identifiers/order.

## Category breakdown (38 total)

- Fiber Optic Systems: 9
- Patch Cords & Connectivity: 6
- Faceplates / Keystone / RJ45: 6
- Copper / CAT6 Cabling: 5
- Cabinets / Racks / PDU: 5
- CCTV & Security: 4
- Cable Management / Duct Systems: 3

## Price readiness findings

- `price_note` field exists in the product type and DB schema.
- CSV import/export supports `price_note` (and `availability_note`) through `PRODUCT_CSV_COLUMNS`.
- Static source (`content/products.ts`) has no `price_note` values because pricing metadata is DB/admin CSV driven.
- Seed migration does not set `price_note` values.

**Exact product prices were not found in the repository. price_note values require user-provided pricing.**

## Products missing `price_note`

Catalog-wide in current seed/static context, all 38 products should be treated as missing confirmed `price_note` values until user-provided pricing notes are supplied via admin/CSV import.

## Products missing images

- No missing product images detected for the 38 known products:
  - all product IDs have visual mappings in `content/product-visuals.ts`
  - mapped image files exist under `public/products`

## Products with unknown availability

- Availability at row level is not present in static catalog source.
- Inventory migration adds `stock_status` with default `unknown`; template should preserve this unless verified stock data exists.

## Potential missing products from existing assets/static data

- No clear candidate missing products were found.
- `content/products.ts` IDs, `content/product-visuals.ts` IDs, and `/public/products/*` file set appear aligned for current catalog scope.

## Candidate products to add

No safe candidates identified from existing static seed/assets in this repository snapshot.

## Public display & RFQ context checks

- Public card UI currently uses generic text: “Price and availability upon request”.
- Category intelligence listing also uses the same generic note.
- RFQ basket stores item identity/spec/quantity/notes; it does not surface `price_note` directly.

## Admin CSV support checks

- CSV export includes `price_note`, `availability_note`, and inventory fields.
- CSV import validates and accepts `price_note` updates and supports optional create-missing behavior.
- Import-ready template has been generated for current products in `docs/PRODUCT_PRICE_IMPORT_TEMPLATE.csv`.

## Recommended pricing approach

- Use `price_note` for display notes and RFQ context (e.g., “Price on request”, “Budgetary range available upon scope confirmation”), not numeric checkout pricing.
- Keep pricing operationally in admin/CSV workflows with explicit client confirmation.

## Risk note

- Do not add exact prices unless confirmed by the user/client.
- Avoid fabricating numeric prices or unverified stock claims.
