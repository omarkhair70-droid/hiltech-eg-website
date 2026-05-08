import Link from 'next/link';
import Image from 'next/image';
import { services as siteServices } from '@/content/site';
import { CTAButton, PremiumCard, SectionHeader, SectionShell } from '@/components/ui/primitives';

const deliveryPillars = [
  {
    title: 'Structured Cabling & Fiber Infrastructure',
    description: 'Backbone and horizontal connectivity delivery for enterprise environments.',
  },
  {
    title: 'Data Room & Rack Readiness',
    description: 'Rack setup, cable routing, and cabinet preparation for cleaner operations.',
  },
  {
    title: 'Project Supply & RFQ Coordination',
    description: 'Scope-aligned product preparation before submitting project requirements.',
  },
  {
    title: 'Testing & Validation Support',
    description: 'Validation-oriented checks to support reliable handover outcomes.',
  },
];

const trustPrinciples = [
  'Scope-first planning',
  'Availability confirmation before quotation',
  'Testing-oriented validation before handover',
];

export function Hero() {
  return (
    <SectionShell className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 py-8 text-white sm:py-12 md:py-20">
      <div className="grid items-start gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300 sm:text-sm">Enterprise Infrastructure Delivery — Egypt</p>
          <h1 className="mt-2.5 text-[1.62rem] font-bold leading-[1.16] sm:mt-3 sm:text-4xl md:text-5xl">Infrastructure Supply &amp; Delivery for Enterprise Projects in Egypt</h1>
          <p className="mt-3 text-sm text-slate-100 sm:mt-4 sm:text-base">
            Browse structured cabling, fiber, racks, CCTV, and testing-related products, then send project requirements when ready.
          </p>
          <p className="mt-2.5 text-sm text-slate-100 sm:mt-3 sm:text-base" dir="rtl">
            توريد وتنفيذ ودعم فني لمشروعات البنية التحتية للشبكات داخل مصر.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3">
            <CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">
              Browse Products
            </CTAButton>
            <CTAButton href="/work" variant="secondary" className="w-full justify-center sm:w-auto">
              View Field Work
            </CTAButton>
          </div>
          <p className="mt-2.5 pb-8 text-sm text-slate-200 sm:mt-3 sm:pb-0">
            <Link href="/track" className="underline underline-offset-4 hover:text-white">
              Track RFQ
            </Link>
          </p>
        </div>

        <PremiumCard className="hidden overflow-hidden border-white/10 bg-white/5 p-0 backdrop-blur-sm sm:block">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/rack-data-room.jpg"
              alt="Data room rack preparation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">Project Snapshot</p>
            <p className="mt-1 text-sm text-slate-100">Field-ready rack and routing execution for enterprise delivery environments.</p>
          </div>
        </PremiumCard>
      </div>
    </SectionShell>
  );
}

export function WhatHiltechDoes() {
  return (
    <SectionShell compact>
      <SectionHeader
        eyebrow="What HILTECH Delivers"
        title="What HILTECH Delivers"
        description="Practical scope coverage for supply, installation readiness, and validation support."
      />
      <div className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-4 sm:grid-cols-2">
        {deliveryPillars.map((card) => (
          <PremiumCard key={card.title} className="bg-white p-3.5 shadow-sm sm:p-5">
            <h3 className="font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-1.5 text-sm text-slate-700">{card.description}</p>
          </PremiumCard>
        ))}
      </div>
      <p className="mt-5 text-sm text-slate-700 sm:mt-6">
        <Link href="/solutions" className="font-medium underline underline-offset-4 hover:text-slate-900">
          Explore Solutions
        </Link>
      </p>
    </SectionShell>
  );
}

export function ProductsRFQPreview() {
  return (
    <SectionShell>
      <SectionHeader
        eyebrow="Catalog to RFQ Journey"
        title="Catalog to RFQ Journey"
        description="A clear three-step path from product selection to project requirement submission."
      />
      <div className="mt-5 grid gap-2.5 md:mt-6 md:grid-cols-3 md:gap-4">
        {['Browse products', 'Add required items', 'Send project requirements'].map((step, index) => (
          <PremiumCard key={step} className="bg-slate-50 p-3.5 sm:p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Step {index + 1}</p>
            <p className="mt-1.5 font-semibold text-slate-900">{step}</p>
          </PremiumCard>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap">
        <CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">Browse Products</CTAButton>
      </div>
      <p className="mt-3 text-sm text-slate-700 sm:mt-4">
        <Link href="/track" className="underline underline-offset-4 hover:text-slate-900">Track RFQ</Link>
      </p>
    </SectionShell>
  );
}

export function FieldWorkPreview() {
  const previews = [
    { title: 'Fiber Termination Readiness', description: 'Backbone distribution, termination order, and clean routing execution.', image: '/fiber-distribution-panel.jpg' },
    { title: 'Rack & Data Room Preparation', description: 'Structured cabinet setup and patching discipline for deployment teams.', image: '/rack-data-room.jpg' },
    { title: 'Testing Workflow Evidence', description: 'Validation-focused workstreams supporting handover readiness.', image: '/copper-patch-panel.jpg' },
  ];
  return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Field Proof Snapshot" title="Field Proof Snapshot" description="Selected visuals from real implementation work across fiber, racks, and validation." /><div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-4">{previews.map((item, index) => <PremiumCard key={item.title} className={`overflow-hidden bg-white p-0 ${index === 2 ? 'hidden md:block' : ''}`}><div className="relative h-36 w-full sm:h-44 md:h-48"><Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-3 sm:p-3.5"><h3 className="font-semibold text-slate-900">{item.title}</h3><p className="mt-1 text-sm text-slate-700">{item.description}</p></div></PremiumCard>)}</div><div className="mt-5 md:mt-6"><CTAButton href="/work" variant="secondary">View Field Work</CTAButton></div></SectionShell>;
}

export function TrustPreview() {
  return <SectionShell compact><div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4"><SectionHeader eyebrow="Trust Principles" title="Trust Principles" /><ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-3">{trustPrinciples.map((point) => <li key={point} className="rounded-lg bg-slate-50 px-3 py-2">{point}</li>)}</ul></div></SectionShell>;
}

export function ServicesGrid() { return <SectionShell><SectionHeader title="Core Infrastructure Services" description="Delivery services aligned to installation, validation, and long-term infrastructure support." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{siteServices.map((s) => <PremiumCard key={s.title} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{s.label}</p><h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-700">{s.description}</p></PremiumCard>)}</div></SectionShell>; }

export function FinalCTA() {
  return <SectionShell className="mt-5 bg-navy-800 py-8 text-white sm:mt-8 sm:py-10"><div><SectionHeader title="Ready to Share Your Project Requirements?" description="Review products and field proof, then send your project requirements for scope and availability confirmation." className="text-white [&>h2]:text-white [&>p]:text-slate-100" /><div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Send Project Requirements</CTAButton></div><p className="mt-3 text-sm text-slate-200 sm:mt-4"><Link href="/contact" className="underline underline-offset-4 hover:text-white">Contact HILTECH</Link> <span className="px-1">/</span> <Link href="/track" className="underline underline-offset-4 hover:text-white">Track RFQ</Link></p></div></SectionShell>;
}
