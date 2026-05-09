# Enterprise Admin Auth

## Overview
EAA2 introduces enterprise admin auth foundations only. It does **not** fully migrate admin authentication yet.

## Auth modes
- `ADMIN_AUTH_MODE=legacy` (default): existing shared-password admin login.
- `ADMIN_AUTH_MODE=supabase`: reserved dark-launch mode for future Supabase user-based admin auth.

## Legacy fallback
Legacy shared-password mode remains the default and rollback path in EAA2.

## Roles
- owner
- manager
- sales
- inventory
- viewer

## Permissions matrix
- owner: all permissions
- manager: rfq:view, rfq:update, quote:create, quote:publish, product:view, product:update, reports:view
- sales: rfq:view, rfq:update, quote:create
- inventory: product:view, product:update, reports:view
- viewer: rfq:view, product:view

## Database tables
- `public.admin_profiles`
- `public.admin_audit_log`

These tables are for server-side admin usage and are not publicly readable.

## Creating the first owner

### Option A — Supabase Dashboard
1. Create auth user in Supabase Auth.
2. Confirm email/password setup in Supabase.
3. Insert corresponding `admin_profiles` row:
   - `id` = `auth.users.id`
   - `email` = owner email
   - `full_name` = owner name
   - `role` = `owner`
   - `is_active` = `true`
4. Set `ADMIN_AUTH_MODE=supabase` only after owner login is verified in a safe environment.
5. Keep legacy env vars available for rollback.

### Option B — SQL template
```sql
insert into public.admin_profiles (id, email, full_name, role, is_active)
values (
  '<auth-user-uuid>',
  '<owner-email>',
  '<owner-name>',
  'owner',
  true
);
```

## Environment variables
- `ADMIN_AUTH_MODE=legacy|supabase`
- Legacy fallback vars:
  - `ADMIN_DASHBOARD_PASSWORD`
  - `ADMIN_SESSION_SECRET`
  - `ADMIN_SESSION_TTL_HOURS` (optional)
- Supabase vars currently used server-side:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Rollback plan
1. Set `ADMIN_AUTH_MODE=legacy`.
2. Confirm legacy env vars still exist.
3. Redeploy.
4. Verify `/admin/login` shared-password flow.
5. Leave `admin_profiles` and `admin_audit_log` tables unused.
6. Investigate Supabase mode issue safely.

Rollback SQL (if needed):
```sql
drop table if exists public.admin_audit_log;
drop table if exists public.admin_profiles;
```

## MFA status
MFA is **not** implemented in EAA2. MFA will be evaluated in EAA4 / Phase 2B.

## Audit trail
`logAdminAction` provides best-effort server-side writes to `admin_audit_log` with compact metadata sanitization and no password/secret logging.

## Testing checklist
- `npm run lint`
- `npm run build`
- Legacy mode remains default.
- Legacy login remains functional.
- Migration adds only enterprise admin auth tables.
- No RFQ/product/tracking public behavior changes.

## EAA3 — Enterprise Admin Permissions & Audit Enforcement

- Centralized permission enforcement is now applied via `requireAdmin`/`requirePermission` checks across admin pages and sensitive admin mutations.
- Critical admin actions now write best-effort audit events (auth, RFQ workflow, quote visibility/update, product updates/import/export, report export).
- Admin no-store/dynamic behavior was reviewed and preserved for sensitive admin surfaces.
- Legacy shared-password mode remains the default fallback (`ADMIN_AUTH_MODE` unchanged), so current production admin remains functional.
- Supabase mode is still not fully activated end-to-end in this phase.
- Admin users management UI and audit log UI remain deferred to EAA4.
- MFA remains deferred to EAA4.

## EAA4: Admin Users, Audit Trail, MFA Status
- Added `/admin/users` (owner-only via `admin_users:manage`) for safe admin profile management.
- Added `/admin/audit` (owner/manager) for read-only audit review with filtering and metadata redaction.
- `ADMIN_AUTH_MODE` remains `legacy` by default; legacy shared-password fallback remains active.
- No custom password storage is implemented. Admin profile creation uses existing Supabase Auth users only.

### MFA Status (Honest State)
- MFA is **not implemented** in this release.
- No fake MFA flags, custom TOTP, OTP-by-email, or stored recovery codes were added.
- Target policy for final enterprise rollout: owner/manager require real Supabase MFA; other roles optional.
- Future phase (2B): Supabase Auth MFA enrollment/challenge/recovery flow.

### QA and Activation
- See `docs/ENTERPRISE_ADMIN_AUTH_QA.md` for full QA checklist and manual activation runbook.
- Production activation must remain manual: first-owner setup, preview verification, then controlled switch to `ADMIN_AUTH_MODE=supabase`.
- Rollback reminder: set `ADMIN_AUTH_MODE=legacy` if any auth regression is detected.
