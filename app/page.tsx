import type { Metadata } from 'next';
import { Hero, InfrastructureStack, ProductsSupply, ProjectScenarios, Sectors, ServicesGrid } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'HILTECH | Enterprise Network Infrastructure & Project Supply in Egypt',
  description:
    'Premium enterprise network infrastructure services in Egypt: structured cabling, fiber optic systems, data room readiness, testing, and project supply support.',
  openGraph: {
    title: 'HILTECH | Enterprise Network Infrastructure & Project Supply',
    description:
      'Reliable network infrastructure, data room delivery, testing workflows, and project-based product supply for business facilities.',
  },
};

const ecosystems = [
  {
    title: 'Fiber & Copper Infrastructure',
    items: 'Leviton, Panduit, Legrand, CommScope / SYSTIMAX',
  },
  {
    title: 'Power, Cabinets & Data Room',
    items: 'Schneider Electric, APC, Premium Line, rack/PDU ecosystems',
  },
  {
    title: 'Security & Network Systems',
    items: 'Hikvision, HPE Aruba Networking, 3M, multi-brand accessories',
  },
];

export default function Home() {
  return <main><Hero /><InfrastructureStack /><ServicesGrid /><ProductsSupply /><ProjectScenarios /><Sectors /><section className="section bg-navy-800 text-white"><div className="container"><h2 className="text-3xl font-bold">Product Ecosystems & Technology References</h2><p className="mt-3 max-w-4xl text-slate-200">HILTECH works across recognized infrastructure, networking, power, and security product ecosystems depending on project scope, compatibility, and availability.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{ecosystems.map((group)=><article key={group.title} className="rounded-xl border border-slate-600 bg-navy-900/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300/40"><h3 className="font-semibold text-orange-200">{group.title}</h3><p className="mt-2 text-sm text-slate-200">{group.items}</p></article>)}</div><p className="mt-6 text-sm text-slate-300">Brand references describe product ecosystems and technologies that may be used or supplied in project delivery. They do not imply formal partnership unless explicitly stated.</p></div></section></main>;
}
