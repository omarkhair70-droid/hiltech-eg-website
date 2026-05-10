'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CTAButton, PremiumCard, SectionHeader, SectionShell } from '@/components/ui/primitives';
import { trackEvent } from '@/lib/client/analytics';
import { site } from '@/content/site';

const trustStripItems = ['Egypt-based delivery','Structured cabling','Fiber optics','Rack preparation','Testing before handover','RFQ tracking','WhatsApp coordination'];
const deliverables = [
  { title: 'Structured Cabling', description: 'CAT6/CAT6A routes, outlets, patching, and labeling for business facilities.' },
  { title: 'Fiber Optic Infrastructure', description: 'Fiber routes, termination, ODF preparation, and testing-ready handover.' },
  { title: 'Racks & Data Rooms', description: 'Rack preparation, cable management, patch panels, PDUs, and maintainable layout.' },
  { title: 'Testing & Handover', description: 'Validation-focused checks before handover with clear scope notes.' },
];
const projectScopeCards = [
  { title: 'Office Network Setup', includes: ['CAT6 cabling', 'patch panel', 'faceplates', 'rack accessories', 'testing'] },
  { title: 'Rack Room Preparation', includes: ['rack', 'PDU', 'cable management', 'patch panels', 'labeling/testing'] },
  { title: 'Fiber Backbone Scope', includes: ['fiber cable', 'ODF', 'patch cords', 'splicing/testing'] },
  { title: 'CCTV Infrastructure Scope', includes: ['network points', 'cabling', 'rack preparation', 'power/network readiness'] },
];
const metrics = [
  { value: '10+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '1000+', label: 'Products Supplied' },
  { value: '24/7', label: 'Technical Support' },
];

export function Hero() { 
  return (
    <SectionShell className="overflow-x-clip bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-10 text-white sm:py-14 md:py-20">
      <div className="relative">
        {/* Background grid and glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full filter opacity-40" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/15 blur-3xl rounded-full filter opacity-30" />
        </div>

        <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="max-w-3xl">
            <p className="public-eyebrow text-orange-400 sm:text-sm">NETWORK INFRASTRUCTURE IN EGYPT</p>
            <h1 className="mt-3 text-3xl font-black leading-[1.15] text-balance sm:text-4xl md:text-5xl">Reliable Network Infrastructure for Offices, Data Rooms & Business Sites in Egypt</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">HILTECH helps companies plan, source, install, and test structured cabling, fiber optics, racks, CCTV infrastructure, and project-ready RFQ packages.</p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <CTAButton href="/rfq" className="w-full justify-center sm:w-auto" onClick={() => trackEvent('hero_rfq_click', { source: 'home_hero' })}>Request Project Quote</CTAButton>
              <CTAButton href="/products-partners" variant="secondary" className="w-full justify-center sm:w-auto">Browse Products</CTAButton>
            </div>

            {/* Capability chips */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['Fiber Optics', 'Structured Cabling', 'Rack Preparation', 'Testing Before Handover'].map((cap) => (
                <span key={cap} className="inline-flex items-center px-3 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-xs font-semibold text-orange-200">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <article className="h-fit self-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-3 shadow-2xl shadow-black/20 backdrop-blur-sm">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image src="/rack-data-room.jpg" alt="Network rack and data room preparation for project handover" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" priority />
            </div>
            <div className="pt-3">
              <p className="public-eyebrow text-orange-200">Field proof</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Structured cabling', 'Fiber / ODF', 'Rack preparation', 'Testing before handover'].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </SectionShell>
  );
}

export function ProofMetricsStrip() { 
  return (
    <SectionShell compact>
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-3 shadow-sm backdrop-blur-sm sm:p-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {metrics.map(({value,label})=>(
            <div key={label} className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-2 text-center">
              <p className="text-lg font-bold text-orange-300">{value}</p>
              <p className="text-xs font-semibold text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function TrustStrip() { 
  return (
    <SectionShell compact>
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-3.5 shadow-sm backdrop-blur-sm sm:p-4">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {trustStripItems.map((item)=>(
            <li key={item} className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center text-xs sm:text-sm font-semibold text-slate-200">{item}</li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

export function WhatHiltechDoes() { 
  return (
    <SectionShell compact>
      <SectionHeader eyebrow="What HILTECH Delivers" title="Infrastructure scope built for business facilities" description="Offices, factories, data rooms, and commercial sites." className="[&>h2]:text-white [&>p]:text-slate-300" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {deliverables.map((card)=>(
          <PremiumCard key={card.title} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-white">{card.title}</h3>
            <p className="mt-1.5 text-sm text-slate-300">{card.description}</p>
          </PremiumCard>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProjectScopeSection() { 
  return (
    <SectionShell compact>
      <SectionHeader title="Build a Complete Project Scope" description="Plan complete RFQ-ready scope starters for offices, rack rooms, fiber backbone, and CCTV infrastructure." className="[&>h2]:text-white [&>p]:text-slate-300" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {projectScopeCards.map((card)=>(
          <PremiumCard key={card.title} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-white">{card.title}</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              {card.includes.map((line)=>(
                <li key={line} className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </PremiumCard>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProductCategoriesPreview() { 
  const cats = [
    ['Fiber Optics','Fiber cables, ODFs, connectors, and accessories for backbone projects.','Fiber Optic Systems'],
    ['Structured Cabling','CAT6/CAT6A infrastructure components for office and facility networks.','Copper / CAT6 Cabling'],
    ['Racks & Cabinets','Cabinets, rack accessories, cable management, and power preparation.','Cabinets / Racks / PDU'],
    ['Patch Panels & Connectivity','Patch panels, keystones, couplers, and connectivity accessories.','Patch Cords & Connectivity'],
    ['CCTV Infrastructure','Camera cabling, network accessories, and control-room readiness items.','CCTV & Security'],
    ['Testing Tools','Field testing references for fiber and copper validation workflows.',null],
    ['Power & Rack Accessories','PDU, UPS references, and structured power accessories for racks.','Cabinets / Racks / PDU'],
    ['Project Supply','Project-based product supply across coordinated network requirements.','/rfq'],
  ] as const;

  return (
    <SectionShell compact>
      <SectionHeader title="Browse products and build one RFQ basket for the full project scope." className="[&>h2]:text-white" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map(([title,desc,mappedCategory])=>(
          <PremiumCard key={title} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-4 backdrop-blur-sm hover:border-orange-500/50 transition-colors">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-300">{desc}</p>
            <Link href={mappedCategory === '/rfq' ? '/rfq' : mappedCategory ? `/products-partners?category=${encodeURIComponent(mappedCategory)}` : title === 'Testing Tools' ? '/work' : '/products-partners'} className="mt-2 inline-block text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">{mappedCategory === '/rfq' ? 'Start RFQ' : 'View Category'}</Link>
          </PremiumCard>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <CTAButton href="/products-partners" variant="secondary" className="w-full justify-center sm:w-auto">Browse Products</CTAButton>
      </div>
    </SectionShell>
  );
}

export function FieldWorkPreview() { 
  return (
    <SectionShell className="bg-gradient-to-b from-slate-950 to-slate-900">
      <SectionHeader title="Field work built for reliable handover" description="Real HILTECH field snapshots that support trust before quotation." className="[&>h2]:text-white [&>p]:text-slate-300" />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[{title:'Rack & data room preparation',image:'/rack-front-cabling.jpg',note:'Scope note: layout, patching flow, and maintainable routing.'},{title:'Fiber / ODF work',image:'/fiber-splicing-workbench.jpg',note:'Scope note: backbone readiness and termination context.'},{title:'Structured cabling and testing',image:'/testing-otdr-device.jpg',note:'Confidence note: validation before handover.'}].map((item)=>(
          <PremiumCard key={item.title} className="overflow-hidden bg-white/5 border border-white/15 p-0 backdrop-blur-sm">
            <div className="relative aspect-[16/10] w-full">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
            </div>
            <div className="p-3.5">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.note}</p>
              <Link href="/work" className="mt-2 inline-block text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">View field work</Link>
            </div>
          </PremiumCard>
        ))}
      </div>
    </SectionShell>
  );
}

export function RFQProcessSection() { 
  return (
    <SectionShell compact>
      <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 sm:p-6 backdrop-blur-sm">
        <SectionHeader eyebrow="RFQ Process" title="Clear request flow from scope to quote" description="Keep technical scope, item needs, and contact details in one request." className="[&>h2]:text-white [&>p]:text-slate-300" />
        <div className="mt-4 grid gap-2.5 md:grid-cols-3">
          {['Select products','Add quantities','Submit & track'].map((s,i)=>(
            <PremiumCard key={s} className="bg-white/5 border border-white/15 p-4 backdrop-blur-sm">
              <p className="public-eyebrow text-orange-400">Step {i+1}</p>
              <p className="mt-1 font-semibold text-white">{s}</p>
            </PremiumCard>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Request Project Quote</CTAButton>
          <CTAButton href="/track" variant="secondary" className="w-full justify-center sm:w-auto">Track Existing RFQ</CTAButton>
        </div>
      </section>
    </SectionShell>
  );
}

export function WhyChooseHiltechSection() { 
  return (
    <SectionShell compact>
      <SectionHeader eyebrow="Why choose HILTECH" title="Built for practical project delivery" description="A compact operating model focused on RFQ clarity, field execution, and aligned product references." className="[&>h2]:text-white [&>p]:text-slate-300" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[['RFQ-first workflow','Submit products and scope in one structured request.'],['Field-aware delivery','Planning considers routing, racks, testing, and handover.'],['Clear communication','Follow up by phone, WhatsApp, or tracking reference.'],['Practical product alignment','References align with actual project needs before quotation.']].map(([t,d])=>(
          <PremiumCard key={t} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-white">{t}</h3>
            <p className="mt-1 text-sm text-slate-300">{d}</p>
          </PremiumCard>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProductReferencesPanel() { 
  return (
    <SectionShell compact>
      <section className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <SectionHeader eyebrow="Product References" title="Compatible Product References" description="Brand and product references used for project catalog context." className="[&>h2]:text-white [&>p]:text-slate-300" />
        <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur-sm">
          <div className="relative mx-auto h-32 w-full max-w-4xl sm:h-40">
            <Image src="/ch-product-references.jpeg" alt="Compatible product references panel" fill className="object-contain" />
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400">Product references are shown for catalog/context purposes only and do not imply formal partnership unless explicitly stated.</p>
      </section>
    </SectionShell>
  );
}

export function ContactConfidenceSection() { 
  return (
    <SectionShell compact>
      <section className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white">Need help defining your network scope?</h2>
        <ul className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
          <li><span className="font-semibold text-white">Call:</span> {site.contact.phone}</li>
          <li><span className="font-semibold text-white">WhatsApp / RFQ:</span> 01555357807</li>
          <li><span className="font-semibold text-white">Location:</span> Cairo, Egypt</li>
          <li><span className="font-semibold text-white">Email:</span> {site.contact.email}</li>
        </ul>
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Request Project Quote</CTAButton>
          <CTAButton href="/contact" variant="secondary" className="w-full justify-center sm:w-auto">Contact HILTECH</CTAButton>
        </div>
      </section>
    </SectionShell>
  );
}

export function ServicesGrid() { 
  const services=[['Site Survey','On-site review of routes, rooms, and infrastructure constraints.'],['Fiber Installation','Fiber routing, termination, and splicing preparation for project scope.'],['Structured Cabling','CAT6/CAT6A endpoint distribution and organized patching workflows.'],['Rack & Data Room Setup','Rack layout, patch panel preparation, cable management, and PDUs.'],['CCTV Infrastructure Readiness','Camera cabling paths and control-room network connectivity setup.'],['Testing & Measurement','OTDR, copper, and signal checks before handover where required.'],['Project Product Supply','Project-based product supply aligned with approved technical scope.'],['Maintenance Support','Post-handover support for stable operation and continuity.']];

  return (
    <SectionShell compact>
      <SectionHeader title="Core Network Infrastructure Services" description="Practical service capabilities from survey to handover support." className="[&>h2]:text-white [&>p]:text-slate-300" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(([title,description])=>(
          <PremiumCard key={title} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-300">{description}</p>
          </PremiumCard>
        ))}
      </div>
    </SectionShell>
  );
}

export function FinalCTA() { 
  return (
    <SectionShell className="bg-gradient-to-r from-orange-600/20 to-orange-500/10 py-10 text-white">
      <div className="relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/40 blur-3xl rounded-full" />
        </div>
        <div className="relative z-10 space-y-4">
          <SectionHeader title="Ready to price your network infrastructure project?" description="Send products, quantities, BOQ notes, or site requirements and HILTECH will review the scope for quotation follow-up." className="text-white [&>h2]:text-white [&>p]:text-slate-200" />
          <div className="flex flex-col gap-2.5 sm:flex-row pt-2">
            <CTAButton href="/rfq" className="w-full justify-center sm:w-auto">Request Project Quote</CTAButton>
            <a href={site.contact.whatsappGeneralLink} className="inline-flex w-full items-center justify-center rounded-md border border-white/35 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition sm:w-auto">Contact on WhatsApp</a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
