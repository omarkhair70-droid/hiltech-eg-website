import Link from 'next/link';
import { services as siteServices, site } from '@/content/site';
import { solutions } from '@/content/solutions';
import { CTAButton, PremiumCard, SectionHeader, SectionShell } from '@/components/ui/primitives';

const whatWeDoCards = [
  {
    title: 'Infrastructure Installation',
    description: 'Structured cabling, fiber backbone, data room readiness, and physical-layer deployment for business environments.',
  },
  {
    title: 'Project Supply',
    description: 'Scope-aligned product supply guidance across cabling, connectivity, cabinets, power accessories, and related infrastructure.',
  },
  {
    title: 'Testing & Validation',
    description: 'Testing-oriented workflows help confirm link quality before handover and operational use.',
  },
  {
    title: 'RFQ / Procurement Support',
    description: 'Build product lists, define quantities, and send procurement requests through the existing RFQ flow.',
  },
];

const assuranceCards = [
  { title: 'Scope-Based Recommendations', description: 'Direction is aligned to project scope, environment, and implementation priorities.' },
  { title: 'Availability Confirmation', description: 'Supply items are reviewed and confirmed before quotation and delivery planning.' },
  { title: 'Testing-Oriented Handover', description: 'Validation is treated as part of delivery readiness, not an afterthought.' },
  { title: 'Transparent Brand References', description: 'Technology ecosystems are referenced clearly without implied partnerships.' },
];

export function Hero() {
  return <SectionShell className="bg-navy-900 text-white"><div className="grid gap-8 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Enterprise Connectivity Infrastructure</p><h1 className="mt-3 text-3xl font-bold leading-[1.15] sm:text-4xl md:text-5xl">{site.positioning}</h1><p className="mt-4 text-sm text-slate-200 sm:text-base md:mt-5 md:text-lg">HILTECH supports infrastructure installation, testing-oriented delivery, and project supply coordination for business facilities across Egypt.</p><div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap md:mt-8"><CTAButton href="/contact">Request a Project Quote</CTAButton><CTAButton href="/solutions" variant="secondary">Explore Solutions</CTAButton><CTAButton href="/products-partners" variant="ghost">Browse Products</CTAButton></div></div><div className="rounded-2xl border border-slate-700/80 bg-navy-800/60 p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Executive Overview</p><ul className="mt-4 space-y-3 text-sm text-slate-100"><li>• Infrastructure-first approach for reliable connectivity.</li><li>• Solution pathways for cabling, fiber, data rooms, CCTV, and testing.</li><li>• Product-to-RFQ workflow for faster procurement coordination.</li></ul></div></div></SectionShell>;
}

export function WhatHiltechDoes() {
  return <SectionShell compact><SectionHeader title="What HILTECH Does" description="A focused delivery model for infrastructure execution and procurement support." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{whatWeDoCards.map((card) => <PremiumCard key={card.title} className="bg-slate-50"><h3 className="font-semibold text-slate-900">{card.title}</h3><p className="mt-2 text-sm text-slate-600">{card.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function SolutionsPreview() {
  return <SectionShell className="bg-slate-50"><SectionHeader title="Solutions" description="View focused implementation pathways and technical scope by environment." /><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{solutions.slice(0, 4).map((item) => <PremiumCard key={item.slug} className="bg-white"><h3 className="font-semibold text-slate-900">{item.shortTitle}</h3><p className="mt-2 text-sm text-slate-600">{item.intro}</p></PremiumCard>)}</div><div className="mt-6"><CTAButton href="/solutions">Explore All Solutions</CTAButton></div></SectionShell>;
}

export function ProductsRFQPreview() {
  return <SectionShell><SectionHeader title="Products & RFQ Workflow" description="Keep procurement simple: browse products, build the RFQ basket, review, and send through WhatsApp." /><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{['Browse products', 'Add to RFQ basket', 'Review request', 'Send via WhatsApp'].map((step, index) => <PremiumCard key={step}><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Step {index + 1}</p><p className="mt-2 font-semibold text-slate-900">{step}</p></PremiumCard>)}</div><div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"><CTAButton href="/products-partners">Browse Products</CTAButton><CTAButton href="/rfq" variant="secondary">Review RFQ Basket</CTAButton></div></SectionShell>;
}

export function TrustPreview() {
  return <SectionShell><SectionHeader title="Assurance" description="Clear delivery standards for technical teams and procurement stakeholders." /><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{assuranceCards.map((card) => <PremiumCard key={card.title}><h3 className="font-semibold text-slate-900">{card.title}</h3><p className="mt-2 text-sm text-slate-600">{card.description}</p></PremiumCard>)}</div></SectionShell>;
}



export function ServicesGrid() {
  return <SectionShell><SectionHeader title="Core Infrastructure Services" description="Delivery services aligned to installation, validation, and long-term infrastructure support." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{siteServices.map((s) => <PremiumCard key={s.title} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{s.label}</p><h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-600">{s.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function FinalCTA() {
  return <SectionShell className="bg-navy-800 text-white"><div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:items-center"><div><SectionHeader title="Ready to Move Forward?" description="Explore detailed pages for solutions, products, RFQ planning, and resources — then send your request." className="text-white [&>h2]:text-white [&>p]:text-slate-200" /><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href="/contact">Contact HILTECH</CTAButton><CTAButton href="/resources" variant="secondary">View Resources</CTAButton></div></div><PremiumCard className="border-slate-700 bg-navy-900/50 text-slate-100"><p className="text-sm leading-relaxed">Need full technical detail? Use internal pages for complete scope:</p><ul className="mt-3 space-y-1 text-sm text-slate-100"><li><Link href="/solutions" className="underline underline-offset-2">/solutions</Link></li><li><Link href="/products-partners" className="underline underline-offset-2">/products-partners</Link></li><li><Link href="/rfq" className="underline underline-offset-2">/rfq</Link></li><li><Link href="/resources" className="underline underline-offset-2">/resources</Link></li><li><Link href="/contact" className="underline underline-offset-2">/contact</Link></li></ul></PremiumCard></div></SectionShell>;
}
