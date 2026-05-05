# RFQ Admin Dashboard (Phase 25B)

## Routes
- `/admin/login`
- `/admin/rfq`
- `/admin/rfq/[id]`

## Required environment variables
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_DASHBOARD_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `ADMIN_SESSION_TTL_HOURS` (optional, default `12`)

## Setup steps
1. Run RFQ migrations including:
   - `supabase/migrations/20260501154500_create_rfq_intake.sql`
   - `supabase/migrations/20260501170000_add_rfq_admin_fields.sql`
2. Configure env vars in Vercel (Production and Preview) and local `.env.local`.
3. Generate `ADMIN_SESSION_SECRET` with a strong random value (example):
   - `openssl rand -base64 48`
4. Set a strong `ADMIN_DASHBOARD_PASSWORD` (not reused elsewhere).

## Security notes
- Admin auth uses server-only password verification and signed `httpOnly` cookie session.
- Cookie settings: `httpOnly`, `sameSite=lax`, `secure` in production, TTL (default 12h).
- Admin pages are dynamic and use no-store server fetches.
- `SUPABASE_SERVICE_ROLE_KEY` remains server-side only.

## Admin usage
1. Open `/admin/login` and sign in with admin password.
2. Open `/admin/rfq` to filter and review RFQ list.
3. Open a request detail page to:
   - review customer and item details,
   - copy stored WhatsApp message,
   - update status and internal notes.

## Future hardening path
- Move from shared password to Supabase Auth (staff users).
- Add per-user audit trail (who changed status and when).
- Add role-based permissions and optional IP allow-list.

## Phase 25C.1 Product admin foundation

- Product database schema and seed are added for upcoming admin workflows.
- Server-side product admin helpers are prepared in `lib/server/products-admin.ts`.
- Public `/products-partners` still reads static content in this phase.
- Planned UI routes for Phase 25C.2:
  - `/admin/products`
  - `/admin/products/new`
  - `/admin/products/[id]`

## Phase 25C.2 Product Admin UI

