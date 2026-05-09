# EAA1 — Enterprise Admin Auth Audit & Migration Plan

## Scope and Constraints (EAA1)

This document is Phase 0 (audit/planning only) for Enterprise Admin Auth.

- No runtime/auth behavior changes are implemented in EAA1.
- No schema changes or migrations are implemented in EAA1.
- No Supabase Auth implementation is added in EAA1.
- No roles enforcement, admin users UI, or audit tables are added in EAA1.

## Current Admin Auth System

### Current login flow
1. `POST /api/admin/login` receives form data from `/admin/login` with `password`.
2. A per-IP login limiter runs first (`maxRequests: 5` in `10` minutes).
3. System checks whether both `ADMIN_SESSION_SECRET` and `ADMIN_DASHBOARD_PASSWORD` are configured.
4. Shared admin password is validated by direct string equality against `ADMIN_DASHBOARD_PASSWORD`.
5. On success, response redirects to `/admin/rfq` and sets signed admin session cookie.
6. On failure, redirects back to `/admin/login` with query error (`rate_limited`, `config`, `invalid`).

### Environment variables currently used
- `ADMIN_SESSION_SECRET` (session-signing HMAC key).
- `ADMIN_DASHBOARD_PASSWORD` (shared admin password).
- `ADMIN_SESSION_TTL_HOURS` (session lifetime override; defaults to 12 hours).
- `NODE_ENV` (controls cookie `secure` flag in production).

### Shared password validation
- Implemented by `validateAdminPassword(password)` in `lib/server/admin-auth.ts`.
- Uses exact equality (`password === expected`) against `ADMIN_DASHBOARD_PASSWORD`.

### Session/cookie implementation
- Cookie name: `hiltech_admin_session`.
- Token format: `<expiresAtMs>.<hmac_sha256_signature_base64url>`.
- Signature: HMAC-SHA256 over payload (`expiresAt`) using `ADMIN_SESSION_SECRET`.
- Verification checks signature length and constant-time equality using `timingSafeEqual`, then expiry.

### Cookie flags currently visible
- `httpOnly: true`
- `sameSite: 'lax'`
- `secure: process.env.NODE_ENV === 'production'`
- `path: '/'`
- `maxAge: getSessionTtlSeconds()` for login cookie, `maxAge: 0` for cleared cookie.

### Session TTL
- TTL source: `ADMIN_SESSION_TTL_HOURS` (default `12`).
- Effective maxAge: hours × 3600 seconds.

### Logout flow
- `POST /api/admin/logout` redirects to `/admin/login` and overwrites admin cookie with cleared cookie (`maxAge: 0`).

### Rate limiting behavior
- Implemented via in-memory `Map` (`lib/server/rate-limit.ts`), keyed as `admin-login:<client_ip>`.
- Client IP uses `x-forwarded-for` first entry, then `x-real-ip`, fallback `unknown`.
- On rate-limit hit, login route returns redirect and `Retry-After` header.
- In-code TODO notes this is MVP and should later move to distributed store (e.g., Redis/Upstash).

### How admin pages check authentication
- Most admin pages and server actions call `requireAdminSession()`.
- `requireAdminSession()` calls `isAdminAuthenticated()` and redirects to `/admin/login` when invalid.
- Some admin API routes use `isAdminAuthenticated()` directly and return `401` JSON when unauthorized.

### Unauthenticated visit to `/admin`
- `/admin` page calls `requireAdminSession()`, so unauthenticated users are redirected to `/admin/login`.

### Current no-store/cache behavior
- Admin pages generally set `dynamic = 'force-dynamic'` and `revalidate = 0`.
- Multiple admin server data fetchers use `fetch(..., { cache: 'no-store' })`.
- Report export route sets `Cache-Control: no-store` on CSV response.

## Current Admin Route Map

