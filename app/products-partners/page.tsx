import type { Metadata } from 'next';
import { productDisclaimer } from '@/content/products';
import { site } from '@/content/site';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Products & Partners',
  description:
    'Browse project supply categories for structured cabling, fiber optics, cabinets, power, and security infrastructure with enterprise RFQ support in Egypt.',
  openGraph: {
    title: 'HILTECH Products & Partners | Project Supply Readiness',
    description: 'Category-based enterprise product supply support with availability and quotation upon request.',
    images: [site.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    images: [site.ogImage],
  },
};

export default function Page() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Products &amp; Project Supply</h1>
        <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          For project quantities, BOQs, or preferred brands, send your requirement list and HILTECH will confirm availability and quotation.
        </p>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-orange-50/30 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Featured Project Supply</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="mb-3 h-1 w-10 rounded-full bg-orange-400" /><h3 className="text-base font-semibold text-slate-900">Structured Cabling Rollouts</h3><p className="mt-2 text-sm text-slate-700">CAT6, fiber backbone, patch panels, faceplates, keystone modules, and connectivity components for office and enterprise networks.</p></article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="mb-3 h-1 w-10 rounded-full bg-orange-400" /><h3 className="text-base font-semibold text-slate-900">Data Room Expansion</h3><p className="mt-2 text-sm text-slate-700">Racks, cabinets, PDUs, ODFs, cable management, patch panels, and fiber/copper organization for technical rooms.</p></article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="mb-3 h-1 w-10 rounded-full bg-orange-400" /><h3 className="text-base font-semibold text-slate-900">CCTV &amp; Security Readiness</h3><p className="mt-2 text-sm text-slate-700">Camera connectivity, cabling paths, network links, and infrastructure preparation for surveillance systems.</p></article>
          </div>
        </section>

        <ProductsClient />

        <p className="mt-12 rounded-xl border border-orange-200 bg-orange-50/60 p-5 text-sm leading-relaxed text-slate-700 shadow-sm">{productDisclaimer}</p>
      </div>
    </main>
  );
}
