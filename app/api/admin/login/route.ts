import { NextResponse } from 'next/server';
import { getAdminCookie, isAdminConfigured, validateAdminPassword } from '@/lib/server/admin-auth';

export async function POST(request: Request) {
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
