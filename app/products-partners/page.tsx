import type { Metadata } from 'next';
import { productDisclaimer } from '@/content/products';
import { site } from '@/content/site';
import { NoticeBox, SectionHeader, SectionShell } from '@/components/ui/primitives';
import { getPublicProducts } from '@/lib/server/products-public';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Products & Partners | Project Supply in Egypt',
  description:
    'Browse project supply categories for structured cabling, fiber optics, racks, power systems, and CCTV infrastructure with RFQ support in Egypt.',
  alternates: { canonical: `${site.siteUrl}/products-partners` },
  openGraph: { title: 'HILTECH Products & Partners | Project Supply', description: 'Category-based project supply support across network infrastructure, fiber optics, data room equipment, and CCTV connectivity in Egypt.', url: `${site.siteUrl}/products-partners`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const { products } = await getPublicProducts();

  return <main><SectionShell><section className="rounded-2xl border border-navy-900/20 bg-gradient-to-br from-navy-900 to-slate-900 p-6 text-white md:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Procurement catalog</p><SectionHeader className="mt-2 text-white [&_h1]:text-white [&_p]:text-slate-200" title="Products & Project Supply" description="Build your RFQ list first, then submit one structured request for availability and quotation." /></section><ProductsClient initialProducts={products} /><div className="mt-6 space-y-4"><NoticeBox>Product visuals are provided for catalog clarity. Final specifications, availability, and quotation are confirmed through HILTECH.</NoticeBox><NoticeBox tone="highlight">{productDisclaimer}</NoticeBox></div></SectionShell></main>;
}
