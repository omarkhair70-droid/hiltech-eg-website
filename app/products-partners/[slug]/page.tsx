import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NoticeBox, PremiumCard, SectionShell } from '@/components/ui/primitives';
import { CCTVInfrastructureDiagram, DataRoomDiagram, FiberBackboneDiagram, StructuredCablingDiagram, TechnicalDiagramPanel } from '@/components/diagrams';
import { productIntelligenceBySlug, productIntelligenceCategories } from '@/content/product-intelligence';
import { productDisclaimer, products } from '@/content/products';
import { site } from '@/content/site';
import CategoryIntelligenceClient from './CategoryIntelligenceClient';

const relatedSolutionsByIntelligenceSlug: Record<string, { label: string; slug: string }[]> = {
  'fiber-optic-systems': [{ label: 'Fiber Backbone', slug: 'fiber-backbone' }, { label: 'Data Room Infrastructure', slug: 'data-rooms' }],
  'copper-cat6-cabling': [{ label: 'Structured Cabling', slug: 'structured-cabling' }],
  'cctv-security': [{ label: 'CCTV Infrastructure', slug: 'cctv-infrastructure' }],
};


const categoryDiagramBySlug: Record<string, { title: string; subtitle: string; node: JSX.Element }> = {
  'fiber-optic-systems': { title: 'Fiber Route Context', subtitle: 'Compact backbone visual for route planning context.', node: <FiberBackboneDiagram /> },
  'copper-cat6-cabling': { title: 'Copper Path Context', subtitle: 'Endpoint to patching and rack uplink flow.', node: <StructuredCablingDiagram /> },
  'cabinets-racks-pdu': { title: 'Rack Readiness Context', subtitle: 'Rack zones and power distribution hint.', node: <DataRoomDiagram /> },
  'cctv-security': { title: 'Security Path Context', subtitle: 'Camera-to-control room network route visual.', node: <CCTVInfrastructureDiagram /> },
};

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

  return <main><SectionShell><nav className="mb-4 text-sm text-slate-600"><Link className="hover:text-slate-900" href="/products-partners">Products &amp; Project Supply</Link><span className="mx-2">/</span><span className="break-words font-medium text-slate-900">{category.title}</span></nav><section className="rounded-2xl border border-navy-900/20 bg-gradient-to-br from-navy-900 to-slate-900 p-6 text-white md:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{category.eyebrow}</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">{category.title}</h1><p className="mt-3 max-w-3xl text-sm text-slate-200 md:text-base">{category.intro}</p><div className="mt-4 flex flex-wrap gap-2"><Link href="/products-partners" className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white">Add Related Products to RFQ</Link><Link href="/products-partners" className="inline-flex items-center rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white">Browse Products</Link><Link href="/rfq" className="inline-flex items-center rounded-lg border border-orange-300 bg-white/10 px-4 py-2 text-sm font-semibold text-orange-200">Review RFQ</Link></div></section>{categoryDiagramBySlug[category.slug] ? <section className="mt-8"><TechnicalDiagramPanel surface="dark" title={categoryDiagramBySlug[category.slug].title} subtitle={categoryDiagramBySlug[category.slug].subtitle}>{categoryDiagramBySlug[category.slug].node}</TechnicalDiagramPanel></section> : null}<section className="mt-8"><h2 className="text-2xl font-bold text-slate-900">Where this fits in the infrastructure stack</h2><p className="mt-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">{category.strategicSummary}</p></section><section className="mt-8 grid gap-4 md:grid-cols-2"><PremiumCard><h2 className="text-lg font-bold text-slate-900">Typical components</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{category.typicalComponents.map((item) => <li key={item}>• {item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-bold text-slate-900">Common use cases</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{category.commonUseCases.map((item) => <li key={item}>• {item}</li>)}</ul></PremiumCard></section><section className="mt-8 grid gap-4 md:grid-cols-2"><PremiumCard accent><h2 className="text-lg font-bold text-slate-900">What to include in your RFQ</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{category.requestChecklist.map((item) => <li key={item}>✓ {item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-bold text-slate-900">Compatibility &amp; project notes</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{category.compatibilityNotes.map((item) => <li key={item}>• {item}</li>)}</ul><h3 className="mt-4 text-sm font-semibold text-slate-900">Handover notes</h3><ul className="mt-2 space-y-2 text-sm text-slate-700">{category.handoverNotes.map((item) => <li key={item}>• {item}</li>)}</ul></PremiumCard></section><section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-lg font-bold text-slate-900">Related capability tags</h2><div className="mt-3 flex flex-wrap gap-2">{category.relatedCapabilityTags.map((tag) => <span key={tag} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">{tag}</span>)}</div>{relatedSolutionsByIntelligenceSlug[category.slug] ? <div className="mt-5"><h3 className="text-sm font-semibold text-slate-900">Related solutions</h3><div className="mt-2 flex flex-wrap gap-2">{relatedSolutionsByIntelligenceSlug[category.slug].map((solution) => <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">{solution.label}</Link>)}</div></div> : null}<p className="mt-4 text-xs text-slate-500">{category.disclaimer}</p></section><CategoryIntelligenceClient category={category} relatedProducts={relatedProducts} /><div className="mt-6"><NoticeBox tone="highlight">{productDisclaimer}</NoticeBox></div></SectionShell></main>;
}
