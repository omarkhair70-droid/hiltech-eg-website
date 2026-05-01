# HILTECH Client Handoff

## Website pages

- Home (`/`)
- Services (`/services`)
- About (`/about`)
- Products & Partners (`/products-partners`)
- Contact (`/contact`)

## Main CTAs

- Request a Quote (header/footer/contact flow)
- WhatsApp contact for quick coordination
- RFQ Basket flow from Products & Partners to Contact

## Official contact details

- Email: `info@hiltech-eg.com`
- Phone: `01000087808`
- WhatsApp: `+20 15 55357807` / `01555357807`
- WhatsApp link: `https://wa.me/201555357807`
- Address: `D1 Tiba Building, Zahraa El Maadi, Cairo, Egypt`

## How product RFQ works

1. Visitor browses categories and products on Products & Partners.
2. Visitor adds required items and quantities to RFQ Basket.
3. Visitor opens Contact page and sees RFQ summary.
4. Visitor submits project details via contact form or reaches out via WhatsApp/email/phone.
5. HILTECH team follows up with availability and quotation.

## How to update static content

- General company/contact data: `content/site.ts`
- Products/categories: `content/products.ts`
- Page copy and metadata: files inside `app/`
- Header/Footer UI labels and links: `components/Header.tsx`, `components/Footer.tsx`

## Brand assets location

All core brand assets are in `/public`:

- `/public/logo.png`
- `/public/logo-dark.png`
- `/public/favicon.png`
- `/public/favicon.ico`
- `/public/apple-touch-icon.png`
- `/public/og-image.png`

## Items still requiring client confirmation

- Real product photos
- Real project photos
- Certifications to publish
- Official partnerships to publish
- Domain DNS ownership and registrar access
- Future backend/contact form integration

- Phase 13 update: Homepage narrative now follows an enterprise infrastructure flow: **Physical Layer → Lifecycle → Capabilities → RFQ**, connecting services, project supply, and RFQ basket actions in one operating model.

## Phase 14: Advanced RFQ Experience
- RFQ basket now uses an expanded client-side item model: id, name, category, brand, specs, quantity, unit, notes, and optional urgency.
- Basket items are added from product cards using **Add to RFQ** and persisted in browser localStorage (client-side only).
- Quantities, units, notes, and urgency can be edited from the products basket drawer and the dedicated `/rfq` review page.
- WhatsApp submission is generated as an encoded structured message including project details + RFQ item list.
- No backend/database is storing RFQ submissions in this phase; data remains only in the user browser until sent.
- Future enhancement option: backend form/email workflow with persistence and status tracking.

## Phase 15: Product Intelligence Pages
- Added static Product Intelligence category data model in `content/product-intelligence.ts` with procurement-focused fields: strategic summary, typical components, use cases, RFQ checklist, compatibility notes, handover notes, and advisory disclaimers.
- Added seven category intelligence guide pages under `/products-partners/[slug]`:
  - `/products-partners/fiber-optic-systems`
  - `/products-partners/copper-cat6-cabling`
  - `/products-partners/patch-cords-connectivity`
  - `/products-partners/faceplates-keystone-rj45`
  - `/products-partners/cabinets-racks-pdu`
  - `/products-partners/cable-management-duct-systems`
  - `/products-partners/cctv-security`
- Each guide is designed as a technical procurement assistant page (not a blog): stack fit, component matrix, use-case guidance, RFQ checklist, compatibility/handover notes, and related product examples.
- `/products-partners` now includes **Explore Product Intelligence by Category** cards linking to each category guide.
- Product categories and product card badges now link to their category intelligence guide to support contextual planning.
- Each category guide includes RFQ preparation controls to:
  - browse products,
  - review RFQ basket,
  - request project quote,
  - optionally add starter example items (removable/editable) into the existing RFQ basket.
- Pricing/availability policy remains unchanged: **price and availability upon request**, subject to confirmation during RFQ review.

### How to update category intelligence content
1. Open `content/product-intelligence.ts`.
2. Locate the required category by `slug`.
3. Update copy fields (`intro`, `strategicSummary`, `requestChecklist`, etc.) as needed.
4. Keep disclaimers and compatibility language factual; do not add unverified claims.
5. Rebuild the site to verify rendering and metadata updates.

### RFQ relationship reminder
- Category guide pages are advisory + preparatory and route users back into the same RFQ basket flow (`/products-partners` and `/rfq`).
- Final availability, equivalents, and pricing are still confirmed by HILTECH after RFQ scope review.

## Phase 16: Enterprise Solutions Pages
- Added a static solutions data model in `content/solutions.ts` powering six enterprise-focused solution pages:
  - `/solutions/structured-cabling`
  - `/solutions/fiber-backbone`
  - `/solutions/data-rooms`
  - `/solutions/cctv-infrastructure`
  - `/solutions/network-testing`
  - `/solutions/project-supply-rfq`
