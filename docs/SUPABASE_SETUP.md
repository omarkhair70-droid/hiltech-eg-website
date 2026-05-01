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
