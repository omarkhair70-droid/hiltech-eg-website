import { NextResponse } from 'next/server';
import { getAdminCookie, isAdminConfigured, validateAdminPassword } from '@/lib/server/admin-auth';
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit';

export async function POST(request: Request) {

  const ip = getClientIp(request);
  const rate = checkRateLimit({ key: `admin-login:${ip}`, windowMs: 10 * 60 * 1000, maxRequests: 5 });
  if (!rate.allowed) {
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
    return NextResponse.redirect(new URL('/admin/login?error=invalid', request.url));
  }

  const response = NextResponse.redirect(new URL('/admin/rfq', request.url));
  response.cookies.set(getAdminCookie());
  return response;
}
