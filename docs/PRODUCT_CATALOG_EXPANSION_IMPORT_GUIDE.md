# Product Catalog Expansion Import Guide (Phase P3)

## Scope
- Import **READY** rows only from `docs/PRODUCT_CATALOG_EXPANSION_READY.csv`.
- **Do NOT import** `docs/PRODUCT_CATALOG_EXPANSION_NEEDS_REVIEW.csv`.

## Import steps (Admin)
1. Select `PRODUCT_CATALOG_EXPANSION_READY.csv`.
2. Set **Dry run = ON**.
3. Set **Create missing products = ON**.
4. Run import.
5. Verify dry-run counts match expectations (new creates should equal ready rows: **43**).
6. Re-run with **Dry run = OFF** and **Create missing products = ON**.

## Expected results
- Creates only the safe candidate products with suitable existing image mapping.
- Price fields remain as **Price reference** text (`price_note`) from old-site capture; no computed totals.
- Repeated import updates by `product_code` and should not create duplicates.

## Why some products are held back
- Rows in `PRODUCT_CATALOG_EXPANSION_NEEDS_REVIEW.csv` are intentionally blocked due to missing or uncertain image mapping and require manual confirmation.

## Manual QA checklist
- Product cards render image and name correctly.
- Price area shows **Price reference** when `price_note` exists.
- Add to RFQ still works.
- RFQ basket shows **Reference** only (no totals/checkout).
- Mobile cards/layout remain stable.
