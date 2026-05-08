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


## Phase 28B.1 - Navigation Discoverability Fix
- Added **About** (`/about`) and **Services** (`/services`) to the public header/mobile navigation for easier discovery.
- No backend behavior changed in this phase (navigation-only update).


## Phase A — Homepage Redesign Only
- Simplified homepage hero with a cleaner B2B infrastructure message and reduced visual competition.
- Removed repeated homepage CTA emphasis around **Start RFQ** while preserving header CTA behavior.
- Added a compact field proof snapshot section using existing project imagery.
- Simplified homepage catalog/RFQ journey into a practical 3-step flow.
- Kept products, RFQ logic, admin, API, and backend behavior unchanged.
- No migration required in this phase.
- Screenshots are required before merge (desktop/mobile top, middle, bottom coverage).


## Phase A.1 — Homepage Mobile & Density Polish
- Tightened homepage hero density on mobile (reduced vertical rhythm and headline scale) while keeping desktop direction intact.
- Kept CTA stack clean/full-width and reduced visual competition by hiding the hero proof visual on small screens.
- Compacted “What HILTECH Delivers” and “Field Proof Snapshot” card spacing/padding for cleaner mobile scanability.
- Compacted Trust & Delivery Principles into a grouped premium strip for better desktop balance and mobile efficiency.
- No admin/API/RFQ logic/product/search/backend changes in this polish phase.

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


## Smart Project Scope Finder (/scope-finder)
- Provides a static, client-side guided questionnaire to suggest a preliminary infrastructure scope direction.
- Recommendation output includes suggested solutions, product categories, RFQ starter items, and request checklist points.
- Recommendations are preliminary only; final scope, pricing, availability, and compatibility must be confirmed by HILTECH.
- Users can add suggested starter items directly into the RFQ Basket (local storage) and continue through existing RFQ workflow.
- No backend submission, database, AI API, analytics, or authentication is used in this feature.

## Phase 21.1 - Scope Finder Experience Polish
- Scope Finder is now a guided step-by-step wizard (one question per step) with clear progress indication.
- Scope recommendations remain deterministic and preliminary; no final scope, pricing, or stock claims are generated.
- Result view now highlights recommended direction, fit context, and why the recommendation matches selected answers.
- Users can add suggested starter items to the RFQ Basket directly from Scope Finder with duplicate prevention and confirmation feedback.
- RFQ review users should adjust quantities, specs, and notes before sending WhatsApp RFQ.
- Feature remains client-side only with existing localStorage RFQ basket flow (no backend/database/auth/AI API).

## Phase 22B - Product Image Integration, Asset Move & Catalog Pagination
- Uploaded product PNG assets were moved from `/public` into `/public/products` without filename changes.
- `/products-partners` product cards now render catalog visuals from `content/product-visuals.ts` when an image exists.
- Missing images now use an in-card premium fallback placeholder to avoid broken image icons.
- Product visuals remain illustrative/non-official and should not be represented as official manufacturer photos.
- Product catalog browsing now uses category filtering with progressive **Load More** behavior to reduce page fatigue.
- RFQ basket flow, Add to RFQ behavior, Product Intelligence routing, and Scope Finder routing remain unchanged.

- **Phase 22B.1 (May 1, 2026):** Adjusted product image presentation in `/products-partners` to use contained image frames (`object-contain`) with padded premium dark backgrounds for less cropping on mobile and desktop.
- Product visuals remain illustrative/non-official references and existing missing-image fallback now matches the updated premium frame styling.
- Floating RFQ Basket mobile overlap was reduced through safer mobile positioning and extra catalog bottom spacing so titles/actions remain reachable while scrolling.

## Phase 23A - Final Launch Polish Fixes (May 2026)
- Canonical URLs were standardized to absolute `https://hiltech-eg.com/...` formatting across core launch routes and resource detail pages for cleaner SEO audits.
- `/products-partners` maturity copy was updated to reflect that catalog visuals are now available while keeping trust language: visuals are illustrative and final specs/availability/quotation are confirmed by HILTECH.
- `/resources/launch-copy` was reviewed and reframed as **Client Communication Templates** to keep the page public-safe and client-facing.
- Homepage hero includes a concise 5-second clarity micro-line covering what HILTECH does, for whom, and where.
- Floating RFQ basket on products pages was tightened for mobile overlap reduction with safer bottom safe-area spacing and extra page bottom padding.
- Footer service labels are now linked to relevant solution/product routes for faster navigation.