| Route / File | Purpose | Current auth check | Sensitive actions | Notes |
| ------------ | ------- | ------------------ | ----------------- | ----- |
| `/admin` (`app/admin/page.tsx`) | Executive admin dashboard (RFQ/sales/product/analytics overview) | `requireAdminSession()` redirect-based guard | Read-only dashboard view over RFQ, sales, product summaries | Shows customer/company names and business metrics; dynamic/no-cache rendering |
| `/admin/login` (`app/admin/login/page.tsx`) | Legacy shared-password login form | Redirects to `/admin/rfq` if already authenticated (`isAdminAuthenticated`) | Authentication attempt entrypoint | Displays config warning if required env vars missing |
| `/api/admin/login` (`app/api/admin/login/route.ts`) | Handles login submit | Rate-limit + config check + shared-password validation | Creates authenticated admin session cookie | Mutation: session creation |
| `/api/admin/logout` (`app/api/admin/logout/route.ts`) | Handles logout | No pre-check; always clears cookie | Clears authenticated session | Mutation: session invalidation |
| `/admin/rfq` (`app/admin/rfq/page.tsx`) | RFQ dashboard/list and filters | `requireAdminSession()` | Read access to RFQ pipeline/customer request data | Includes status/priority/quote state visibility |
| `/admin/rfq/[id]` (`app/admin/rfq/[id]/page.tsx`) | RFQ detail + workflow and quote operations | `requireAdminSession()` (page + server actions) | Mutation-capable: update RFQ status/priority/follow-up/internal notes; create/edit quote draft data; publish/hide quote to customer | Contains customer details/internal notes and quote-related controls |
| `/api/admin/rfq` (`app/api/admin/rfq/route.ts`) | RFQ list API | `isAdminAuthenticated()` with 401 JSON | Read-only API query of RFQ records | Exposes admin RFQ JSON payload to authenticated admin clients |
| `/api/admin/rfq/[id]` (`app/api/admin/rfq/[id]/route.ts`) | RFQ detail API + workflow patch API | `isAdminAuthenticated()` with 401 JSON | `PATCH` mutates RFQ workflow/internal notes; `GET` reads RFQ detail | Mutation API path for status/priority/follow-up/notes |
| `/admin/actions` (`app/admin/actions/page.tsx`) | Action center for operational follow-ups | `requireAdminSession()` | Read-only operational action visibility | Contains potentially sensitive operational queues |
| `/admin/sales` (`app/admin/sales/page.tsx`) | Sales dashboard | `requireAdminSession()` | Read-only sales/business reporting | Sensitive business performance data |
| `/admin/analytics` (`app/admin/analytics/page.tsx`) | Website analytics dashboard | `requireAdminSession()` | Read-only analytics view | Business/traffic intelligence |
| `/admin/insights` (`app/admin/insights/page.tsx`) | Admin insight recommendations | `requireAdminSession()` | Read-only insights | Business decision support data |
| `/admin/reports` (`app/admin/reports/page.tsx`) | Reports & export center UI | `requireAdminSession()` | Read views + triggers exports | Sensitive downloadable operational/customer/product summaries |
| `/api/admin/reports/export` (`app/api/admin/reports/export/route.ts`) | CSV export API for reports | `requireAdminSession()` | Mutation-like data exfiltration (exports) | Returns CSV with `Cache-Control: no-store` |
| `/admin/products` (`app/admin/products/page.tsx`) | Product admin list | `requireAdminSession()` | Read product catalog/inventory status | Sensitive catalog operations context |
| `/admin/products/new` (`app/admin/products/new/page.tsx`) | Create product page | `requireAdminSession()` | Mutation entrypoint for product create | Uses server action from `app/admin/products/actions.ts` |
| `/admin/products/[id]` (`app/admin/products/[id]/page.tsx`) | Edit product page | `requireAdminSession()` | Mutation entrypoint for product update/status change | Handles inventory and merchandising fields |
| `app/admin/products/actions.ts` | Server actions for product create/update/status | `requireAdminSession()` per action | Mutations: create product, update product, update status | Core mutation path for product admin |
| `/admin/products/import-export` (`app/admin/products/import-export/page.tsx`) | CSV import/export UI | `requireAdminSession()` | Import/export workflow access | High sensitivity: bulk catalog changes and extraction |
| `/admin/products/import` (`app/admin/products/import/route.ts`) | Product CSV import API | `requireAdminSession()` | Mutation: bulk product import/update | Supports dry-run and create-missing toggles |
| `/admin/products/export` (`app/admin/products/export/route.ts`) | Product CSV export API | `requireAdminSession()` | Data export | Sensitive bulk product extraction |
| `/admin/products/template` (`app/admin/products/template/route.ts`) | CSV template download API | `requireAdminSession()` | Export template (non-sensitive sample) | Still admin-only route |
| `/admin/products/analytics` (`app/admin/products/analytics/page.tsx`) | Product analytics dashboard | `requireAdminSession()` | Read-only analytics | Demand/inventory intelligence |
| `/admin/products/image-preview.tsx` | Admin image preview helper component | Inherits parent page auth context | Read-only media preview in admin workflows | Not a standalone route handler |

