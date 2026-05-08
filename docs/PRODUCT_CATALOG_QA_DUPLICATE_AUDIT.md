# Product Catalog QA Duplicate & Cleanup Audit (Phase P3.1)

## Executive summary
This is an **audit-only** pass across the expected post-expansion catalog (original catalog + P3 ready import). No product data, runtime behavior, admin/API/RFQ/search logic, schema, or migrations were changed.

### Expected catalog count reviewed
- Original public catalog: **38**
- P3 ready imported products: **43**
- Expected public catalog after import: **81**
- Working template rows reviewed: **82** (includes one extra planning row from import template set requiring human reconciliation before cleanup execution).

### Totals (audit findings)
- Total suspected duplicate/near-duplicate groups: **12**
- Total generic-vs-specific conflicts: **3**
- Total repeated image groups: **11**
- Total products with exact images (from P3 image audit): **6**
- Total products using generic/category images: **37**
- Total products recommended to keep active: **2**
- Total products recommended for rename: **9**
- Total products recommended for archive/draft review: **1**
- Total products needing better images: **3**

## Method
Sources reviewed:
- `content/products.ts`
- `docs/PRODUCT_PRICE_IMPORT_TEMPLATE.csv`
- `docs/OLD_SITE_PRODUCT_PRICE_SOURCE.csv`
- `docs/PRODUCT_CATALOG_MATCH_MATRIX.md`
- `docs/PRODUCT_CATALOG_EXPANSION_READY.csv`
- `docs/PRODUCT_CATALOG_EXPANSION_NEEDS_REVIEW.csv`
- `docs/PRODUCT_CATALOG_IMAGE_MAPPING_AUDIT.md`
- `public/products/*`

The expected live set was reconstructed using original catalog + ready import data, then evaluated for overlap risk in naming, family/spec collisions, image reuse clusters, and category fit.

## Duplicate / near-duplicate issue groups
| Group ID | Type | Classification | Primary Product | Related Products | Recommendation | Priority |
|---|---|---|---|---|---|---|
| G01 | generic_vs_specific_sku | rename_generic_parent | patch-hpe-flex-om4 | old-hpe-premier-flex-lc-lc-multi-mode-om4-2-fiber-15m-cable-, old-hpe-premier-flex-lc-lc-multi-mode-om4-2-fiber-2m-cable-q | Keep all, rename generic as on-request parent | P0 |
| G02 | near_duplicate_variant | keep_all_variants | patch-fiber-lclc-om3 | old-fiber-optic-patch-cord-lc-lc-multi-mode-om3-simplex-3-meter-0 | Keep both but normalize generic-vs-fixed-length wording | P1 |
| G03 | near_duplicate_variant | needs_human_review | patch-lclc-3m | old-fiber-optic-patch-cord-lc-lc-multi-mode-om3-simplex-3-meter-0 | Decide whether generic 3m item should remain distinct | P1 |
| G04 | near_duplicate_variant | merge_or_replace_candidate | copper-cat6-patch | old-utp-cat-6-patch-cord-305-meter-23awg-solid | Naming implies conflict (patch vs bulk cable) | P0 |
| G05 | category_overlap | needs_human_review | old-fiber-optic-fusion-splicer-machine-0 | fiber-splice-trays | Validate category intent (tooling/equipment vs passive materials) | P1 |
| G06 | naming_conflict | rename_generic_parent | old-fiber-enclosure-12-core-china-0 | fiber-enclosure-24-core-china | Normalize enclosure family naming | P1 |
| G08 | generic_vs_specific_sku | rename_generic_parent | fiber-lc-sc-connectors | old-fiber-optic-lc-connector-0, old-fiber-optic-sc-connector-0 | Keep generic plus specific variants with clearer parent naming | P1 |
| G09 | generic_vs_specific_sku | rename_generic_parent | fiber-pigtail-lc-sc | old-fiber-optic-pigtail-lc-multi-mode-om3-simplex-3-meter-0 | Keep all; explicitly mark generic as model/length-on-request | P1 |
| G11 | naming_conflict | rename_generic_parent | old-ready-cable-sm-lclc-80m-14130646 | old-ready-cable-sm-lclc-15m-14130642, old-ready-cable-sm-lclc-20m-14130643 | Normalize uppercase/token order while preserving model numbers | P0 |

