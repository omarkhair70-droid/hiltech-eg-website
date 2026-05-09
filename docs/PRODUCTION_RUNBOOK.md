# HILTECH Production Runbook

## 1) Purpose

This runbook explains how to deploy, verify, and operate HILTECH production for the public website, RFQ flows, tracking, and admin operations.

## 2) Required access

Before operating production, confirm access to:
- GitHub repository (`omarkhair70-droid/hiltech-eg-website`)
- Vercel project (production + preview environments)
- Supabase project (database + SQL + API settings)
- Domain/DNS provider for `hiltech-eg.com`
- Email provider account (if notifications are enabled)
- Admin credentials (password/session secret managed securely)
- Analytics account/access (if analytics integrations are enabled)

## 3) Environment variable checklist

### Public/site

| Variable | Required | Scope | Purpose | Verification |
|---|---|---|---|---|
| `APP_BASE_URL` | Yes | Server-only | Canonical site base URL used in server-side links. | Confirm it is `https://hiltech-eg.com` (or approved canonical domain). |

### Supabase

| Variable | Required | Scope | Purpose | Verification |
|---|---|---|---|---|
| `SUPABASE_URL` | Yes | Server-only | Supabase endpoint for products/RFQ/admin operations. | Admin pages and RFQ persistence work in smoke test. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only | Privileged server key for writes/admin/tracking queries. | RFQ submit + admin views succeed; key is never client-exposed. |
| `PRODUCTS_DB_PUBLIC_MODE` | No | Server-only | Controls DB-first public products behavior/fallback strategy. | `/products-partners` uses intended source mode without errors. |

### Admin/session

| Variable | Required | Scope | Purpose | Verification |
|---|---|---|---|---|
| `ADMIN_DASHBOARD_PASSWORD` | Yes | Server-only | Password for current admin login flow. | `/admin/login` accepts valid credential and rejects invalid one. |
| `ADMIN_SESSION_SECRET` | Yes | Server-only | Secret for signing admin session token. | Login persists session and protected admin routes load. |
| `ADMIN_SESSION_TTL_HOURS` | No | Server-only | Session TTL override (default `12`). | Session expiry behavior matches configured value. |

### Email/notifications

| Variable | Required | Scope | Purpose | Verification |
|---|---|---|---|---|
| `EMAIL_PROVIDER` | No | Server-only | Enables/configures notification provider behavior. | RFQ submit logs expected provider path. |
| `RESEND_API_KEY` | Conditional | Server-only | Credential for Resend integration. | Notification send succeeds when Resend is enabled. |
| `RFQ_NOTIFY_FROM` | Conditional | Server-only | Notification sender address. | Outbound message has correct sender. |
| `RFQ_NOTIFY_TO` | Conditional | Server-only | Internal notification recipients. | Internal team receives RFQ notification. |

### Analytics

| Variable | Required | Scope | Purpose | Verification |
|---|---|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Public | Client-side GA measurement ID. | Browser network/GA debug confirms pageview events. |
| `GA4_PROPERTY_ID` | No | Server-only | GA property for admin reporting integrations. | Admin analytics/report sections load expected data. |
| `GA_OAUTH_CLIENT_ID` | No | Server-only | OAuth client for GA server calls. | Server-side analytics integration authenticates. |
| `GA_OAUTH_CLIENT_SECRET` | No | Server-only | OAuth secret for GA server calls. | Token exchange/refresh works without auth error. |
| `GA_OAUTH_REFRESH_TOKEN` | No | Server-only | Refresh token for GA API access. | Admin GA fetch succeeds without manual re-auth. |

## 4) Deployment checklist

1. Pull latest `main` and verify target commit.
2. Confirm production env vars in Vercel are present and scoped correctly.
3. Run local checks:
   - `npm run lint`
   - `npm run build`