## Sensitive Admin Actions Inventory

| Domain | Action | Current location | Future permission | Audit event |
| ------ | ------ | ---------------- | ----------------- | ----------- |
| Auth | login success | `app/api/admin/login/route.ts` | `settings:manage` (interim auth-admin control); later dedicated auth scope optional | `admin.login.success` |
| Auth | login failed | `app/api/admin/login/route.ts` | `settings:manage` (interim) | `admin.login.failed` |
| Auth | logout | `app/api/admin/logout/route.ts` | `rfq:view` minimum authenticated session (or general `admin:access`) | `admin.logout` |
| RFQ | view RFQ list/details | `app/admin/rfq/page.tsx`, `app/admin/rfq/[id]/page.tsx`, `/api/admin/rfq*` | `rfq:view` | `rfq.viewed` (new recommendation) |
| RFQ | update status | `app/admin/rfq/[id]/page.tsx` server action; `app/api/admin/rfq/[id]/route.ts` PATCH | `rfq:update` | `rfq.status.updated` |
| RFQ | update priority | same as above | `rfq:update` | `rfq.priority.updated` |
| RFQ | update follow-up | same as above | `rfq:update` | `rfq.follow_up.updated` |
| RFQ | update internal notes | same as above | `rfq:update` | `rfq.internal_notes.updated` |
| RFQ | view customer contact details | RFQ list/detail admin pages | `rfq:view` | `rfq.customer_contact.viewed` (new recommendation) |
| Quotes | create quote | `quotationAction` in `app/admin/rfq/[id]/page.tsx` | `quote:create` | `rfq.quote.created` |
| Quotes | edit quote | `quotationAction` in `app/admin/rfq/[id]/page.tsx` | `quote:create` | `rfq.quote.updated` |
| Quotes | publish quote to customer | `quoteVisibilityAction` in `app/admin/rfq/[id]/page.tsx` | `quote:publish` | `rfq.quote.published` |
| Quotes | hide/unpublish quote | `quoteVisibilityAction` in `app/admin/rfq/[id]/page.tsx` | `quote:publish` | `rfq.quote.hidden` |
| Quotes | review quote response | RFQ detail surfaces quote response fields | `rfq:view` (or future `quote:view_response`) | `rfq.quote.response_reviewed` |
| Products | create product | `createProductAction` in `app/admin/products/actions.ts` | `product:update` | `product.created` |
| Products | update product | `updateProductAction` in `app/admin/products/actions.ts` | `product:update` | `product.updated` |
| Products | change product status | `updateProductStatusAction` in `app/admin/products/actions.ts` | `product:update` | `product.updated` (or `product.status.changed`) |
| Products | update inventory/stock | product update action payload fields | `product:update` | `product.inventory.updated` (new recommendation) |
| Products | CSV import | `app/admin/products/import/route.ts` | `product:import` | `product.imported` |
| Products | CSV export | `app/admin/products/export/route.ts` | `product:import` (or split future `product:export`) | `product.exported` |
| Reports / Data | view reports | `app/admin/reports/page.tsx` | `reports:view` | `reports.viewed` (new recommendation) |
| Reports / Data | export reports data | `app/api/admin/reports/export/route.ts` | `reports:view` (or split future `reports:export`) | `reports.exported` (new recommendation) |
| Future Admin Users | invite/create admin | Not present in current code | `admin_users:manage` | `admin.user.created` |
| Future Admin Users | change role | Not present in current code | `admin_users:manage` | `admin.user.role_changed` |
| Future Admin Users | deactivate user | Not present in current code | `admin_users:manage` | `admin.user.deactivated` |

