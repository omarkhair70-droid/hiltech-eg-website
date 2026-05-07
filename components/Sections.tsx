import Link from 'next/link';
import Image from 'next/image';
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
  const proofPoints = [
    'Products organized for RFQ',
    'Field work and testing references',
    'Availability confirmed before quotation',
  ];

  return <SectionShell className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 text-white"><div className="grid gap-8 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Enterprise Connectivity Infrastructure</p><h1 className="mt-3 text-3xl font-bold leading-[1.12] sm:text-4xl md:text-5xl">Reliable Network Infrastructure,<br />Delivered with Precision.</h1><p className="mt-4 max-w-2xl text-sm text-slate-100 sm:text-base">Structured cabling, fiber, data room, CCTV, and testing support for business facilities across Egypt.</p><p className="mt-3 max-w-2xl text-sm text-slate-100 sm:text-base" dir="rtl">بنية تحتية شبكية موثوقة للمشروعات والمنشآت التجارية في مصر.</p><div className="mt-6 flex flex-col gap-3 md:mt-8 sm:flex-row sm:flex-wrap"><CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">Browse Products</CTAButton><CTAButton href="/rfq" variant="secondary" className="w-full justify-center sm:w-auto">Start RFQ</CTAButton></div><Link href="/track" className="mt-4 inline-flex text-sm font-medium text-orange-200 underline underline-offset-4 transition hover:text-orange-100">Track RFQ</Link></div><div className="rounded-2xl border border-slate-600/80 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-6"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-200">Project-ready infrastructure support</p><ul className="mt-4 space-y-3 text-sm text-slate-100">{proofPoints.map((point) => <li key={point} className="flex items-start gap-2"><span className="mt-1 text-orange-300">•</span><span>{point}</span></li>)}</ul></div></div></SectionShell>;
}

export function WhatHiltechDoes() {
  return <SectionShell compact><SectionHeader eyebrow="Delivery Model" title="What HILTECH Does" description="A focused delivery model for infrastructure execution and procurement support." /><div className="mt-8 grid gap-4 md:grid-cols-3">{whatWeDoCards.map((card) => <PremiumCard key={card.title} className="bg-white shadow-sm"><h3 className="font-semibold text-slate-900">{card.title}</h3><p className="mt-2 text-sm text-slate-700">{card.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function SolutionsPreview() {
  return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Pathways" title="Solutions" description="View focused implementation pathways and technical scope by environment." /><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{solutions.slice(0, 4).map((item) => <PremiumCard key={item.slug} className="bg-white"><p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">{item.eyebrow}</p><h3 className="mt-2 font-semibold text-slate-900">{item.shortTitle}</h3><p className="mt-2 line-clamp-3 text-sm text-slate-700">{item.intro}</p></PremiumCard>)}</div><div className="mt-6"><CTAButton href="/solutions" variant="secondary">Explore All Solutions</CTAButton></div></SectionShell>;
}

export function ProductsRFQPreview() {
  return <SectionShell><SectionHeader eyebrow="Procurement Flow" title="Products & RFQ Workflow" description="Browse products, build your RFQ basket, and send a structured request for quotation." /><p className="mt-3 text-sm text-slate-700" dir="rtl">تصفح المنتجات ثم جهّز طلب RFQ بشكل واضح لفريق HILTECH.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{['Browse products', 'Add items to RFQ basket', 'Submit RFQ and track status'].map((step, index) => <PremiumCard key={step} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Step {index + 1}</p><p className="mt-2 font-semibold text-slate-900">{step}</p></PremiumCard>)}</div><div className="mt-6 flex flex-wrap gap-3"><CTAButton href="/scope-finder" variant="secondary">Start Scope Finder</CTAButton><CTAButton href="/rfq" variant="secondary">Start RFQ</CTAButton><CTAButton href="/track" variant="secondary">Track RFQ</CTAButton></div></SectionShell>;
}

export function FieldWorkPreview() {
  const previews = [
    { title: 'Fiber Installation', description: 'Installation and termination snapshots from backbone and endpoint fiber routes.', image: '/fiber-distribution-panel.jpg' },
    { title: 'Rack Installation', description: 'Rack preparation, patching order, and data room cable management references.', image: '/rack-data-room.jpg' },
    { title: 'Testing & Measurement', description: 'Validation-focused field workflow visuals for handover readiness.', image: '/copper-patch-panel.jpg' },
  ];
  return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Work Proof" title="Field Work & References" description="Selected visual proof from installation, rack preparation, fiber work, and testing workflows." /><div className="mt-6 grid gap-4 md:grid-cols-3">{previews.map((item) => <PremiumCard key={item.title} className="overflow-hidden bg-white p-0"><div className="relative aspect-[4/3] w-full"><Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-4"><h3 className="font-semibold text-slate-900">{item.title}</h3><p className="mt-2 text-sm text-slate-700">{item.description}</p></div></PremiumCard>)}</div><div className="mt-6"><CTAButton href="/work" variant="secondary">View Field Work &amp; References</CTAButton></div></SectionShell>;
}

export function TrustPreview() {
  return <SectionShell compact><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Assurance</p><ul className="mt-2 grid gap-2 text-sm text-slate-700 md:grid-cols-2">{assurancePoints.map((point) => <li key={point}>• {point}</li>)}</ul></div></SectionShell>;
}

export function ServicesGrid() {
  return <SectionShell><SectionHeader title="Core Infrastructure Services" description="Delivery services aligned to installation, validation, and long-term infrastructure support." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{siteServices.map((s) => <PremiumCard key={s.title} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{s.label}</p><h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-700">{s.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function FinalCTA() {
  return <SectionShell className="mt-6 bg-navy-800 text-white sm:mt-8"><div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center"><div><SectionHeader title="Ready to Move Forward?" description="Use detailed pages for solution scope, products, and RFQ preparation — then send your request." className="text-white [&>h2]:text-white [&>p]:text-slate-100" /><p className="mt-3 text-sm text-slate-100" dir="rtl">جاهز للبدء؟ جهّز التفاصيل وأرسل طلبك لفريق HILTECH.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Start RFQ</CTAButton><CTAButton href="/products-partners" variant="secondary" className="w-full justify-center sm:w-auto">Browse Products</CTAButton></div></div><PremiumCard className="border-slate-200 bg-white text-slate-900 [&_a]:text-navy-900 [&_a:hover]:text-navy-700"><p className="text-sm leading-relaxed text-slate-900">Need quick references?</p><p className="mt-2 text-sm text-slate-700"><Link href="/solutions" className="underline underline-offset-2">Explore Solutions</Link> · <Link href="/resources" className="underline underline-offset-2">View Resources</Link> · <Link href="/track" className="underline underline-offset-2">Track RFQ</Link></p></PremiumCard></div></SectionShell>;
}