## Phase 28D.1 - Reference Panels Visual Upgrade (May 2026)
- Replaced the `/services` extracted individual partner/client logo grid with original company profile reference panel visuals for cleaner quality and more consistent presentation.
- `/services` now prioritizes:
  - `public/references-partners-panel.jpg`
  - `public/references-clients-panel.jpg`
- If panel images are unavailable, the page safely falls back to the existing individual `partner-*` / `client-*` logo grid to avoid rendering/build issues.
- RFQ flow, backend behavior, admin/auth/Supabase/email/tracking, and product logic were not changed in this phase.
- WhatsApp and contact references were checked; approved WhatsApp number (`201555357807`) and approved email (`info@hiltech-eg.com`) remain unchanged.
- ESLint setup was hardened with a minimal Next.js config so `npm run lint` no longer triggers interactive initialization prompts.

## Phase 25A - Backend RFQ Intake Foundation (May 2026)
- `/rfq` now supports backend RFQ persistence through `POST /api/rfq` when Supabase environment variables are configured.
- Existing localStorage RFQ basket behavior is preserved.
- Existing WhatsApp RFQ message flow is preserved as parallel/fallback submission path.
- If backend is unavailable, users still can copy RFQ message and submit via WhatsApp without blocking.
- Dashboard and RFQ operations management remain out of scope for this phase and are planned for future Phase 25B.

## Phase 25B - Internal RFQ Admin Dashboard (May 2026)
- Added internal protected admin routes:
  - `/admin/login`
  - `/admin/rfq`
  - `/admin/rfq/[id]`
- Dashboard supports filtering RFQ requests by status/source/urgency/search and quick summary counts.
- Request detail supports reviewing customer + items + stored WhatsApp message and updating status/internal notes.
- Admin access uses env-configured password plus signed `httpOnly` cookie session.
- Required env vars now include:
  - `ADMIN_DASHBOARD_PASSWORD`
  - `ADMIN_SESSION_SECRET`
  - optional `ADMIN_SESSION_TTL_HOURS`
- Future hardening path remains Supabase Auth with per-user roles/auditing.

## Phase 25C.1 - Product DB Foundation (May 2026)
- Added Supabase `public.products` schema and initial seed from static catalog content.
- `product_code` preserves existing static product identity to keep RFQ item mapping stable.
- `image_path` in database points to existing `/public/products/*.png` style paths.
- Public products page (`/products-partners`) still uses static source in this phase for stability.
- Internal Product Admin UI is planned for Phase 25C.2.

## Phase 25C.2 - Internal Product Admin (May 2026)

## Phase 37G - Products Page Catalog-First Cleanup (May 2026)
- `/products-partners` was restructured to prioritize practical catalog browsing first: heading → search/filter controls → product grid → RFQ actions.
- Removed top marketing-heavy blocks from the Products page entry flow (including the top visual scope panel and project supply highlights cards) so users reach the searchable catalog faster.
- Simplified pre-catalog guidance in the products client area by removing duplicated helper messaging above the filters; Scope Finder remains available as a compact helper below the first catalog grid area.
- Primary product-page action remains **Add to RFQ** with **Product Intelligence** preserved as secondary on product cards.
- Product disclaimer and catalog clarity notices remain in place lower on the page and no longer block initial product discovery.
- No changes were made to admin, API, database schema, auth, RFQ submit logic, RFQ tracking logic, or GA event names in this phase.
- No migration required.

- Internal admins can now manage Supabase product rows from `/admin/products` after admin login.
- Admins can add products (`/admin/products/new`) and edit/status-manage products (`/admin/products/[id]`).
- Status workflow supports `active`, `hidden`, and `archived` without hard delete.
- `image_path` is manual text entry only in this phase and should use `/products/...` paths.
- No image upload/storage UI is included yet.
- Public product catalog behavior is unchanged in this phase and still reads static sources until Phase 25C.3.

## Phase 25C.3 - Public catalog Supabase read with static fallback (May 2026)
- `/products-partners` now supports a server-side Supabase catalog source when enabled.
- Feature flag: `PRODUCTS_DB_PUBLIC_MODE`
  - `static` (default): keep existing static catalog behavior.
  - `db_with_fallback`: try Supabase `public.products` (active products only), then fallback to static if unavailable/error/empty.
