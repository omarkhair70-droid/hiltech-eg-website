import 'server-only';

import { isAdminAuthenticated } from '@/lib/server/admin-auth';
import { ADMIN_PERMISSIONS, canAdmin, type AdminPermission, type AdminRole, ROLE_PERMISSIONS } from '@/lib/server/admin-permissions';
import { getSupabaseAdminCookies, getSupabaseUser, loadAdminProfile } from '@/lib/server/supabase-auth';

export type AdminAuthMode = 'legacy' | 'supabase';

export type CurrentAdmin = {
  id: string | null;
  email: string | null;
  fullName: string | null;
  role: AdminRole;
  permissions: AdminPermission[];
  isActive: boolean;
  authMode: AdminAuthMode;
  isLegacy: boolean;
};

export class AdminUnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'AdminUnauthorizedError';
  }
}

export class AdminForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'AdminForbiddenError';
  }
}

export function isAdminAuthError(error: unknown): error is AdminUnauthorizedError | AdminForbiddenError {
  return error instanceof AdminUnauthorizedError || error instanceof AdminForbiddenError;
}

export function getAdminAuthMode(): AdminAuthMode {
  return process.env.ADMIN_AUTH_MODE === 'supabase' ? 'supabase' : 'legacy';
}

async function getCurrentLegacyAdmin(): Promise<CurrentAdmin | null> {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) return null;
  return {
    id: null,
    email: null,
    fullName: null,
    role: 'owner',
    permissions: ROLE_PERMISSIONS.owner,
    isActive: true,
    authMode: 'legacy',
    isLegacy: true,
  };
}

async function getCurrentSupabaseAdmin(): Promise<CurrentAdmin | null> {
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  try {
    const cookies = await getSupabaseAdminCookies();
    accessToken = cookies.accessToken;
    refreshToken = cookies.refreshToken;
  } catch (error) {
    console.warn('[admin-auth] failed', { area: 'cookies', auth_mode: 'supabase', error: error instanceof Error ? error.message : 'unknown' });
    return null;
  }

  if (!accessToken) return null;

  try {
    const user = await getSupabaseUser(accessToken);
    const profile = await loadAdminProfile(user.id);

    return {
      id: user.id,
      email: profile.email || user.email || null,
      fullName: profile.full_name,
      role: profile.role,
      permissions: ROLE_PERMISSIONS[profile.role],
      isActive: profile.is_active,
      authMode: 'supabase',
      isLegacy: false,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'unknown';
    if (msg === 'invalid_token' && refreshToken) {
      console.warn('[admin-auth] failed', { area: 'session', auth_mode: 'supabase', error: 'invalid_token' });
      return null;
    }
    console.warn('[admin-auth] failed', { area: 'profile', auth_mode: 'supabase', error: msg });
    return null;
  }
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  if (getAdminAuthMode() === 'legacy') return getCurrentLegacyAdmin();
  return getCurrentSupabaseAdmin();
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new AdminUnauthorizedError();
  }
  return admin;
}

export async function requireRole(roles: AdminRole | AdminRole[]): Promise<CurrentAdmin> {
  const admin = await requireAdmin();
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(admin.role)) throw new AdminForbiddenError();
  return admin;
}

export async function requirePermission(permission: AdminPermission): Promise<CurrentAdmin> {
  const admin = await requireAdmin();
  if (!canAdmin(admin.role, permission)) throw new AdminForbiddenError();
  return admin;
}

export { ADMIN_PERMISSIONS };
