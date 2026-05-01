import { NextResponse } from 'next/server';
import { getClearedAdminCookie } from '@/lib/server/admin-auth';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url));
  response.cookies.set(getClearedAdminCookie());
  return response;
}
