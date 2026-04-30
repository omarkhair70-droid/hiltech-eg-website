import Link from 'next/link';
import { sectors, services, site } from '@/content/site';

const productSupplyCards = [
  'Fiber Optic Cables & Accessories',
  'CAT6 Copper Cables',
  'Patch Panels & Connectivity',
  'Network Cabinets & UPS Battery Cabinets',
  'Cable Management & Duct Systems',
  'CCTV & Security Components'
];

export function Hero(){return <section className="bg-navy-900 text-white section"><div className="container"><p className="text-orange-300">{site.slogan}</p><h1 className="mt-3 text-4xl font-bold md:text-5xl">{site.positioning}</h1><p className="mt-4 max-w-3xl text-slate-200">HILTECH delivers structured cabling, fiber optics, data center infrastructure, CCTV systems, network testing, and project-based supply for enterprise connectivity projects across Egypt.</p><div className="mt-8 flex flex-wrap gap-3"><Link className="btn-primary" href="/contact">Request a Quote</Link><Link className="btn-secondary bg-white text-slate-900" href="/services">Explore Services</Link><a className="btn-secondary border-orange-300 text-orange-200" href={site.contact.whatsappLink}>WhatsApp Us</a></div></div></section>}

export function ServicesGrid(){return <section className="section"><div className="container"><h2 className="text-3xl font-bold">Core Infrastructure Services</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{services.map(s=><article key={s.title} className="rounded-lg border bg-white p-5 shadow-sm"><p className="mb-2 inline-block rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">{s.label}</p><h3 className="font-semibold">{s.title}</h3><p className="mt-2 text-sm text-slate-600">{s.description}</p></article>)}</div></div></section>}

export function ProductsSupply(){return <section className="section bg-white"><div className="container"><h2 className="text-3xl font-bold">Infrastructure Products & Project Supply</h2><p className="mt-3 max-w-4xl text-slate-700">From CAT6 copper and fiber optic cables to patch panels, cabinets, connectors, and accessories, HILTECH supports projects with reliable infrastructure products selected around scope, compatibility, and performance.</p><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{productSupplyCards.map(s=><div key={s} className="rounded-lg border bg-gradient-to-br from-white to-slate-50 p-5"><p className="mb-2 text-xs font-medium uppercase tracking-wide text-orange-600">Product Supply</p><p className="font-semibold">{s}</p></div>)}</div></div></section>}

export function Sectors(){return <section className="section"><div className="container"><h2 className="text-3xl font-bold">Solutions Built for Your Environment</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{sectors.map(s=><div key={s.title} className="rounded-lg border bg-white p-5"><h3 className="font-semibold">{s.title}</h3><p className="mt-2 text-sm text-slate-600">{s.description}</p></div>)}</div></div></section>}

export function Process(){const steps=['Site Survey','Solution Design','Installation','Testing & Validation','Handover & Support'];return <section className="section"><div className="container"><h2 className="text-3xl font-bold">Our Delivery Process</h2><ol className="mt-6 grid gap-4 md:grid-cols-5">{steps.map((s,i)=><li key={s} className="rounded-lg border bg-white p-4"><p className="text-sm text-orange-600">Step {i+1}</p><p className="font-semibold">{s}</p></li>)}</ol></div></section>}
