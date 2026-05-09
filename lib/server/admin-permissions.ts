import 'server-only';

export type AdminRole = 'owner' | 'manager' | 'sales' | 'inventory' | 'viewer';

export type AdminPermission =
  | 'rfq:view'
  | 'rfq:update'
  | 'quote:create'
  | 'quote:publish'
  | 'product:view'
  | 'product:update'
  | 'product:import'
  | 'reports:view'
  | 'admin_users:manage'
  | 'settings:manage';

export const ADMIN_ROLES: AdminRole[] = ['owner', 'manager', 'sales', 'inventory', 'viewer'];

export const ADMIN_PERMISSIONS: AdminPermission[] = [
  'rfq:view',
  'rfq:update',
  'quote:create',
  'quote:publish',
  'product:view',
  'product:update',
  'product:import',
  'reports:view',
  'admin_users:manage',
  'settings:manage',
];

export const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  owner: [...ADMIN_PERMISSIONS],
  manager: ['rfq:view', 'rfq:update', 'quote:create', 'quote:publish', 'product:view', 'product:update', 'reports:view'],
  sales: ['rfq:view', 'rfq:update', 'quote:create'],
  inventory: ['product:view', 'product:update', 'reports:view'],
  viewer: ['rfq:view', 'product:view'],
};

export function isAdminRole(value: string): value is AdminRole {
  return (ADMIN_ROLES as string[]).includes(value);
}

export function isAdminPermission(value: string): value is AdminPermission {
  return (ADMIN_PERMISSIONS as string[]).includes(value);
}

export function canAdmin(role: AdminRole, permission: AdminPermission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function requirePermissionForRole(role: AdminRole, permission: AdminPermission): void {
  if (!canAdmin(role, permission)) {
    throw new Error('Forbidden');
  }
}