4. Merge/deploy to Vercel.
5. Verify deployment reached production.
6. Verify domain resolution for `hiltech-eg.com`.
7. Verify SSL certificate is active.
8. Verify canonical URL behavior and metadata URL consistency.

## 5) Production smoke test

### Public pages
- `/` (Home)
- `/products-partners` (Products)
- `/products-partners/[productCode]` (Product detail)
- `/rfq` (RFQ review)
- `/track` (RFQ tracking)
- `/contact` (Contact)
- `/work` (Work)
- `/company` (Company)

### RFQ flow checks
1. Add a product to RFQ basket from catalog.
2. Submit with missing required fields and verify validation errors.
3. Submit valid RFQ and verify success response/reference.
4. Copy RFQ reference shown in success UI.
5. Track using email path.
6. Track using local Egyptian phone format (e.g., `01...`).
7. Track using international Egyptian format (e.g., `+20...` or `0020...` as applicable).

### Admin checks
1. Login via `/admin/login`.
2. Open RFQ admin and confirm new request visibility.
3. Update RFQ status and verify persistence.
4. Run product export.
5. Do **not** run product import in production unless explicitly planned and backed up.

## 6) RFQ flow test details (expected behavior)

- Missing required fields return clear field-level/form-level validation messages.
- Successful submission returns a usable RFQ reference for follow-up.
- Tracking by email should locate the matching RFQ when identifiers match.
- Tracking by Egyptian phone should normalize local/international variants and still resolve the same RFQ when number equivalence exists.
- RFQ basket should persist through intended client flow until cleared/edited.
- Admin views should show submitted RFQ with core details and current status.

## 7) Email notification test

If email provider is configured:
1. Submit a new RFQ.
2. Confirm internal notification delivery to `RFQ_NOTIFY_TO` recipients.
3. Confirm sender uses `RFQ_NOTIFY_FROM`.

If email is **not** configured:
- RFQ submission should still succeed.
- System should degrade gracefully (no crash) and log/report notification unavailability.

## 8) Supabase checks

- Products query returns records for public catalog.
- RFQ submissions persist to Supabase tables.
- Tracking endpoint reads RFQ records correctly.
- `SUPABASE_SERVICE_ROLE_KEY` is never exposed in client JavaScript or public HTML.

## 9) Domain / SEO checklist

- `hiltech-eg.com` is connected and primary.
- SSL is valid and active.
- `https://hiltech-eg.com/sitemap.xml` resolves correctly.
- `https://hiltech-eg.com/robots.txt` is present and includes intended blocking for `/admin` and `/api`.
- Metadata and OG preview render expected title/description/image.
- Google Search Console setup/submission is optional but recommended post-launch.

## 10) Rollback plan

1. In Vercel, promote/redeploy the last known good deployment.
2. If issue came from recent merge, revert the latest PR and redeploy.
3. Do **not** use database row deletion as rollback strategy.
4. Before any product import operation, export and keep a backup artifact.

## 11) Common failure cases

- **Missing Supabase env vars:** RFQ/admin/tracking failures or configuration errors.
- **Admin login fails:** wrong password, missing `ADMIN_SESSION_SECRET`, cookie/session issues.
- **RFQ submit fails:** API/server validation errors, Supabase write failure, malformed payload.
- **Tracking mismatch:** reference/email/phone mismatch or normalization differences.
- **Email notification fails:** provider key/from/to missing or provider outage.
- **Product catalog fallback behavior:** DB mode unavailable leading to limited/static fallback behavior (as configured).
- **Vercel warning vs failure:** lint/runtime warnings may be non-blocking; build errors are blocking and must be fixed before launch.

## 12) Final launch sign-off checklist

- [ ] `npm run build` passes for release commit.
- [ ] RFQ submit flow tested end-to-end.
- [ ] Tracking tested via email and phone variants.
- [ ] Admin login and RFQ management tested.
- [ ] Mobile QA completed for core public + RFQ pages.
- [ ] Domain, SSL, canonical URL, sitemap, robots verified.
- [ ] Product backup export downloaded before any import activity.

