import 'server-only';

import type { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAdminRole, type AdminRole } from '@/lib/server/admin-permissions';

const SUPABASE_ACCESS_COOKIE = 'hiltech_admin_sb_access';
const SUPABASE_REFRESH_COOKIE = 'hiltech_admin_sb_refresh';
const REFRESH_COOKIE_TTL_SECONDS = 7 * 24 * 60 * 60;

type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  user: { id: string; email?: string | null };
};

type SupabaseAdminProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: AdminRole;
  is_active: boolean;
};

function getSupabaseUrl() {
  const value = process.env.SUPABASE_URL?.trim();
  return value ? value.replace(/\/$/, '') : null;
}

function getSupabaseAnonKey() {
  return process.env.SUPABASE_ANON_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || null;
}

function getServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null;
}

export function isSupabaseAuthConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey() && getServiceRoleKey());
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const baseUrl = getSupabaseUrl();
  if (!baseUrl) throw new Error('config');

  const response = await fetch(`${baseUrl}${path}`, { ...init, cache: 'no-store' });
  return response;
}

export async function signInAdminWithPassword(email: string, password: string): Promise<SupabaseSession> {
  const anonKey = getSupabaseAnonKey();
  if (!anonKey) throw new Error('config');

  const response = await supabaseFetch('/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 400 || response.status === 401) throw new Error('invalid_credentials');
    throw new Error('auth_error');
  }

  return (await response.json()) as SupabaseSession;
}

export async function getSupabaseUser(accessToken: string) {
  const anonKey = getSupabaseAnonKey();
  if (!anonKey) throw new Error('config');

  const response = await supabaseFetch('/auth/v1/user', {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('invalid_token');
    throw new Error('auth_error');
  }

  return (await response.json()) as { id: string; email?: string | null };
}

export async function refreshSupabaseSession(refreshToken: string): Promise<SupabaseSession> {
  const anonKey = getSupabaseAnonKey();
  if (!anonKey) throw new Error('config');

  const response = await supabaseFetch('/auth/v1/token?grant_type=refresh_token', {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    if (response.status === 400 || response.status === 401) throw new Error('invalid_token');
    throw new Error('auth_error');
  }

  return (await response.json()) as SupabaseSession;
}

export async function loadAdminProfile(userId: string): Promise<SupabaseAdminProfile> {
  const serviceRoleKey = getServiceRoleKey();
  if (!serviceRoleKey) throw new Error('config');

  const path = `/rest/v1/admin_profiles?id=eq.${encodeURIComponent(userId)}&select=id,email,full_name,role,is_active&limit=1`;
  const response = await supabaseFetch(path, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('profile_error');
  const rows = (await response.json()) as Array<{ id: string; email: string | null; full_name: string | null; role: string; is_active: boolean }>;
  const profile = rows[0];
  if (!profile) throw new Error('not_authorized');
  if (!profile.is_active) throw new Error('inactive');
  if (!isAdminRole(profile.role)) throw new Error('not_authorized');

  return { ...profile, role: profile.role };
}

export async function getSupabaseAdminCookies() {
  const store = await cookies();
  return {
    accessToken: store.get(SUPABASE_ACCESS_COOKIE)?.value || null,
    refreshToken: store.get(SUPABASE_REFRESH_COOKIE)?.value || null,
  };
}

export function setSupabaseAdminCookies(response: NextResponse, session: { access_token: string; refresh_token: string; expires_in?: number }) {
  const secure = process.env.NODE_ENV === 'production';
  const accessTtl = Number.isFinite(session.expires_in) && (session.expires_in ?? 0) > 0 ? Math.floor(session.expires_in as number) : 3600;

  response.cookies.set(SUPABASE_ACCESS_COOKIE, session.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/admin',
    maxAge: accessTtl,
  });

  response.cookies.set(SUPABASE_REFRESH_COOKIE, session.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/admin',
    maxAge: REFRESH_COOKIE_TTL_SECONDS,
  });
}

export function clearSupabaseAdminCookies(response: NextResponse) {
  const secure = process.env.NODE_ENV === 'production';
  response.cookies.set(SUPABASE_ACCESS_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure, path: '/admin', maxAge: 0 });
  response.cookies.set(SUPABASE_REFRESH_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure, path: '/admin', maxAge: 0 });
}
