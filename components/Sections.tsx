import Link from 'next/link';
import { services as siteServices, site } from '@/content/site';
import { solutions } from '@/content/solutions';
import { CTAButton, PremiumCard, SectionHeader, SectionShell } from '@/components/ui/primitives';

const whatWeDoCards = [
  {
    title: 'Infrastructure Installation',
    description: 'Structured cabling, fiber backbone, and data room readiness for business environments.',
  },
  {
    title: 'Project Supply',
    description: 'Scope-aligned product supply guidance across cabling, cabinets, and accessories.',
  },
  {
    title: 'Testing & Validation',
    description: 'Testing-oriented workflows that confirm link quality before handover.',
  },
];

const assurancePoints = [
  'Scope-based recommendations by environment',
  'Availability confirmed before quotation',
  'Testing-oriented readiness before handover',
  'Transparent brand references for procurement teams',
];

export function Hero() {
  return <SectionShell className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 text-white"><div className="grid gap-8 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Enterprise Connectivity Infrastructure</p><h1 className="mt-3 text-3xl font-bold leading-[1.12] sm:text-4xl md:text-5xl">{site.positioning}</h1><p className="mt-4 max-w-2xl text-sm text-slate-100 sm:text-base">Structured cabling, fiber, data room, CCTV, and testing support for business facilities across Egypt.</p><p className="mt-3 max-w-2xl text-sm text-slate-100 sm:text-base md:mt-4 md:text-lg">HILTECH supports infrastructure installation, testing-oriented delivery, and project supply coordination for business facilities across Egypt.</p><div className="mt-6 flex flex-col gap-3 md:mt-8 sm:flex-row sm:flex-wrap"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Start RFQ</CTAButton><CTAButton href="/solutions" variant="secondary" className="w-full justify-center sm:w-auto">Explore Solutions</CTAButton><CTAButton href="/track" variant="secondary" className="w-full justify-center border-orange-300/60 text-orange-100 hover:bg-white/10 sm:w-auto">Track RFQ</CTAButton></div></div><div className="relative rounded-2xl border border-slate-700/90 bg-navy-800/70 p-5 shadow-xl sm:p-6"><div className="mb-4 hidden h-1 w-16 rounded bg-orange-500 sm:block" /><p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Executive Overview</p><ul className="mt-4 space-y-3 text-sm text-slate-100"><li>• Infrastructure-first approach for reliable connectivity.</li><li>• Solution pathways for cabling, fiber, data rooms, CCTV, and testing.</li><li>• Product-to-RFQ workflow for faster procurement coordination.</li></ul></div></div></SectionShell>;
}

export function WhatHiltechDoes() {
  return <SectionShell compact><SectionHeader eyebrow="Delivery Model" title="What HILTECH Does" description="A focused delivery model for infrastructure execution and procurement support." /><div className="mt-8 grid gap-4 md:grid-cols-3">{whatWeDoCards.map((card) => <PremiumCard key={card.title} className="bg-white shadow-sm"><h3 className="font-semibold text-slate-900">{card.title}</h3><p className="mt-2 text-sm text-slate-700">{card.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function SolutionsPreview() {
  return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Pathways" title="Solutions" description="View focused implementation pathways and technical scope by environment." /><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{solutions.slice(0, 4).map((item) => <PremiumCard key={item.slug} className="bg-white"><p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">{item.eyebrow}</p><h3 className="mt-2 font-semibold text-slate-900">{item.shortTitle}</h3><p className="mt-2 line-clamp-3 text-sm text-slate-700">{item.intro}</p></PremiumCard>)}</div><div className="mt-6"><CTAButton href="/solutions" variant="secondary">Explore All Solutions</CTAButton></div></SectionShell>;
}

export function ProductsRFQPreview() {
  return <SectionShell><SectionHeader eyebrow="Procurement Flow" title="Products & RFQ Workflow" description="Browse products, build your RFQ basket, and send a structured request for quotation." /><div className="mt-6 grid gap-4 md:grid-cols-3">{['Browse products', 'Add items to RFQ basket', 'Submit RFQ and track status'].map((step, index) => <PremiumCard key={step} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Step {index + 1}</p><p className="mt-2 font-semibold text-slate-900">{step}</p></PremiumCard>)}</div><div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"><p className="text-sm font-semibold text-slate-900">Not sure what your project needs?</p><p className="mt-1 text-sm text-slate-700">Use the Scope Finder to turn a few project details into a preliminary RFQ direction.</p><CTAButton href="/scope-finder" className="mt-4 w-full justify-center md:mt-5 md:w-auto">Start Scope Finder</CTAButton></div><div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Next Actions</p><div className="mt-3 flex flex-col gap-3"><CTAButton href="/rfq" className="w-full justify-center">Start RFQ</CTAButton><CTAButton href="/products-partners" variant="secondary" className="w-full justify-center">Browse Products</CTAButton><CTAButton href="/track" variant="secondary" className="w-full justify-center">Track RFQ</CTAButton></div></div></SectionShell>;
}

export function TrustPreview() {
  return <SectionShell compact><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Assurance</p><ul className="mt-2 grid gap-2 text-sm text-slate-700 md:grid-cols-2">{assurancePoints.map((point) => <li key={point}>• {point}</li>)}</ul></div></SectionShell>;
}

export function ServicesGrid() {
  return <SectionShell><SectionHeader title="Core Infrastructure Services" description="Delivery services aligned to installation, validation, and long-term infrastructure support." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{siteServices.map((s) => <PremiumCard key={s.title} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{s.label}</p><h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-700">{s.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function FinalCTA() {
  return <SectionShell className="mt-6 bg-navy-800 text-white sm:mt-8"><div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center"><div><SectionHeader title="Ready to Move Forward?" description="Use detailed pages for solution scope, products, and RFQ preparation — then send your request." className="text-white [&>h2]:text-white [&>p]:text-slate-100" /><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Start RFQ</CTAButton><CTAButton href="/products-partners" variant="secondary" className="w-full justify-center sm:w-auto">Browse Products</CTAButton></div></div><PremiumCard className="border-slate-200 bg-white text-slate-900 [&_a]:text-navy-900 [&_a:hover]:text-navy-700"><p className="text-sm leading-relaxed text-slate-900">Need quick references?</p><p className="mt-2 text-sm text-slate-700"><Link href="/solutions" className="underline underline-offset-2">Explore Solutions</Link> · <Link href="/resources" className="underline underline-offset-2">View Resources</Link> · <Link href="/track" className="underline underline-offset-2">Track RFQ</Link></p></PremiumCard></div></SectionShell>;
}
