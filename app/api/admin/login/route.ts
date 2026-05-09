import { NextResponse } from 'next/server';
import { getAdminCookie, isAdminConfigured, validateAdminPassword } from '@/lib/server/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit';
import { ADMIN_AUDIT_ACTIONS, logAdminAction } from '@/lib/server/admin-audit';
import { getAdminAuthMode } from '@/lib/server/admin-session';
import { getSupabaseMissingConfigKeys, isSupabaseAuthConfigured, loadAdminProfile, setSupabaseAdminCookies, signInAdminWithPassword } from '@/lib/server/supabase-auth';

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

  const formData = await request.formData();

  if (authMode === 'legacy') {
    if (!isAdminConfigured()) {
      return NextResponse.redirect(new URL('/admin/login?error=config', request.url));
    }

    const password = String(formData.get('password') || '');
    if (!validateAdminPassword(password)) {
      void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_FAILED, entityType: 'auth', entityId: 'admin-login', adminEmail: 'legacy-admin', metadata: { auth_mode: 'legacy', reason: 'invalid_credentials' } });
      return NextResponse.redirect(new URL('/admin/login?error=invalid', request.url));
    }

    void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_SUCCESS, entityType: 'auth', entityId: 'legacy-admin', adminEmail: 'legacy-admin', metadata: { auth_mode: 'legacy' } });
    const response = NextResponse.redirect(new URL('/admin/rfq', request.url));
    response.cookies.set(getAdminCookie());
    return response;
  }

  if (!isSupabaseAuthConfigured()) {
    console.warn('[admin-auth] failed area=auth auth_mode=supabase', { missing_config_keys: getSupabaseMissingConfigKeys() });
    void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_FAILED, entityType: 'auth', entityId: 'admin-login', metadata: { auth_mode: 'supabase', reason: 'config' } });
    return NextResponse.redirect(new URL('/admin/login?error=config', request.url));
  }

  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_FAILED, entityType: 'auth', entityId: 'admin-login', metadata: { auth_mode: 'supabase', reason: 'invalid_credentials' } });
    return NextResponse.redirect(new URL('/admin/login?error=invalid', request.url));
  }

  try {
    const session = await signInAdminWithPassword(email, password);
    const profile = await loadAdminProfile(session.user.id);

    const response = NextResponse.redirect(new URL('/admin/rfq', request.url));
    setSupabaseAdminCookies(response, session);

    void logAdminAction({
      action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_SUCCESS,
      entityType: 'auth',
      entityId: session.user.id,
      adminUserId: session.user.id,
      adminEmail: profile.email,
      metadata: { auth_mode: 'supabase', role: profile.role },
    });

    return response;
  } catch (error) {
    let reason = 'invalid_credentials';
    let code = 'invalid';

    if (error instanceof Error) {
      if (error.message === 'inactive') {
        reason = 'inactive';
        code = 'inactive';
      } else if (error.message === 'not_authorized') {
        reason = 'not_authorized';
        code = 'not_authorized';
      } else if (error.message === 'config') {
        reason = 'config';
        code = 'config';
      }
    }

    console.warn('[admin-auth] failed area=profile auth_mode=supabase', { reason });
    void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGIN_FAILED, entityType: 'auth', entityId: 'admin-login', metadata: { auth_mode: 'supabase', reason } });
    return NextResponse.redirect(new URL(`/admin/login?error=${code}`, request.url));
  }
}
