import type { Metadata } from 'next';
import { arProductsMessages } from '@/content/ar/products';
import { site } from '@/content/site';
import { NoticeBox, SectionHeader, SectionShell } from '@/components/ui/primitives';
import { getPublicProducts } from '@/lib/server/products-public';
import ProductsClient from '@/app/products-partners/ProductsClient';

export const metadata: Metadata = {
  title: 'منتجات وحلول البنية التحتية | HILTECH',
  description: 'منتجات ومراجع للشبكات والفايبر والراك وتجهيزات البنية التحتية، مع إمكانية إضافتها إلى طلب عرض سعر منظم.',
  alternates: { canonical: `${site.siteUrl}/ar/products-partners`, languages: { en: `${site.siteUrl}/products-partners`, ar: `${site.siteUrl}/ar/products-partners`, 'x-default': `${site.siteUrl}/` } },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArabicProductsPartnersPage() {
  const { products } = await getPublicProducts();

  return (
    <main className="section" dir="rtl">
      <SectionShell>
        <SectionHeader title={arProductsMessages.pageTitle} description={arProductsMessages.pageIntro} />
        <NoticeBox>{arProductsMessages.confirmAvailability}</NoticeBox>
        <ProductsClient initialProducts={products} locale="ar" rfqHref="/ar/rfq" productsHref="/ar/products-partners" messages={arProductsMessages} />
      </SectionShell>
    </main>
  );
}