### New admin product routes
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]`

### Operations
- List/search/filter products by code/name/brand/category/status.
- Create new products with source defaulting to `admin`.
- Edit products and run quick status actions: hide, restore active, archive.
- Preview product image path when provided.

### Navigation
- `/admin/rfq` includes a shortcut to `/admin/products`.
- `/admin/products` includes a link back to `/admin/rfq`.

## Phase 26B - RFQ notification audit

RFQ detail (`/admin/rfq/[id]`) now includes notification audit metadata:
- Attempted at
- Sent at
- Provider
- Message ID
- Error

Notes:
- This metadata is internal/admin only.
- Email notifications are best-effort and non-blocking for RFQ creation.
- Missing/invalid email configuration should never prevent RFQ save success.

## Product Inventory Management
- In **Admin > Products**, admins can edit inventory fields in the **Inventory** section of the product form.
- Supported fields: stock status, stock quantity, low-stock threshold, internal inventory notes, and last stock checked date/time.
- Admin product list includes stock filters and stock columns for quick inventory tracking.
- Inventory notes and exact stock quantities are internal-only operational data.

## Public Analytics Boundary (Phase 29C)
- GA4 interaction events are implemented for public product/RFQ engagement analysis only.
- Admin dashboard routes and internal operational data are excluded from these analytics events.
- No admin notes, internal inventory fields, or dashboard actions are sent to GA.

## Phase 30A - RFQ Command Center usage
1. Open `/admin/rfq` and use quick filters (New/Pending, Urgent, High value, Waiting customer/supplier, Follow-up due).
2. Open an RFQ detail page to review request code, status, customer/project details, source, urgency, and requested items.
3. Set **Sales priority** to guide internal execution.
4. Set **Next follow-up date** to track callbacks and pending actions.
5. Add **Internal notes** (admin-only, never shown in customer tracking).
6. Use **Print RFQ Summary** for customer-facing output.
7. Use item inventory badges and stock context to prioritize availability checks before quotation.


## Phase 31A: RFQ Quotation Builder (Admin Only)
1. Open **/admin/rfq** and choose an RFQ row.
2. In RFQ Command Center, use **Quotation Builder**.
3. Set quotation status/currency/valid-until, then add item unit prices and line totals.
4. Add payment and delivery terms, optional admin quotation notes, discount, and tax.
5. Save as draft and verify subtotal/discount/tax/grand total.
6. Use **Print Quotation Draft** for a print-friendly draft.
7. Not public yet: quotation prices, quotation notes, and item quotation notes are not exposed on /track.

## Admin Executive Dashboard

### Route
- `/admin`

### Purpose
- Provide one-screen operational visibility for admins across:
  - RFQ volume and pipeline status
  - Sales workflow priorities (urgent/high value/waiting/follow-up due)
  - Quotation status distribution
  - Product inventory health

### Cards and metrics
- **RFQ Overview**: Total RFQs, New, In review, Quoted, Waiting client, Won, Closed/Lost.
- **Sales Workflow**: Urgent RFQs, High value RFQs, Waiting customer, Waiting supplier, Follow-up due.
- **Quotation Overview**: Not started, Draft, Ready, Sent, Revised, Cancelled.
- **Inventory Overview**: Total products, Active products, Low stock, Out of stock, Backorder, Unknown stock.

### Quick links
- RFQ shortcuts:
  - `/admin/rfq?quick=new_pending`
  - `/admin/rfq?quick=urgent`
  - `/admin/rfq?quick=high_value`
  - `/admin/rfq?quick=followup_due`
  - `/admin/rfq?quick=quotation_drafts`
  - `/admin/rfq?quick=quotation_ready`
- Product shortcuts:
  - `/admin/products`
  - `/admin/products?stock_status=low_stock`
  - `/admin/products?stock_status=out_of_stock`
  - `/admin/products?stock_status=backorder`

### Follow-up review workflow
1. Open `/admin` and review **Follow-up Due** count and table.
2. Open RFQ details from the table to update workflow status, notes, and next follow-up date.
3. Return to `/admin` to verify due queue reduction.

### Inventory attention workflow
1. Open `/admin` and review **Inventory Attention** table.
2. Open product edit from each row.
3. Update stock status/threshold/quantity in Product Admin.
4. Return to `/admin` to confirm attention list is resolved.

### Connection with existing admin tools
- `/admin` acts as the executive entry point.
- RFQ operations continue in **RFQ Command Center** (`/admin/rfq` and `/admin/rfq/[id]`).
- Product operations continue in **Product Admin** (`/admin/products` and `/admin/products/[id]`).
\n\n## Product CSV Import / Export (Phase 31C)\n- Open: Admin Dashboard → Product CSV Import / Export, or `/admin/products/import-export`.\n- Export: Click **Export products CSV** to download current product/catalog + inventory data.\n- Template: Click **Download template CSV** for required headers and sample rows.\n- Edit: Open in Excel/Google Sheets, keep header names unchanged, edit product rows.\n- Dry run: Upload CSV with **Dry run** checked to validate without writing changes.\n- Apply: Uncheck **Dry run** and run import to write updates/creates.\n- Required key column: `product_code` (primary match key).\n- Safety: No product deletions, admin-only access, and friendly validation errors for invalid rows.\n


## Phase 31D - Quote Publish & Customer Response
1. Prepare quotation draft values in RFQ detail.
2. Set quotation status to **ready**.
3. In **Customer Quote Visibility & Response**, enable quote visibility and optionally add a public message.
4. Save visibility to publish (or disable to hide again).
5. Monitor customer response status/notes/timestamps in the same RFQ detail panel.

### Public vs Admin-only
- Public: quote summary, quoted prices/totals, terms, validity, public message.
- Admin-only: internal_notes, inventory notes, stock quantities/thresholds, provider error fields.

## Phase 32D.1 - GA4 Analytics Snapshot (Admin Only)

### What this adds
- `/admin` now includes a **Website Analytics** section that reads aggregated GA4 metrics server-side.
- This section is admin-only and read-only.
- Public GA tracking behavior remains unchanged, including the `/admin` exclusion in `components/GoogleAnalytics.tsx`.

### Required environment variables
- `GA4_PROPERTY_ID` (numeric GA4 Property ID, e.g. `535802726`)
- `GA_OAUTH_CLIENT_ID`
- `GA_OAUTH_CLIENT_SECRET`
- `GA_OAUTH_REFRESH_TOKEN`

Do **not** use service-account variables (`GA_CLIENT_EMAIL`, `GA_PRIVATE_KEY`) for this phase.

### OAuth setup steps
1. In Google Cloud Console, enable **Google Analytics Data API**.
2. Configure the OAuth consent screen for the Google account that already has access to the GA4 property.
3. Create an OAuth **Client ID** and **Client Secret**.
4. Open OAuth Playground and generate a refresh token using scope:
   - `https://www.googleapis.com/auth/analytics.readonly`
5. Add these env vars in Vercel (Production + Preview):
   - `GA4_PROPERTY_ID`
   - `GA_OAUTH_CLIENT_ID`
   - `GA_OAUTH_CLIENT_SECRET`
   - `GA_OAUTH_REFRESH_TOKEN`
6. Redeploy the project.

### Failure behavior
- If GA env vars are missing, the admin UI shows: **Google Analytics is not configured.**
- If the GA API is temporarily unavailable, the admin UI shows: **Analytics data is temporarily unavailable.**
- `/admin` continues loading operational dashboard cards even if analytics data fails.

## Phase 32D.2 - Admin Analytics Pro

### Route
- `/admin/analytics`

### Purpose
- Dedicated analytics dashboard for admin users with aggregated public-site GA4 data.
- `/admin` remains the executive overview and now links to **Advanced Analytics**.

### What it shows
- Date ranges via query param: `?range=7`, `?range=30` (default), `?range=90`.
- KPI cards: active users, sessions, page views, event count, RFQ submit success, quote viewed, quote response submitted.
- RFQ funnel event progression with simple drop-off percentages and bar visualization.
- Top pages, traffic sources, audience snapshot (countries and devices), and key event tables.
- Rule-based insights panel using only aggregated counts.

### Environment variables (reused from Phase 32D.1)
- `GA4_PROPERTY_ID`
- `GA_OAUTH_CLIENT_ID`
- `GA_OAUTH_CLIENT_SECRET`
- `GA_OAUTH_REFRESH_TOKEN`

### Privacy guardrails
- OAuth credentials remain server-only.
- Analytics output is aggregated only (no personal data).
- No request codes, names, emails, phones, notes, internal notes, or other admin-only operational fields are exposed.
- Public tracking behavior is unchanged, including `/admin` exclusion in `components/GoogleAnalytics.tsx`.

### Database / migration note
- No Supabase migration is required for this phase.
