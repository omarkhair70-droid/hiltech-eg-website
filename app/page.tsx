import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | Network Infrastructure, Fiber Optics & RFQ in Egypt',
  description:
    'HILTECH supports network infrastructure delivery in Egypt with fiber optics, structured cabling, data room readiness, testing before handover, and RFQ coordination.',
  alternates: {
    canonical: `${site.siteUrl}/`,
    languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` },
  },
  openGraph: {
    title: 'HILTECH | Enterprise Network Infrastructure & Project Supply',
    description:
      'Reliable network infrastructure, data room delivery, CCTV connectivity, testing workflows, and project-based supply for business facilities in Egypt.',
    url: site.siteUrl,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

const capabilities = ['Fiber Optics', 'Structured Cabling', 'Rack Preparation', 'Testing Before Handover'];
const services = ['Fiber splicing & termination', 'Rack & cable management', 'Structured copper routes', 'Site design & survey', 'Network testing', 'Project management'];
const projectScopes = [
  { title: 'Office Network Setup', items: ['CAT6 cabling', 'patch panel', 'faceplates', 'rack accessories', 'testing'] },
  { title: 'Rack Room Preparation', items: ['rack', 'PDU', 'cable management', 'patch panels', 'labeling/testing'] },
  { title: 'Fiber Backbone Scope', items: ['fiber cable', 'ODF', 'patch cords', 'splicing/testing'] },
  { title: 'CCTV Infrastructure Scope', items: ['network points', 'cabling', 'rack preparation', 'power/network readiness'] },
];
const productCategories = ['Fiber Optics', 'Structured Cabling', 'Racks & Cabinets', 'Patch Panels & Connectivity', 'CCTV & Security', 'Testing Tools'];
const metrics = [
  { value: '10+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '1000+', label: 'Products Supplied' },
  { value: '24/7', label: 'Technical Support' },
];

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* HERO SECTION */}
      <section className="relative min-h-screen py-12 text-white sm:py-16 md:py-20 overflow-hidden">
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
          
          {/* Orange glow */}
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full filter opacity-40" />
          
          {/* Blue glow */}
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/15 blur-3xl rounded-full filter opacity-30" />
        </div>

        <div className="container relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Main Content */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Network Infrastructure in Egypt</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-balance">
                  Reliable Network Infrastructure for Offices, Data Rooms & Business Sites
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                HILTECH helps companies plan, source, install, and test structured cabling, fiber optics, racks, CCTV infrastructure, and project-ready RFQ packages.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row pt-2">
                <Link href="/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">Request Project Quote</Link>
                <Link href="/products-partners" className="inline-flex items-center justify-center px-5 py-3 font-semibold text-white transition-colors border border-white/30 rounded-md hover:bg-white/10">Browse Products</Link>
              </div>

              {/* Capability chips */}
              <div className="flex flex-wrap gap-2 pt-4">
                {capabilities.map((cap) => (
                  <span key={cap} className="inline-flex items-center px-3 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-xs font-semibold text-orange-200">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Premium Visual Card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 space-y-6">
                {/* Metric Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-4 text-center">
                    <p className="text-2xl font-bold text-orange-300">99.9%</p>
                    <p className="text-xs font-semibold text-slate-300 mt-1">Signal Reliability</p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-4 text-center">
                    <p className="text-2xl font-bold text-orange-300">24/7</p>
                    <p className="text-xs font-semibold text-slate-300 mt-1">Technical Support</p>
                  </div>
                </div>

                {/* Main visual area */}
                <div className="relative rounded-xl overflow-hidden">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/rack-data-room.jpg"
                      alt="Enterprise network infrastructure and data room setup"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-semibold text-white">Enterprise Infrastructure</p>
                    <p className="text-xs text-slate-300 mt-1">Design • Installation • Testing • Handover</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING QUICK BROWSE PANEL */}
      <section className="relative -mt-16 z-20">
        <div className="container">
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Quick browse</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">Select a category and start your RFQ</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {productCategories.map((category) => (
                <Link
                  key={category}
                  href="/products-partners"
                  className="group relative rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 p-3 text-center transition-all"
                >
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-orange-300 transition-colors">
                    {category}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-12 mt-12">
        <div className="container">
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6">
            <p className="text-xs font-semibold text-slate-400 mb-4">Qualified product systems and references</p>
            <div className="flex flex-wrap gap-2">
              {['Fluke', 'Corning', 'CommScope', 'Siemon', 'Panduit', 'OTDR'].map((partner) => (
                <span key={partner} className="text-xs font-semibold text-slate-300 px-3 py-1.5 rounded border border-white/15 bg-white/5">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">What HILTECH Delivers</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 hover:border-orange-500/50 transition-colors">
                <div className="inline-flex w-3 h-3 rounded-full bg-orange-500 mb-4" />
                <h3 className="font-semibold text-white text-sm">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT SCOPE SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Project Scopes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Build a Complete Project Scope</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectScopes.map((scope) => (
              <div key={scope.title} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-5 space-y-4">
                <h3 className="font-semibold text-white">{scope.title}</h3>
                <ul className="space-y-2">
                  {scope.items.map((item) => (
                    <li key={item} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIELD WORK SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Field Proof</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Work built for reliable handover</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { title: 'Rack & data room preparation', src: '/rack-front-cabling.jpg', desc: 'Scope note: layout, patching flow, and maintainable routing.' },
              { title: 'Fiber / ODF work', src: '/fiber-splicing-workbench.jpg', desc: 'Scope note: backbone readiness and termination context.' },
              { title: 'Structured cabling and testing', src: '/testing-otdr-device.jpg', desc: 'Confidence note: validation before handover.' },
            ].map((item) => (
              <Link key={item.title} href="/work" className="group relative rounded-xl overflow-hidden border border-white/15 bg-white/5 hover:border-orange-500/50 transition-all">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-300">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 text-center space-y-3">
                <p className="text-4xl sm:text-5xl font-black text-orange-400">{metric.value}</p>
                <p className="font-semibold text-slate-300 text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW SECTION */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 sm:p-12 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Browse Products and Build RFQ</h2>
              <p className="text-slate-300 max-w-2xl">Browse products and add project elements to a single RFQ basket. Integrated system to manage your project needs.</p>
            </div>
            <Link href="/products-partners" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* RFQ PROCESS SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">From Product Selection to Project Quote</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {['Select Products', 'Specify Quantities', 'Submit & Track'].map((step, idx) => (
              <div key={step} className="relative">
                <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 text-center space-y-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white font-bold">
                    {idx + 1}
                  </div>
                  <p className="font-semibold text-white">{step}</p>
                </div>
                {idx < 2 && <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors flex-1 sm:flex-none">
              Request Project Quote
            </Link>
            <Link href="/track" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/30 hover:bg-white/10 rounded-md transition-colors flex-1 sm:flex-none">
              Track a Request
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Why HILTECH</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Choose HILTECH?</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Organized RFQ System', desc: 'Submit products and quantities in one clear request' },
              { title: 'Field-Ready Planning', desc: 'Design respects routes, racks, and testing workflows' },
              { title: 'Clear Tracking', desc: 'Monitor requests via phone or WhatsApp' },
              { title: 'Right Component Match', desc: 'Link product references to project requirements' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-5 space-y-2">
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTING SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Quality</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Testing & Validation Standards</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Fluke Test', 'OTDR', 'Power Meter', 'Digital Copper Tester'].map((tool) => (
              <div key={tool} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 text-center space-y-3">
                <div className="inline-flex w-2 h-8 rounded bg-orange-500" />
                <p className="font-semibold text-white text-sm">{tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-r from-orange-600/20 to-orange-500/10 backdrop-blur-sm p-8 sm:p-12 space-y-6">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/40 blur-3xl rounded-full" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Quote Your Infrastructure Project?</h2>
              <p className="text-slate-200 max-w-2xl">Submit products and quantities, a BOQ, or site requirements. HILTECH will review the scope and follow up with a project quote.</p>
            </div>

            <div className="relative z-10 flex flex-col gap-3 sm:flex-row pt-4">
              <Link href="/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
                Request Project Quote
              </Link>
              <a href={site.contact.whatsappGeneralLink} className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/40 hover:bg-white/10 rounded-md transition-colors">
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