- Product Admin edits affect public catalog only in `db_with_fallback` mode.
- `hidden` and `archived` products are excluded from public catalog in DB mode.
- Static fallback remains permanent for reliability.
- After changing Vercel environment variables, redeploy is required.

## Phase 27A - SEO Launch Technical Fixes (May 2026)
- Completed technical SEO hardening updates prior to Search Console submission readiness.
- `robots` policy now explicitly disallows private/internal admin and API routes (`/admin`, `/admin/`, `/api`, `/api/`) while keeping public crawling enabled.
- `/rfq` metadata now includes Twitter card metadata parity with other public launch pages.
- Resource one-pager metadata now uses normalized absolute OG/Twitter image URL via shared `site.ogImage`.
- `/track` route does not exist in this phase; if introduced in a future phase, it must be set to `noindex, nofollow` and kept out of sitemap.
- Sitemap remains scoped to public pages only and avoids private/admin/API routes.
- Google Search Console submission should only happen after `https://hiltech-eg.com` is confirmed pointing to the target production Vercel deployment.

## Phase 26A - Public RFQ Tracking (/track)
- Added a public tracking page at `/track` so customers can check RFQ status safely.
- Customers must provide both:
  - RFQ reference code (`request_code`), and
  - the same phone or email used during submission.
- Tracking does not reveal whether a code exists unless both fields match.
- Returned tracking details are intentionally limited to:
  - request code
  - status + friendly explanation
  - created time
  - last status/update time
  - customer display name (first-name style)
  - project location (if available)
  - item count and optional item names only
- Sensitive/admin-only fields are never returned publicly:
  - internal notes
  - project notes
  - stored WhatsApp message
  - customer phone/email
  - item notes
- Admin status updates from `/admin/rfq` are reflected in `/track` automatically because tracking reads the same RFQ status fields.

## Phase 26A.1 - RFQ Tracking UX After Submission (May 2026)
- After successful RFQ submission on `/rfq`, customers now see a **Track this RFQ** action that links directly to `/track?request_code=<reference>`.
- Success messaging now explicitly reminds customers to save the reference number and use the same phone/email later for tracking.
- `/track` now supports request code prefill from the `request_code` query parameter for a smoother follow-up flow.
- Privacy verification is unchanged: customers must still provide the matching phone or email; request code alone is not sufficient.

## Phase 26B - Internal RFQ Email Notifications (May 2026)
- After successful RFQ save, the system sends a best-effort internal notification email to HILTECH.
- Email target is configured by `RFQ_NOTIFY_TO` and sender by `RFQ_NOTIFY_FROM`.
- Recommended sender identity: `HILTECH RFQ <rfq@notify.hiltech-eg.com>`.
- Recommended Resend domain: `notify.hiltech-eg.com` (must be DNS-verified in Resend).
- RFQ save success does **not** depend on email delivery; failures are logged/audited and do not block customer success.
- Phase 26B does not include customer confirmation emails.

## Phase 28A - Company Profile Content & Proof Upgrade (May 2026)
- Company-profile-based content was integrated into public-safe website copy with no unverified certification/partnership/client claims.
- `/about` was strengthened to present HILTECH as a network infrastructure partner focused on design, implementation, and management of information networks, including fiber and copper expertise.
- Mission and Vision blocks were added to `/about` using concise profile-aligned wording.
- `/services` was upgraded to better reflect profile capabilities: site inspection/survey, engineering drawings/planning, fiber splicing work, copper extension/termination, rack/data room readiness, and testing workflows.
- Added proof-oriented service credibility sections on `/services`: field-proven infrastructure work categories and testing tools used across delivery.
- Added a client-safe references note on `/services` for partner/client references with explicit disclaimer that final public display should be confirmed by HILTECH.
- `/resources` company profile callout was updated to a safe request flow (`/contact`) because no downloadable company profile PDF asset exists in `/public` at this time.
- Contact details from profile were reviewed against current approved site contacts; no contact number/email changes were made in this phase to avoid accidental override of approved production details.
- No RFQ basket, admin dashboard, Supabase integration, or notification logic was changed.

## Phase 28B - Company Profile Visual Assets Upgrade (May 2026)
- Added selected company profile visuals to public pages using supplied company profile material.
- Integrated proof visuals into `/services`, a field-execution visual strip into `/about`, and a company profile cover preview inside `/resources`.
- Added partner/client reference logo strip support on `/services` when logo files exist under `public/company-profile/references-unconfirmed/ (fallback to `public/references-unconfirmed/` supported)`.
- Confirmed no RFQ, admin, Supabase, tracking, notification, or database behavior changes in this phase.

