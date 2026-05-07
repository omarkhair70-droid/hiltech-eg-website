import Link from 'next/link';
import Image from 'next/image';
import { services as siteServices } from '@/content/site';
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
  return <SectionShell className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 text-white"><div className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Enterprise Connectivity Infrastructure</p><h1 className="mt-3 text-3xl font-bold leading-[1.12] sm:text-4xl md:text-5xl">Network products, installation support, and RFQ coordination for business projects.</h1><p className="mt-4 max-w-3xl text-sm text-slate-100 sm:text-base">Browse structured cabling, fiber, rack, CCTV, and testing-related products — then send project requirements when ready.</p><p className="mt-3 max-w-3xl text-sm text-slate-100 sm:text-base" dir="rtl">توريد وتنفيذ ودعم فني لمشروعات الشبكات والبنية التحتية داخل مصر.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">Browse Products</CTAButton><CTAButton href="/work" variant="secondary" className="w-full justify-center sm:w-auto">View Field Work</CTAButton></div><p className="mt-4 text-sm text-slate-200"><Link href="/track" className="underline underline-offset-4 hover:text-white">Track RFQ</Link></p></div></SectionShell>;
}

export function WhatHiltechDoes() { return <SectionShell compact><SectionHeader eyebrow="Delivery Model" title="What HILTECH Does" description="A focused delivery model for infrastructure execution and procurement support." /><div className="mt-8 grid gap-4 md:grid-cols-3">{whatWeDoCards.map((card) => <PremiumCard key={card.title} className="bg-white shadow-sm"><h3 className="font-semibold text-slate-900">{card.title}</h3><p className="mt-2 text-sm text-slate-700">{card.description}</p></PremiumCard>)}</div></SectionShell>; }

export function SolutionsPreview() { return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Pathways" title="Solutions" description="View focused implementation pathways and technical scope by environment." /><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{solutions.slice(0, 4).map((item) => <PremiumCard key={item.slug} className="bg-white"><p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">{item.eyebrow}</p><h3 className="mt-2 font-semibold text-slate-900">{item.shortTitle}</h3><p className="mt-2 line-clamp-3 text-sm text-slate-700">{item.intro}</p></PremiumCard>)}</div><div className="mt-6"><CTAButton href="/solutions" variant="secondary">Explore All Solutions</CTAButton></div></SectionShell>; }

export function ProductsRFQPreview() {
  return <SectionShell><SectionHeader eyebrow="Procurement Flow" title="Products & RFQ Workflow" description="A simple sequence to prepare and send your project request." /><div className="mt-6 grid gap-4 md:grid-cols-3">{['Browse products', 'Add required items', 'Send project requirements'].map((step, index) => <PremiumCard key={step} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Step {index + 1}</p><p className="mt-2 font-semibold text-slate-900">{step}</p></PremiumCard>)}</div><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">Browse Products</CTAButton><CTAButton href="/track" variant="secondary" className="w-full justify-center sm:w-auto">Track RFQ</CTAButton></div><p className="mt-4 text-sm text-slate-700"><Link href="/scope-finder" className="underline underline-offset-4">Scope Finder</Link></p></SectionShell>;
}

export function FieldWorkPreview() {
  const previews = [
    { title: 'Fiber Installation', description: 'Installation and termination snapshots from backbone and endpoint fiber routes.', image: '/fiber-distribution-panel.jpg' },
    { title: 'Rack Installation', description: 'Rack preparation, patching order, and data room cable management references.', image: '/rack-data-room.jpg' },
    { title: 'Testing & Measurement', description: 'Validation-focused field workflow visuals for handover readiness.', image: '/copper-patch-panel.jpg' },
  ];
  return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Work Proof" title="Field Work & References" description="Selected visual proof from installation, rack preparation, fiber work, and testing workflows." /><div className="mt-6 grid gap-4 md:grid-cols-3">{previews.map((item) => <PremiumCard key={item.title} className="overflow-hidden bg-white p-0"><div className="relative aspect-[4/3] w-full"><Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-4"><h3 className="font-semibold text-slate-900">{item.title}</h3><p className="mt-2 text-sm text-slate-700">{item.description}</p></div></PremiumCard>)}</div><div className="mt-6"><CTAButton href="/work" variant="secondary">View Field Work &amp; References</CTAButton></div></SectionShell>;
}

export function TrustPreview() { return <SectionShell compact><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Assurance</p><ul className="mt-2 grid gap-2 text-sm text-slate-700 md:grid-cols-2">{assurancePoints.map((point) => <li key={point}>• {point}</li>)}</ul></div></SectionShell>; }

export function ServicesGrid() { return <SectionShell><SectionHeader title="Core Infrastructure Services" description="Delivery services aligned to installation, validation, and long-term infrastructure support." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{siteServices.map((s) => <PremiumCard key={s.title} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{s.label}</p><h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-700">{s.description}</p></PremiumCard>)}</div></SectionShell>; }

export function FinalCTA() {
  return <SectionShell className="mt-6 bg-navy-800 text-white sm:mt-8"><div><SectionHeader title="Ready to move forward?" description="Browse products, review solution scope, then send your project requirements when ready." className="text-white [&>h2]:text-white [&>p]:text-slate-100" /><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">Browse Products</CTAButton><CTAButton href="/rfq" variant="secondary" className="w-full justify-center sm:w-auto">Send Project Requirements</CTAButton></div><p className="mt-4 text-sm text-slate-200"><Link href="/track" className="underline underline-offset-4 hover:text-white">Track RFQ</Link> <span className="px-1">/</span> <Link href="/contact" className="underline underline-offset-4 hover:text-white">Contact HILTECH</Link></p></div></SectionShell>;
}
