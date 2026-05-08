import Link from 'next/link';
import Image from 'next/image';
import { services as siteServices } from '@/content/site';
import { selectedReferenceGroups, selectedReferencesDisclaimer, selectedReferencesDisclaimerAr } from '@/content/references';
import { CTAButton, PremiumCard, SectionHeader, SectionShell } from '@/components/ui/primitives';

const deliveryPillars = [
  {
    title: 'Enterprise Facilities',
    description: 'Business sites, offices, and technical spaces with practical infrastructure scope.',
  },
  {
    title: 'Field Execution',
    description: 'Fiber, rack, and cabling tasks prepared for deployment and handover.',
  },
  {
    title: 'Project Supply',
    description: 'Catalog-led item selection with one RFQ path for requirements.',
  },
  {
    title: 'Validation Discipline',
    description: 'Structured checks before final project handover.',
  },
];

const trustPrinciples = ['Scope-first planning', 'Availability before quotation', 'Testing-oriented handover', 'Clear RFQ communication'];

export function Hero() {
  return (
    <SectionShell className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 py-8 text-white sm:py-12 md:py-20">
      <div className="grid items-start gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-8">
        <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300 sm:text-sm">Network Infrastructure Delivery — Egypt</p>
          <h1 className="mt-2.5 text-[1.62rem] font-bold leading-[1.16] sm:mt-3 sm:text-4xl md:text-5xl">Field-Ready Network Infrastructure for Business Facilities</h1>
          <p className="mt-3 text-sm text-slate-100 sm:mt-4 sm:text-base">
            HILTECH supports network infrastructure projects across survey, supply, installation readiness, testing workflows, and RFQ coordination.
          </p>
          <p className="mt-2.5 text-sm text-slate-100 sm:mt-3 sm:text-base" dir="rtl">
            توريد وتنفيذ ودعم فني لمشروعات البنية التحتية للشبكات داخل مصر.
          </p>
          <div className="mt-4 flex flex-col gap-2 pr-14 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3 sm:pr-0">
            <CTAButton href="/products-partners" className="w-full justify-center sm:w-auto">
              Browse Products
            </CTAButton>
            <CTAButton href="/work" variant="secondary" className="w-full justify-center sm:w-auto">
              View Field Work
            </CTAButton>
          </div>
          <p className="mt-2.5 text-sm text-slate-200 sm:mt-3">
            <Link href="/track" className="underline underline-offset-4 hover:text-white">
              Track RFQ
            </Link>
          </p>
          <div className="relative mt-3 h-32 w-full overflow-hidden rounded-xl border border-white/15 sm:hidden">
            <Image
              src="/rack-data-room.jpg"
              alt="Data room rack preparation"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
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
        eyebrow="Delivery Capabilities"
        title="Who we support and how delivery is handled"
        description="Compact project support for infrastructure-heavy facilities."
      />
      <div className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-4 sm:grid-cols-2">
        {deliveryPillars.map((card) => (
          <PremiumCard key={card.title} className="bg-white p-3.5 shadow-sm sm:p-5">
            <h3 className="font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-1.5 text-sm text-slate-700">{card.description}</p>
          </PremiumCard>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProductsRFQPreview() {
  return (
    <SectionShell>
      <SectionHeader
        eyebrow="Procurement Flow"
        title="Move from product browsing to one structured RFQ"
        description="Browse relevant products, add required items, and submit project requirements without losing scope context."
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
    {
      title: 'Fiber Installation',
      description: 'Fiber extension, splicing, termination, and testing-readiness support.',
      image: '/fiber-splicing-workbench.jpg',
    },
    {
      title: 'Rack Installation',
      description: 'Rack preparation, patching, routing, and cabinet readiness.',
      image: '/rack-front-cabling.jpg',
    },
    {
      title: 'Structured Cabling',
      description: 'Organized copper cabling routes for business facilities.',
      image: '/copper-cable-tray.jpg',
    },
    {
      title: 'Testing & Validation',
      description: 'Field checks and validation support before handover.',
      image: '/testing-otdr-device.jpg',
    },
  ];
  return (
    <SectionShell className="bg-slate-50">
      <SectionHeader
        eyebrow="Field Delivery"
        title="Infrastructure work prepared for handover"
        description="Practical support across fiber, racks, cabling, and testing workflows — shown through selected field visuals."
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 md:mt-6 md:gap-4">
        {previews.map((item) => (
          <PremiumCard key={item.title} className="overflow-hidden bg-white p-0">
            <div className="relative h-32 w-full sm:h-36 md:h-40">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
            <div className="p-3 sm:p-3.5">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-700">{item.description}</p>
            </div>
          </PremiumCard>
        ))}
      </div>
      <div className="mt-5 md:mt-6">
        <CTAButton href="/work" variant="secondary" className="w-full justify-center sm:w-auto">View Field Work</CTAButton>
      </div>
    </SectionShell>
  );
}



type ReferenceTileProps = {
  name: string;
  subtitle?: string;
  logoSrc?: string;
  logoAlt?: string;
};

function ReferenceTile({ name, subtitle, logoSrc, logoAlt }: ReferenceTileProps) {
  return (
    <div className="group flex h-20 w-44 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 transition hover:border-slate-300 hover:bg-slate-50">
      {logoSrc ? (
        <div className="relative h-10 w-full">
          <Image src={logoSrc} alt={logoAlt ?? `${name} reference logo`} fill className="object-contain" sizes="176px" />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          {subtitle ? <p className="text-xs text-slate-600">{subtitle}</p> : null}
        </div>
      )}
    </div>
  );
}

export function SelectedReferences() {
  return (
    <SectionShell compact>
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 md:p-6">
        <SectionHeader
          eyebrow="Selected References"
          title="Recognized references across project supply and infrastructure delivery"
          description="Brand ecosystems and client-side references connected to HILTECH project and supply context."
        />

        <div className="mt-5 space-y-4">
          {selectedReferenceGroups.map((group) => (
            <article key={group.title}>
              <h3 className="text-sm font-semibold text-slate-700">{group.title}</h3>
              <div className="mt-2.5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
                {group.items.map((item) => (
                  <ReferenceTile key={item.name} {...item} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs text-slate-500">{selectedReferencesDisclaimer}</p>
          <p className="text-[11px] text-slate-500" dir="rtl" lang="ar">{selectedReferencesDisclaimerAr}</p>
        </div>

        <p className="mt-4 text-sm text-slate-700">
          <Link href="/work" className="font-medium underline underline-offset-4 hover:text-slate-900">
            View Field Work
          </Link>
        </p>
      </section>
    </SectionShell>
  );
}

export function TrustPreview() {
  return <SectionShell compact><div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4"><SectionHeader eyebrow="Delivery Discipline" title="Built around practical project control" /><ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">{trustPrinciples.map((point) => <li key={point} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">{point}</li>)}</ul></div></SectionShell>;
}

export function ServicesGrid() { return <SectionShell><SectionHeader title="Core Infrastructure Services" description="Delivery services aligned to installation, validation, and long-term infrastructure support." /><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{siteServices.map((s) => <PremiumCard key={s.title} className="bg-slate-50"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{s.label}</p><h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-700">{s.description}</p></PremiumCard>)}</div></SectionShell>; }

export function FinalCTA() {
  return <SectionShell className="mt-5 bg-navy-800 py-8 text-white sm:mt-8 sm:py-10"><div><SectionHeader title="Ready to define your project scope?" description="Start with products, review field proof, then send your requirements for quotation and availability review." className="text-white [&>h2]:text-white [&>p]:text-slate-100" /><div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Send Project Requirements</CTAButton></div><p className="mt-3 text-sm text-slate-200 sm:mt-4"><Link href="/contact" className="underline underline-offset-4 hover:text-white">Contact HILTECH</Link> <span className="px-1">/</span> <Link href="/track" className="underline underline-offset-4 hover:text-white">Track RFQ</Link></p></div></SectionShell>;
}