Visual assets used in Phase 28B:
- `public/fiber-splicing-workbench.jpg` (current uploaded path)
- `public/rack-cable-management-blue.jpg` (current uploaded path)
- `public/copper-cable-pulling.jpg` (current uploaded path)
- `public/testing-field-device.jpg` (current uploaded path)
- `public/field-execution-technician.jpg` (current uploaded path)
- `public/company-profile-cover.jpg` (current uploaded path)
- `public/company-profile/references-unconfirmed/ (fallback to `public/references-unconfirmed/` supported)*` (if present)


## Phase 28C - Visual Library, Logo Polish & Launch Audit (May 2026)
- Navigation now includes About and Services directly in header desktop/mobile menus.
- Services page includes a full company-profile field gallery organized by delivery area (Fiber, Rack & data room, Copper, Testing).
- Services logo presentation was polished with grouped reference sections (Partners / Client references), sorted and displayed with stable clean cards.
- Added `docs/LAUNCH_STATUS_AUDIT.md` with completed scope, operational pending items, technical notes, and next-phase recommendation.
- Resources page keeps the Company Profile callout and now uses a small supporting profile-contact preview image without introducing any fake download action.
- RFQ logic, admin authentication, Supabase schemas, tracking API, and notification backend behavior were not changed in this phase.

## Phase 28D.2 - Visual Display Polish (May 2026)
- `/services` testing-tools visuals now use contain-safe image presentation (no forced crop/zoom) with clean light frames and internal padding.
- The `Testing & Measurement Tools` proof card display was tuned to avoid harsh cropping on the testing device visual.
- `/resources` Company Profile card was simplified to a single clean cover preview and the oversized supporting preview panel was removed.
- `/resources` two-column card layout now aligns with `items-start` so the RFQ Preparation Guide card no longer stretches into an empty tall desktop block.
- `/services` reference presentation continues to prefer official panel assets (`references-partners-panel.jpg` + `references-clients-panel.jpg`); when missing, a clean note is shown instead of a prominent extracted-logo grid.
- Backend/RFQ/admin/auth/Supabase/email/tracking behavior remained unchanged in this phase.

## Phase 29A - Google Analytics Integration (May 2026)
- Added Google Analytics 4 integration for the public website using a configurable environment variable.
- Required Vercel environment variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Example measurement ID format: `G-XXXXXXXXXX`
- Analytics scripts are only injected when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set to a non-empty value.
- Analytics is intended for public site traffic; `/admin` paths are excluded from analytics script injection.
- A redeploy is required after setting or changing the environment variable.

## Phase 29B - Product Inventory Management
- Added inventory columns to `products`: `stock_status`, `stock_quantity`, `low_stock_threshold`, `inventory_notes`, `last_stock_checked_at`.
- `stock_status` values: `in_stock`, `low_stock`, `out_of_stock`, `backorder`, `unknown`.
- Exact stock quantities and `inventory_notes` are admin-only and not exposed on public product pages.
- Public product availability remains quote-confirmed; it is not a final stock commitment.

## Phase 29C - GA4 RFQ & Product Interaction Events
- Added a client-safe analytics helper (`lib/client/analytics.ts`) that only runs in browser, checks for `window.gtag`, and safely no-ops when GA is not configured.
- Public pages now track key product and RFQ interactions (category filtering, add-to-RFQ, basket actions, RFQ submit lifecycle, WhatsApp/copy/clear/track/browse actions).
- Privacy guardrails: no personal details (name/email/phone), no project/item notes, no exact RFQ message text, no request code, and no admin-only data are sent to GA events.
- Analytics remains public-site focused; admin behavior is not tracked.

## Phase 30A - RFQ Command Center and Internal Sales Workflow (May 2026)
- Admin RFQ detail was upgraded into a command-center workflow page with richer customer/project metadata, item visibility, and internal follow-up controls.
- Admin-only workflow fields now include sales priority, next follow-up, internal notes, and last admin action timestamp.
- RFQ item review now includes internal inventory context (stock status, quantity, threshold, last check) to support quoting decisions.
- Print RFQ Summary is available for customer-facing sharing and excludes internal notes.
- Public customer tracking remains safe and only shows approved status/timeline data.


