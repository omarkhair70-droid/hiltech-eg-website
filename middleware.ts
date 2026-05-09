import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ar/resources" || pathname.startsWith("/ar/resources/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/ar";
    return NextResponse.redirect(url);
  }

  if (pathname === "/ar/solutions") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/ar/solutions/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/ar/solutions";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ar/resources/:path*", "/ar/solutions/:path*"],
};
