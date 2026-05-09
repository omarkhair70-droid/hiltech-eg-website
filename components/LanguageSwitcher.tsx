'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAlternateLocalePath } from '@/lib/i18n/routes';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(window.location.search || '');
  }, []);

  const current = `${pathname}${search}`;
  const isArabic = pathname.startsWith('/ar');
  const href = getAlternateLocalePath(current, isArabic ? 'en' : 'ar');

  return <Link href={href} className={className}>{isArabic ? 'EN' : 'عربي'}</Link>;
}