## Phase 31A - RFQ Quotation Builder
- Added admin-only quotation builder in RFQ Command Center for draft pricing, terms, and totals.
- Quotation data is internal only in this phase.
- Customer /track page does not expose quotation prices or quotation notes.

## Phase 31B - Admin Executive Dashboard (May 2026)
- Added a new internal admin executive dashboard route at `/admin`.
- The dashboard provides a high-level operational summary across RFQs, quotation workflow statuses, follow-up due workload, and product inventory health.
- It includes quick links into RFQ Command Center filters and Product Admin stock filters for faster daily execution.
- This dashboard is admin-only and does not change public website behavior, RFQ submission flow, customer tracking visibility, or Google Analytics behavior.
\n\n## Phase 31C - Product CSV Import / Export\n- Added admin-only Product CSV Import / Export tools at `/admin/products/import-export` for bulk updates via Excel/Google Sheets.\n- Admins can export the full product catalog/inventory CSV, download a template, run dry-run imports, and apply updates safely.\n- Imports match by `product_code`, can optionally create missing products, and never delete products.\n


## Phase 31D - Customer Quote Approval / Rejection
- Admins must explicitly set **quote_customer_visible** before any quotation is shown on tracking.
- Customers can respond from tracking with Accept, Reject, or Request changes.
- Internal/admin-only fields (internal notes, inventory notes, stock quantities) remain hidden from customer quote view.


## RFQ Tracking Discoverability
- The public RFQ tracking page (`/track`) is now discoverable from the main site header navigation, footer resources links, and contact page helper text.
- Customers must provide both: (1) RFQ reference code, and (2) the same phone number or email used when submitting the RFQ.

## Public Website Journey Notes (Phase 35A)
- Primary customer journey: Home -> Solutions/Products -> Start RFQ -> Track RFQ.
- Primary CTA across public pages: **Start RFQ** (`/rfq`).
- RFQ path safety: Contact page now clearly routes quotation requests to `/rfq`; mailto kept as secondary non-RFQ inquiry path; WhatsApp fallback remains available.

## Phase 35B - Public Solution Detail QA Polish (May 2026)
- Solution detail pages (`/solutions/[slug]`) now follow the public CTA hierarchy: **Start RFQ** (primary), **Browse Products** (secondary), and contextual support actions only when needed.
- Removed duplicate final CTA blocks and replaced them with a single final RFQ action section to reduce repeated wording and improve decision clarity.
- Updated solution detail diagram panels to the light surface treatment for stronger title/subtitle/label readability.
- No admin routes, RFQ API behavior, analytics event names, database schema, or migrations were changed in this phase.

## Phase 35E - Product Intelligence Detail Visual QA Polish (May 2026)
- Polished Product Intelligence detail/category pages (`/products-partners/[slug]`) for cleaner visual hierarchy and consistency with solution detail styling.
- Diagram panels were switched to a readable light surface treatment with stronger title/subtitle contrast and improved node-label legibility.
- Diagram containers were tightened to reduce awkward blank height while preserving responsive behavior and intentional horizontal scroll for wide technical diagrams on mobile.
- Top CTA hierarchy on category detail pages was cleaned to emphasize: **Add Related Products to RFQ** (primary), **Browse Products** (secondary), and **Review RFQ Basket** (tertiary).
- RFQ flow behavior, product/category routing, admin area, RFQ/admin APIs, analytics event naming, and Supabase schema were not changed.
- No migration was introduced in this phase.

## Phase 36A - Hybrid Arabic/English Public Copy Polish (May 2026)
- Applied a public-facing hybrid copy layer where English remains the primary site structure and technical language.
- Added selective Arabic support lines for local clarity on high-intent public pages and shared sections (hero, CTAs, contact, RFQ, tracking, and footer helper copy).
- Kept navigation labels and core technical terms in English (e.g., RFQ, Structured Cabling, Fiber Backbone, Data Room, CCTV) to preserve enterprise readability.
- Standardized public CTA wording around: Start RFQ, Browse Products, Contact HILTECH, and Track RFQ, with Arabic helper text where layout-safe.
- No changes were made to admin dashboards, RFQ/admin APIs, Supabase schema, authentication flows, or GA tracking/event names.
- No migration was added in this phase.

