import type { Metadata } from 'next';

export const metadata: Metadata={title:'Products & Brand Ecosystems | HILTECH',description:'Explore HILTECH product categories and brand ecosystems for enterprise network infrastructure and project-based supply.'};

const categories = [
  { title: 'Copper Cabling', items: ['CAT6 cables', 'U/UTP & LSZH options', 'Patch cords', 'Keystone jacks', 'Wall plates'], tag: 'Product Supply' },
  { title: 'Fiber Optic Systems', items: ['OM3 multimode fiber', 'Outdoor armored fiber', 'Fiber patch cords', 'LC / SC connectors', 'Splice trays & ODF enclosures'], tag: 'Product Supply' },
  { title: 'Cabinets & Data Room Infrastructure', items: ['Network cabinets', 'Rack preparation', 'APC / Schneider UPS battery cabinets'], tag: 'Data Center' },
  { title: 'Cable Management', items: ['PVC duct systems', 'Legrand decorative duct systems', 'Cable accessories'], tag: 'Product Supply' },
  { title: 'CCTV & Security', items: ['Hikvision cameras', 'Surveillance infrastructure', 'Camera connectivity components'], tag: 'Service + Supply' },
  { title: 'Testing & Project Validation', items: ['Fluke testing workflows', 'OTDR testing capability', 'Pre-handover validation support'], tag: 'Testing' }
];

const brands = ['Leviton', 'Panduit', 'Legrand', 'Schneider Electric', 'APC', 'Hikvision', '3M', 'CommScope / SYSTIMAX', 'Premium Line', 'HPE Aruba Networking'];

export default function Page(){return <main className="section"><div className="container"><h1 className="text-4xl font-bold">Products & Brand Ecosystems</h1><p className="mt-4 max-w-4xl">Brands and product ecosystems we work with are available for project supply as part of scope-based infrastructure delivery for enterprise, office, and data center environments.</p><div className="mt-8 grid gap-5 md:grid-cols-2">{categories.map(c=><section key={c.title} className="rounded-lg border bg-white p-6"><p className="mb-2 inline-block rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">{c.tag}</p><h2 className="text-xl font-semibold">{c.title}</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">{c.items.map(i=><li key={i}>{i}</li>)}</ul></section>)}</div><h2 className="mt-12 text-2xl font-bold">Brands and product ecosystems we work with</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{brands.map(b=><div key={b} className="rounded-lg border bg-gradient-to-br from-white to-slate-50 p-4 text-sm font-medium">{b}</div>)}</div><p className="mt-8 rounded-md border-l-4 border-orange-500 bg-orange-50 p-4">Brand references are shown to describe product ecosystems and technologies that may be used or supplied in project delivery. They do not imply formal partnership unless explicitly stated.</p></div></main>}
