import type { Metadata } from 'next';
import Link from 'next/link';
import { ServicesGrid } from '@/components/Sections';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services | Enterprise Infrastructure Delivery in Egypt',
  description:
    'Site surveys, engineering drawings, fiber and copper installation, rack readiness, and testing workflows for enterprise network infrastructure in Egypt.',
  alternates: { canonical: `${site.siteUrl}/services` },
  openGraph: {
    title: 'HILTECH Services | Enterprise Infrastructure Delivery',
    description:
      'Information network infrastructure services from technical survey and planning to implementation and testing workflows in Egypt.',
    url: `${site.siteUrl}/services`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

const proofAreas = [
  { title: 'Fiber Installation', description: 'Fiber cable extension, splicing, termination, and testing support.' },
  { title: 'Rack Installation', description: 'Organized rack preparation, patching, cable management, and infrastructure readiness.' },
  { title: 'Copper Installation', description: 'Structured copper cabling, termination, and labeling for office/network environments.' },
  { title: 'Testing & Measurement Tools', description: 'Fluke, OTDR, power meter, and copper testing support for reliable delivery.' },
];

const testingTools = ['Fluke Test', 'OTDR', 'Power Meter', 'Digital Copper Tester', 'Fiber fusion splice'];

export default function Page() {
  return <main className="section"><div className="container"><h1 className="text-3xl font-bold leading-tight sm:text-4xl">Infrastructure Services Designed for Reliable Business Operations.</h1><p className="mt-3 text-slate-700">HILTECH provides practical, standards-driven network infrastructure services covering site inspection, engineering planning, implementation, and measured delivery support.</p></div><ServicesGrid />
    <section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Field-proven infrastructure work</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{proofAreas.map((item) => <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-semibold text-slate-900">{item.title}</h3><p className="mt-1 text-sm text-slate-700">{item.description}</p></div>)}</div></div></div></section>
    <section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Testing tools used across delivery</h2><p className="mt-2 text-sm text-slate-700">Used across inspection, testing, and delivery workflows where applicable.</p><ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">{testingTools.map((tool) => <li key={tool} className="rounded-lg border border-slate-200 bg-white px-3 py-2">• {tool}</li>)}</ul></div></div></section>
    <section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Selected partners and client references</h2><p className="mt-2 text-sm text-slate-700">References may include partner/client categories as shown in the company profile.</p><p className="mt-2 text-xs text-slate-600">Listed based on the supplied company profile; final public display should be confirmed by HILTECH.</p></div></div></section>
    <section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Map services to solution pathways</h2><p className="mt-2 text-sm text-slate-700">Move from service scope to business-outcome solution pages for planning and RFQ readiness.</p><div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{[{label:'Structured Cabling',slug:'structured-cabling'},{label:'Fiber Backbone',slug:'fiber-backbone'},{label:'Data Room Infrastructure',slug:'data-rooms'},{label:'CCTV Infrastructure',slug:'cctv-infrastructure'},{label:'Testing & Validation',slug:'network-testing'},{label:'Project Supply & RFQ',slug:'project-supply-rfq'}].map((item)=><Link key={item.slug} href={`/solutions/${item.slug}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100">{item.label}</Link>)}</div></div></div></section></main>;
}
