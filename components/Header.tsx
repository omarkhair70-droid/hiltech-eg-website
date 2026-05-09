'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { readRFQItems } from '@/lib/rfq';
import SiteSearch from '@/components/SiteSearch';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { arNavigation } from '@/content/ar/navigation';

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

  const localizeHref = (href: string) => (isArabic ? `/ar${href === '/' ? '' : href}` : href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-[0_4px_14px_rgba(15,23,42,0.05)] backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-2 md:h-16 md:gap-4">
        <Link href={isArabic ? '/ar' : '/'} translate="no" className="flex min-w-0 items-center gap-2 text-lg font-extrabold tracking-[0.12em] text-navy-900 md:text-xl">
          {showLogoImage ? <Image src="/logo.png" alt="HILTECH logo" width={132} height={38} className="h-7 w-auto max-w-[112px] object-contain sm:max-w-[118px] md:h-8 md:max-w-[128px]" onError={() => setShowLogoImage(false)} priority /> : null}
          <span translate="no" className={showLogoImage ? 'sr-only' : ''}>HILTECH</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/70 px-2 py-1 md:flex lg:gap-1.5" aria-label="Primary">
          {desktopNav.map(([label, href, arLabel]) => (
            <Link key={href} href={localizeHref(href)} translate="no" className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-navy-900">
              {isArabic ? arLabel : label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SiteSearch className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50" />
          <LanguageSwitcher className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" />
          <Link href={localizeHref('/rfq')} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">{isArabic ? `${arNavigation.rfqBasket} (${rfqCount})` : `RFQ Basket (${rfqCount})`}</Link>
          <Link href={localizeHref('/rfq')} className="inline-flex items-center rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">{isArabic ? arNavigation.requestProjectQuote : 'Request Project Quote'}</Link>
        </div>

        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <LanguageSwitcher className="inline-flex min-h-10 items-center rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50" />
          <SiteSearch className="inline-flex min-h-10 items-center rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50" onNavigate={() => setOpen(false)} />
          <button className="inline-flex min-h-10 items-center rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav">
            <span translate="no">{isArabic ? 'القائمة' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {open ? <div id="mobile-nav" className="border-t border-slate-200 bg-white md:hidden"><div className="container py-4 pb-28"><div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><div className="space-y-5"><section><p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{isArabic ? 'الرئيسية' : 'Main'}</p><div className="mt-2 grid gap-1">{desktopNav.map(([label, href, arLabel]) => <Link key={href} href={localizeHref(href)} translate="no" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy-900">{isArabic ? arLabel : label}</Link>)}</div></section><section><p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{isArabic ? 'أدوات طلب العرض' : 'RFQ Tools'}</p><div className="mt-2 grid gap-2"><Link href={localizeHref('/rfq')} className="inline-flex w-full justify-center rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600" onClick={() => setOpen(false)}>{isArabic ? arNavigation.requestProjectQuote : 'Request Project Quote'}</Link><Link href={localizeHref('/rfq')} className="inline-flex w-full justify-center rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700" onClick={() => setOpen(false)}>{isArabic ? `${arNavigation.rfqBasket} (${rfqCount})` : `RFQ Basket (${rfqCount})`}</Link><Link href={localizeHref('/track')} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy-900" onClick={() => setOpen(false)}>{isArabic ? arNavigation.trackRfq : 'Track RFQ'}</Link><LanguageSwitcher className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy-900" /></div></section></div></div></div></div> : null}
    </header>
  );
}
