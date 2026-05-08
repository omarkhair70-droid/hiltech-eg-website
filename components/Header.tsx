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
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white shadow-[0_14px_38px_rgba(2,6,23,0.45)] backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-3 md:h-[76px] md:gap-4">
        <Link href="/" translate="no" className="group flex items-center gap-3 text-lg font-extrabold tracking-[0.15em] text-white md:text-xl">
          <span className="inline-flex items-center rounded-lg border border-slate-600/70 bg-white/5 px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            {showLogoImage ? (
              <Image src="/logo-dark.png" alt="HILTECH logo" width={132} height={38} className="h-7 w-auto max-w-[128px] object-contain md:h-8" onError={() => setShowLogoImage(false)} priority />
            ) : null}
          </span>
          <span translate="no" className={showLogoImage ? 'sr-only' : ''}>HILTECH</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-6">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} translate="no" className="rounded-md px-2 py-1 text-sm font-semibold text-slate-100 transition hover:bg-white/10 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SiteSearch className="inline-flex items-center rounded-lg border border-slate-500/80 bg-white/10 px-3 py-2 text-sm font-semibold text-slate-100 shadow-sm transition hover:border-slate-300 hover:bg-white/15" />
          <Link href="/rfq" className="rounded-lg border border-slate-500/80 bg-slate-700/50 px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700">RFQ Basket ({rfqCount})</Link>
          <Link href="/rfq" className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white ring-1 ring-orange-300/20 hover:bg-orange-600">Start RFQ</Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <SiteSearch className="rounded-lg border border-slate-500/80 bg-white/10 px-3 py-1.5 text-sm font-semibold text-slate-100 shadow-sm transition hover:border-slate-300 hover:bg-white/15" onNavigate={() => setOpen(false)} />
          <button className="rounded-lg border border-orange-300/40 bg-orange-500/15 px-3.5 py-1.5 text-sm font-semibold text-orange-100 shadow-sm transition hover:bg-orange-500/25" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav">
            <span translate="no">Menu</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-slate-700 bg-gradient-to-b from-navy-950 via-navy-900 to-slate-900 md:hidden">
          <div className="container py-4">
            <p className="mb-2 px-1 text-[11px] uppercase tracking-[0.16em] text-orange-300">Field-ready infrastructure navigation</p>
            <p className="mb-3 px-1 text-xs text-slate-300" dir="rtl">تنقل سريع لخدمات وحلول HILTECH.</p>
            <div className="rounded-2xl border border-slate-600/70 bg-white/5 p-3 shadow-xl">
              <Link href="/" translate="no" onClick={() => setOpen(false)} className="block rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-white/10">Home</Link>
              {nav.map(([label, href]) => (
                <Link key={href} href={href} translate="no" onClick={() => setOpen(false)} className="mt-1 block rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-white/10">
                  {label}
                </Link>
              ))}
              <div className="mt-3 grid gap-2">
                <Link href="/rfq" className="inline-flex w-full justify-center rounded-lg border border-slate-500 bg-slate-700/60 px-5 py-2.5 font-semibold text-slate-100" onClick={() => setOpen(false)}>RFQ Basket ({rfqCount})</Link>
                <Link href="/rfq" className="inline-flex w-full flex-col items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600" onClick={() => setOpen(false)}>
                  <span>Start RFQ</span>
                  <span className="text-[11px] font-medium text-orange-100" dir="rtl">ابدأ طلب عرض سعر</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
