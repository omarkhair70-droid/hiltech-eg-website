import { defaultLocale, type Locale } from '@/lib/i18n/config';

function splitPathAndQuery(path: string): { pathname: string; query: string } {
  const [pathname, query = ''] = path.split('?');
  return { pathname: pathname || '/', query };
}

export function stripLocale(path: string): string {
  const { pathname, query } = splitPathAndQuery(path);
  const cleanPath = pathname === '/ar' ? '/' : pathname.replace(/^\/ar(?=\/|$)/, '') || '/';
  return query ? `${cleanPath}?${query}` : cleanPath;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const base = stripLocale(path);
  if (locale === defaultLocale) return base;

  const { pathname, query } = splitPathAndQuery(base);
  const arPath = pathname === '/' ? '/ar' : `/ar${pathname}`.replace(/^\/ar\/ar/, '/ar');
  return query ? `${arPath}?${query}` : arPath;
}

export function getAlternateLocalePath(path: string, nextLocale: Locale): string {
  return getLocalizedPath(path, nextLocale);
}