## Final 10/10 Smoke Test Checklist

### Public Website
- [ ] Home opens on https://hiltech-eg.com
- [ ] Hero CTA goes to /rfq
- [ ] Work CTA goes to /rfq
- [ ] Contact shows Call / WhatsApp / Email clearly
- [ ] Products search works
- [ ] Product category deep links work

### RFQ
- [ ] Add product to basket
- [ ] Review basket
- [ ] Submit missing fields → inline errors
- [ ] Submit valid RFQ
- [ ] Copy reference
- [ ] Send WhatsApp
- [ ] Track by email
- [ ] Track by local Egyptian phone
- [ ] Track by international Egyptian phone

### Admin
- [ ] Wrong password rate limited after attempts
- [ ] Correct login works
- [ ] New RFQ visible
- [ ] Status update works
- [ ] Quote visibility does not leak admin notes

### Technical
- [ ] /sitemap.xml works
- [ ] /robots.txt blocks /admin and /api
- [ ] npm run lint passes
- [ ] npm run build passes
- [ ] No horizontal overflow at 360px, 390px, 430px

## B3B Operational Notes
- Analytics environment variables are optional; site conversion events fail safely/no-op when GA is not configured.
- Real assets must be explicitly approved before any "real project" wording is published.
- Revisit `docs/PERFORMANCE_AUDIT.md` after approved client assets are delivered and re-run performance checks.

## B3C final QA and production verification notes

- Final mobile QA output is documented in `docs/MOBILE_QA_REPORT.md`.
- Final production smoke record is documented in `docs/PRODUCTION_SMOKE_TEST_RESULTS.md`.
- Rate limiting is present for sensitive flows, but if the deployed limiter is in-memory (single-instance MVP behavior), it is not a distributed guarantee under horizontal scaling.
- For production-grade abuse protection, migrate rate limiting to a shared/distributed backend (e.g., Redis/Upstash) before high-traffic scaling.
- Real asset/public-proof wording must remain approval-gated; keep illustrative disclaimers until rights-cleared client assets are delivered.
- Company profile PDF must only be linked when the approved file is present in production assets.
- Email notification checks (Resend or other provider) require live provider credentials and manual confirmation.
- Post-launch SEO operations still require manual checks: Google Search Console ownership, sitemap submission, canonical verification, domain redirect consistency, and SSL status validation.

## Final handoff verification files

- `docs/MOBILE_QA_REPORT.md`
- `docs/PRODUCTION_SMOKE_TEST_RESULTS.md`
- `docs/REAL_ASSETS_NEEDED.md`
- `docs/PERFORMANCE_AUDIT.md`

## Bilingual QA (BIL1)
- Verify `/` and `/ar` both load correctly.
- Verify language switcher keeps same page when toggling languages.
- Verify `/ar/rfq` and `/ar/track` do not 404.
- Verify Admin remains English (`/admin/login`).

## BIL2 QA
- Add product from `/ar/products-partners`.
- Open `/ar/rfq` and confirm basket appears.
- Validate required fields in Arabic.
- Confirm success state Arabic.
- Confirm `/ar/track` link from RFQ success.
- Confirm English `/products-partners` and `/rfq` still work.


## EAA5.2 Production Supabase hardening
- Production Supabase hardening added.
- Admin error boundary added (`/app/admin/error.tsx`).
- Safe diagnostics endpoint added (`/api/admin/diagnostics`) with boolean-only config checks.
- Production can stay on `ADMIN_AUTH_MODE=legacy` while Preview tests `supabase`.
- Do not enable Production supabase until `/admin/login`, `/admin/rfq`, `/admin/users`, `/admin/audit` work and `/api/admin/diagnostics` returns expected booleans.
- Rollback remains `ADMIN_AUTH_MODE=legacy`.
