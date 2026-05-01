# Supabase Setup for RFQ Intake (Phase 25A)

## Purpose
Phase 25A adds backend persistence for `/rfq` submissions while preserving WhatsApp and copy-message flows.

## Required Supabase project
Create a Supabase project and run the RFQ intake migration:

- `supabase/migrations/20260501154500_create_rfq_intake.sql`

This creates:
- `rfq_requests` (header/customer submission)
- `rfq_request_items` (line items per request)

## Required Vercel environment variables
Set these in Vercel Project Settings → Environment Variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

> `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed client-side.

## RLS and service-role note
RLS is enabled on both RFQ tables by migration.

Phase 25A writes through a Next.js server route (`/api/rfq`) using the service role key. No public insert policy is required for this phase.

## Local development
1. Add env vars to local `.env.local`:
   - `SUPABASE_URL=...`
   - `SUPABASE_SERVICE_ROLE_KEY=...`
2. Run dev server normally.
3. Submit from `/rfq`.

## Failure fallback behavior
If env vars are missing or backend write fails:
- API returns controlled JSON error.
- `/rfq` UI shows a friendly non-blocking message.
- User can still use:
  - WhatsApp HILTECH
  - Copy RFQ Message

## Future path (Phase 25B)
- Add internal RFQ dashboard
- Add status workflow management
- Add filtering/search
- Add operator notes/actions

## Phase 25B Admin Dashboard setup

New environment variables:
- `ADMIN_DASHBOARD_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `ADMIN_SESSION_TTL_HOURS` (optional, default `12`)

Run migration:
- `supabase/migrations/20260501170000_add_rfq_admin_fields.sql`

Security notes:
- Admin pages are protected behind `/admin/login`.
- Session is a signed `httpOnly` cookie (secure in production, sameSite=lax).
- Service role key remains server-only.

## Phase 25C.1 Product database foundation

Run product migrations:
- `supabase/migrations/20260501182000_create_products.sql`
- `supabase/migrations/20260501183000_seed_products_from_static.sql`

This adds `public.products` for future admin-managed catalog operations while keeping the public catalog static in Phase 25C.1.

Security note:
- RLS is enabled on `public.products`.
- No public write policies are created in this phase.
- Admin/server-side writes continue using `SUPABASE_SERVICE_ROLE_KEY` only.

Future (optional) public read hardening:
- Add anon `SELECT` policy limited to `status = 'active'` when public catalog reads are migrated to DB.

No new required env vars in this phase:
- Required: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- Optional future flags (not required now): `PRODUCTS_DB_ENABLED`, `PRODUCTS_DB_PUBLIC_MODE`

## Phase 25C.3 public products read mode

Public catalog mode is controlled by:
- `PRODUCTS_DB_PUBLIC_MODE`

Allowed values:
- `static` (default)
- `db_with_fallback`

Behavior:
- `static`: `/products-partners` uses static `content/products.ts`.
- `db_with_fallback`: server-side read from `public.products` (active only). If unavailable/empty/error, static fallback is used automatically.

No new required env vars were added for this phase.
Still required:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Operational note:
- After changing Vercel env vars, redeploy is required.
- In DB mode, products with status `hidden`/`archived` are not shown publicly.
