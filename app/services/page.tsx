import type { Metadata } from 'next';
import Link from 'next/link';
import { ServicesGrid } from '@/components/Sections';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services | Enterprise Infrastructure Delivery in Egypt',
  description:
    'Structured cabling, fiber optics, data room infrastructure, CCTV connectivity, testing, and support services for enterprise environments in Egypt.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'HILTECH Services | Enterprise Infrastructure Delivery',
    description:
      'Enterprise infrastructure services across network cabling, fiber optics, data room readiness, CCTV connectivity, and validation workflows in Egypt.',
    url: `${site.siteUrl}/services`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function Page() {
  return <main className="section"><div className="container"><h1 className="text-3xl font-bold leading-tight sm:text-4xl">Infrastructure Services Designed for Reliable Business Operations.</h1><p className="mt-3 text-slate-700">HILTECH provides practical, standards-driven network infrastructure services—from planning and installation to testing and long-term support.</p></div><ServicesGrid /><section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Map services to solution pathways</h2><p className="mt-2 text-sm text-slate-700">Move from service scope to business-outcome solution pages for planning and RFQ readiness.</p><div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{[{label:'Structured Cabling',slug:'structured-cabling'},{label:'Fiber Backbone',slug:'fiber-backbone'},{label:'Data Room Infrastructure',slug:'data-rooms'},{label:'CCTV Infrastructure',slug:'cctv-infrastructure'},{label:'Testing & Validation',slug:'network-testing'},{label:'Project Supply & RFQ',slug:'project-supply-rfq'}].map((item)=><Link key={item.slug} href={`/solutions/${item.slug}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100">{item.label}</Link>)}</div></div></div></section></main>;
}