## Phase 37B - Global Public Site Search in Header (May 2026)
- Added a global public search entry in `components/Header.tsx` so search is reachable from desktop and mobile header experiences.
- Implemented client-side command-style search UI in `components/SiteSearch.tsx` with:
  - instant filtering as users type,
  - grouped result types (`Products`, `Solutions`, `Services`, `Resources`, `Guides`, `Pages`),
  - keyboard accessibility (focus-on-open, Escape to close, keyboard-reachable links),
  - no external dependencies.
- Added static local search index in `lib/site-search.ts` with searchable fields (`title`, `description`, `keywords`, `type`, `href`) and ranking based on title/keyword/description matches.
- Search index includes:
  - main public pages (Home, Products, Solutions, Services, Resources, Field Work & References, Contact, Start RFQ, Track RFQ, Scope Finder),
  - products from static product content,
  - product intelligence guide pages,
  - solution pages,
  - core service/resource entries,
  - Arabic aliases for common terms (e.g., منتجات, عرض سعر, تتبع الطلب, فايبر, كابلات, راكات, كاميرات, تواصل).
- Empty query shows popular shortcuts: Browse Products, Start RFQ, Track RFQ, Solutions, Contact.
- Safety scope confirmation for this phase:
  - no admin changes,
  - no API changes,
  - no Supabase schema/migration changes,
  - no RFQ submit/track logic changes,
  - no GA event name changes.

## Phase 37C - Search Deep Linking & Smart Product Results (May 2026)
- Global header search product results now deep-link to product-specific catalog URLs using query params: `/products-partners?product=<product-id>`.
- Products page now supports query param behavior:
  - `?product=<id>` opens the product category context, ensures the target product is visible in the grid, scrolls to it, and highlights the card.
  - `?category=<category>` activates a valid category filter and scrolls users into the catalog grid.
- Product cards now include stable anchor IDs (`product-<id>`) to support reliable deep linking.
- Search results continue to run fully on the existing client-side index (no backend search service).
- This phase did **not** change admin routes, RFQ APIs, Supabase schema, auth, or GA event naming.

## Phase 37D - Products Page Live Search & Filter Polish (May 2026)
- Added a client-side live catalog search input inside `/products-partners` with placeholder: `Search products by name, brand, specs...`.
- Search now filters by product name, brand, category, short specs, and use-case text.
- Added lightweight Arabic alias expansion for common procurement terms (`كابلات`, `فايبر`, `راكات`, `كاميرات`, `ألياف`, `شبكة`) mapped to safe matching keywords.
- Category filter and search now work together (All categories + category-specific query filtering).
- Added query param support for `q` while preserving existing Phase 37C behavior for:
  - `?product=<id>` deep-link highlight/scroll
  - `?category=<category>` catalog filter
- Products page now lightly updates URL params (`q`, `category`) via client navigation without full reload.
- Added conditional **Clear filters** control when search/category/product deep link is active.
- Added dynamic results messaging and empty state with actions:
  - clear filters
  - start RFQ (`/rfq`)
- Filtering remains fully static client-side; no backend search service is used.
- No changes were made to admin routes, RFQ APIs, Supabase schema, auth, RFQ submit logic, or existing GA event names.

## Phase 37E - Homepage CTA De-duplication + Field Work Preview (May 2026)
- Reduced repeated homepage `Start RFQ` wording and simplified CTA hierarchy on homepage sections.
- Hero CTA set is now:
  - **Browse Products** (`/products-partners`) as primary
  - **Explore Solutions** (`/solutions`) as secondary
  - **Track RFQ** (`/track`) as support action
- Replaced the hero right-side **Executive Overview** panel with a concise **Project Supply Paths** panel focused on practical project actions.
- Added a new homepage **Field Work & References** preview section with three cards:
  - Fiber Installation
  - Rack Installation
  - Testing & Measurement
  - Plus CTA to `/work`.
- Mobile QA target for this phase: cleaner stacked hero CTAs, no clipped headings, clean card stacking, and no added CTA clutter.
- Safety scope confirmation:
  - No admin changes
  - No API changes
  - No Supabase/schema changes
  - No GA event name changes
- No migration required in this phase.

## Phase 37F - Premium Homepage Hero + References Placement (May 6, 2026)
- Homepage hero was refreshed with a premium, compact **Quick Project Access** panel replacing the previous text-heavy right card.
- Homepage CTA hierarchy is now focused on:
  - Primary: Browse Products (`/products-partners`)
  - Secondary: View Field Work (`/work`)
  - Support: Track RFQ (`/track`)
