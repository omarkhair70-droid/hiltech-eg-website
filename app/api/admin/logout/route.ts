import { NextResponse } from 'next/server';
import { getClearedAdminCookie } from '@/lib/server/admin-auth';
import { ADMIN_AUDIT_ACTIONS, logAdminAction } from '@/lib/server/admin-audit';
import { getAdminAuthMode } from '@/lib/server/admin-session';
import { clearSupabaseAdminCookies } from '@/lib/server/supabase-auth';

export async function POST(request: Request) {
  const authMode = getAdminAuthMode();
  void logAdminAction({ action: ADMIN_AUDIT_ACTIONS.ADMIN_LOGOUT, entityType: 'auth', entityId: authMode === 'legacy' ? 'legacy-admin' : 'admin', adminEmail: authMode === 'legacy' ? 'legacy-admin' : null, metadata: { auth_mode: authMode } });
  const response = NextResponse.redirect(new URL('/admin/login', request.url));

  if (authMode === 'legacy') {
    response.cookies.set(getClearedAdminCookie());
  } else {
    clearSupabaseAdminCookies(response);
  }

  return response;
}
