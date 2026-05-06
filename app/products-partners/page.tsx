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

  return <main><SectionShell><SectionHeader title="Browse Products & Build RFQ" description="Select categories, add required items to your RFQ basket, and submit one request for availability and quotation." /><ProductsClient initialProducts={products} /><div className="mt-6 space-y-4"><NoticeBox>Catalog visuals are for browsing. Final specifications, availability, and quotation are confirmed by HILTECH after RFQ review.</NoticeBox><NoticeBox tone="highlight">{productDisclaimer}</NoticeBox></div></SectionShell></main>;
}
