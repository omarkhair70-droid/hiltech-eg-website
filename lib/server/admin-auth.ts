import 'server-only';

import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE_NAME = 'hiltech_admin_session';

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || '';
}

function getDashboardPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD?.trim() || '';
}

function getSessionTtlSeconds() {
  const parsed = Number(process.env.ADMIN_SESSION_TTL_HOURS || '12');
  const hours = Number.isFinite(parsed) && parsed > 0 ? parsed : 12;
  return Math.floor(hours * 60 * 60);
}

export function isAdminConfigured() {
  return Boolean(getSessionSecret() && getDashboardPassword());
}

function signPayload(payload: string) {
  const secret = getSessionSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createAdminSessionToken() {
  const expiresAt = Date.now() + getSessionTtlSeconds() * 1000;
  const payload = `${expiresAt}`;
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = signPayload(payload);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;
  return Date.now() <= expiresAt;
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) return false;
  const store = await cookies();
  return verifyAdminSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
}

export async function requireAdminSession() {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect('/admin/login');
}

export function validateAdminPassword(password: string) {
  const expected = getDashboardPassword();
  if (!expected) return false;
  return password === expected;
}

export function getAdminCookie() {
  const token = createAdminSessionToken();
  return {
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getSessionTtlSeconds(),
  };
}

export function getClearedAdminCookie() {
  return {
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  };
}