- Added a new homepage **Partners & Client References** section (before products/RFQ workflow) with refined logo tiles and compliance note.
- Removed unpolished fallback logo blocks from `/work` UI; `/work` remains focused on field visuals, testing workflows, and reference panel materials.
- Safety scope confirmed: no admin route changes, no RFQ/API behavior changes, no GA event name changes, no database/schema/auth updates.
- No migration required in this phase.

## HILTECH Public UX Reset (May 2026)
- Simplified homepage hero into a single practical block and removed the right-side proof/access panel.
- Removed the homepage reference logo grid section to reduce visual noise.
- Reduced repeated RFQ CTAs across homepage sections and kept alternative CTA wording aligned with the public flow.
- Cleaned Products & RFQ Workflow section to a 3-step sequence with focused actions (Browse Products, Track RFQ, Scope Finder link).
- Updated final homepage CTA to avoid repeating “Start RFQ” and keep compact navigation/support actions.
- Verified and refined `/work` field galleries so image cards remain visible with clear aspect ratios and cleaner card surfaces.
- Preserved Products catalog-first behavior (`heading -> search/filter -> products`) from Phase 37G.
- No admin/API/schema/auth/GA event name changes.
- No migration required.

## Phase A.2 — Homepage Final UX Pass
- Final homepage mobile density polish implemented with tighter hero vertical rhythm and lighter mobile headline scale.
- Homepage copy tightened across hero, capabilities, proof snapshot, journey, trust strip, and final CTA.
- Field Proof Snapshot, Catalog-to-RFQ Journey, and Trust Principles sections compacted for cleaner mobile scanability.
- Desktop hero direction preserved while applying only light spacing refinements.
- Start RFQ repetition removed from homepage hero and final CTA language (header behavior preserved).
- No admin/API/RFQ/product/search/backend changes were made in this phase.
- No migration required in this phase.

## Phase B1 - Public Design Tokens + Section Rhythm Reset (May 2026)
- Established shared public visual rhythm through centralized tokens for navy/light surfaces, text hierarchy, borders, section spacing, card radius/shadow, button radius, and container width.
- Refined shared typography rhythm for section headers/body copy and standardized eyebrow label treatment for consistent uppercase micro-label usage.
- Updated shared card/button/link/image treatment to reduce dense “boxed” feeling while preserving all existing public page structures and routes.
- Homepage structure and sequence were preserved (no rebuild, no section reorder, no CTA relabeling).
- No admin/API/Supabase/RFQ backend/product/search logic changes were made.
- No routes, analytics, database/schema, or migrations were changed.
- Screenshots are required before merge (desktop/mobile coverage across homepage, products, work, solutions, and contact/RFQ flows).

## Phase H1 — Public Identity & Creative System Upgrade
- Identity direction updated to a **Field-Ready Infrastructure System** expression: technical, practical, and enterprise-oriented rather than generic corporate styling.
- Homepage public narrative was reframed with sharper infrastructure language (delivery capabilities, field proof, procurement flow, delivery discipline, and scope-focused final CTA).
- Color balance was refined around deep navy/slate authority with controlled orange as signal/accent only; borders/surfaces were tightened for cleaner operational contrast.
- Typography and rhythm were tuned for clearer section hierarchy, tighter copy pacing, and more deliberate scan flow on mobile and desktop.
- Shared public primitives were polished (section header spacing, card signal treatment, visual panel grid subtlety, calmer card hover/shadow behavior) for a consistent technical UI system.
- Services and products public surfaces were aligned to the same identity tone with execution-oriented copy and subtle visual consistency updates (no logic changes).
- Admin/API/RFQ/product/search/backend logic remains untouched in this phase.
- No migration required.
- Screenshots are required before merge.

## Phase C1 — Header IA + Mobile Menu + Company Page
- Main navigation updated to: Solutions / Products / Work / Services / Company / Contact.
- Track RFQ and Resources were moved out of primary desktop navigation and remain accessible via mobile utility/resources sections and footer links.
- Added a new Company page at `/company` focused on infrastructure delivery support, operational process, delivery model, and RFQ journey continuity.
- Mobile menu reorganized into three sections: Main / RFQ Tools / Resources.
- Footer links aligned to keep Company, Work, Resources, and Track RFQ easy to find.
- No admin/API/RFQ backend/product model/filter/search/backend logic changes.
- No database or migration changes.
- Screenshots are required before merge.

