import type { Metadata } from 'next';
import { CTAButton, PremiumCard, SectionShell } from '@/components/ui/primitives';
import { companyProfile } from '@/content/sales-materials';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Company Profile | HILTECH Resources',
  description: 'HILTECH company profile with positioning, service scope, solution areas, and RFQ workflow details.',
  alternates: { canonical: `${site.siteUrl}/resources/company-profile` },
  openGraph: {
    title: 'Company Profile | HILTECH',
    description: 'PDF-ready company profile content prepared for client communication.',
    url: `${site.siteUrl}/resources/company-profile`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function CompanyProfilePage() {
  return (
    <main>
      <SectionShell>
        <article className="mx-auto max-w-4xl space-y-6 print:space-y-4">
          <header className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">PDF-ready content</p>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">{companyProfile.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{companyProfile.intro}</p>
          </header>

          <PremiumCard className="space-y-3 p-6">
            <h2 className="text-lg font-semibold text-white">Positioning</h2>
            <p className="text-sm leading-7 text-slate-300">{companyProfile.positioning}</p>
          </PremiumCard>

          <PremiumCard className="space-y-3 p-6">
            <h2 className="text-lg font-semibold text-white">What HILTECH Provides</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              {companyProfile.whatWeDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PremiumCard>

          <PremiumCard className="space-y-3 p-6">
            <h2 className="text-lg font-semibold text-white">Solutions Overview</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              {companyProfile.solutionAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PremiumCard>

          <PremiumCard className="space-y-3 p-6">
            <h2 className="text-lg font-semibold text-white">Product & Project Supply</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              {companyProfile.productSupply.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PremiumCard>

          <PremiumCard className="space-y-3 p-6">
            <h2 className="text-lg font-semibold text-white">RFQ Workflow</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
              {companyProfile.rfqWorkflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </PremiumCard>

          <PremiumCard className="space-y-3 p-6">
            <h2 className="text-lg font-semibold text-white">Compliance Note</h2>
            <p className="text-sm leading-7 text-slate-300">{companyProfile.complianceNote}</p>
          </PremiumCard>

          <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 md:p-6">
            <p className="text-sm leading-7 text-slate-300">{companyProfile.contactCta}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <CTAButton href="/contact">Request Project Quote</CTAButton>
              <CTAButton href="/rfq" variant="secondary">Review RFQ Basket</CTAButton>
              <CTAButton href={site.contact.whatsappGeneralLink} variant="ghost">WhatsApp HILTECH</CTAButton>
            </div>
          </section>
        </article>
      </SectionShell>
    </main>
  );
}