## Generic vs specific SKU conflicts (detailed)
| Generic product | Specific SKU products | Conflict reason | Recommendation |
|---|---|---|---|
| patch-hpe-flex-om4 — HPE Premier Flex LC/LC Multi-mode OM4 | old-hpe-premier-flex-lc-lc-multi-mode-om4-2-fiber-15m-cable-, old-hpe-premier-flex-lc-lc-multi-mode-om4-2-fiber-2m-cable-q | Generic request-only item appears beside priced fixed-length SKUs | Keep all; rename generic to “Length/Model on Request” |
| fiber-lc-sc-connectors — LC / SC Connectors | old-fiber-optic-lc-connector-0, old-fiber-optic-sc-connector-0 | Combined generic row overlaps atomic connector items | Keep all for procurement flexibility; rename generic parent |
| fiber-pigtail-lc-sc — Pigtail LC / SC | old-fiber-optic-pigtail-lc-multi-mode-om3-simplex-3-meter-0 | Generic pigtail scope overlaps fixed OM3 simplex length SKU | Keep all; distinguish parent as multi-model/on-request |

## Price consistency findings
- `patch-hpe-flex-om4` is still request-only while sibling HPE fixed-length SKUs have price references; recommend policy decision + naming clarification before promotion.
- “Patch cord” vs “305m cable” naming mismatch can cause false price comparison (`copper-cat6-patch` vs `old-utp-cat-6-patch-cord-305-meter-23awg-solid`).
- No missing-price invention is proposed; items without source-backed pricing remain request/confirmation candidates.

## Image repetition and confidence
From `PRODUCT_CATALOG_IMAGE_MAPPING_AUDIT.md`:
- Repeated image clusters detected: **11**
- Exact image matches: **6**
- Acceptable generic-family matches: **37**

### Repeated image groups (priority subset)
| Image URL | Cluster size | Example products | Recommendation |
|---|---:|---|---|
| /products/patch-fiber-lclc-om3.png | 5 | OM3/SM patch family variants | acceptable (family-level) |
| /products/patch-fiber-lclc-os2.png | 4 | OS2 and ready cable variants | should be reviewed before promotion |
| /products/fp-single-faceplate.png | 4 | faceplate/keystone/RJ45 accessory mix | needs better product-specific image |
| /products/copper-cat6-patch.png | 4 | copper patch/cable family rows | okay for now but low priority |
| /products/patch-hpe-flex-om4.png | 2 | HPE generic + fixed SKU | acceptable short-term; clarify names first |

## Product naming cleanup candidates
Recommended naming patterns (do not auto-apply yet):
- `HPE Premier Flex LC/LC OM4 (Length/Model on Request)`
- `Ready Cable SM LC/LC In/Out 80m (14130646)`
- `Ready Cable SM LC/LC In/Out 20m (14130643)`
- `Ready Cable SM LC/LC In/Out 15m (14130642)`
- `Fiber Enclosure 12 Core (China)`
- `Fiber Enclosure 24 Core (China)`
- `UTP CAT6 Cable 305m, 23AWG Solid`

## Category QA flags
- `old-fiber-optic-fusion-splicer-machine-0`: confirm it should remain under Fiber Optic Systems (could warrant a tools/equipment sub-bucket in future taxonomy).
- Copper cable/patch naming set: verify that bulk cable rows are not discoverability-confused with patch cords.

## Priority cleanup plan
### P0 (must fix before promotion)
1. Resolve HPE generic-vs-specific naming clarity.
2. Normalize “READY CABLE …” family naming.
3. Correct copper patch vs 305m bulk cable naming ambiguity.

### P1 (should fix soon)
1. Decide on generic 3m LC/LC coexistence with specific 3m OM3 item.
2. Normalize connector/pigtail generic parent labels.
3. Review fusion splicer category fit.
4. Improve faceplate/keystone image specificity where confusion risk is higher.

### P2 (acceptable now)
1. Keep family-level shared images where technical distinction is clear in names.
2. Retain generic parent SKUs for RFQ/procurement flexibility.

### P3 (future polish)
1. Introduce sub-families/tags for better faceted search (length, mode, connector, armor).
2. Expand exact-product imagery library for high-traffic families.

## Final cleanup decision notes
- This phase intentionally avoids automatic catalog cleanup.
- Recommended next step: user reviews `PRODUCT_CATALOG_CLEANUP_RECOMMENDATIONS.csv` and `PRODUCT_CATALOG_DUPLICATE_GROUPS.csv`, then approves a controlled rename/archive/image pass.
- Prefer **archive/draft review** over deletion for ambiguous overlaps.
