'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readRFQItems } from '@/lib/rfq';
import SiteSearch from '@/components/SiteSearch';

const nav = [
  ['Solutions', '/solutions'],
  ['Products', '/products-partners'],
  ['Services', '/services'],
  ['Resources', '/resources'],
  ['Track RFQ', '/track'],
  ['Contact', '/contact'],
] as const;

export default function Header() {
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-3 md:h-16 md:gap-4">
        <Link href="/" translate="no" className="flex items-center gap-2 text-lg font-extrabold tracking-[0.12em] text-navy-900 md:text-xl">
          {showLogoImage ? (
            <Image src="/logo.png" alt="HILTECH logo" width={132} height={38} className="h-7 w-auto max-w-[128px] object-contain md:h-8" onError={() => setShowLogoImage(false)} priority />
          ) : null}
          <span translate="no" className={showLogoImage ? 'sr-only' : ''}>HILTECH</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-6">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} translate="no" className="text-sm font-semibold text-slate-700 transition hover:text-navy-900">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SiteSearch className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50" />
          <Link href="/rfq" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">RFQ Basket ({rfqCount})</Link>
          <Link href="/rfq" className="inline-flex items-center rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Start RFQ</Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <SiteSearch className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50" onNavigate={() => setOpen(false)} />
          <button className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav">
          <span translate="no">Menu</span>
        </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white md:hidden">
          <div className="container py-3">
            <p className="mb-2 px-3 text-xs text-slate-500" dir="rtl">تنقل سريع لخدمات وحلول HILTECH.</p>
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <Link href="/" translate="no" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy-900">Home</Link>
              {nav.map(([label, href]) => (
                <Link key={href} href={href} translate="no" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy-900">
                  {label}
                </Link>
              ))}
              <Link href="/rfq" className="mt-2 inline-flex w-full justify-center rounded-md border border-slate-300 px-5 py-2.5 font-semibold text-slate-700" onClick={() => setOpen(false)}>RFQ Basket ({rfqCount})</Link>
              <Link href="/rfq" className="mt-2 inline-flex w-full flex-col items-center justify-center rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600" onClick={() => setOpen(false)}>
                <span>Start RFQ</span>
                <span className="text-[11px] font-medium text-orange-100" dir="rtl">ابدأ طلب عرض سعر</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
