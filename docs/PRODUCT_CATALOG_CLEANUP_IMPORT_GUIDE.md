# PRODUCT_CATALOG_CLEANUP_IMPORT Guide (Phase P3.2)

## Purpose
This CSV is for **rename cleanup only**.

- Import only after P3 products are already created.
- Use only `docs/PRODUCT_CATALOG_CLEANUP_IMPORT.csv`.
- Do **not** use `docs/PRODUCT_CATALOG_CLEANUP_RECOMMENDATIONS.csv` as an import file.
- Do **not** use `docs/PRODUCT_CATALOG_DUPLICATE_GROUPS.csv` as an import file.

## Safety note from importer behavior
`lib/server/products-csv.ts` maps blank text fields to `null` during updates. In other words, blank CSV values can clear existing data on update. Therefore this cleanup import uses full current row values for included records and avoids partial update rows.

## Admin import steps
1. Choose `PRODUCT_CATALOG_CLEANUP_IMPORT.csv`
2. Dry run ON
3. Create missing products OFF
4. Run import
5. Expected result for this prepared file: **Total rows 4, Valid rows 4, Would update 4, Would create 0, Invalid 0, Skipped 0**
6. If result matches, Dry run OFF
7. Keep Create missing products OFF
8. Run import once

## Held rows (not included)
The following approved rename candidates were held because current full rows could not be safely reconstructed from repository sources without guessing:

- `old-ready-cable-sm-lclc-80m-14130646`
- `old-ready-cable-sm-lclc-15m-14130642`
- `old-ready-cable-sm-lclc-20m-14130643`
- `old-fiber-enclosure-12-core-china-0`
- `old-utp-cat-6-patch-cord-305-meter-23awg-solid`

## After import QA
- Search HPE
- Search Ready Cable
- Search Fiber Enclosure
- Search CAT6
- Search Fiber Connectors
- Confirm names changed (for included rows)
- Confirm price references still appear
- Confirm images still appear
- Confirm Add to RFQ still works
- Confirm RFQ basket reference metadata still works
