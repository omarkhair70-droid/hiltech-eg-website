import 'server-only';

import { isAdminAuthenticated } from '@/lib/server/admin-auth';
import { ADMIN_PERMISSIONS, canAdmin, type AdminPermission, type AdminRole, ROLE_PERMISSIONS } from '@/lib/server/admin-permissions';

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
  return null;
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  if (getAdminAuthMode() === 'legacy') return getCurrentLegacyAdmin();
  return getCurrentSupabaseAdmin();
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    if (getAdminAuthMode() === 'supabase') throw new Error('Unauthorized: Supabase admin mode is not fully wired in this foundation release.');
    throw new Error('Unauthorized');
  }
  return admin;
}

export async function requireRole(roles: AdminRole | AdminRole[]): Promise<CurrentAdmin> {
  const admin = await requireAdmin();
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(admin.role)) throw new Error('Forbidden');
  return admin;
}

export async function requirePermission(permission: AdminPermission): Promise<CurrentAdmin> {
  const admin = await requireAdmin();
  if (!canAdmin(admin.role, permission)) throw new Error('Forbidden');
  return admin;
}

export { ADMIN_PERMISSIONS };
