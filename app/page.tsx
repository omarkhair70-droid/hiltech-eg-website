import type { Metadata } from 'next';
import { CapabilityMatrix, ConnectivityLifecycle, EnterpriseAssurance, Hero, PhysicalLayer, ProductsSupply, ProjectScenarios, RFQEntryPoint, ServicesGrid } from '@/components/Sections';
import { TechnicalDiagramPanel, TestingValidationDiagram } from '@/components/diagrams';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | Enterprise Network Infrastructure & Project Supply in Egypt',
  description:
    'Premium network infrastructure delivery in Egypt: structured cabling, fiber optics, data room infrastructure, CCTV connectivity, and project supply support.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HILTECH | Enterprise Network Infrastructure & Project Supply',
    description:
      'Reliable network infrastructure, data room delivery, CCTV connectivity, testing workflows, and project-based supply for business facilities in Egypt.',
    url: site.siteUrl,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
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
  return <main><Hero /><PhysicalLayer /><ConnectivityLifecycle /><ServicesGrid /><CapabilityMatrix /><ProductsSupply /><section className="section"><div className="container"><TechnicalDiagramPanel title="Connectivity Lifecycle" subtitle="Design, deploy, validate, and handover with testing checkpoints." labels={["Design", "Deployment", "Validation", "Handover"]}><TestingValidationDiagram /></TechnicalDiagramPanel></div></section><ProjectScenarios /><EnterpriseAssurance /><RFQEntryPoint /><section className="section bg-navy-800 text-white"><div className="container"><h2 className="text-3xl font-bold">Product Ecosystems & Technology References</h2><p className="mt-3 max-w-4xl text-slate-200">HILTECH works across recognized infrastructure, networking, power, and security product ecosystems depending on project scope, compatibility, and availability.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{ecosystems.map((group) => <article key={group.title} className="rounded-xl border border-slate-600 bg-navy-900/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300/40"><h3 className="font-semibold text-orange-200">{group.title}</h3><p className="mt-2 text-sm text-slate-200">{group.items}</p></article>)}</div><p className="mt-6 text-sm text-slate-300">Brand references describe product ecosystems and technologies that may be used or supplied in project delivery. They do not imply formal partnership unless explicitly stated.</p></div></section><section className="section"><div className="container"><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><h2 className="text-xl font-bold text-slate-900">Need client-ready materials?</h2><p className="mt-2 text-sm text-slate-700">Explore company profile content, one-pagers, RFQ preparation guidance, and launch copy.</p><div className="mt-4"><a href="/resources" className="inline-flex rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">View Sales & Project Resources</a></div></div></div></section></main>;
}
