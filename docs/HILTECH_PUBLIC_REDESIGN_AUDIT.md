# HILTECH Public Website Redesign Audit & Action Plan

## 1) Executive Diagnosis

The public website currently communicates real technical capability, but it still feels assembled from multiple phases instead of designed as one clear client journey.

### Core issues
- **Unclear public journey:** users can reach Solutions, Services, Products, Resources, Contact, RFQ, and Track quickly, but the “best next step” is not consistently obvious on each page.
- **Too many competing CTAs:** “Start RFQ”, “Browse Products”, “Resources”, “Contact”, and other actions often appear together, reducing decision clarity.
- **Homepage identity weakness:** homepage has good building blocks, but it can still feel like stacked modules rather than one premium story arc.
- **Excessive text/box density:** several pages use many bordered blocks/cards with similar visual weight, causing scanning fatigue.
- **Weak visual hierarchy in long pages:** multiple sections compete with similar typography/button emphasis.
- **Inconsistent Arabic/English use:** bilingual support exists, but usage is sometimes repetitive or inconsistent in placement and tone.
- **Proof/references integration is not elegant enough:** field proof is present, but references and proof context can feel appended instead of curated.
- **Products-to-RFQ flow can be smoother:** catalog-first direction is correct, but conversion path should be more explicit and calmer.
- **Mobile risk areas:** sticky header + search + basket + CTA density can compete for space and cognitive load.

### Scope confirmation
- **/admin and all admin/API/data systems are out of scope for redesign.**
- This document is **planning-only** and does not request backend, schema, or behavior changes.

---

## 2) Current Site Map (Public Routes) and Recommendation

| Route | Current intended purpose | Recommendation |
|---|---|---|
| `/` | Brand entry + pathways to solutions, products, work proof, RFQ | **Redesign** (structure + hierarchy; keep intent) |
| `/solutions` | Outcome-oriented solution pathways | **Simplify + redesign** |
| `/solutions/[slug]` | Detailed solution narrative and scope context | **Keep + simplify** |
| `/products-partners` | Catalog-first browsing with search/filter and RFQ basket flow | **Keep + simplify** |
| `/products-partners/[slug]` | Category/product intelligence and scoped details | **Keep + simplify** |
| `/services` | Delivery/service capability presentation | **Redesign** (reduce overlap with Solutions) |
| `/resources` | Resource hub for RFQ prep and sales/supporting assets | **Simplify + deprioritize in primary flow** |
| `/work` | Field proof and reference visuals | **Redesign** (become premium proof page) |
| `/contact` | Contact options + RFQ direction + non-RFQ form | **Keep + simplify** |
| `/rfq` | RFQ basket review and submission workflow | **Keep** |
| `/track` | RFQ status lookup | **Keep (utility page, not primary marketing destination)** |
| `/scope-finder` | Guided scope helper for uncertain visitors | **Keep + deprioritize from primary header** |
| `/about` (if public) | Company information | **Deprioritize from top nav (footer/secondary)** |

### Main-nav visibility recommendation
- Keep in header: **Solutions, Products, Services, Work, Contact**.
- Utility/secondary: **Resources, Track RFQ, Scope Finder**.

---

## 3) Ideal Public Journey

### A) Procurement / client flow
**Home → Products → Add to RFQ → Submit requirements → Track RFQ**

Design requirements:
- Products page must always expose RFQ basket state clearly.
- RFQ submission expectations must be explicit (required details, response expectation).
- Track RFQ should be a clear post-submission endpoint.

### B) Project owner / decision-maker flow
**Home → Solutions/Services → Work proof → Contact or RFQ**

Design requirements:
- Solutions explain business outcome; Services explain delivery execution.
- Work proves credibility with field visuals and structured evidence.
- Contact offers consultation path; RFQ offers formal procurement path.

### C) Quick visitor flow
**Search → product/solution page → WhatsApp/Contact/RFQ**

Design requirements:
- Search is fast-entry utility, not dominant branding element.
- Landing pages must present a clear next action in first viewport.

---

## 4) Navigation Recommendation (Final Header Direction)

### Desktop header
- **Logo** (left)
- **Primary nav labels:**
  1. Solutions
  2. Products
  3. Services
  4. Work
  5. Contact
- **Utility controls (right, lower emphasis):**
  - Search (icon/button style, visually quiet)
  - RFQ Basket (count badge)
- **Single primary CTA:** `Start RFQ`

