'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readRFQItems } from '@/lib/rfq';

const nav = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Solutions', '/solutions'],
  ['Products', '/products-partners'],
  ['RFQ', '/rfq'],
  ['Resources', '/resources'],
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

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} translate="no" className="text-sm font-semibold text-slate-700 transition hover:text-navy-900">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/rfq" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">Review RFQ Basket ({rfqCount})</Link>
          <Link href="/contact" className="inline-flex items-center rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Request Project Quote</Link>
        </div>

        <button className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 md:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav">
          <span translate="no">Menu</span>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white md:hidden">
          <div className="container py-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              {nav.map(([label, href]) => (
                <Link key={href} href={href} translate="no" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-navy-900">
                  {label}
                </Link>
              ))}
              <Link href="/rfq" className="mt-2 inline-flex w-full justify-center rounded-md border border-slate-300 px-5 py-2.5 font-semibold text-slate-700" onClick={() => setOpen(false)}>Review RFQ Basket ({rfqCount})</Link>
              <Link href="/contact" className="mt-2 inline-flex w-full justify-center rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600" onClick={() => setOpen(false)}>Request Project Quote</Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
