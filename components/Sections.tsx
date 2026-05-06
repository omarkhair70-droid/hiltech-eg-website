import Link from 'next/link';
import { services as siteServices } from '@/content/site';
import { solutions } from '@/content/solutions';
import { CTAButton, PremiumCard, SectionHeader, SectionShell } from '@/components/ui/primitives';

const whatWeDoCards = [
  {
    title: 'Network Infrastructure Products',
    description: 'Structured cabling, fiber, racks, CCTV infrastructure, and testing tools for project supply.',
  },
  {
    title: 'RFQ-First Supply Flow',
    description: 'Browse products, add required items, and submit one RFQ for availability and quotation.',
  },
  {
    title: 'Delivery Support',
    description: 'Scope alignment, quantity checks, and infrastructure delivery support across Egypt.',
  },
];

export function Hero() {
  return <SectionShell className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 text-white"><div className="grid gap-8 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">B2B Product Catalog + RFQ</p><h1 className="mt-3 text-3xl font-bold leading-[1.12] sm:text-4xl md:text-5xl">Network infrastructure products and project supply for business facilities.</h1><p className="mt-4 max-w-2xl text-sm text-slate-100 sm:text-base">Browse structured cabling, fiber, racks, CCTV infrastructure, and testing tools. Add required items and submit your RFQ to confirm availability and quotation.</p><div className="mt-6 flex flex-col gap-3 md:mt-8 sm:flex-row sm:flex-wrap"><CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">Browse Products</CTAButton><CTAButton href="/rfq" variant="secondary" className="w-full justify-center sm:w-auto">Start RFQ</CTAButton></div><p className="mt-3 text-sm text-slate-200">Need an update? <Link href="/track" className="font-semibold underline">Track RFQ</Link></p></div><div className="relative rounded-2xl border border-slate-700/90 bg-navy-800/70 p-5 shadow-xl sm:p-6"><p className="text-xs font-semibold uppercase tracking-wider text-orange-300">How it works</p><ul className="mt-4 space-y-3 text-sm text-slate-100"><li>• Browse product categories</li><li>• Add required items to RFQ basket</li><li>• Submit RFQ and receive confirmed quotation</li></ul></div></div></SectionShell>;
}

export function WhatHiltechDoes() {
  return <SectionShell compact><SectionHeader eyebrow="What we do" title="Simple project supply workflow" description="Built for teams that need practical infrastructure product selection and RFQ coordination." /><div className="mt-8 grid gap-4 md:grid-cols-3">{whatWeDoCards.map((card) => <PremiumCard key={card.title} className="bg-white shadow-sm"><h3 className="font-semibold text-slate-900">{card.title}</h3><p className="mt-2 text-sm text-slate-700">{card.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function SolutionsPreview() {
  return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Use cases" title="Solutions by environment" description="Use solution pages for planning context, then continue to products and RFQ." /><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{solutions.slice(0, 4).map((item) => <PremiumCard key={item.slug} className="bg-white"><p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">{item.eyebrow}</p><h3 className="mt-2 font-semibold text-slate-900">{item.shortTitle}</h3><p className="mt-2 line-clamp-3 text-sm text-slate-700">{item.intro}</p></PremiumCard>)}</div><div className="mt-6"><CTAButton href="/solutions" variant="secondary">Explore Solutions</CTAButton></div></SectionShell>;
}

export function ProductsRFQPreview() { return null; }
export function TrustPreview() { return null; }

export function ServicesGrid() {
  return <SectionShell><SectionHeader title="Core Infrastructure Services" description="Installation, validation, and infrastructure delivery support aligned to project RFQs." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{siteServices.map((s) => <PremiumCard key={s.title} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{s.label}</p><h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-700">{s.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function FinalCTA() {
  return <SectionShell className="mt-6 bg-navy-800 text-white sm:mt-8"><div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center"><div><SectionHeader title="Ready to prepare your request?" description="Browse products, add items to RFQ, and send one structured request for quotation." className="text-white [&>h2]:text-white [&>p]:text-slate-100" /><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">Browse Products</CTAButton><CTAButton href="/rfq" variant="secondary" className="w-full justify-center sm:w-auto">Start RFQ</CTAButton></div></div><PremiumCard className="border-slate-200 bg-white text-slate-900 [&_a]:text-navy-900 [&_a:hover]:text-navy-700"><p className="text-sm text-slate-700">Support links: <Link href="/track" className="underline">Track RFQ</Link> · <Link href="/work" className="underline">Work</Link> · <Link href="/contact" className="underline">Contact</Link></p></PremiumCard></div></SectionShell>;
}
