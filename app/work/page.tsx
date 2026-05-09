import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/ui/primitives';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Field Work | HILTECH',
  description: 'Selected field visuals, testing workflows, and reference materials for HILTECH infrastructure delivery.',
  alternates: { canonical: `${site.siteUrl}/work` },
  openGraph: { title: 'Field Work | HILTECH', description: 'Selected field visuals, testing workflows, and reference materials for HILTECH infrastructure delivery.', url: `${site.siteUrl}/work`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

type ProofDiscipline = {
  id: string;
  title: string;
  description: string;
  caption: string;
  leadImage: { src: string; alt: string };
  supportImages: { src: string; alt: string }[];
  leadFit?: 'cover' | 'contain';
  supportFit?: 'cover' | 'contain';
};

const proofDisciplines: ProofDiscipline[] = [
  {
    id: 'fiber-odf',
    title: 'Fiber / ODF readiness',
    description: 'Termination, patching, and connector organization from ODF and panel preparation workflows.',
    caption: 'Field views of fiber routing, connector handling, and structured termination points before handover.',
    leadImage: { src: '/fiber-distribution-panel.jpg', alt: 'Fiber distribution panel prepared with organized terminations and patch ports.' },
    supportImages: [
      { src: '/fiber-cable-closeup.jpg', alt: 'Close-up of fiber cable bundle aligned for clean path routing.' },
      { src: '/fiber-connectors-closeup.jpg', alt: 'Fiber connectors staged for termination and patching sequence.' },
      { src: '/fiber-termination-box.jpg', alt: 'Fiber termination box with routed patch leads and labeled ports.' },
    ],
  },
  {
    id: 'rack-data-room',
    title: 'Rack & data room preparation',
    description: 'Rack readiness visuals covering panel arrangement, front cabling discipline, and patch sequence control.',
    caption: 'Snapshots showing practical rack preparation, patch panel access, and manageable routing paths.',
    leadImage: { src: '/rack-data-room.jpg', alt: 'Prepared data room rack layout with structured routing and panel access.' },
    supportImages: [
      { src: '/rack-cable-management-white.jpg', alt: 'Rack cable management setup using clear vertical and horizontal routing paths.' },
      { src: '/rack-front-cabling.jpg', alt: 'Front rack cabling view showing grouped patching and labeling alignment.' },
      { src: '/rack-patch-panel-blue.jpg', alt: 'Blue patch leads on rack patch panel arranged for serviceability.' },
    ],
  },
  {
    id: 'copper-structured',
    title: 'Copper / structured cabling',
    description: 'Structured copper pathways across tray, ceiling, floor, and riser routing for endpoint connectivity.',
    caption: 'Route planning and termination context used to validate project scope and RFQ requirements.',
    leadImage: { src: '/copper-patch-panel.jpg', alt: 'Copper patch panel with terminated ports and orderly patching lanes.' },
    supportImages: [
      { src: '/copper-cable-tray.jpg', alt: 'Copper cabling route through tray infrastructure in corridor section.' },
      { src: '/copper-ceiling-routing.jpg', alt: 'Ceiling-level copper routing prepared for office and branch distribution.' },
      { src: '/copper-riser-routing.jpg', alt: 'Copper riser routing path between floors prepared for vertical distribution.' },
    ],
  },
  {
    id: 'testing-validation',
    title: 'Testing & validation tools',
    description: 'Field tools used for measurement, link checks, and validation support before final handover.',
    caption: 'Test instrumentation references used during validation and troubleshooting workflows.',
    leadImage: { src: '/testing-otdr-device.jpg', alt: 'OTDR device used in field validation for fiber path diagnostics.' },
    supportImages: [
      { src: '/testing-fluke-meter.jpg', alt: 'Fluke testing meter used for infrastructure testing and diagnostics support.' },
      { src: '/testing-power-meter.jpg', alt: 'Power meter used for optical signal level validation checks.' },
      { src: '/testing-digital-copper-tester.jpg', alt: 'Digital copper tester used for continuity and cable validation steps.' },
    ],
    leadFit: 'contain',
    supportFit: 'contain',
  },
];

export default async function Page() {
  const hasPartnerPanel = await fs.access(path.join(process.cwd(), 'public/references-partners-panel.jpg')).then(() => true).catch(() => false);
  const hasClientPanel = await fs.access(path.join(process.cwd(), 'public/references-clients-panel.jpg')).then(() => true).catch(() => false);

  return (
    <main>
      <SectionShell>
        <section className="rounded-2xl border border-slate-700 bg-slate-950 p-6 text-white md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Field Work &amp; Implementation Proof</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">Field visuals across fiber, racks, cabling, and testing workflows</h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-200 md:text-base">Selected field visuals representing HILTECH service areas across installation and testing workflows.</p>
          <p className="mt-3 text-sm text-slate-300" dir="rtl" lang="ar">لقطات من تجهيزات وأعمال ميدانية لمشروعات البنية التحتية للشبكات.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/rfq" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400">Request Project Quote</Link>
            <Link href="/products-partners" className="rounded-lg border border-slate-400 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">Browse Products</Link>
            <Link href="/contact" className="self-center text-sm font-medium text-slate-200 underline-offset-4 hover:underline">Contact HILTECH</Link>
          </div>
        </section>

        <section className="mt-10 grid items-center gap-6 rounded-2xl bg-slate-100/70 p-4 md:grid-cols-2 md:p-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-white">
            <Image src="/rack-data-room.jpg" alt="Field-ready rack and data room preparation with routing visibility and panel access." fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Project-ready infrastructure preparation</h2>
            <p className="mt-3 text-slate-700">Field visuals help teams review routing, rack readiness, termination quality, and validation context before defining RFQ requirements.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Rack readiness', 'Fiber / copper routing', 'Testing support'].map((chip) => (
                <span key={chip} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">{chip}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-10">
          {proofDisciplines.map((discipline, index) => (
            <article key={discipline.id} className="grid gap-5 md:grid-cols-12 md:gap-6">
              <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <Image src={discipline.leadImage.src} alt={discipline.leadImage.alt} fill className={discipline.leadFit === 'contain' ? 'object-contain p-4' : 'object-cover'} sizes="(max-width: 768px) 100vw, 58vw" />
                </div>
              </div>
              <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <h2 className="text-2xl font-bold text-slate-900">{discipline.title}</h2>
                <p className="mt-2 text-slate-700">{discipline.description}</p>
                <p className="mt-2 text-sm text-slate-600">{discipline.caption}</p>
                <Link href="/products-partners" className="mt-3 inline-block text-sm font-semibold text-orange-700 underline-offset-4 hover:underline">View products relevant to this scope</Link>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {discipline.supportImages.map((image, supportIndex) => (
                    <div key={image.src} className={`${supportIndex === 2 ? 'hidden sm:block' : ''}`}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-white">
                        <Image src={image.src} alt={image.alt} fill className={discipline.supportFit === 'contain' ? 'object-contain p-3' : 'object-cover'} sizes="(max-width: 640px) 44vw, 18vw" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        {(hasPartnerPanel || hasClientPanel) && (
          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">Product references</h2>
            <p className="mt-2 text-sm text-slate-600">Product references are shown for catalog/context purposes only and do not imply formal partnership unless explicitly stated.</p>
            <div className="mt-5 grid gap-4">
              {hasPartnerPanel && (
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                  <h3 className="text-sm font-semibold text-slate-700">Compatible product references</h3>
                  <div className="mt-3 relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 bg-white p-2 sm:aspect-[21/10]">
                    <Image src="/references-partners-panel.jpg" alt="Company profile panel showing selected partner references for project context." fill className="object-contain p-2" sizes="100vw" />
                  </div>
                </article>
              )}
              {hasClientPanel && (
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                  <h3 className="text-sm font-semibold text-slate-700">Client references</h3>
                  <div className="mt-3 relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 bg-white p-2 sm:aspect-[21/10]">
                    <Image src="/references-clients-panel.jpg" alt="Company profile panel showing selected client references for project context." fill className="object-contain p-2" sizes="100vw" />
                  </div>
                </article>
              )}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-2xl border border-orange-200 bg-orange-50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Ready to connect field scope with product requirements?</h2>
          <p className="mt-2 max-w-3xl text-slate-700">Browse relevant products, then send a structured RFQ with the items and scope your project needs.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/rfq" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500">Request Project Quote</Link>
            <Link href="/products-partners" className="rounded-lg border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-800 hover:bg-orange-100">Browse Products</Link>
            <Link href="/contact" className="self-center text-sm font-medium text-orange-800 underline-offset-4 hover:underline">Contact HILTECH</Link>
          </div>
        </section>
      </SectionShell>
    </main>
  );
}
