import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetailActions from '@/components/ProductDetailActions';
import { SectionShell } from '@/components/ui/primitives';
import { productIntelligenceSlugByCategory } from '@/content/product-intelligence';
import { productVisuals } from '@/content/product-visuals';
import { site } from '@/content/site';
import { getPublicProducts } from '@/lib/server/products-public';

interface Params { productCode: string }

const visualsByProductId = new Map(productVisuals.map((visual) => [visual.productId, visual]));

async function getProduct(productCode: string) {
  const { products } = await getPublicProducts();
  const product = products.find((item) => item.id === productCode);
  return { products, product };
}

export async function generateStaticParams() {
  const { products } = await getPublicProducts();
  return products.map((product) => ({ productCode: product.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { product } = await getProduct(params.productCode);
  if (!product) return {};
  return {
    title: `${product.name} | Network Infrastructure Product Reference | HILTECH`,
    description: [product.shortSpecs, product.useCase, product.category].filter(Boolean).join(' ').slice(0, 160),
    alternates: { canonical: `${site.siteUrl}/products-partners/${product.id}` },
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { product, products } = await getProduct(params.productCode);
  if (!product) notFound();
  const intelligenceSlug = productIntelligenceSlugByCategory[product.category];
  const mappedVisual = visualsByProductId.get(product.id);
  const productImageSrc = product.image || mappedVisual?.imagePath;
  const productImageAlt = mappedVisual?.alt || product.name;

  const categoryLower = product.category.toLowerCase();
  const oftenQuotedWith = categoryLower.includes('fiber')
    ? ['ODF', 'Patch cords', 'Testing']
    : categoryLower.includes('copper') || categoryLower.includes('cat6')
      ? ['Patch panels', 'Faceplates', 'Racks', 'Testing']
      : categoryLower.includes('rack') || categoryLower.includes('cabinet') || categoryLower.includes('pdu')
        ? ['PDU', 'Cable management', 'Patch panels']
        : categoryLower.includes('cctv') || categoryLower.includes('security')
          ? ['Cabling', 'Network points', 'Racks']
          : ['Cable/fiber scope support', 'Testing', 'Patching accessories'];

  const related = products.filter((item) => item.id !== product.id).sort((a, b) => {
    const aScore = Number(a.category === product.category) * 2 + Number(a.brand === product.brand);
    const bScore = Number(b.category === product.category) * 2 + Number(b.brand === product.brand);
    return bScore - aScore;
  }).slice(0, 6);

  return (
    <main className="bg-slate-950">
      <SectionShell>
        <nav className="mb-4 overflow-x-auto whitespace-nowrap text-xs text-slate-400 sm:text-sm">
          <Link href="/products-partners" className="hover:text-white transition">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-400">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-white">{product.name}</span>
        </nav>

        <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4 text-white md:p-8 backdrop-blur-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative aspect-[4/3] max-h-[320px] overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm">
              {productImageSrc ? (
                <Image src={productImageSrc} alt={productImageAlt} fill className="object-contain p-4" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="flex h-full items-center justify-center text-center">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">Illustrative visual</p>
                    <p className="mt-2 text-sm text-slate-200">{product.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-400">{product.category}</p>
              <h1 className="mt-2 text-2xl font-bold md:text-4xl text-white">{product.name}</h1>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-slate-300">Brand: {product.brand}</span>
                <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-slate-300">Category: {product.category}</span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <p className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-slate-300">{product.priceNote?.trim() ? `Price reference: ${product.priceNote.trim()}` : 'Price on request'}</p>
                <p className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-slate-300">Confirm availability before quotation</p>
              </div>

              <ProductDetailActions product={product} intelligenceHref={intelligenceSlug ? `/products-partners/intelligence/${intelligenceSlug}` : undefined} labels={{ addToRFQ: 'Add to RFQ', technicalNotes: 'Technical notes' }} />
            </div>
          </div>
        </section>

        {product.useCase ? (
          <section className="mt-8 rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">Use Case</h2>
            <p className="mt-2 text-slate-300">{product.useCase}</p>
          </section>
        ) : null}

        {product.shortSpecs ? (
          <section className="mt-4 rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">Specifications</h2>
            <p className="mt-2 text-slate-300">{product.shortSpecs}</p>
          </section>
        ) : null}

        {oftenQuotedWith.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-4">Often quoted with</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {oftenQuotedWith.map((tag) => (
                <div key={tag} className="rounded-lg border border-white/15 bg-white/5 p-3 text-slate-300 text-sm backdrop-blur-sm">{tag}</div>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-4">Related Products</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relProduct) => (
                <Link key={relProduct.id} href={`/products-partners/${relProduct.id}`} className="group rounded-lg border border-white/15 bg-white/5 p-4 hover:border-orange-500/50 hover:bg-white/10 transition backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-400">{relProduct.category}</p>
                  <h3 className="mt-2 font-semibold text-white group-hover:text-orange-300 transition line-clamp-2">{relProduct.name}</h3>
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
