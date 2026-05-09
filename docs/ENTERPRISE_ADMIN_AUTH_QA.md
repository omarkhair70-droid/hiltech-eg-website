# Enterprise Admin Auth QA

## Scope
- EAA1 plan baseline and rollout strategy.
- EAA2 auth foundations (profiles, audit log, roles/permissions, session abstraction).
- EAA3 centralized enforcement and critical action auditing.
- EAA4 admin users UI, audit UI, MFA status documentation, and handoff QA.

## Auth Mode Checks
- [x] `ADMIN_AUTH_MODE` default remains `legacy`.
- [ ] Legacy login works (manual environment check).
- [ ] Legacy logout works (manual environment check).
- [ ] Legacy owner permissions work (manual environment check).
- [ ] Supabase mode first-owner manual activation flow verified (requires Supabase preview).
- [x] Rollback to legacy documented.

## Roles and Permissions
- [ ] Owner can access everything (requires Supabase admin_profiles role test).
- [ ] Manager can access RFQ/quotes/products/reports but not admin users (requires Supabase admin_profiles role test).
- [ ] Sales can view/update RFQs and create/edit quotes but cannot import/export products (requires Supabase admin_profiles role test).
- [ ] Inventory can manage products but cannot publish quotes (requires Supabase admin_profiles role test).
- [ ] Viewer read-only / no mutations (requires Supabase admin_profiles role test).

## Admin Users
- [x] `/admin/users` owner-only via `admin_users:manage`.
- [x] No password storage or password fields.
- [x] Last active owner protection (demote/deactivate blocked).
- [x] Role changes audited.
- [x] Deactivate/reactivate audited.
- [x] Profile creation flow is safe and documented for existing Supabase Auth users.

## Audit Trail
- [x] `/admin/audit` owner/manager only.
- [x] Latest audit events visible (limited to latest 100).
- [x] Filters available (action/entity/admin/date).
- [x] Metadata redacted and compact.
- [x] No secrets/PII rendered in normal metadata view.
- [x] Mobile readable with wrapped metadata and horizontal scroll fallback.

## Critical Action Audit Coverage
- [x] Auth login success/fail/logout.
- [x] RFQ updates.
- [x] Quote create/update/publish/hide.
- [x] Product create/update/import/export.
- [x] Report export.

## Security
- [x] No service role exposed to client bundle.
- [x] Admin pages remain dynamic/no-store patterns.
- [x] Unauthorized handling remains friendly/guarded by existing abstractions.
- [x] Public tracking does not expose admin notes (unchanged in EAA4).
- [x] Passwords handled only by legacy env or Supabase Auth (no custom DB password system).

## MFA Status
- [x] Not implemented in EAA4 unless full real Supabase MFA flow is added.
- [x] Planned follow-up: Phase 2B for Supabase MFA enrollment/challenge/recovery.

## Manual Production Checklist
- [ ] Create first owner in Supabase Auth.
- [ ] Insert/verify matching owner row in `admin_profiles`.
- [ ] Test `ADMIN_AUTH_MODE=supabase` in preview.
- [ ] Test each role in preview.
- [ ] Test rollback to `ADMIN_AUTH_MODE=legacy`.
- [ ] Enable production only after preview success.

## EAA5 Supabase Login Checklist

- [ ] Valid owner login succeeds.
- [ ] Wrong password is rejected with safe error.
- [ ] Inactive admin profile is blocked.
- [ ] Auth user without `admin_profiles` row is blocked.
- [ ] Logout clears session.
- [ ] Role permissions work after login.
- [ ] Rollback to `ADMIN_AUTH_MODE=legacy` is tested.

## EAA5.1 Runtime hardening update (May 2026)
- Supabase admin session failures now redirect safely to `/admin/login` instead of surfacing raw Next.js server exceptions.
- Permission/role denials now render friendly "Not authorized" states on admin pages.
- `/admin/rfq` shows a non-sensitive configuration/log guidance message when RFQ query loading fails.
- No schema changes; legacy mode remains preserved.
