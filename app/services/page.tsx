import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ServicesGrid } from '@/components/Sections';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services | Enterprise Infrastructure Delivery in Egypt',
  description:
    'Site surveys, engineering drawings, fiber and copper installation, rack readiness, and testing workflows for enterprise network infrastructure in Egypt.',
  alternates: { canonical: `${site.siteUrl}/services`, languages: { en: `${site.siteUrl}/services`, ar: `${site.siteUrl}/ar/services`, 'x-default': `${site.siteUrl}/` } },
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
  {
    title: 'Fiber Installation',
    description: 'Fiber cable extension, splicing, termination, and testing support.',
    image: '/fiber-splicing-workbench.jpg',
    alt: 'Technician performing fiber splicing on a cable workbench with precision tools.',
  },
  {
    title: 'Rack Installation',
    description: 'Rack preparation, cable routing, patching, and infrastructure readiness.',
    image: '/rack-cable-management-blue.jpg',
    alt: 'Network rack with organized blue cable management and labeled patching.',
  },
  {
    title: 'Copper Installation',
    description: 'Structured copper cabling, termination, labeling, and office network delivery.',
    image: '/copper-cable-pulling.jpg',
    alt: 'Field team pulling copper cables through building pathways during installation.',
  },
  {
    title: 'Testing & Measurement Tools',
    description: 'Fluke, OTDR, power meter, copper testing, and splice support where applicable.',
    image: '/testing-field-device.jpg',
    alt: 'Field engineer using handheld testing equipment to validate network infrastructure.',
    imageFit: 'contain',
  },
];

const testingTools = ['Fluke Test', 'OTDR', 'Power Meter', 'Digital Copper Tester', 'Fiber fusion splice'];

export default function Page() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Core Network Infrastructure Services</h1>
        <p className="mt-3 text-slate-700">HILTECH supports routing, racks, fiber, copper, and testing workflows across planning, execution readiness, and handover support.</p>
      </div>

      <ServicesGrid />

      <section className="section pt-0">
        <div className="container">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">Field Work</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {proofAreas.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <div className="relative aspect-[16/10] w-full bg-white p-4">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className={item.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-700">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">Testing tools used across delivery</h2>
            <p className="mt-2 text-sm text-slate-700">Used across inspection, testing, and delivery workflows where applicable.</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
              {testingTools.map((tool) => (
                <li key={tool} className="rounded-lg border border-slate-200 bg-white px-3 py-2">• {tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">Field work and product references</h2>
            <p className="mt-2 text-sm text-slate-700">View selected project visuals and reference materials in our dedicated public proof page.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/work" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100">View Field Work</Link>
              <Link href="/resources/company-profile" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100">Company Profile Content</Link>
              <Link href="/resources" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100">Resources Hub</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">What HILTECH Delivers</h2>
            <p className="mt-2 text-sm text-slate-700">Move from service scope to business-outcome solution pages for planning and RFQ readiness.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'Structured Cabling', slug: 'structured-cabling' },
                { label: 'Fiber Backbone', slug: 'fiber-backbone' },
                { label: 'Data Room Infrastructure', slug: 'data-rooms' },
                { label: 'CCTV Infrastructure', slug: 'cctv-infrastructure' },
                { label: 'Testing & Validation', slug: 'network-testing' },
                { label: 'Project Supply & RFQ', slug: 'project-supply-rfq' },
              ].map((item) => (
                <Link key={item.slug} href={`/solutions/${item.slug}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
