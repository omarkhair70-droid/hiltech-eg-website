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
    <SectionShell className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 text-white">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Enterprise Connectivity Infrastructure</p>
          <h1 className="mt-3 text-3xl font-bold leading-[1.12] sm:text-4xl md:text-5xl">Infrastructure Supply &amp; Delivery for Enterprise Projects in Egypt.</h1>
          <p className="mt-4 text-sm text-slate-100 sm:text-base">
            Browse structured cabling, fiber, rack, CCTV, and testing-related products — then send project requirements when ready.
          </p>
          <p className="mt-3 text-sm text-slate-100 sm:text-base" dir="rtl">
            توريد وتنفيذ ودعم فني لمشروعات الشبكات والبنية التحتية داخل مصر.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">
              Browse Products
            </CTAButton>
            <CTAButton href="/work" variant="secondary" className="w-full justify-center sm:w-auto">
              View Field Work
            </CTAButton>
          </div>
          <p className="mt-4 text-sm text-slate-200">
            <Link href="/track" className="underline underline-offset-4 hover:text-white">
              Track RFQ
            </Link>
          </p>
        </div>

        <PremiumCard className="overflow-hidden border-white/10 bg-white/5 p-0 backdrop-blur-sm">
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
        title="Practical infrastructure scope for business projects"
        description="Focused capabilities for supply, installation support, and validation-oriented execution."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {deliveryPillars.map((card) => (
          <PremiumCard key={card.title} className="bg-white shadow-sm">
            <h3 className="font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{card.description}</p>
          </PremiumCard>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-700">
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
      <SectionHeader eyebrow="Catalog + RFQ Journey" title="From selection to project requirements in three steps" description="A simple path for procurement and technical coordination." />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {['Browse products', 'Add required items', 'Send project requirements'].map((step, index) => (
          <PremiumCard key={step} className="bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Step {index + 1}</p>
            <p className="mt-2 font-semibold text-slate-900">{step}</p>
          </PremiumCard>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">Browse Products</CTAButton>
      </div>
      <p className="mt-4 text-sm text-slate-700">
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
  return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Field Proof Snapshot" title="Real project visuals from implementation work" description="A concise preview of field execution across fiber, racks, and validation activities." /><div className="mt-6 grid gap-4 md:grid-cols-3">{previews.map((item) => <PremiumCard key={item.title} className="overflow-hidden bg-white p-0"><div className="relative aspect-[4/3] w-full"><Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-4"><h3 className="font-semibold text-slate-900">{item.title}</h3><p className="mt-2 text-sm text-slate-700">{item.description}</p></div></PremiumCard>)}</div><div className="mt-6"><CTAButton href="/work" variant="secondary">View Field Work</CTAButton></div></SectionShell>;
}

export function TrustPreview() {
  return <SectionShell compact><SectionHeader eyebrow="Trust & Delivery Principles" title="Built for practical project execution" /><ul className="mt-6 grid gap-2 text-sm text-slate-700 md:grid-cols-3">{trustPrinciples.map((point) => <li key={point} className="rounded-xl bg-slate-50 px-4 py-3">{point}</li>)}</ul></SectionShell>;
}

export function ServicesGrid() { return <SectionShell><SectionHeader title="Core Infrastructure Services" description="Delivery services aligned to installation, validation, and long-term infrastructure support." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{siteServices.map((s) => <PremiumCard key={s.title} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{s.label}</p><h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-700">{s.description}</p></PremiumCard>)}</div></SectionShell>; }

export function FinalCTA() {
  return <SectionShell className="mt-6 bg-navy-800 text-white sm:mt-8"><div><SectionHeader title="Ready to move forward?" description="Browse products, review field work, then send your project requirements when ready." className="text-white [&>h2]:text-white [&>p]:text-slate-100" /><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Send Project Requirements</CTAButton></div><p className="mt-4 text-sm text-slate-200"><Link href="/contact" className="underline underline-offset-4 hover:text-white">Contact HILTECH</Link> <span className="px-1">/</span> <Link href="/track" className="underline underline-offset-4 hover:text-white">Track RFQ</Link></p></div></SectionShell>;
}
