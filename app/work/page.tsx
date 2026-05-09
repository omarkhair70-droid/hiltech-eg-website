import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/ui/primitives';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Field Work & Infrastructure Proof | HILTECH',
  description: 'Proof-focused field work visuals showing delivery scope, handover readiness, and maintainable network infrastructure.',
  alternates: { canonical: `${site.siteUrl}/work`, languages: { en: `${site.siteUrl}/work`, ar: `${site.siteUrl}/ar/work`, 'x-default': `${site.siteUrl}/` } },
};

type ProofCard = {
  label: string;
  title: string;
  scope: string;
  confidence: string;
  image: string;
  alt: string;
};

const proofCards: ProofCard[] = [
  {
    label: 'Rack preparation',
    title: 'Rack & data room preparation',
    scope: 'Rack organization, patching, cable routing, and readiness checks for business network rooms.',
    confidence: 'Focused on clean handover and maintainable infrastructure.',
    image: '/rack-data-room.jpg',
    alt: 'Rack and data room setup with organized routing and patch access.',
  },
  {
    label: 'Structured cabling',
    title: 'Structured cabling',
    scope: 'Organized cable pathways, patch-panel termination, and routing discipline across technical spaces.',
    confidence: 'Supports stable operation and easier maintenance after delivery.',
    image: '/copper-patch-panel.jpg',
    alt: 'Structured copper patching and cable management in technical infrastructure.',
  },
  {
    label: 'Fiber / ODF',
    title: 'Fiber / ODF work',
    scope: 'Fiber routing context, ODF organization, and connector preparation aligned with project execution.',
    confidence: 'Built around clarity, serviceability, and practical field readiness.',
    image: '/fiber-distribution-panel.jpg',
    alt: 'Fiber distribution and ODF preparation with organized termination points.',
  },
  {
    label: 'Testing & handover',
    title: 'Testing & handover',
    scope: 'Field testing tools and validation checks used before delivery and operational handover.',
    confidence: 'Helps reduce avoidable issues before go-live and support teams after handover.',
    image: '/testing-otdr-device.jpg',
    alt: 'Testing instrument used for field validation before handover.',
  },
  {
    label: 'CCTV infrastructure',
    title: 'CCTV infrastructure support',
    scope: 'Connectivity preparation and structured pathways supporting CCTV infrastructure integration.',
    confidence: 'Ensures installation routes stay organized for future upgrades and maintenance.',
    image: '/infrastructure-network-detail.jpg',
    alt: 'Infrastructure-ready cabling environment supporting CCTV connectivity scope.',
  },
];

export default function Page() {
  return (
    <main>
      <SectionShell>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Field Work Proof</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">Real field delivery across racks, cabling, fiber, and handover workflows</h1>
          <p className="mt-4 max-w-3xl text-slate-700">Approved HILTECH field visuals presented as proof cards with delivery scope and handover confidence context.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/rfq" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500">Request Project Quote</Link>
            <Link href="/contact" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Contact HILTECH</Link>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofCards.map((card) => (
            <article key={card.title} className="public-card overflow-hidden rounded-2xl bg-white p-0">
              <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-50">
                <Image src={card.image} alt={card.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-4">
                <span className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">{card.label}</span>
                <h2 className="mt-3 text-lg font-semibold text-slate-900">{card.title}</h2>
                <p className="mt-2 text-sm text-slate-700"><span className="font-semibold text-slate-900">Scope:</span> {card.scope}</p>
                <p className="mt-2 text-sm text-slate-700"><span className="font-semibold text-slate-900">Confidence:</span> {card.confidence}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Field work built for reliable handover</h2>
          <p className="mt-3 max-w-3xl text-slate-700">HILTECH focuses on organized cabling, clear routing, practical rack preparation, and testing-ready infrastructure so business sites can be maintained after delivery.</p>
          <ul className="mt-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Organized routing</li>
            <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Maintainable cabling</li>
            <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Testing-ready handover</li>
            <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Practical rack preparation</li>
          </ul>
        </section>
      </SectionShell>
    </main>
  );
}
