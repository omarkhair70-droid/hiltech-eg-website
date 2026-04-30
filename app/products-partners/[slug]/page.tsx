import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NoticeBox, PremiumCard, SectionShell } from '@/components/ui/primitives';
import { productIntelligenceBySlug, productIntelligenceCategories } from '@/content/product-intelligence';
import { productDisclaimer, products } from '@/content/products';
import { site } from '@/content/site';
import CategoryIntelligenceClient from './CategoryIntelligenceClient';

interface Params { slug: string }

export function generateStaticParams() {
  return productIntelligenceCategories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const category = productIntelligenceBySlug[params.slug];
  if (!category) return {};
  const url = `${site.siteUrl}/products-partners/${category.slug}`;
  const title = `${category.title} | HILTECH`;
  return {
    title,
    description: category.intro,
    alternates: { canonical: url },
    openGraph: { title, description: category.intro, url, images: [site.ogImage] },
    twitter: { card: 'summary_large_image', images: [site.ogImage] },
  };
}

export default function ProductIntelligencePage({ params }: { params: Params }) {
  const category = productIntelligenceBySlug[params.slug];
  if (!category) notFound();
  const relatedProducts = products.filter((item) => item.category === category.title);

  return <main><SectionShell><nav className="mb-4 text-sm text-slate-600"><Link className="hover:text-slate-900" href="/products-partners">Products &amp; Project Supply</Link><span className="mx-2">/</span><span className="break-words font-medium text-slate-900">{category.title}</span></nav><section className="rounded-2xl border border-navy-900/20 bg-gradient-to-br from-navy-900 to-slate-900 p-6 text-white md:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{category.eyebrow}</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">{category.title}</h1><p className="mt-3 max-w-3xl text-sm text-slate-200 md:text-base">{category.intro}</p><div className="mt-4 flex flex-wrap gap-2"><Link href="/products-partners" className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white">Add Related Products to RFQ</Link><Link href="/products-partners" className="inline-flex items-center rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white">Browse Products</Link><Link href="/rfq" className="inline-flex items-center rounded-lg border border-orange-300 bg-white/10 px-4 py-2 text-sm font-semibold text-orange-200">Review RFQ</Link></div></section><section className="mt-8"><h2 className="text-2xl font-bold text-slate-900">Where this fits in the infrastructure stack</h2><p className="mt-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">{category.strategicSummary}</p></section><section className="mt-8 grid gap-4 md:grid-cols-2"><PremiumCard><h2 className="text-lg font-bold text-slate-900">Typical components</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{category.typicalComponents.map((item) => <li key={item}>• {item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-bold text-slate-900">Common use cases</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{category.commonUseCases.map((item) => <li key={item}>• {item}</li>)}</ul></PremiumCard></section><section className="mt-8 grid gap-4 md:grid-cols-2"><PremiumCard accent><h2 className="text-lg font-bold text-slate-900">What to include in your RFQ</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{category.requestChecklist.map((item) => <li key={item}>✓ {item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-bold text-slate-900">Compatibility &amp; project notes</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{category.compatibilityNotes.map((item) => <li key={item}>• {item}</li>)}</ul><h3 className="mt-4 text-sm font-semibold text-slate-900">Handover notes</h3><ul className="mt-2 space-y-2 text-sm text-slate-700">{category.handoverNotes.map((item) => <li key={item}>• {item}</li>)}</ul></PremiumCard></section><section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-bold text-slate-900">Related capability tags</h2><div className="mt-3 flex flex-wrap gap-2">{category.relatedCapabilityTags.map((tag) => <span key={tag} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">{tag}</span>)}</div><p className="mt-4 text-xs text-slate-500">{category.disclaimer}</p></section><CategoryIntelligenceClient category={category} relatedProducts={relatedProducts} /><div className="mt-6"><NoticeBox tone="highlight">{productDisclaimer}</NoticeBox></div></SectionShell></main>;
}
