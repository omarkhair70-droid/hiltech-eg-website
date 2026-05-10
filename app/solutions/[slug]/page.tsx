import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionShell, CTAButton } from '@/components/ui/primitives';
import { solutions, solutionsBySlug } from '@/content/solutions';
import { productIntelligenceBySlug } from '@/content/product-intelligence';
import { site } from '@/content/site';

interface Params {
  slug: string;
}

const titleMap: Record<string, string> = {
  'structured-cabling': 'Structured Cabling Solutions | HILTECH',
  'fiber-backbone': 'Fiber Backbone Infrastructure | HILTECH',
  'data-rooms': 'Data Room Infrastructure | HILTECH',
  'cctv-infrastructure': 'CCTV Infrastructure Solutions | HILTECH',
  'network-testing': 'Network Testing & Validation | HILTECH',
  'project-supply-rfq': 'Project Supply & RFQ | HILTECH',
};

const approachFlowBySlug: Record<string, string[]> = {
  'structured-cabling': [
    'Endpoint count',
    'Cable routes',
    'Patch panel / outlet mapping',
    'Termination + labeling',
    'Testing + handover',
  ],
  'fiber-backbone': [
    'Backbone route',
    'ODF / termination plan',
    'Fiber panel readiness',
    'OTDR / continuity testing',
    'As-built handover',
  ],
  'data-rooms': [
    'Room requirement',
    'Rack / power layout',
    'ODF + patching arrangement',
    'Cable management',
    'Handover pack',
  ],
  'cctv-infrastructure': [
    'Camera locations',
    'Cable route planning',
    'PoE / switch readiness',
    'Control-room connection',
    'Validation + expansion notes',
  ],
  'network-testing': [
    'Acceptance criteria',
    'Pre-test inspection',
    'Copper / fiber validation',
    'Issue remediation',
    'Final report / handover',
  ],
  'project-supply-rfq': [
    'Requirement capture',
    'Product category mapping',
    'Quantity review',
    'Availability / compatibility check',
    'RFQ finalization',
  ],
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

  const approachFlow = approachFlowBySlug[solution.slug] ?? solution.implementationFlow;

  const scopeSnapshot = [
    { title: 'Site / route scope', value: solution.deliveryScope[0] },
    { title: 'Components / products', value: solution.typicalComponents[0] },
    { title: 'Readiness support', value: solution.implementationFlow[0] },
    { title: 'Testing / handover', value: solution.keyOutcomes[0] },
  ];

  return (
    <main>
      <SectionShell>
        <nav className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-300">
          <Link className="hover:text-white" href="/solutions">
            Solutions
          </Link>
          <span>/</span>
          <span className="font-medium text-white">{solution.shortTitle}</span>
        </nav>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f3a] via-[#0d2444] to-[#101a2d] p-6 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{solution.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{solution.title}</h1>
          <p className="mt-3 max-w-4xl text-sm text-slate-200 md:text-base">{solution.intro}</p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <CTAButton href="/products-partners">Browse Products</CTAButton>
            <CTAButton href="/work" variant="secondary">
              View Field Work
            </CTAButton>
          </div>
          <Link href="/contact" className="mt-4 inline-block text-sm text-slate-300 underline-offset-4 hover:underline">
            Contact HILTECH
          </Link>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-xl font-bold text-white">Scope snapshot</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {scopeSnapshot.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.title}</p>
                <p className="mt-1 text-sm text-slate-300">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-white">Approach flow</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {approachFlow.map((step, i) => (
              <div key={step} className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-3">
                <p className="text-xs font-semibold tracking-wide text-orange-600">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-1 text-sm text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-xl font-bold text-white">Where this helps</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">The challenge</h3>
              <p className="mt-2 text-sm text-slate-300">{solution.problemStatement}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">HILTECH support</h3>
              <p className="mt-2 text-sm text-slate-300">{solution.solutionSummary}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-xl font-bold text-white">Delivery scope and components</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Delivery scope</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {solution.deliveryScope.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Typical components</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {solution.typicalComponents.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-white">Expected outcomes</h2>
          <ul className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-300 md:p-6">
            {solution.keyOutcomes.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-xl font-bold text-white">Related product context</h2>
          <p className="mt-2 text-sm text-slate-300">
            Browse product categories and intelligence guides that commonly support this solution scope.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {solution.relatedProductIntelligenceSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/products-partners/intelligence/${slug}`}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-950/70"
              >
                {productIntelligenceBySlug[slug]?.shortTitle ?? slug}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <CTAButton href="/products-partners" variant="secondary">
              Browse Products
            </CTAButton>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-xl font-bold text-white">Before you send the request</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {solution.rfqChecklist.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
          <ul className="mt-4 space-y-1 text-xs text-slate-500">
            {solution.assuranceNotes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">{solution.disclaimer}</p>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5 md:p-6">
          <h2 className="text-lg font-bold text-white md:text-xl">Need field proof before sending scope?</h2>
          <p className="mt-2 text-sm text-slate-300">
            Review field snapshots across racks, fiber, cabling, and validation workflows.
          </p>
          <div className="mt-4">
            <CTAButton href="/work" variant="secondary">
              View Field Work
            </CTAButton>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-lg font-bold text-white md:text-xl">Ready to define this scope?</h2>
          <p className="mt-2 text-sm text-slate-300">
            Send your project requirements for quotation and availability review.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <CTAButton href="/rfq">Send Project Requirements</CTAButton>
            <Link href="/contact" className="text-sm font-medium text-slate-300 underline-offset-4 hover:underline">
              Contact HILTECH
            </Link>
            <Link href="/track" className="text-sm text-slate-500 underline-offset-4 hover:underline">
              Track RFQ
            </Link>
          </div>
        </section>
      </SectionShell>
    </main>
  );
}