## Proposed Enterprise Role Model

### Roles
1. **owner**
   - Full access.
   - Manage admins/settings/products/RFQs/quotes/import-export.
2. **manager**
   - Manage RFQs and quotes (including publish).
   - View reports.
   - Manage products.
   - Cannot manage admin users.
3. **sales**
   - View RFQs.
   - Update RFQ workflow.
   - Create/edit quotes.
   - View customer responses.
   - Cannot import/export products.
   - Cannot manage admin users.
4. **inventory**
   - Manage products/stock.
   - View product analytics.
   - Cannot publish quotes.
5. **viewer**
   - Read-only admin access.
   - No mutations.
   - No sensitive exports.

### Permissions matrix

| Permission | owner | manager | sales | inventory | viewer |
| ---------- | ----- | ------- | ----- | --------- | ------ |
| `rfq:view` | ✅ | ✅ | ✅ | ◐ (optional, default no) | ✅ |
| `rfq:update` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `quote:create` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `quote:publish` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `product:view` | ✅ | ✅ | ◐ (optional read-only) | ✅ | ✅ |
| `product:update` | ✅ | ✅ | ❌ | ✅ | ❌ |
| `product:import` | ✅ | ✅ | ❌ | ❌ (conservative default) | ❌ |
| `reports:view` | ✅ | ✅ | ❌ (conservative default) | ❌ (conservative default) | ❌ |
| `admin_users:manage` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `settings:manage` | ✅ | ❌ | ❌ | ❌ | ❌ |

Notes:
- `viewer` has no mutation permissions.
- `sales` has no product import/export.
- `inventory` cannot publish quotes.
- `manager` cannot manage admin users.
- `owner` has all listed permissions.

## Proposed Database Schema

> Planned for future migration PR(s). No migration files are created in EAA1.

### `admin_profiles`
- `id uuid primary key references auth.users(id) on delete cascade`
- `email text not null unique`
- `full_name text`
- `role text not null check role in owner/manager/sales/inventory/viewer`
- `is_active boolean not null default true`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Notes:
- No passwords stored in application tables.
- `auth.users` remains source of credentials.
- Inactive admins cannot access admin.
- Auth users without `admin_profiles` cannot access admin.

### `admin_audit_log`
- `id uuid primary key default gen_random_uuid()`
- `admin_user_id uuid references auth.users(id)`
- `admin_email text`
- `action text not null`
- `entity_type text not null`
- `entity_id text`
- `metadata jsonb`
- `created_at timestamptz not null default now()`

Security notes:
- Never log passwords/secrets.
- Do not log excessive customer PII.
- Keep metadata minimal and purpose-specific.
- Logging failure should be non-blocking unless future policy explicitly requires blocking.

Rollback notes:
- New tables can remain unused when legacy mode is enabled.
- No destructive changes to current operational tables.
- Migration rollback SQL/process to be documented in future migration PR.

## Proposed Auth Abstraction Layer

Future modules:
- `lib/server/admin-session.ts`
- `lib/server/admin-permissions.ts`
- `lib/server/admin-audit.ts`

Future functions:
- `getCurrentAdmin()`
- `requireAdmin()`
- `requireRole(...)`
- `requirePermission(...)`
- `canAdmin(...)`
- `logAdminAction(...)`

Responsibilities:

### `admin-session`
- Resolve current session/authenticated identity.
- Load `admin_profiles` and role/active state.
- Block inactive admins.
- Support legacy fallback mode during migration.
- Preserve admin no-store/session-safe behavior.

### `admin-permissions`
- Single canonical role-to-permission matrix.
- Implement `canAdmin()` and `requirePermission()`.
- Remove duplicated per-route auth logic over time.

### `admin-audit`
- Centralize safe audit logging.
- Enforce no secret logging and minimized PII.
- Prefer non-blocking writes on log failure.

Rule:
- All admin pages, server actions, and admin API routes should use the abstraction layer rather than duplicating auth/permission checks.