### Mobile header
- Top row: logo + search trigger + menu.
- Drawer order:
  1. Solutions
  2. Products
  3. Services
  4. Work
  5. Contact
  6. Resources (secondary)
  7. Track RFQ (secondary)
  8. Scope Finder (secondary)
- One high-emphasis action in drawer footer: `Start RFQ`.

### Language rule in nav
- Keep labels in **English** for technical/procurement clarity.
- Arabic support text only where it improves comprehension (not every item).

---

## 5) Homepage Redesign Blueprint (Strict Structure)

Homepage target: short, premium, conversion-focused, and clearly B2B infrastructure.

### Section 1 — Hero
- **Purpose:** establish HILTECH positioning and primary conversion path.
- **Content direction:** infrastructure delivery + procurement readiness in Egypt.
- **CTA rule:** Primary `Browse Products`, secondary `View Field Work`, and supportive low-emphasis `Track RFQ` text link. Do **not** use `Start RFQ` inside hero when `Start RFQ` is already visible in the header.
- **Must NOT include:** fake terminal/search panel, crowded badges, large multi-CTA clusters.

### Section 2 — What HILTECH Delivers (3–4 pillars)
- **Purpose:** compress offering into quickly scannable outcomes.
- **Content direction:** structured cabling, fiber, data room, project supply.
- **CTA rule:** text link to `Solutions` only.
- **Must NOT include:** long paragraphs per pillar.

### Section 3 — Field Proof Snapshot
- **Purpose:** validate credibility with real work evidence.
- **Content direction:** curated image set + concise evidence captions.
- **CTA rule:** single CTA to `/work`.
- **Must NOT include:** large logo walls or repeated partner blocks.

### Section 4 — Catalog + RFQ Journey
- **Purpose:** explain practical path from discovery to quote.
- **Content direction:** search/filter products → basket → RFQ submission.
- **CTA rule:** single CTA to `/products-partners`.
- **Must NOT include:** duplicate “Start RFQ” buttons inside every sub-card.

### Section 5 — Trust/Delivery Principles
- **Purpose:** reassure with process discipline and delivery standards.
- **Content direction:** scope-first planning, availability confirmation, testing validation.
- **CTA rule:** optional text link to Services or Resources (not both as buttons).
- **Must NOT include:** heavy visual cards competing with core CTA.

### Section 6 — Final CTA Band
- **Purpose:** close page with one decisive action.
- **Content direction:** “Ready to request quotation?” short supporting line.
- **CTA rule:** Primary `Send Project Requirements`; secondary/text link `Contact HILTECH` or `Track RFQ`. Avoid repeating exact `Start RFQ` wording if it is already visible in the header.
- **Must NOT include:** multiple equal-priority buttons.

---

## 6) Hero Redesign Direction (3 Concepts)

## Concept A — Procurement-first
- **Headline:** `Infrastructure Supply & Delivery for Enterprise Projects in Egypt.`
- **Subcopy:** `From product selection to structured RFQ submission, HILTECH supports practical project procurement with technical clarity.`
- **Arabic support line:** `حلول بنية تحتية عملية للمشروعات مع مسار RFQ واضح وسريع.`
- **Primary CTA:** `Browse Products`
- **Secondary CTA:** `Start RFQ` (only if needed)
- **Visual direction:** premium field photo with subtle overlay + minimal KPI strip.

## Concept B — Capability-first
- **Headline:** `Design-Ready. Field-Proven. Procurement-Aligned.`
- **Subcopy:** `Structured cabling, fiber backbone, data room readiness, and project supply managed through one clear delivery approach.`
- **Arabic support line:** optional single line below subcopy.
- **Primary CTA:** `View Solutions`
- **Secondary CTA:** `Browse Products`
- **Visual direction:** editorial split layout (copy left, curated infrastructure image right).

## Concept C — Proof-first
- **Headline:** `Real Infrastructure Work, Not Template Promises.`
- **Subcopy:** `See field proof, align scope, and submit a requirements-based RFQ for your project timeline.`
- **Arabic support line:** `أعمال ميدانية فعلية ومسار واضح من النطاق إلى طلب السعر.`
- **Primary CTA:** `View Field Work`
- **Secondary CTA:** `Browse Products`
- **Visual direction:** collage of 2–3 real work images with disciplined spacing.

---

## 7) Products Page Recommendation (/products-partners)

### Keep
- Catalog-first structure.
- Search and category filtering.
- RFQ basket quantity visibility.
- Product detail/category intelligence pages.

