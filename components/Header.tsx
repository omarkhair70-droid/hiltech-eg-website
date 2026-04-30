'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/content/site';

const nav = [
  ['Home', '/'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Products & Partners', '/products-partners'],
  ['Contact', '/contact'],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showLogoImage, setShowLogoImage] = useState(true);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-wide text-navy-900">
          {showLogoImage ? (
            <Image
              src="/logo.png"
              alt="HILTECH logo"
              width={34}
              height={34}
              className="rounded-sm"
              onError={() => setShowLogoImage(false)}
              priority
            />
          ) : null}
          <span>HILTECH</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-semibold text-slate-700 transition hover:text-navy-900">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn-primary">Request a Quote</Link>
        </div>

        <button className="rounded border border-slate-300 px-3 py-1.5 text-sm font-semibold md:hidden" onClick={() => setOpen((v) => !v)}>
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container flex flex-col gap-3 py-4">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="font-medium text-slate-700">
                {label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary w-fit" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