- Added a new landing page at `/solutions` to frame HILTECH around business/infrastructure outcomes (not only product/service lists).
- Solution content is fully editable from `content/solutions.ts` (titles, intros, outcomes, delivery scope, implementation flow, related intelligence links, RFQ checklist, assurance notes, disclaimer).
- Solutions connect directly to Product Intelligence guides via related links and route users into RFQ actions (`/rfq`, `/products-partners`, `/contact`).
- Product Intelligence category pages now include subtle “Related solutions” links where relevant.
- Scope/pricing/availability note remains explicit: final technical scope, product availability, and quotation are confirmed per project and RFQ review.

## Phase 17 technical diagrams note
- New diagram panels across Solutions, RFQ, Products Intelligence, and Homepage are **conceptual visual aids** to explain telecom/infrastructure architecture and workflow.
- These visuals are not real project photos, not as-built drawings, and not client-specific documentation.
- Future upgrades can include:
  - verified topology diagrams from real delivered projects,
  - downloadable technical PDFs,
  - authenticated project photos,
  - verified case-study evidence after client approval.

## Phase 18 - Sales & Launch Materials
- Added `/resources` as a public-safe hub for sales and project communication materials.
- Added static pages for `/resources/company-profile`, `/resources/rfq-guide`, `/resources/launch-copy`, and `/resources/one-pagers/[slug]`.
- Sales copy content is managed in `content/sales-materials.ts` and can be edited directly for messaging updates.
- Current materials are PDF-ready content only; no downloadable PDF generation is implemented in this phase.
- Future enhancement can add automated PDF generation from the same structured content.
- Launch copy is written to be public-safe, but every post/message should be reviewed and approved by the client before publication.

## Phase 19 - Information Architecture Cleanup & Homepage Compression
- Homepage (`/`) is now intentionally compressed into an executive overview flow:
  1. Hero
  2. What HILTECH Does
  3. Solutions preview
  4. Products/RFQ preview
  5. Assurance preview
  6. Final CTA
- Detailed content is intentionally split into internal pages to reduce visual crowding and improve decision flow:
  - Full solution depth: `/solutions`
  - Product intelligence and category detail: `/products-partners`
  - RFQ workflow and review: `/rfq`
  - Sales/launch materials: `/resources`
  - Contact and quote initiation: `/contact`
- Navigation was simplified around the primary sales journey: Home, Solutions, Products, RFQ, Resources, Contact.
- This split is deliberate to keep the homepage calmer, easier to scan on mobile, and more premium in presentation while preserving all existing routes and RFQ behavior.

## Phase 20 UX Cleanup (Visual Density Reduction)
- Reduced CTA competition across key pages with a clearer hierarchy: primary quote action, secondary navigational actions, tertiary helper links.
- Homepage is now an executive overview with calmer pacing and fewer competing visual blocks.
- Detailed content emphasis remains in Solutions, Products, RFQ, and Resources pages.
- Launch copy remains available but is positioned as a lower-priority public resource.
- The overall information architecture is intentionally calmer and easier to scan on mobile.

## Phase 20.1 - Premium Balance Restoration
- Restored selective premium visual rhythm after Phase 20 cleanup while keeping the calmer information architecture intact.
- Homepage remains an executive overview and avoids long-form clutter, but now reinforces stronger hero presence, clearer solution/product pathways, a compact assurance strip, and a more confident final CTA hierarchy.
- Internal pages were refined with targeted contrast, section framing, and CTA clarity improvements so they feel enterprise-grade without becoming visually crowded.
- Details and technical depth remain on internal pages (`/solutions`, `/products-partners`, `/rfq`, `/resources`, `/contact`) while homepage remains a concise decision and navigation layer.

## Phase 20.2 - Critical Contrast & Readability Hotfix
- Applied a focused contrast/readability hotfix across cards, CTA states, and diagram panel text treatment to eliminate obvious low-contrast white-on-light issues.
- Important text should not use low-opacity white on light cards/panels; prefer dark navy/slate text on light backgrounds.
- Future diagram or card additions must pass a mobile-first contrast review before release.

## Phase 20.2 Final Mobile QA & Launch Stabilization (May 2026)
- Final mobile QA pass completed across launch-critical pages and RFQ/product/resource/contact flows.
- Contrast and readability were rechecked with targeted fixes for mobile card text, CTA clarity, and footer readability.
- WhatsApp links were verified against the approved destination (`https://wa.me/201555357807`) and centralized site links.
- Safe translation protection (`translate="no"`) was applied to brand/menu/navigation labels where appropriate.
- Site UI is stabilized for final launch review.


## Phase 20.3 - System-wide Surface Contrast Fix
- Applied a shared system-level contrast update so light cards consistently render dark readable text and links.
- Reviewed and corrected diagram panels (titles, subtitles, labels, overlays) to prevent white/faint text mismatches on light surfaces.
- Reviewed Final CTA quick-reference treatment and corrected white-on-white/low-contrast readability risks.
- Corrected repeated white-on-white and low-opacity readability bugs identified in mobile QA.
