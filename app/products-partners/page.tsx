import Image from 'next/image';
import type { Metadata } from 'next';
import { productDisclaimer } from '@/content/products';
import { site } from '@/content/site';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Products & Partners | Project Supply in Egypt',
  description:
    'Browse project supply categories for structured cabling, fiber optics, racks, power systems, and CCTV infrastructure with RFQ support in Egypt.',
  alternates: { canonical: '/products-partners' },
  openGraph: {
    title: 'HILTECH Products & Partners | Project Supply',
    description:
      'Category-based project supply support across network infrastructure, fiber optics, data room equipment, and CCTV connectivity in Egypt.',
    url: `${site.siteUrl}/products-partners`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function Page() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Products &amp; Project Supply</h1>
        <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          For project quantities, BOQs, or preferred brands, send your requirement list and HILTECH will confirm availability and quotation.
        </p>

        <section className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-navy-900 p-5 text-white">
          <Image src="/og-image.png" alt="Product supply capability visual" fill className="object-cover opacity-30" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/60 to-navy-900/80" />
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-200">Branded Supply Scope</p>
            <p className="mt-2 text-sm text-slate-100">Built for enterprise procurement workflows, with category-driven RFQ support across cabling, racks, accessories, and validation-ready infrastructure components.</p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-orange-50/30 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Featured Project Supply</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="mb-3 h-1 w-10 rounded-full bg-orange-400" /><h3 className="text-base font-semibold text-slate-900">Structured Cabling Rollouts</h3><p className="mt-2 text-sm text-slate-700">CAT6, fiber backbone, patch panels, faceplates, keystone modules, and connectivity components for office and enterprise networks.</p></article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="mb-3 h-1 w-10 rounded-full bg-orange-400" /><h3 className="text-base font-semibold text-slate-900">Data Room Expansion</h3><p className="mt-2 text-sm text-slate-700">Racks, cabinets, PDUs, ODFs, cable management, patch panels, and fiber/copper organization for technical rooms.</p></article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="mb-3 h-1 w-10 rounded-full bg-orange-400" /><h3 className="text-base font-semibold text-slate-900">CCTV &amp; Security Readiness</h3><p className="mt-2 text-sm text-slate-700">Camera connectivity, cabling paths, network links, and infrastructure preparation for surveillance systems.</p></article>
          </div>
        </section>

        <ProductsClient />

        <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Product imagery can be added later as brand-approved assets become available.</p>
        <p className="mt-6 rounded-xl border border-orange-200 bg-orange-50/60 p-5 text-sm leading-relaxed text-slate-700 shadow-sm">{productDisclaimer}</p>
      </div>
    </main>
  );
}