## Login Migration Plan

Recommended future mode flag:
- `ADMIN_AUTH_MODE=legacy|supabase`

Alternative:
- `ENABLE_LEGACY_ADMIN_PASSWORD=true|false`

Recommendation:
- First implementation PR keeps `ADMIN_AUTH_MODE=legacy` by default.
- Switch to `supabase` only after owner user/profile exists and production verification passes.

Planned sequence:
1. Keep existing shared-password login untouched.
2. Add Supabase-authenticated login path behind env flag.
3. Provision first owner securely (manual or server-only seed workflow).
4. Validate owner login in preview/staging.
5. Enable Supabase mode in production.
6. Preserve emergency rollback to legacy.
7. Remove legacy auth only in later deprecation PR (optional).

Future acceptance criteria:
- Unauthenticated users redirect to `/admin/login`.
- Inactive admins blocked.
- Auth users without admin profile blocked.
- Logout works.
- Legacy fallback remains until explicitly disabled.
- No custom password storage.

## Admin Route Protection Plan

Planned policy mapping:
- RFQ list/details → `requirePermission("rfq:view")`
- RFQ workflow updates (status/priority/follow-up/internal notes) → `requirePermission("rfq:update")`
- Quote create/edit → `requirePermission("quote:create")`
- Quote publish/hide → `requirePermission("quote:publish")`
- Product view → `requirePermission("product:view")`
- Product create/update/inventory → `requirePermission("product:update")`
- Product import/export → `requirePermission("product:import")`
- Reports → `requirePermission("reports:view")`
- Admin users → `requirePermission("admin_users:manage")`
- Settings → `requirePermission("settings:manage")`

Expected denials:
- `viewer` cannot mutate any admin data.
- `sales` cannot import/export products.
- `inventory` cannot publish quotes.
- `manager` cannot manage admin users.

## Audit Trail Plan

Critical future log points:

### Auth
- login success
- login failed
- logout

### RFQ
- status update
- priority update
- follow-up update
- internal notes update

### Quote
- created
- updated
- published
- hidden
- customer response reviewed

### Products
- created
- updated
- status changed
- inventory changed
- CSV import applied
- CSV export run

### Admin users
- created/invited
- role changed
- activated/deactivated

Audit rules:
- No passwords/secrets.
- Minimize PII.
- Never surface internal logging errors to end users.
- Keep metadata compact and action-focused.

## MFA / 2FA Plan

- MFA is **not implemented** in EAA1.
- EAA1 only documents requirements and feasibility.
- No fake 2FA implementation is allowed.

Future direction:
- If Supabase MFA is available/compatible at implementation time, target Phase 2B.
- Require MFA for `owner` and `manager` in final enterprise mode.
- Make MFA optional for `sales`/`inventory`/`viewer` unless risk review changes.
- If operationally risky or unavailable, defer with explicit risk note.

Potential future MFA flow:
1. Factor enrollment.
2. Factor verification.
3. MFA challenge at login.
4. Recovery guidance.
5. Admin-visible MFA status.

## Migration Risks

| Risk | Severity | Mitigation | Rollback |
| ---- | -------- | ---------- | -------- |
| Locking out current admin users | High | Keep legacy mode default; verify owner bootstrap before switch | Set `ADMIN_AUTH_MODE=legacy`, redeploy |
| Breaking RFQ admin dashboard | High | Incremental auth abstraction + RFQ regression tests before production switch | Re-enable legacy mode and redeploy previous known-good build |
| Breaking quote publish/hide flow | High | Explicit permission coverage tests for quote mutations | Roll back mode + release version; validate quote path |
| Breaking product import/export | High | Permission + CSV end-to-end tests in staging | Revert mode/release and keep legacy session auth |
| Auth users without `admin_profiles` lose access unexpectedly | Medium | Add clear deny reason and owner-runbook for profile provisioning | Toggle legacy mode while provisioning missing profiles |
| Missing first owner profile/user | High | Manual pre-flight checklist and staging rehearsal | Stay on legacy mode until owner exists |
| Service role misuse in future implementation | High | Strict server-only boundaries; code review/security checklist | Disable new path; revert deployment |
| Audit logs capturing excessive PII | High | Centralized `logAdminAction` sanitizer + schema constraints/guidelines | Disable logging feature flag, patch sanitizer |
| Future RLS/security policy mistakes | High | Progressive rollout with tests + policy review | Revert migration/policies in follow-up PR, fallback legacy mode |
| Supabase SSR/session mismatch | Medium | Standardized session utilities and SSR verification tests | Switch back to legacy auth mode |
| Preview vs production env divergence | Medium | Environment parity checklist and smoke tests | Revert mode in production to legacy |
| Legacy fallback misconfiguration | High | Keep legacy env vars until final deprecation; document rollback checklist | Restore env vars and set mode to legacy |
| Admin page caching leaks/staleness | Medium | Keep `force-dynamic`, `revalidate=0`, and no-store data fetches | Redeploy with cache-hardening and fallback mode |

