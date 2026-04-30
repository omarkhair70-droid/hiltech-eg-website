import Link from 'next/link';
import { sectors, services, site } from '@/content/site';

const productSupplyCards = [
  {
    title: 'Fiber Optic Cables & Accessories',
    examples: 'OM3 / multimode / outdoor armored fiber / patch cords / LC & SC connectors / ODF / splice trays',
  },
  {
    title: 'CAT6 Copper Cables',
    examples: 'UTP / LSZH / enterprise cabling / patch cords / keystone jacks / wall plates',
  },
  {
    title: 'Patch Panels & Connectivity',
    examples: 'Patch panels / connectors / cable termination accessories / structured cabling components',
  },
  {
    title: 'Network Cabinets & UPS Battery Cabinets',
    examples: 'Network cabinets / rack preparation / APC & Schneider-style UPS battery cabinet supply',
  },
  {
    title: 'Cable Management & Duct Systems',
    examples: 'PVC duct systems / decorative trunking / accessories / organized routing',
  },
  {
    title: 'CCTV & Security Components',
    examples: 'Network cameras / surveillance connectivity / camera cabling / control-room readiness',
  },
];

const processSteps = [
  { title: 'Site Survey', description: 'Assess site conditions, scope, requirements, and future expansion needs.' },
  { title: 'Solution Design', description: 'Define the infrastructure layout, product direction, and execution approach.' },
  { title: 'Installation', description: 'Deliver structured cabling, racks, fiber, CCTV, or network components with organized implementation.' },
  { title: 'Testing & Validation', description: 'Use Fluke/OTDR-oriented workflows to verify network quality before handover.' },
  { title: 'Handover & Support', description: 'Provide final coordination, documentation notes, and support for ongoing stability.' },
];

export function Hero() {
  return <section className="section bg-navy-900 text-white"><div className="container"><div className="max-w-4xl"><p className="font-medium text-orange-300">{site.slogan}</p><h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{site.positioning}</h1><p className="mt-5 text-base text-slate-200 md:text-lg">HILTECH delivers structured cabling, fiber optics, data center infrastructure, CCTV systems, network testing, and project-based supply for enterprise connectivity projects across Egypt.</p><div className="mt-5 flex flex-wrap gap-2">{['Structured Cabling','Fiber Optic Infrastructure','Project Supply & Support'].map((chip)=><span key={chip} className="rounded-full border border-orange-300/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200">{chip}</span>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link className="btn-primary" href="/contact">Request a Quote</Link><Link className="btn-secondary bg-white text-slate-900" href="/services">Explore Services</Link><a className="btn-secondary border-orange-300 text-orange-200" href={site.contact.whatsappLink}>WhatsApp Us</a></div></div></div></section>;
}

export function ServicesGrid() {
  return <section className="section"><div className="container"><h2 className="text-3xl font-bold">Core Infrastructure Services</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{services.map((s) => <article key={s.title} className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="mb-3 h-1 w-10 rounded bg-orange-500" /><p className="mb-2 inline-block rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">{s.label}</p><h3 className="font-semibold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-600">{s.description}</p></article>)}</div></div></section>;
}

export function ProductsSupply() {
  return <section className="section bg-white"><div className="container"><h2 className="text-3xl font-bold">Infrastructure Products & Project Supply</h2><p className="mt-3 max-w-4xl text-slate-700">From CAT6 copper and fiber optic cables to patch panels, cabinets, connectors, and accessories, HILTECH supports projects with reliable infrastructure products selected around scope, compatibility, and performance.</p><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{productSupplyCards.map((item) => <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-orange-600">Product Supply</p><p className="font-semibold text-slate-900">{item.title}</p><p className="mt-2 text-sm text-slate-600">{item.examples}</p></div>)}</div><p className="mt-6 text-sm text-slate-600">Available for project supply. Subject to availability and client confirmation. Product references do not imply formal partnership unless explicitly stated.</p></div></section>;
}

export function Sectors() {return <section className="section"><div className="container"><h2 className="text-3xl font-bold">Solutions Built for Your Environment</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{sectors.map((s)=><div key={s.title} className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm font-semibold text-orange-600">• {s.title}</p><p className="mt-2 text-sm text-slate-600">{s.description}</p></div>)}</div></div></section>;}

export function Process() {
  return <section className="section"><div className="container"><h2 className="text-3xl font-bold">Our Delivery Process</h2><ol className="mt-7 grid gap-4 md:grid-cols-5">{processSteps.map((step, i) => <li key={step.title} className="rounded-lg border border-slate-200 bg-white p-4"><div className="mb-3 flex items-center gap-2"><span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">{i + 1}</span><p className="font-semibold">{step.title}</p></div><p className="text-sm text-slate-600">{step.description}</p></li>)}</ol></div></section>;
}
