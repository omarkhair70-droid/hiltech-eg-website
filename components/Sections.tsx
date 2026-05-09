'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CTAButton, PremiumCard, SectionHeader, SectionShell } from '@/components/ui/primitives';
import { trackEvent } from '@/lib/client/analytics';

const trustStripItems = [
  'Egypt-based delivery',
  'Fiber • Racks • Structured Cabling',
  'Testing before handover',
  'RFQ tracking available',
  'WhatsApp coordination',
];

const whatHiltechDoesCards = [
  {
    title: 'Structured Cabling',
    description: 'CAT6/CAT6A routes, outlets, patching, and labeling for business facilities.',
  },
  {
    title: 'Fiber Optic Infrastructure',
    description: 'Fiber routes, termination, ODFs, splicing support, and testing-ready handover.',
  },
  {
    title: 'Racks & Data Rooms',
    description: 'Rack preparation, cable management, patch panels, PDUs, and organized handover.',
  },
  {
    title: 'Testing & Handover',
    description: 'Testing-focused checks before delivery, with clear notes for operation and maintenance.',
  },
];

const coreServices = [
  ['Site Survey', 'On-site review of routes, rooms, and infrastructure constraints.'],
  ['Fiber Installation', 'Fiber routing, termination, and splicing preparation for project scope.'],
  ['Structured Cabling', 'CAT6/CAT6A endpoint distribution and organized patching workflows.'],
  ['Rack & Data Room Setup', 'Rack layout, patch panel preparation, cable management, and PDUs.'],
  ['CCTV Infrastructure Readiness', 'Camera cabling paths and control-room network connectivity setup.'],
  ['Testing & Measurement', 'OTDR, copper, and signal checks before handover where required.'],
  ['Project Product Supply', 'Project-based product supply aligned with approved technical scope.'],
  ['Maintenance Support', 'Post-handover support for stable operation and infrastructure continuity.'],
] as const;

export function Hero() {
  return (
    <SectionShell className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 py-8 text-white sm:py-12 md:py-20">
      <div className="grid items-center gap-5 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300 sm:text-sm">NETWORK INFRASTRUCTURE IN EGYPT</p>
          <h1 className="mt-2.5 text-[1.62rem] font-bold leading-[1.16] sm:mt-3 sm:text-4xl md:text-5xl">Network Infrastructure Supply & Installation for Business Facilities</h1>
          <p className="mt-3 text-sm text-slate-100 sm:text-base">HILTECH supports companies with fiber optic cabling, structured data networks, racks, patch panels, CCTV infrastructure, testing, and project-ready RFQ coordination.</p>
          <p className="mt-2.5 text-sm text-slate-100 sm:text-base" dir="rtl" lang="ar">توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات داخل مصر.</p>
          <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3">
            <CTAButton href="/rfq" className="w-full justify-center sm:w-auto" onClick={() => trackEvent('hero_rfq_click', { source: 'home_hero' })}>Request Project Quote</CTAButton>
            <CTAButton href="/work" variant="secondary" className="w-full justify-center sm:w-auto">View Field Work</CTAButton>
          </div>
          <p className="mt-3 text-sm text-slate-200"><Link href="/track" onClick={() => trackEvent('rfq_track_click', { source: 'home_hero' })} className="underline underline-offset-4 hover:text-white">Track RFQ</Link></p>
          <div className="relative mt-3 h-32 w-full overflow-hidden rounded-xl border border-white/15 sm:hidden">
            <Image src="/rack-data-room.jpg" alt="Network rack and data room preparation for business facility handover" fill className="object-cover" sizes="100vw" />
          </div>
        </div>

        <PremiumCard className="hidden overflow-hidden border-white/10 bg-white/5 p-0 backdrop-blur-sm sm:block">
          <div className="relative aspect-[4/3] w-full">
            <Image src="/rack-data-room.jpg" alt="Premium rack and cabling preparation inside a business data room" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" priority />
          </div>
        </PremiumCard>
      </div>
    </SectionShell>
  );
}

