import { NextResponse } from 'next/server';
import { getAdminCookie, isAdminConfigured, validateAdminPassword } from '@/lib/server/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit';
import { ADMIN_AUDIT_ACTIONS, logAdminAction } from '@/lib/server/admin-audit';
import { getAdminAuthMode } from '@/lib/server/admin-session';

export async function POST(request: Request) {

  const ip = getClientIp(request);
  const rate = checkRateLimit({ key: `admin-login:${ip}`, windowMs: 10 * 60 * 1000, maxRequests: 5 });
  const authMode = getAdminAuthMode();
  if (!rate.allowed) {
    void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_FAILED, entityType: 'auth', entityId: 'admin-login', adminEmail: authMode === 'legacy' ? 'legacy-admin' : null, metadata: { auth_mode: authMode, reason: 'rate_limited' } });
    const response = NextResponse.redirect(new URL('/admin/login?error=rate_limited', request.url));
    response.headers.set('Retry-After', String(rate.retryAfter));
    return response;
  }
  if (!isAdminConfigured()) {
    return NextResponse.redirect(new URL('/admin/login?error=config', request.url));
  }

  const formData = await request.formData();
  const password = String(formData.get('password') || '');
  if (!validateAdminPassword(password)) {
    void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_FAILED, entityType: 'auth', entityId: 'admin-login', adminEmail: authMode === 'legacy' ? 'legacy-admin' : null, metadata: { auth_mode: authMode, reason: 'invalid_credentials' } });
    return NextResponse.redirect(new URL('/admin/login?error=invalid', request.url));
  }

  void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_SUCCESS, entityType: 'auth', entityId: authMode === 'legacy' ? 'legacy-admin' : 'admin', adminEmail: authMode === 'legacy' ? 'legacy-admin' : null, metadata: { auth_mode: authMode } });
  const response = NextResponse.redirect(new URL('/admin/rfq', request.url));
  response.cookies.set(getAdminCookie());
  return response;
}
