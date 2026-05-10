import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionShell, PremiumCard, CTAButton, SectionHeader } from '@/components/ui/primitives';
import { solutions } from '@/content/solutions';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Enterprise Infrastructure Solutions | HILTECH',
  description:
    'Explore HILTECH solutions for structured cabling, fiber backbone, data rooms, CCTV infrastructure, network testing, and project-based supply.',
  alternates: { canonical: `${site.siteUrl}/solutions` },
  openGraph: {
    title: 'Enterprise Infrastructure Solutions | HILTECH',
    description: 'Enterprise-grade infrastructure solution pathways for business environments.',
    url: `${site.siteUrl}/solutions`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function SolutionsPage() {
  return (
    <main>
      <SectionShell>
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f3a] via-[#0d2444] to-[#101a2d] p-6 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Enterprise Infrastructure Solutions</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Enterprise Infrastructure Solutions</h1>
          <p className="mt-3 max-w-4xl text-sm text-slate-200 md:text-base">
            Explore HILTECH solutions for structured cabling, fiber backbone, data rooms, CCTV infrastructure, network testing,
            and project-based supply.
          </p>
        </section>

        <section className="mt-8">
          <SectionHeader
            title="Solution Pathways"
            description="Solution pages are organized around infrastructure outcomes and implementation readiness."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <PremiumCard key={solution.slug} className="flex h-full flex-col">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{solution.eyebrow}</p>
                <h2 className="mt-2 text-lg font-bold text-white">{solution.shortTitle}</h2>
                <p className="mt-2 text-sm text-slate-300">{solution.intro}</p>
                <div className="mt-4">
                  <Link className="text-sm font-semibold text-navy-900 underline underline-offset-4" href={`/solutions/${solution.slug}`}>
                    View solution details
                  </Link>
                </div>
              </PremiumCard>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-xl font-bold text-white">Solution pathways</h2>
          <p className="mt-2 text-sm text-slate-300">Choose the infrastructure path that matches your project scope.</p>
          <div className="mt-4 space-y-2">
            {[
              { title: 'Structured Cabling', href: '/solutions/structured-cabling' },
              { title: 'Fiber Backbone', href: '/solutions/fiber-backbone' },
              { title: 'Data Rooms', href: '/solutions/data-rooms' },
              { title: 'CCTV Infrastructure', href: '/solutions/cctv-infrastructure' },
              { title: 'Network Testing', href: '/solutions/network-testing' },
              { title: 'Project Supply & RFQ', href: '/solutions/project-supply-rfq' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-3 text-sm font-medium text-slate-200 hover:bg-slate-950/70"
              >
                <span>{item.title}</span>
                <span className="text-xs text-slate-500">View details</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-slate-950/70 p-5 md:p-6">
          <h2 className="text-2xl font-bold text-white">How HILTECH approaches delivery</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              'Scope-first planning',
              'Availability confirmation before quotation',
              'Testing-oriented validation before handover',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm font-medium text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-5 md:p-6">
          <h2 className="text-xl font-bold text-white">Next step for your project</h2>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <CTAButton href="/rfq">Start RFQ</CTAButton>
            <CTAButton href="/products-partners" variant="secondary">
              Browse Products
            </CTAButton>
          </div>
          <p className="mt-4 text-xs text-slate-500">Final scope, availability, and technical requirements are confirmed per project.</p>
          <p className="mt-2 text-xs text-slate-300">
            Need client-facing summaries?{' '}
            <Link className="font-semibold text-navy-900 underline" href="/resources">
              Visit Sales & Project Resources
            </Link>
            .
          </p>
        </section>
      </SectionShell>
    </main>
  );
}