export function TrustStrip() {
  return (
    <SectionShell compact>
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {trustStripItems.map((item) => (
            <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs font-semibold text-slate-700 sm:text-sm">{item}</li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

export function WhatHiltechDoes() { return <SectionShell compact><SectionHeader eyebrow="What HILTECH Delivers" title="Infrastructure scope built for business facilities" description="Offices, factories, data rooms, and commercial sites." /><div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">{whatHiltechDoesCards.map((card)=><PremiumCard key={card.title} className="flex h-full flex-col bg-white p-4 sm:p-5"><h3 className="font-semibold text-slate-900">{card.title}</h3><p className="mt-1.5 text-sm text-slate-700">{card.description}</p></PremiumCard>)}</div></SectionShell>; }

export function CoreServicesSection() { return <SectionShell><SectionHeader title="Core Network Infrastructure Services" description="Practical service capabilities from survey to handover support." /><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{coreServices.map(([title,description])=><PremiumCard key={title} className="bg-slate-50 p-4"><h3 className="text-sm font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-700">{description}</p></PremiumCard>)}</div></SectionShell>; }


export function ServicesGrid() {
  return <SectionShell><SectionHeader title="Core Network Infrastructure Services" description="Practical service capabilities from survey to handover support." /><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{coreServices.map(([title,description])=><PremiumCard key={title} className="bg-slate-50 p-4"><h3 className="text-sm font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-700">{description}</p></PremiumCard>)}</div></SectionShell>;
}
export function FieldWorkPreview() {
  const previews = [
    { title: 'Fiber Installation', description: 'Fiber routes, termination points, and splicing workflow visuals.', image: '/fiber-splicing-workbench.jpg' },
    { title: 'Rack & Data Room Setup', description: 'Rack organization, patching, and cable management preparation.', image: '/rack-front-cabling.jpg' },
    { title: 'Structured Cabling', description: 'Structured cable pathways across facilities and technical rooms.', image: '/copper-cable-tray.jpg' },
    { title: 'Testing Before Handover', description: 'Measurement and validation checks before final delivery.', image: '/testing-otdr-device.jpg' },
  ];
  return <SectionShell className="bg-slate-50"><SectionHeader eyebrow="Field Work" title="Field Work Prepared for Handover" description="Selected visual examples across fiber, racks, cabling, and testing workflows." /><p className="mt-2 text-sm text-slate-600">Selected field visuals representing HILTECH service areas.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 md:gap-4">{previews.map((item)=><PremiumCard key={item.title} className="overflow-hidden bg-white p-0"><div className="relative aspect-[16/10] w-full"><Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" /></div><div className="p-3.5"><h3 className="font-semibold text-slate-900">{item.title}</h3><p className="mt-1 text-sm text-slate-700">{item.description}</p></div></PremiumCard>)}</div><div className="mt-5 md:mt-6"><CTAButton href="/work" variant="secondary" className="w-full justify-center sm:w-auto">View Field Work</CTAButton></div></SectionShell>;
}

export function RFQProcessSection() { return <SectionShell compact><SectionHeader eyebrow="RFQ Process" title="Clear request flow from scope to quote" description="Keep technical scope, item needs, and contact details in one request." /><div className="mt-5 grid gap-2.5 md:grid-cols-3 md:gap-4">{['Define network scope','Add required product references','Submit RFQ and track response'].map((step,index)=><PremiumCard key={step} className="bg-slate-50 p-3.5"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Step {index+1}</p><p className="mt-1.5 font-semibold text-slate-900">{step}</p></PremiumCard>)}</div><div className="mt-5 flex flex-col gap-2.5 sm:flex-row"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Request Project Quote</CTAButton><CTAButton href="/track" variant="secondary" className="w-full justify-center sm:w-auto">Track RFQ</CTAButton></div></SectionShell>; }

export function ProductCategoriesPreview() { const cats=[['Fiber Optics','Fiber cables, ODFs, connectors, and accessories for backbone projects.','Fiber Optic Systems'],['Structured Cabling','CAT6/CAT6A infrastructure components for office and facility networks.','Copper / CAT6 Cabling'],['Racks & Cabinets','Cabinets, rack accessories, cable management, and power preparation.','Cabinets / Racks / PDU'],['Patch Panels & Connectivity','Patch panels, keystones, couplers, and connectivity accessories.','Patch Cords & Connectivity'],['CCTV Infrastructure','Camera cabling, network accessories, and control-room readiness items.','CCTV & Security'],['Testing Tools','Field testing references for fiber and copper validation workflows.',null],['Power & Accessories','PDU, UPS references, and structured power accessories for racks.','Cabinets / Racks / PDU'],['Project Supply','Project-based product supply across coordinated network requirements.','/rfq']] as const; return <SectionShell compact><SectionHeader title="Product Categories" description="Category-level references to help prepare technical scope before RFQ." /><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{cats.map(([title,description,mappedCategory])=><PremiumCard key={title} className="bg-white p-4"><h3 className="text-sm font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-700">{description}</p><Link href={mappedCategory === '/rfq' ? '/rfq' : mappedCategory ? `/products-partners?category=${encodeURIComponent(mappedCategory)}` : title === 'Testing Tools' ? '/work' : '/products-partners?q=cctv'} className="mt-2 inline-block text-sm font-semibold text-orange-700 underline-offset-4 hover:underline">View Category</Link></PremiumCard>)}</div></SectionShell>; }



export function WhyChooseHiltechSection() {
  const cards = [
    { title: 'RFQ-first workflow', description: 'Submit products and scope in one structured request.' },
    { title: 'Field-aware delivery', description: 'Infrastructure planning considers routing, racks, testing, and handover.' },
    { title: 'Clear communication', description: 'Follow up by phone, WhatsApp, or RFQ tracking reference.' },
    { title: 'Practical product alignment', description: 'Product references are aligned with real project requirements before quotation.' },
  ];
  return <SectionShell compact><SectionHeader eyebrow="Why companies choose HILTECH" title="Built for practical project delivery" description="A compact operating model focused on RFQ clarity, field execution, and aligned product references." /><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{cards.map((card)=><PremiumCard key={card.title} className="bg-white p-4"><h3 className="text-sm font-semibold text-slate-900">{card.title}</h3><p className="mt-1.5 text-sm text-slate-700">{card.description}</p></PremiumCard>)}</div></SectionShell>;
}

export function ProductReferencesPanel() { return <SectionShell compact><section className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6"><SectionHeader eyebrow="Product References" title="Compatible Product References" description="Brand and product references used for project catalog context." /><div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:mt-5 sm:p-4"><div className="relative mx-auto h-32 w-full max-w-4xl sm:h-40 md:h-44"><Image src="/ch-product-references.jpeg" alt="Compatible product references panel" fill className="object-contain" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px" /></div></div><p className="mt-3 text-xs text-slate-500 sm:mt-4">Product references are shown for catalog/context purposes only and do not imply formal partnership unless explicitly stated.</p></section></SectionShell>; }

export function ContactConfidenceSection() { return <SectionShell compact><section className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-5"><h2 className="text-2xl font-bold text-slate-900">Need help defining your network scope?</h2><ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2"><li><span className="font-semibold">Call:</span> 01000087808</li><li><span className="font-semibold">WhatsApp / RFQ:</span> 01555357807</li><li><span className="font-semibold">Location:</span> Cairo, Egypt</li><li><span className="font-semibold">Email:</span> info@hiltech-eg.com</li></ul><div className="mt-5 flex flex-col gap-2.5 sm:flex-row"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Request Project Quote</CTAButton><CTAButton href="/contact" variant="secondary" className="w-full justify-center sm:w-auto">Contact HILTECH</CTAButton></div></section></SectionShell>; }

export function FinalCTA() { return <SectionShell className="mt-3 bg-navy-800 py-8 text-white sm:py-10"><div><SectionHeader title="Ready to start your project RFQ?" description="Share scope details and required items to receive coordinated quotation support." className="text-white [&>h2]:text-white [&>p]:text-slate-100" /><div className="mt-4 flex flex-col gap-2.5 sm:flex-row"><CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Request Project Quote</CTAButton></div></div></SectionShell>; }
