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
