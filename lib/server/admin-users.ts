import 'server-only';

import { ADMIN_ROLES, isAdminRole, type AdminRole } from '@/lib/server/admin-permissions';
import { isSupabaseConfigured } from '@/lib/server/supabase-admin';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type AdminProfileRow = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
};

function baseUrl() {
  if (!supabaseUrl) throw new Error('SUPABASE_URL is not configured.');
  return supabaseUrl.replace(/\/$/, '');
}

function headers() {
  if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured.');
  return { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json' };
}

export function canUseSupabaseAdminApi() { return isSupabaseConfigured(); }

export async function listAdminProfiles(): Promise<AdminProfileRow[]> {
  if (!canUseSupabaseAdminApi()) return [];
  const res = await fetch(`${baseUrl()}/rest/v1/admin_profiles?select=user_id,email,full_name,role,is_active,created_at,updated_at,last_login_at&order=created_at.desc`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error('Admin profiles table is unavailable.');
  const rows = (await res.json()) as AdminProfileRow[];
  return rows.filter((r) => isAdminRole(r.role));
}

export async function getActiveOwnerCount() {
  if (!canUseSupabaseAdminApi()) return 0;
  const res = await fetch(`${baseUrl()}/rest/v1/admin_profiles?select=user_id&role=eq.owner&is_active=eq.true`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to validate owner safeguards.');
  const rows = (await res.json()) as Array<{ user_id: string }>;
  return rows.length;
}

export async function preventLastOwnerRemoval(targetUserId: string, next: { role?: AdminRole; isActive?: boolean }) {
  const profiles = await listAdminProfiles();
  const target = profiles.find((p) => p.user_id === targetUserId);
  if (!target) throw new Error('Admin profile not found.');
  const nextRole = next.role ?? target.role;
  const nextActive = next.isActive ?? target.is_active;
  const removingOwner = target.role === 'owner' && (!nextActive || nextRole !== 'owner');
  if (!removingOwner) return;
  const activeOwners = profiles.filter((p) => p.role === 'owner' && p.is_active);
  if (activeOwners.length <= 1) throw new Error('Cannot remove or demote the last active owner.');
}

export async function createAdminProfileForExistingAuthUser(payload: { userId: string; email: string; fullName?: string; role: AdminRole }) {
  if (!ADMIN_ROLES.includes(payload.role)) throw new Error('Invalid role.');
  const res = await fetch(`${baseUrl()}/rest/v1/admin_profiles`, {
    method: 'POST', headers: { ...headers(), Prefer: 'resolution=merge-duplicates,return=representation' }, cache: 'no-store',
    body: JSON.stringify({ user_id: payload.userId, email: payload.email.toLowerCase(), full_name: payload.fullName || null, role: payload.role, is_active: true }),
  });
  if (!res.ok) throw new Error('Failed to create admin profile. Ensure the auth user exists first.');
}

export async function updateAdminProfileRole(userId: string, role: AdminRole) {
  if (!ADMIN_ROLES.includes(role)) throw new Error('Invalid role.');
  await preventLastOwnerRemoval(userId, { role });
  const res = await fetch(`${baseUrl()}/rest/v1/admin_profiles?user_id=eq.${encodeURIComponent(userId)}`, {
    method: 'PATCH', headers: { ...headers(), Prefer: 'return=minimal' }, cache: 'no-store', body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error('Failed to update admin role.');
}

export async function updateAdminProfileActive(userId: string, isActive: boolean) {
  await preventLastOwnerRemoval(userId, { isActive });
  const res = await fetch(`${baseUrl()}/rest/v1/admin_profiles?user_id=eq.${encodeURIComponent(userId)}`, {
    method: 'PATCH', headers: { ...headers(), Prefer: 'return=minimal' }, cache: 'no-store', body: JSON.stringify({ is_active: isActive }),
  });
  if (!res.ok) throw new Error('Failed to update admin status.');
}
