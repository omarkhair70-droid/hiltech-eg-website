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

## Phase 26A public RFQ customer tracking

New routes:
- `GET /track`
- `POST /api/rfq/track`

Customer tracking input requirements:
- `request_code` (required)
- `phone_or_email` (required, must match original RFQ contact)

Security and data exposure notes:
- Tracking is handled server-side only through `SUPABASE_SERVICE_ROLE_KEY`.
- Do not use client-side Supabase for tracking.
- `SUPABASE_SERVICE_ROLE_KEY` remains server-only and must never be exposed in browser code.
- Public response is intentionally limited to safe fields only.
- No `internal_notes`, `project_notes`, `whatsapp_message`, phone/email, or item notes are returned.
- API responses are served with `Cache-Control: no-store`.

Database/migration note:
- No additional Supabase migration is required for Phase 26A.
- Tracking reads existing `rfq_requests` + `rfq_request_items` data.

## Phase 26B internal RFQ email notifications

Phase 26B adds best-effort internal email alerts after successful `POST /api/rfq` persistence.

### Required environment variables
- `EMAIL_PROVIDER` (set `resend` to enable sending)
- `RESEND_API_KEY`
- `RFQ_NOTIFY_FROM`
- `RFQ_NOTIFY_TO` (comma-separated recipients)
- `APP_BASE_URL` (example: `https://hiltech-eg.com`)

### Resend recommendations
- Recommended sender: `HILTECH RFQ <rfq@notify.hiltech-eg.com>`
- Recommended sending domain in Resend: `notify.hiltech-eg.com`
- DNS/domain verification in Resend is required before production sending.

### Behavior and reliability
- RFQ notification delivery is best-effort.
- RFQ database save remains the source of success.
- If email send fails, RFQ still saves and API returns success.
- Notification failures are logged server-side and written to RFQ notification audit fields when possible.

### Database migration
Run:
- `supabase/migrations/20260501190000_add_rfq_notification_audit.sql`

This adds optional audit columns on `rfq_requests`:
- `notification_attempted_at`
- `notification_sent_at`
- `notification_provider`
- `notification_message_id`
- `notification_error`

### Scope limits (Phase 26B)
- No customer confirmation email is sent in this phase.
- No Supabase Auth changes are included in this phase.

## Phase 29B migration note
- Added migration to extend `public.products` with optional inventory columns (`stock_status`, `stock_quantity`, `low_stock_threshold`, `inventory_notes`, `last_stock_checked_at`).
- Migration is non-destructive and uses `ADD COLUMN IF NOT EXISTS`, safe `CHECK` constraints, and a stock status index.
