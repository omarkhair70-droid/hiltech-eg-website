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
