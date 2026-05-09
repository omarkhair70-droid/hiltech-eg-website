import 'server-only';

import { redirect } from 'next/navigation';
import {
  type CurrentAdmin,
  AdminForbiddenError,
  AdminUnauthorizedError,
  requireAdmin,
  requirePermission,
  requireRole,
} from '@/lib/server/admin-session';
import type { AdminPermission, AdminRole } from '@/lib/server/admin-permissions';

export async function requireAdminOrRedirect(): Promise<CurrentAdmin> {
  try {
    return await requireAdmin();
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) redirect('/admin/login');
    throw error;
  }
}

export async function requirePermissionOrRedirect(permission: AdminPermission): Promise<CurrentAdmin | null> {
  try {
    return await requirePermission(permission);
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) redirect('/admin/login');
    if (error instanceof AdminForbiddenError) return null;
    throw error;
  }
}

export async function requireRoleOrRedirect(roles: AdminRole | AdminRole[]): Promise<CurrentAdmin | null> {
  try {
    return await requireRole(roles);
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) redirect('/admin/login');
    if (error instanceof AdminForbiddenError) return null;
    throw error;
  }
}
