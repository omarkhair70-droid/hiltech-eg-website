import type { Metadata } from 'next';
import { productDisclaimer } from '@/content/products';
import { site } from '@/content/site';
import { NoticeBox, SectionHeader, SectionShell } from '@/components/ui/primitives';
import { getPublicProducts } from '@/lib/server/products-public';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Network Infrastructure Products & RFQ References | HILTECH',
  description:
    'Browse project supply categories for structured cabling, fiber optics, racks, power systems, and CCTV infrastructure with RFQ support in Egypt.',
  alternates: { canonical: `${site.siteUrl}/products-partners`, languages: { en: `${site.siteUrl}/products-partners`, ar: `${site.siteUrl}/ar/products-partners`, 'x-default': `${site.siteUrl}/` } },
  openGraph: { title: 'HILTECH Products & Partners | Project Supply', description: 'Category-based project supply support across network infrastructure, fiber optics, data room equipment, and CCTV connectivity in Egypt.', url: `${site.siteUrl}/products-partners`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const { products } = await getPublicProducts();

  return (
    <main className="bg-slate-950">
      <SectionShell>
        <SectionHeader title="Products & Project Supply" description="Search products, filter by category, and add items to your RFQ basket for one structured request." className="[&>h2]:text-white [&>p]:text-slate-300" />
        <ProductsClient initialProducts={products} />
        <div className="mt-6 space-y-4">
          <NoticeBox>Product visuals are provided for catalog clarity. Final specifications, availability, and quotation are confirmed through HILTECH.</NoticeBox>
          <NoticeBox tone="highlight">{productDisclaimer}</NoticeBox>
        </div>
      </SectionShell>
    </main>
  );
}
