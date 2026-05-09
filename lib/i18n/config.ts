export const locales = ['en', 'ar'] as const;

export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isArabicLocale(locale: Locale): boolean {
  return locale === 'ar';
}
