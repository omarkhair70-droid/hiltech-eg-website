import { arNavigation } from '@/content/ar/navigation';
import { arPublicCopy } from '@/content/ar/public-copy';
import type { Locale } from '@/lib/i18n/config';

export const dictionary = {
  en: null,
  ar: {
    navigation: arNavigation,
    publicCopy: arPublicCopy,
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
