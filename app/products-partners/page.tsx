import type { Metadata } from 'next';
import { productDisclaimer } from '@/content/products';
import { site } from '@/content/site';
import { NoticeBox, PremiumCard, SectionHeader, SectionShell, VisualPanel } from '@/components/ui/primitives';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Products & Partners | Project Supply in Egypt',
  description:
    'Browse project supply categories for structured cabling, fiber optics, racks, power systems, and CCTV infrastructure with RFQ support in Egypt.',
  alternates: { canonical: `${site.siteUrl}/products-partners` },
  openGraph: { title: 'HILTECH Products & Partners | Project Supply', description: 'Category-based project supply support across network infrastructure, fiber optics, data room equipment, and CCTV connectivity in Egypt.', url: `${site.siteUrl}/products-partners`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function Page() {
  return <main><SectionShell><SectionHeader title="Products & Project Supply" description="For project quantities, BOQs, or preferred brands, send your requirement list and HILTECH will confirm availability and quotation." /><div className="mt-6"><VisualPanel title="Branded Supply Scope" description="Built for enterprise procurement workflows, with category-driven RFQ support across cabling, racks, accessories, and validation-ready infrastructure components." labels={['Cabling', 'Racks & Power', 'Fiber', 'Security']} /></div><section className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-orange-50/30 p-6"><h2 className="text-2xl font-bold text-slate-900">Featured Project Supply</h2><div className="mt-5 grid gap-4 md:grid-cols-3"><PremiumCard accent><h3 className="text-base font-semibold text-slate-900">Structured Cabling Rollouts</h3><p className="mt-2 text-sm text-slate-700">CAT6, fiber backbone, patch panels, faceplates, keystone modules, and connectivity components for office and enterprise networks.</p></PremiumCard><PremiumCard accent><h3 className="text-base font-semibold text-slate-900">Data Room Expansion</h3><p className="mt-2 text-sm text-slate-700">Racks, cabinets, PDUs, ODFs, cable management, patch panels, and fiber/copper organization for technical rooms.</p></PremiumCard><PremiumCard accent><h3 className="text-base font-semibold text-slate-900">CCTV &amp; Security Readiness</h3><p className="mt-2 text-sm text-slate-700">Camera connectivity, cabling paths, network links, and infrastructure preparation for surveillance systems.</p></PremiumCard></div></section><ProductsClient /><div className="mt-6 space-y-4"><NoticeBox>Product visuals are provided for catalog clarity. Final specifications, availability, and quotation are confirmed through HILTECH.</NoticeBox><NoticeBox tone="highlight">{productDisclaimer}</NoticeBox></div></SectionShell></main>;
}
