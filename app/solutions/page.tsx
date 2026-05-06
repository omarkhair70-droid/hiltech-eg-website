import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionShell, PremiumCard, CTAButton, SectionHeader } from '@/components/ui/primitives';
import { solutions } from '@/content/solutions';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Infrastructure Solutions | HILTECH',
  description: 'Practical infrastructure solution pages for structured cabling, fiber, data rooms, CCTV infrastructure, testing, and project supply.',
  alternates: { canonical: `${site.siteUrl}/solutions` },
  openGraph: { title: 'Infrastructure Solutions | HILTECH', description: 'Use-case solution pages linked to product browsing and RFQ workflow.', url: `${site.siteUrl}/solutions`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function SolutionsPage() {
  return <main><SectionShell><section className="rounded-2xl border border-navy-900/20 bg-gradient-to-br from-navy-900 to-slate-900 p-6 text-white md:p-8"><h1 className="text-3xl font-bold md:text-4xl">Infrastructure Solutions</h1><p className="mt-3 max-w-4xl text-sm text-slate-200 md:text-base">Use these pages to understand deployment scenarios, then continue to products and RFQ.</p></section><section className="mt-8"><SectionHeader title="Solution categories" description="Each solution page explains scope, common components, and delivery context." /><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{solutions.map((solution) => <PremiumCard key={solution.slug} className="flex h-full flex-col"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{solution.eyebrow}</p><h2 className="mt-2 text-lg font-bold text-slate-900">{solution.shortTitle}</h2><p className="mt-2 text-sm text-slate-600">{solution.intro}</p><div className="mt-4"><Link className="text-sm font-semibold text-navy-900 underline underline-offset-4" href={`/solutions/${solution.slug}`}>View solution details</Link></div></PremiumCard>)}</div></section><section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><h2 className="text-xl font-bold text-slate-900">Next step</h2><div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap"><CTAButton href="/products-partners">Browse Products</CTAButton><CTAButton href="/rfq" variant="secondary">Start RFQ</CTAButton></div></section></SectionShell></main>;
}