### Simplify
- Reduce repeated explanatory notices if they push key actions below fold.
- Standardize product card density: name, key metadata, one action.
- Clarify chip behavior (active state, overflow on mobile).

### Improve journey
- Keep “Add to RFQ” as dominant card action.
- Ensure basket summary is persistent but not intrusive.
- Add single “Proceed to RFQ Review” anchor pattern when basket has items.

### Mobile behavior priorities
- Sticky/anchored filter control should not hide content.
- Card actions must remain thumb-reachable.
- Basket status should be visible without covering product grid.

---

## 8) Work Page Recommendation (/work)

### Diagnosis
- Current gallery is rich, but can feel repetitive and panel-heavy.

### Premium proof layout direction
1. Short proof intro (what this page proves).
2. Curated grouped galleries by discipline (Fiber, Rack/Data Room, Copper, Testing).
3. Evidence captions focused on outcome and standards.
4. References block near lower page (not dominant above fold).
5. One closing action (`Discuss your project` or `Start RFQ`).

### Keep / simplify
- **Keep:** real imagery and grouped categories.
- **Simplify:** number of repeated frames/borders per section.
- **Improve:** image rhythm (mixed sizes) and caption quality.

### Mobile
- 2-column image grid max where legible; avoid tiny thumbnails.
- Maintain readable captions and tap targets.

---

## 9) Solutions & Services Recommendation

### Positioning split
- **Solutions:** “What outcome you need.”
- **Services:** “How HILTECH executes delivery.”
- **Products:** “What can be supplied/spec’d.”
- **Work:** “Proof that execution happened in the field.”

### Anti-overlap rule
- Each page type should include concise cross-links but avoid duplicating full content blocks.
- Services should not restate full solution catalog; it should focus on methodology and capability proof.

---

## 10) Resources Page Recommendation

Resources should support conversion, not distract from it.

### Keep prominent
- RFQ Preparation Guide.
- Company profile content.
- Select one-pagers that directly support solution scoping.

### Deprioritize
- Internal/launch-oriented material that is not useful to public buyers.
- Redundant pages with low procurement value.

### IA recommendation
- Organize resources into 3 buckets:
  1. **Prepare RFQ**
  2. **Evaluate Capabilities**
  3. **Download/Share Materials**

---

## 11) Contact / RFQ Recommendation

- **Use RFQ when:** pricing, quantities, product selection, delivery scope, technical requirements.
- **Use Contact when:** non-quotation inquiries (profile request, partnership intro, documentation questions).
- **Use WhatsApp when:** urgent coordination, quick clarification before formal RFQ.
- **Use Track RFQ when:** request already submitted and status follow-up is needed.

### UX rule
- Contact page should actively route quote-related users to RFQ first.

---

## 12) Arabic/English Copy System

### Copy rules
- English is primary for technical accuracy and procurement clarity.
- Arabic is supportive for reassurance and accessibility.
- Avoid full bilingual duplication for every paragraph.
- Use Arabic in short assistive lines, notices, and key reassurance points.

### Good HILTECH copy examples
- **English primary:** `Submit your requirements once and receive a structured RFQ response.`
- **Arabic support:** `أرسل المتطلبات مرة واحدة وسيتم مراجعتها فنياً بشكل منظم.`

- **English primary:** `Browse products by category, then add exact quantities to your RFQ basket.`
- **Arabic support:** `استعرض الفئات وأضف الكميات المطلوبة مباشرة إلى سلة RFQ.`

---

## 13) Visual Design System Direction (No Code)

- **Spacing:** increase vertical whitespace between major sections; reduce nested padding.
- **Typography:** stronger type scale contrast for headings vs. body; limit small text usage.
- **Card style:** fewer border-heavy cards; prefer clean surfaces with occasional accent borders.
- **Buttons:** one dominant filled style, one secondary outline style, one text-link style.
- **Colors:** keep navy/orange identity but reduce simultaneous accent usage.
- **Image treatment:** prioritize authentic field imagery; consistent aspect ratios per section.
- **Grid behavior:** modular desktop grid; stacked mobile flow with controlled density.
- **Mobile behavior:** avoid multi-sticky UI collisions (header/search/basket).
- **Density rule:** each section should answer one question, not five.

---

## 14) CTA System (Strict Map)

