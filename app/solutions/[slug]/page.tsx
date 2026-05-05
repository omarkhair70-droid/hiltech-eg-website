import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PremiumCard, SectionShell, CTAButton } from '@/components/ui/primitives';
import {
  CCTVInfrastructureDiagram,
  DataRoomDiagram,
  FiberBackboneDiagram,
  RFQFlowDiagram,
  StructuredCablingDiagram,
  TechnicalDiagramPanel,
  TestingValidationDiagram,
} from '@/components/diagrams';
import { solutions, solutionsBySlug } from '@/content/solutions';
import { productIntelligenceBySlug } from '@/content/product-intelligence';
import { site } from '@/content/site';

interface Params {
  slug: string;
}

const diagramBySlug: Record<
  string,
  { title: string; subtitle: string; labels: string[]; note: string; node: JSX.Element }
> = {
  'structured-cabling': {
    title: 'Structured Cabling Layout',
    subtitle: 'Office endpoints to patching, cabinet termination, and uplink readiness.',
    labels: ['Endpoints', 'Patch Panel', 'Cabinet', 'Uplink'],
    note: 'Conceptual visual for planning discussions.',
    node: <StructuredCablingDiagram />,
  },
  'fiber-backbone': {
    title: 'Fiber Backbone Route',
    subtitle: 'Building distribution through ODF and fiber panels into core.',
    labels: ['Building', 'ODF', 'Fiber Panel', 'Core'],
    note: 'Conceptual visual for route and handover alignment.',
    node: <FiberBackboneDiagram />,
  },
  'data-rooms': {
    title: 'Data Room Readiness',
    subtitle: 'Rack zones, patching, ODF, and power placement.',
    labels: ['Racks', 'PDU', 'ODF', 'Switch Area'],
    note: 'Conceptual visual for room organization.',
    node: <DataRoomDiagram />,
  },
  'cctv-infrastructure': {
    title: 'CCTV Infrastructure Path',
    subtitle: 'Camera endpoints over network paths to switch and control.',
    labels: ['Camera Nodes', 'PoE Switch', 'NVR'],
    note: 'Conceptual visual for surveillance connectivity design.',
    node: <CCTVInfrastructureDiagram />,
  },
  'network-testing': {
    title: 'Testing & Validation Workflow',
    subtitle: 'Test instruments verify cable/fiber links before handover.',
    labels: ['Link Under Test', 'Tester', 'Validation Report'],
    note: 'Conceptual visual for quality checkpoints.',
    node: <TestingValidationDiagram />,
  },
  'project-supply-rfq': {
    title: 'Project RFQ Workflow',
    subtitle: 'From product selection to reviewed WhatsApp submission.',
    labels: ['Selection', 'Basket', 'Review', 'Confirmation'],
    note: 'Conceptual visual for procurement workflow clarity.',
    node: <RFQFlowDiagram />,
  },
};

const titleMap: Record<string, string> = {
  'structured-cabling': 'Structured Cabling Solutions | HILTECH',
  'fiber-backbone': 'Fiber Backbone Infrastructure | HILTECH',
  'data-rooms': 'Data Room Infrastructure | HILTECH',
  'cctv-infrastructure': 'CCTV Infrastructure Solutions | HILTECH',
  'network-testing': 'Network Testing & Validation | HILTECH',
  'project-supply-rfq': 'Project Supply & RFQ | HILTECH',
};

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const solution = solutionsBySlug[params.slug];
  if (!solution) return {};

  const title = titleMap[solution.slug] ?? `${solution.title} | HILTECH`;
  const url = `${site.siteUrl}/solutions/${solution.slug}`;

  return {
    title,
    description: solution.intro,
    alternates: { canonical: url },
    openGraph: { title, description: solution.intro, url, images: [site.ogImage] },
    twitter: { card: 'summary_large_image', images: [site.ogImage] },
  };
}

export default function SolutionDetailPage({ params }: { params: Params }) {
  const solution = solutionsBySlug[params.slug];
  if (!solution) notFound();

  return (
    <main>
      <SectionShell>
        <nav className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
          <Link className="hover:text-slate-900" href="/solutions">
            Solutions
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-900">{solution.shortTitle}</span>
        </nav>

        <section className="rounded-2xl border border-navy-900/20 bg-gradient-to-br from-navy-900 to-slate-900 p-6 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{solution.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{solution.title}</h1>
          <p className="mt-3 max-w-4xl text-sm text-slate-200 md:text-base">{solution.intro}</p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <CTAButton href="/rfq">Start RFQ</CTAButton>
            <CTAButton href="/products-partners" variant="secondary">
              Browse Products
            </CTAButton>
            <CTAButton href="/contact" variant="ghost">
              Contact HILTECH
            </CTAButton>
          </div>
        </section>

        {diagramBySlug[solution.slug] ? (
          <section className="mt-8">
            <TechnicalDiagramPanel
              surface="light"
              title={diagramBySlug[solution.slug].title}
              subtitle={diagramBySlug[solution.slug].subtitle}
              labels={diagramBySlug[solution.slug].labels}
              note={diagramBySlug[solution.slug].note}
            >
              {diagramBySlug[solution.slug].node}
            </TechnicalDiagramPanel>
          </section>
        ) : null}

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <PremiumCard>
            <h2 className="text-xl font-bold text-slate-900">The challenge</h2>
            <p className="mt-3 text-sm text-slate-700">{solution.problemStatement}</p>
          </PremiumCard>
          <PremiumCard>
            <h2 className="text-xl font-bold text-slate-900">How HILTECH supports this solution</h2>
            <p className="mt-3 text-sm text-slate-700">{solution.solutionSummary}</p>
          </PremiumCard>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">Key outcomes</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {solution.keyOutcomes.map((item) => (
              <PremiumCard key={item} className="bg-slate-50 text-sm text-slate-700">
                {item}
              </PremiumCard>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <PremiumCard>
            <h2 className="text-lg font-bold text-slate-900">Delivery scope</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {solution.deliveryScope.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </PremiumCard>
          <PremiumCard>
            <h2 className="text-lg font-bold text-slate-900">Typical components</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {solution.typicalComponents.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </PremiumCard>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">Implementation flow</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {solution.implementationFlow.map((step, i) => (
              <PremiumCard key={step}>
                <p className="text-xs font-semibold text-orange-600">STEP {i + 1}</p>
                <p className="mt-2 text-sm text-slate-700">{step}</p>
              </PremiumCard>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">Related Product Intelligence</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {solution.relatedProductIntelligenceSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/products-partners/${slug}`}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {productIntelligenceBySlug[slug]?.shortTitle ?? slug}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <PremiumCard accent>
            <h2 className="text-lg font-bold text-slate-900">What to include in your request</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {solution.rfqChecklist.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </PremiumCard>
          <PremiumCard>
            <h2 className="text-lg font-bold text-slate-900">Assurance notes</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {solution.assuranceNotes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">{solution.disclaimer}</p>
          </PremiumCard>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">Start your solution RFQ</h2>
          <p className="mt-2 text-sm text-slate-700">
            Share your scope, quantities, location, and timeline so HILTECH can confirm availability and quotation.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <CTAButton href="/rfq">Start RFQ</CTAButton>
            <CTAButton href="/products-partners" variant="secondary">
              Browse Products
            </CTAButton>
            <CTAButton
              href={site.contact.whatsappRFQLink}
              variant="ghost"
              className="border-slate-300 text-slate-800 hover:bg-slate-50"
            >
              WhatsApp HILTECH
            </CTAButton>
          </div>
        </section>
      </SectionShell>
    </main>
  );
}