## Phase C2 — Solution Detail Scope Flow Rebuild
- Solution detail pages were rebuilt into scope-clarity pages with a tighter, operational layout.
- Large conceptual diagram emphasis was removed in favor of responsive, compact approach-flow steps.
- Hero CTA hierarchy was simplified to product/work discovery first, with RFQ conversion moved to final CTA.
- Delivery scope, components, outcomes, and RFQ readiness were restructured to reduce repeated card-grid density.
- Added a dedicated field proof link section before final RFQ conversion.
- Mobile-first readability was improved with stacked flow/list patterns and lighter section density.
- Admin/API/RFQ backend/product/search logic remains untouched in this phase.
- No migration required.
- Screenshots are required before merge.

## Phase C3 — Work Proof Page Rebuild
- `/work` rebuilt from gallery dump into a field proof page.
- Added a dark proof hero with direct route actions to products, RFQ, and solutions.
- Added a featured field proof section before detailed discipline evidence.
- Reorganized gallery groups into proof disciplines (fiber/ODF, rack/data room, copper, testing) using lead visuals plus supporting thumbnails.
- Kept references as secondary context with explicit non-partnership disclaimer language.
- Improved mobile proof layout to reduce repetitive equal-grid fatigue and improve scanability.
- Admin/API/RFQ/product/search/backend behavior untouched.
- No migration required in this phase.
- Screenshots are required before merge.

## Phase R1 — References System
- Added a compact **Selected References** section to homepage (`/`) after Field Proof and before Procurement Flow.
- Split homepage references into **Technology & Supply References** and **Client / Project References**.
- Normalized reference/logo presentation using consistent compact tiles (no stretching/cropping, controlled sizing).
- Added disclaimer text to avoid implying formal partnerships:
  - Brand and client references are shown for context and do not imply formal partnership unless explicitly stated.
  - مراجع تجارية وفنية لأغراض التوضيح والسياق فقط.
- Avoided restoring the old fallback/grid logo style on homepage.
- Preserved Work page references behavior and layout from previous phase.
- Admin/API/RFQ/product/search/backend were not changed in this phase.
- No database migration required.
- Screenshots are required before merge.

## Phase P1 — Product Catalog Pricing & Completion Audit (May 2026)
- Audited product catalog pricing readiness across static source, DB schema fields, seed migration, and product CSV flows.
- Generated import-ready template: `docs/PRODUCT_PRICE_IMPORT_TEMPLATE.csv` for `price_note` / availability/inventory-safe updates.
- Confirmed whether exact prices exist: exact numeric product prices were not found in repository data.
- No fake prices were added.
- No RFQ/product/search/backend behavior changes were made in this phase.
- No migration was added in this phase.

## Phase P2A — Old Site Product Price Source + Catalog Match Matrix
- Captured product names and RFQ-context prices from user-provided old HILTECH site screenshots.
- Created `docs/OLD_SITE_PRODUCT_PRICE_SOURCE.csv` as source-of-truth capture file.
- Updated `docs/PRODUCT_PRICE_IMPORT_TEMPLATE.csv` with matched `price_note` values for confident existing matches and appended candidate new product rows for specific old-site SKUs/variants.
- No fake prices were added; all prices are directly captured from provided screenshot source list.
- No UI changes were made in this phase.
- No RFQ, search/filter, admin auth, API behavior, analytics, middleware, or backend logic changes were made.
- No Supabase schema changes or migrations were made.
- Next phase should display `price_note` on public product cards and support admin import/review workflow.

## Phase P2B — Product Price Display + RFQ Price Reference
- Public product cards now support `price_note` display using procurement-safe wording.
- RFQ basket now shows optional price reference metadata only.
- No price totals or checkout behavior were added.
- No schema or migration changes were made.
- No fake prices were added.
- Product `price_note` values still require CSV import/admin update to appear in production data.
- Existing RFQ baskets remain safe because `priceNote` is optional.
- CSV import/export support for `price_note` required no additional admin-side changes in this phase.

## Phase P3 — Catalog Expansion Preparation
- Audited the 44 missing old-site candidate products.
- Mapped available repository images for candidate rows.
- Created a ready-to-import CSV for safe products only.
- Created a needs-review CSV for products requiring image/confirmation.
- No fake prices were added.
- No products were imported automatically.
- No UI/RFQ/search/backend changes were made.
- No migration was added.
- Next step: admin dry-run import with **Create missing products** enabled for READY file only.
