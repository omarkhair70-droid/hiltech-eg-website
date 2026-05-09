# HILTECH Egypt Website & RFQ Platform

HILTECH Egypt (`hiltech-eg.com`) is a production Next.js platform for public corporate presence **and** RFQ operations. It supports digital discovery, product exploration, RFQ capture, RFQ tracking, and internal admin workflows for network infrastructure projects in Egypt.

This is **not** a static-only marketing site. The current implementation includes live application behavior backed by Supabase and operational admin tooling.

## Project overview

HILTECH serves B2B infrastructure demand across:
- Network infrastructure
- Fiber optic systems
- Structured cabling
- Cabinets/racks and accessories
- Testing and validation workflows
- RFQ intake and follow-up coordination in Egypt

## Tech stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data backend:** Supabase (products, RFQ, tracking, admin reporting data)
- **Deployment:** Vercel
- **Optional integrations:** Resend email notifications, Google Analytics (public + admin insights)

## Main features

### Public website
- Homepage and corporate pages (`/`, `/services`, `/company`, `/work`, `/about`, `/contact`, etc.)
- Product catalog and category browsing (`/products-partners`)
- Product detail pages (`/products-partners/[productCode]`)
- Product intelligence and solutions content

### RFQ flow
- RFQ basket (add/edit/remove quantities + notes)
- RFQ review page (`/rfq`)
- RFQ submission API (`/api/rfq`)
- RFQ reference generation and confirmation
- RFQ tracking page (`/track`) + API (`/api/rfq/track`)

### Admin operations
- Admin login/session flow
- Admin dashboard and RFQ management (`/admin`, `/admin/rfq`)
- RFQ reports/insights/sales views (`/admin/reports`, `/admin/insights`, `/admin/sales`, `/admin/analytics`)
- Product admin + CSV import/export (`/admin/products` and related routes)

## Environment variables

> Never commit secrets. Use `.env.local` for local development and Vercel Environment Variables for production.

### Public/site

| Variable | Required | Scope | Purpose | Production note |
|---|---|---|---|---|
| `APP_BASE_URL` | Required | Server-only | Base URL used in server-side links/notifications (example: canonical site URL). | Must match the live canonical domain and use `https`. |

### Supabase

| Variable | Required | Scope | Purpose | Production note |
|---|---|---|---|---|
| `SUPABASE_URL` | Required | Server-only | Supabase project URL used by server-side data access. | Required for RFQ persistence, tracking, and admin data operations. |
| `SUPABASE_SERVICE_ROLE_KEY` | Required | Server-only | Supabase privileged key for server-side/admin operations. | Never expose in client code or browser runtime. |
| `PRODUCTS_DB_PUBLIC_MODE` | Optional | Server-only | Feature flag controlling public product source behavior (DB-first/fallback mode). | Keep aligned with launch strategy; document chosen mode per deployment. |

### Admin/session

| Variable | Required | Scope | Purpose | Production note |
|---|---|---|---|---|
| `ADMIN_DASHBOARD_PASSWORD` | Required | Server-only | Password checked by current MVP admin login flow. | Store securely; rotate if shared beyond core operators. |
| `ADMIN_SESSION_SECRET` | Required | Server-only | Secret used to sign/verify admin session tokens. | Use a strong random secret in production. |
| `ADMIN_SESSION_TTL_HOURS` | Optional | Server-only | Session lifetime in hours (default is `12`). | Set lower for stricter security posture. |

### Email/notifications (optional)

| Variable | Required | Scope | Purpose | Production note |
|---|---|---|---|---|
| `EMAIL_PROVIDER` | Optional | Server-only | Selects server email provider implementation. | If unset/misconfigured, RFQ capture should continue without email delivery. |
| `RESEND_API_KEY` | Optional* | Server-only | API key for Resend when Resend is selected. | Required when `EMAIL_PROVIDER` targets Resend. |
| `RFQ_NOTIFY_FROM` | Optional* | Server-only | Sender address for internal RFQ notifications. | Required for successful outbound notification send. |
| `RFQ_NOTIFY_TO` | Optional* | Server-only | Comma-separated internal recipient list for RFQ alerts. | Required for successful outbound notification send. |

### Analytics (optional)

| Variable | Required | Scope | Purpose | Production note |
|---|---|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Public | Google Analytics measurement ID for client-side page analytics. | Public by design (`NEXT_PUBLIC_*`), but should be production property ID only. |
| `GA4_PROPERTY_ID` | Optional | Server-only | GA4 property used by admin analytics reporting utilities. | Needed only for admin-side GA pulls. |
| `GA_OAUTH_CLIENT_ID` | Optional | Server-only | OAuth credential for GA admin integrations. | Keep secret in Vercel only. |
| `GA_OAUTH_CLIENT_SECRET` | Optional | Server-only | OAuth secret for GA admin integrations. | Keep secret in Vercel only. |
| `GA_OAUTH_REFRESH_TOKEN` | Optional | Server-only | Refresh token used for server-side GA API access. | Rotate if compromised and re-verify dashboards. |

\* Optional for app boot, but required if email notifications are expected to send successfully.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create local env file:
   ```bash
   cp .env.example .env.local
   ```
   If `.env.example` is unavailable, create `.env.local` manually and define the variables listed above.
3. Run development server:
   ```bash
   npm run dev
   ```
4. Run quality/build checks:
   ```bash
   npm run lint
   npm run build
   ```

## Production deployment (Vercel)

1. Push the target branch and open/merge PR.
2. In Vercel project settings, configure all required environment variables for the target environment.
3. Confirm the production domain/canonical URL is correct (`APP_BASE_URL` and site domain settings).
4. Trigger deployment (automatic on merge to main, or manual redeploy if required).
5. Verify build status in Vercel logs.
6. Run post-deploy smoke test (public pages, RFQ, tracking, admin).

**Build command:**
```bash
npm run build
```

## RFQ test flow (minimum functional check)

1. Browse to product catalog and add at least one product to RFQ basket.
2. Open RFQ review and confirm item/quantity rendering.
3. Submit RFQ with valid details.
4. Copy/save generated RFQ reference.
5. Open tracking page and query by email/phone + reference path as implemented.
6. Confirm RFQ appears in admin and is visible for follow-up/status updates.

## Admin access model (current MVP)

- Current admin entry uses a password + signed session-secret model (environment-driven).
- Credentials are **not** stored in repository and must be managed out-of-band.
- This model is launch-pragmatic and should be hardened post-launch.

Recommended hardening roadmap:
- Supabase Auth-based operator identities
- Role-based access control (RBAC)
- Audit trail for admin actions
- MFA/2FA for admin users
- Optional IP allow-listing for admin routes

## Known warnings / non-blocking notes

- Next.js may emit warning(s) related to raw `<img>` usage in admin image preview flows during lint/build; review warnings but distinguish from blocking build failures.
- If Supabase is unavailable or env configuration is incomplete, parts of the product/RFQ/admin experience may fall back to limited behavior and/or show configuration errors rather than full data-backed functionality.

## Additional operations docs

- `docs/PRODUCTION_RUNBOOK.md` — deployment, smoke tests, failure handling, rollback
- `docs/CLIENT_HANDOFF.md` — phase-by-phase client handoff log
- `docs/SUPABASE_SETUP.md` — Supabase setup and backend notes