## Rollback Plan

Principles:
- Keep legacy admin auth path during migration window.
- Emergency switch uses `ADMIN_AUTH_MODE=legacy`.
- Do not remove shared-password env variables until final deprecation phase.
- Avoid destructive changes to existing operational data.
- If Supabase mode has issues, disable it and fall back immediately.
- New `admin_profiles` / `admin_audit_log` can remain present but unused.

Example production rollback steps:
1. Set `ADMIN_AUTH_MODE=legacy`.
2. Confirm `ADMIN_DASHBOARD_PASSWORD` and `ADMIN_SESSION_SECRET` are set.
3. Redeploy.
4. Verify `/admin/login` shared-password flow and `/admin/rfq` access.
5. Investigate Supabase mode issue off-line and safely.

## Recommended PR Breakdown

### PR 2 — `enterprise-admin-auth-foundation`
- Add migrations for `admin_profiles` and `admin_audit_log`.
- Introduce role/permission model and auth abstraction.
- Add legacy fallback env mode.
- Add first-owner provisioning documentation.

### PR 3 — `enterprise-admin-permissions-audit`
- Enforce permissions across admin routes/actions/APIs.
- Add critical audit logging events.
- Apply no-store/security hardening where missing.
- Run RFQ/quote/product admin regression coverage.

### PR 4 — `enterprise-admin-users-mfa`
- Add `/admin/users` management.
- Add `/admin/audit` visibility.
- Add MFA status and/or implementation if feasible.
- Finalize enterprise auth operational docs + QA results.

## Future QA Checklist

### Auth
- [ ] Wrong email/password denied.
- [ ] Inactive admin denied.
- [ ] Auth user without admin profile denied.
- [ ] Valid owner login succeeds.
- [ ] Logout clears session.
- [ ] Session expiry enforced.
- [ ] Legacy fallback works.

### Roles
- [ ] Owner can access all protected actions.
- [ ] Manager cannot manage users.
- [ ] Sales cannot import/export products.
- [ ] Inventory cannot publish quotes.
- [ ] Viewer cannot mutate anything.

### RFQ
- [ ] Sales can update RFQ status.
- [ ] Viewer cannot update RFQ status.
- [ ] Manager can publish quote.
- [ ] Inventory cannot publish quote.

### Products
- [ ] Inventory can edit products.
- [ ] Sales cannot edit product (unless explicitly granted later).
- [ ] Owner can import/export products.

### Audit
- [ ] Login success logged.
- [ ] Login failed logged.
- [ ] RFQ status update logged.
- [ ] Quote publish logged.
- [ ] Product edit logged.
- [ ] Role change logged.

### Security
- [ ] No secrets exposed client-side.
- [ ] Service role remains server-only.
- [ ] No public caching of admin data.
- [ ] Friendly/non-revealing error responses.
- [ ] No admin internal notes exposed to customer surfaces.

### Build
- [ ] `npm run lint`
- [ ] `npm run build`

## EAA2 Foundation Status (May 9, 2026)
- EAA2 foundation implementation is now added in code/docs as a non-breaking legacy-first step.
- Reference implementation docs: `docs/ENTERPRISE_ADMIN_AUTH.md`.
- Full permissions enforcement and critical audit instrumentation remain scheduled for EAA3.
