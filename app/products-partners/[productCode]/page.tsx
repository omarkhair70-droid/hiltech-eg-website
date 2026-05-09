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

  return <main><SectionShell>{/*content*/}<nav className="mb-4 overflow-x-auto whitespace-nowrap text-xs text-slate-600 sm:text-sm"><Link href="/products-partners" className="hover:text-slate-900">Products</Link><span className="mx-2">/</span><span>{product.category}</span><span className="mx-2">/</span><span className="font-medium text-slate-900">{product.name}</span></nav><section className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 p-4 text-white md:p-8"><div className="grid gap-6 lg:grid-cols-2"><div className="relative aspect-[4/3] max-h-[320px] overflow-hidden rounded-xl border border-white/15 bg-white/5">{productImageSrc ? <Image src={productImageSrc} alt={productImageAlt} fill className="object-contain p-4" sizes="(max-width: 1024px) 100vw, 50vw" /> : <div className="flex h-full items-center justify-center text-center"><div><p className="text-xs uppercase tracking-wider text-slate-300">Illustrative visual</p><p className="mt-2 text-sm text-slate-100">{product.name}</p></div></div>}</div><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-300">{product.category}</p><h1 className="mt-2 text-2xl font-bold md:text-4xl">{product.name}</h1><div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="rounded-full border border-white/25 px-3 py-1">Brand: {product.brand}</span><span className="rounded-full border border-white/25 px-3 py-1">Category: {product.category}</span></div><div className="mt-4 space-y-2 text-sm"><p className="rounded-lg border border-white/15 bg-white/5 px-3 py-2">{product.priceNote?.trim() ? `Price reference: ${product.priceNote.trim()}` : 'Price on request'}</p><p className="rounded-lg border border-white/15 bg-white/5 px-3 py-2">Confirm availability before quotation</p></div><ProductDetailActions product={product} intelligenceHref={intelligenceSlug ? `/products-partners/intelligence/${intelligenceSlug}` : undefined} labels={{ addToRFQ: 'Add to RFQ', technicalNotes: 'Technical Notes', backToProducts: 'Back to Products', addedToRFQ: 'Added to RFQ' }} /></div></div></section><section className="mt-8 grid gap-4 md:grid-cols-2"><article className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold text-slate-900">Specifications</h2><p className="mt-2 text-sm text-slate-700">{product.shortSpecs}</p></article><article className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold text-slate-900">Use case</h2><p className="mt-2 text-sm text-slate-700">{product.useCase}</p></article></section><section className="mt-4 rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold text-slate-900">Technical notes</h2><p className="mt-2 text-sm text-slate-700">{product.technicalNotes?.trim() || 'Technical details are confirmed during RFQ review.'}</p></section><section className="mt-4 rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-semibold text-slate-900">Often quoted with</h2><div className="mt-3 flex flex-wrap gap-2">{oftenQuotedWith.map((item) => <Link key={item} href="/products-partners" className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">{item}</Link>)}</div></section><section className="mt-4 rounded-xl border border-navy-900/15 bg-navy-50 p-4 text-sm text-slate-700">Final quotation, availability, and lead time are confirmed after RFQ review.</section><section className="mt-8"><h2 className="text-2xl font-bold text-slate-900">Related products</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{related.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs text-slate-600">{item.brand}</p><h3 className="mt-1 text-sm font-semibold text-slate-900"><Link href={`/products-partners/${item.id}`} className="hover:underline">{item.name}</Link></h3><p className="mt-2 text-xs text-slate-600">{item.priceNote?.trim() ? `Price reference: ${item.priceNote.trim()}` : 'Price on request'}</p><Link href={`/products-partners/${item.id}`} className="mt-3 inline-flex text-xs font-semibold text-navy-900 underline">View details</Link></article>)}</div></section></SectionShell></main>;
}
