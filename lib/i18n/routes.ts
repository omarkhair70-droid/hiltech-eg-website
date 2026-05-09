import { defaultLocale, type Locale } from '@/lib/i18n/config';

function splitPathAndQuery(path: string): { pathname: string; query: string } {
  const [pathname, query = ''] = path.split('?');
  return { pathname: pathname || '/', query };
}

const ARABIC_STATIC_ROUTE_MAP: Record<string, string> = {
  '/': '/ar',
  '/contact': '/ar/contact',
  '/work': '/ar/work',
  '/solutions': '/ar/solutions',
  '/scope-finder': '/ar/scope-finder',
  '/company': '/ar/company',
  '/track': '/ar/track',
  '/rfq': '/ar/rfq',
  '/products-partners': '/ar/products-partners',
  '/services': '/ar/services',
};

function getArabicPath(pathname: string): string {
  if (pathname === '/ar' || pathname === '/ar/') return '/ar';
  if (pathname.startsWith('/ar/')) return pathname;

  if (ARABIC_STATIC_ROUTE_MAP[pathname]) return ARABIC_STATIC_ROUTE_MAP[pathname];

  if (pathname.startsWith('/resources/')) return '/ar';

  if (pathname.startsWith('/solutions/')) return '/ar/solutions';

  if (pathname.startsWith('/products-partners/')) {
    return `/ar${pathname}`;
  }

  return '/ar';
}

export function stripLocale(path: string): string {
  const { pathname, query } = splitPathAndQuery(path);
  const cleanPath = pathname === '/ar' ? '/' : pathname.replace(/^\/ar(?=\/|$)/, '') || '/';
  return query ? `${cleanPath}?${query}` : cleanPath;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const { pathname, query } = splitPathAndQuery(path);

  if (locale === defaultLocale) {
    const base = stripLocale(pathname);
    return query ? `${base}?${query}` : base;
  }

  const arPath = getArabicPath(pathname);
  return query ? `${arPath}?${query}` : arPath;
}

export function getAlternateLocalePath(path: string, nextLocale: Locale): string {
  return getLocalizedPath(path, nextLocale);
}
