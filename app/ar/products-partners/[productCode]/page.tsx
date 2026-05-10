import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetailActions from '@/components/ProductDetailActions';

import { SectionShell } from '@/components/ui/primitives';
import { arProductsMessages } from '@/content/ar/products';
import { productIntelligenceSlugByCategory } from '@/content/product-intelligence';
import { productVisuals } from '@/content/product-visuals';
import { site } from '@/content/site';
import { getPublicProducts } from '@/lib/server/products-public';

interface Params { productCode: string }

const visualsByProductId = new Map(productVisuals.map((visual) => [visual.productId, visual]));
const localizeCategory = (c: string) => arProductsMessages.categoryLabels[c] || c;

async function getProduct(productCode: string) {
  const { products } = await getPublicProducts();
  const product = products.find((i) => i.id === productCode);
  return { product, products };
}

export async function generateStaticParams() {
  const { products } = await getPublicProducts();
  return products.map((p) => ({ productCode: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { product } = await getProduct(params.productCode);
  if (!product) return {};
  return { title: `${product.name} | تفاصيل المنتج | HILTECH`, alternates: { canonical: `${site.siteUrl}/ar/products-partners/${product.id}` } };
}

export default async function Page({ params }: { params: Params }) {
  const { product, products } = await getProduct(params.productCode);
  if (!product) notFound();
  const intelligenceSlug = productIntelligenceSlugByCategory[product.category];
  const mappedVisual = visualsByProductId.get(product.id);
  const productImageSrc = product.image || mappedVisual?.imagePath;
  const productImageAlt = mappedVisual?.alt || product.name;

  const categoryLower = product.category.toLowerCase();
  const oftenQuotedWith = categoryLower.includes('fiber')
    ? ['ODF', 'باتش كورد', 'الاختبار']
    : categoryLower.includes('copper') || categoryLower.includes('cat6')
      ? ['باتش بانل', 'فيس بليت', 'راك', 'الاختبار']
      : categoryLower.includes('rack') || categoryLower.includes('cabinet') || categoryLower.includes('pdu')
        ? ['PDU', 'تنظيم الكابلات', 'باتش بانل']
        : categoryLower.includes('cctv') || categoryLower.includes('security')
          ? ['كابلات', 'نقاط شبكة', 'راك']
          : ['دعم نطاق الكابلات/الفايبر', 'الاختبار', 'ملحقات الربط'];

  const related = products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const aScore = Number(a.category === product.category) * 2 + Number(a.brand === product.brand);
      const bScore = Number(b.category === product.category) * 2 + Number(b.brand === product.brand);
      return bScore - aScore;
    })
    .slice(0, 6);

  return (
    <main dir="rtl" className="bg-slate-950 text-white">
      <SectionShell>
        <nav className="mb-4 overflow-x-auto whitespace-nowrap text-sm text-slate-300">
          <Link href="/ar/products-partners" className="transition hover:text-white">العودة إلى المنتجات</Link>
        </nav>

        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 p-4 text-white md:p-8 backdrop-blur-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5">
              {productImageSrc ? <Image src={productImageSrc} alt={productImageAlt} fill className="object-contain p-4" /> : null}
            </div>
            <div>
              <p className="text-xs text-orange-300">{localizeCategory(product.category)}</p>
              <h1 className="mt-2 text-2xl font-bold">{product.name}</h1>
              <p className="mt-2 text-sm">العلامة التجارية: {product.brand}</p>
              <p className="mt-1 text-sm">التصنيف: {localizeCategory(product.category)}</p>
              <p className="mt-2 rounded-lg border border-white/15 bg-gradient-to-br from-white/10 to-white/5 px-3 py-2 text-sm">{product.priceNote?.trim() ? `${arProductsMessages.priceRefLabel} ${product.priceNote.trim()}` : 'السعر عند الطلب'}</p>
              <p className="mt-2 rounded-lg border border-white/15 bg-gradient-to-br from-white/10 to-white/5 px-3 py-2 text-sm">يتم تأكيد السعر والتوفر أثناء مراجعة طلب عرض السعر</p>
              <ProductDetailActions product={product} intelligenceHref={intelligenceSlug ? `/ar/products-partners/intelligence/${intelligenceSlug}` : undefined} productsHref="/ar/products-partners" labels={{ addToRFQ: 'أضف لطلب عرض السعر', technicalNotes: 'ملاحظات فنية', backToProducts: 'العودة إلى المنتجات', addedToRFQ: 'تمت الإضافة' }} />
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5">
            <h2 className="font-semibold">المواصفات</h2>
            <p className="mt-2 text-sm text-slate-300">{product.shortSpecs}</p>
          </article>
          <article className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5">
            <h2 className="font-semibold">الاستخدامات</h2>
            <p className="mt-2 text-sm text-slate-300">{product.useCase}</p>
          </article>
        </section>

        <section className="mt-4 rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5">
          <h2 className="font-semibold">ملاحظات فنية</h2>
          <p className="mt-2 text-sm">{product.technicalNotes?.trim() || 'يتم تأكيد التفاصيل الفنية أثناء مراجعة طلب عرض السعر.'}</p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-white">غالبًا يُطلب معه</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {oftenQuotedWith.map((tag) => (
              <div key={tag} className="rounded-lg border border-white/15 bg-white/5 p-3 text-sm text-slate-300 backdrop-blur-sm">{tag}</div>
            ))}
          </div>
        </section>

        {related.length > 0 ? (
          <section className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-white">منتجات ذات صلة</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relProduct) => (
                <Link key={relProduct.id} href={`/ar/products-partners/${relProduct.id}`} className="group rounded-lg border border-white/15 bg-white/5 p-4 transition backdrop-blur-sm hover:border-orange-500/50 hover:bg-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-400">{localizeCategory(relProduct.category)}</p>
                  <h3 className="mt-2 line-clamp-2 font-semibold text-white transition group-hover:text-orange-300">{relProduct.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{relProduct.brand}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </SectionShell>
    </main>
  );
}