### CTA roles
- **Primary CTA (page/section level):** `Browse Products`, `View Field Work`, or `View Solutions` (contextual to page intent)
- **Secondary CTA:** `Send Project Requirements` (used where formal RFQ conversion is expected)
- **Text link CTA:** `View Work`, `Read RFQ Guide`, `Track RFQ`, `Contact HILTECH`
- **Header CTA:** only `Start RFQ` as high-emphasis button
- **Final CTA (homepage footer band):** Primary `Send Project Requirements`; secondary/text link `Contact HILTECH` or `Track RFQ`

### When NOT to show “Start RFQ”
- Repeated in every card within same section.
- Next to another equal-priority filled CTA.
- In utility-only contexts (e.g., Track page) where task is already underway.

### Frequency control
- Max one high-emphasis RFQ CTA per section.
- Prefer text links for secondary branching.
- **Do not show more than one high-emphasis Start RFQ CTA in the same viewport.**

---

## 15) Mobile QA Checklist (Pre-merge)

- Homepage top/middle/bottom sections preserve hierarchy and readable spacing.
- Products catalog: search, chips, cards, basket state all usable one-handed.
- RFQ basket UI does not hide product controls or key totals.
- /work gallery images remain legible and not over-cropped.
- Contact/RFQ pages maintain clear route-to-action.
- Header menu/search interactions do not overlap or trap focus.
- No horizontal overflow on all public routes.
- No floating widget blocks critical CTA/buttons.
- Tap targets meet practical size and spacing.
- Arabic lines remain readable in mixed-direction layouts.

---

## 16) Implementation Phases (Strict PR Sequence)

## Phase A — Homepage redesign only
- **Scope:** hero, section order, CTA hierarchy, homepage copy density.
- **Files likely touched:** `app/page.tsx`, `components/Sections.tsx`, related style primitives if required.
- **Forbidden changes:** products logic, RFQ logic, search logic, admin/API/schema.
- **Screenshots required:** desktop + mobile for hero, mid-page, final CTA.
- **Testing required:** lint + build + manual link/CTA path checks.

## Phase B — Work proof page polish
- **Scope:** /work layout rhythm, captions, reference placement.
- **Files likely touched:** `app/work/page.tsx`, shared gallery/card styles.
- **Forbidden changes:** asset deletion, API/data model changes.
- **Screenshots required:** desktop and mobile gallery + references section.
- **Testing required:** lint + build + image loading checks.

## Phase C — Products catalog/product detail cleanup
- **Scope:** visual clarity and CTA hierarchy only.
- **Files likely touched:** `app/products-partners/page.tsx`, `app/products-partners/ProductsClient.tsx`, `app/products-partners/[slug]/page.tsx`, product card components.
- **Forbidden changes:** product business logic, search behavior, RFQ APIs, database.
- **Screenshots required:** products list desktop/mobile, category page, RFQ basket interaction.
- **Testing required:** lint + build + add/remove basket smoke test.

## Phase D — Solutions/services/resources IA cleanup
- **Scope:** role clarity across Solutions vs Services vs Resources.
- **Files likely touched:** `app/solutions/page.tsx`, `app/solutions/[slug]/page.tsx`, `app/services/page.tsx`, `app/resources/page.tsx`.
- **Forbidden changes:** route deletion, backend edits, content system migrations.
- **Screenshots required:** top + core sections for each page type.
- **Testing required:** lint + build + navigation path QA.

## Phase E — Mobile QA + final copy pass
- **Scope:** responsive polish, bilingual consistency, CTA consistency.
- **Files likely touched:** shared layout/header/footer/section primitives and targeted page copy.
- **Forbidden changes:** schema/API/auth/admin changes; broad visual experimentation.
- **Screenshots required:** full public journey capture on mobile widths.
- **Testing required:** lint + build + final regression checklist.

---

## 17) Rules for all future Codex tasks

1. No admin/API/schema changes unless explicitly requested.
2. No database migrations unless explicitly requested.
3. No broad multi-page redesign PRs; follow phased scope.
4. No repeated competing CTAs.
5. No fake placeholder content or decorative pseudo-UI.
6. No deleting existing assets without explicit approval.
7. Preserve RFQ and product functional behavior.
8. Run lint and build for every public-website PR.
9. Provide preview screenshots before merge.
10. Keep Arabic/English copy rules consistent and intentional.

---

## Appendix — Out-of-Scope Confirmation

The following remain outside this redesign audit unless explicitly requested in future tasks:
- `/admin` pages
- RFQ APIs
- Supabase/data schema
- auth/session flows
- analytics instrumentation
- product data/business logic/search behavior internals

This is a documentation-only strategy artifact.
