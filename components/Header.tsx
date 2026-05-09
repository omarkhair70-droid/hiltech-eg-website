'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { readRFQItems } from '@/lib/rfq';
import SiteSearch from '@/components/SiteSearch';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { arNavigation } from '@/content/ar/navigation';
import { getLocalizedPath } from '@/lib/i18n/routes';

const desktopNav = [
  ['Solutions', '/solutions', arNavigation.solutions],
  ['Products', '/products-partners', arNavigation.products],
  ['Work', '/work', arNavigation.work],
  ['Services', '/services', arNavigation.services],
  ['Company', '/company', arNavigation.company],
  ['Contact', '/contact', arNavigation.contact],
] as const;

export default function Header() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const [open, setOpen] = useState(false);
  const [showLogoImage, setShowLogoImage] = useState(true);
  const [rfqCount, setRfqCount] = useState(0);

  useEffect(() => {
    const sync = () => setRfqCount(readRFQItems().reduce((sum, item) => sum + item.quantity, 0));
    sync();
    window.addEventListener('rfq-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('rfq-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const localizeHref = (href: string) => getLocalizedPath(href, isArabic ? 'ar' : 'en');

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-2 md:h-16 md:gap-4">
        <Link href={isArabic ? '/ar' : '/'} translate="no" className="flex min-w-0 items-center gap-2 text-lg font-extrabold tracking-[0.12em] text-white md:text-xl">
          {showLogoImage ? <Image src="/logo-dark.png" alt="HILTECH logo" width={132} height={38} className="h-7 w-auto max-w-[112px] object-contain sm:max-w-[118px] md:h-8 md:max-w-[128px]" onError={() => setShowLogoImage(false)} priority /> : null}
          <span translate="no" className={showLogoImage ? 'sr-only' : 'text-white'}>HILTECH</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 md:flex lg:gap-1.5 backdrop-blur-sm" aria-label="Primary">
          {desktopNav.map(([label, href, arLabel]) => (
            <Link key={href} href={localizeHref(href)} translate="no" className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:bg-white/15 hover:text-white">
              {isArabic ? arLabel : label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SiteSearch className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-white/30 hover:bg-white/10 backdrop-blur-sm" />
          <LanguageSwitcher className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/10 backdrop-blur-sm" />
          <Link href={localizeHref('/rfq')} className="rounded-md border border-white/20 bg-white/5 px-2.5 py-2 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/10 backdrop-blur-sm">{isArabic ? `${arNavigation.rfqBasket} (${rfqCount})` : `RFQ Basket (${rfqCount})`}</Link>
          <Link href={localizeHref('/rfq')} className="inline-flex items-center rounded-md bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition">{isArabic ? 'اطلب عرض سعر' : 'Request Quote'}</Link>
        </div>

        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <LanguageSwitcher className="inline-flex min-h-10 items-center rounded-lg border border-white/20 bg-white/5 px-2 py-1.5 text-xs font-semibold text-slate-200 shadow-sm transition hover:border-white/30 hover:bg-white/10 backdrop-blur-sm" />
          <SiteSearch className="inline-flex min-h-10 items-center rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-white/30 hover:bg-white/10 backdrop-blur-sm" onNavigate={() => setOpen(false)} />
          <button className="inline-flex min-h-10 items-center rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-white/30 hover:bg-white/10 backdrop-blur-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav">
            <span translate="no">{isArabic ? 'القائمة' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {open ? <div id="mobile-nav" className="border-t border-white/10 bg-slate-950 md:hidden"><div className="container py-4 pb-28"><div className="rounded-xl border border-white/15 bg-white/5 p-3 shadow-sm backdrop-blur-sm"><div className="space-y-5"><section><p className="public-eyebrow px-2 text-slate-400">{isArabic ? 'الرئيسية' : 'Main'}</p><div className="mt-2 grid gap-1">{desktopNav.map(([label, href, arLabel]) => <Link key={href} href={localizeHref(href)} translate="no" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white">{isArabic ? arLabel : label}</Link>)}</div></section><section><p className="public-eyebrow px-2 text-slate-400">{isArabic ? 'أدوات طلب العرض' : 'RFQ Tools'}</p><div className="mt-2 grid gap-2"><Link href={localizeHref('/rfq')} className="inline-flex w-full justify-center rounded-md bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700" onClick={() => setOpen(false)}>{isArabic ? 'اطلب عرض سعر' : 'Request Quote'}</Link><Link href={localizeHref('/rfq')} className="inline-flex w-full justify-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10" onClick={() => setOpen(false)}>{isArabic ? `${arNavigation.rfqBasket} (${rfqCount})` : `RFQ Basket (${rfqCount})`}</Link><Link href={localizeHref('/track')} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white" onClick={() => setOpen(false)}>{isArabic ? arNavigation.trackRfq : 'Track RFQ'}</Link><LanguageSwitcher className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white" /></div></section></div></div></div></div> : null}
    </header>
  );
}
