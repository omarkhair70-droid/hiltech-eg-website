import type { Metadata } from 'next';
import { CTAButton, PremiumCard, SectionShell } from '@/components/ui/primitives';
import { companyProfile } from '@/content/sales-materials';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Company Profile | HILTECH Resources',
  description: 'HILTECH company profile with positioning, service scope, solution areas, and RFQ workflow details.',
  alternates: { canonical: `${site.siteUrl}/resources/company-profile` },
  openGraph: { title: 'Company Profile | HILTECH', description: 'PDF-ready company profile content prepared for client communication.', url: `${site.siteUrl}/resources/company-profile`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function CompanyProfilePage() {
  return <main><SectionShell><article className="mx-auto max-w-4xl space-y-6 print:space-y-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-orange-600">PDF-ready content</p><h1 className="mt-2 text-3xl font-bold text-slate-900">{companyProfile.title}</h1><p className="mt-3 text-slate-700">{companyProfile.intro}</p></div><PremiumCard><h2 className="text-lg font-semibold">Positioning</h2><p className="mt-2 text-sm text-slate-700">{companyProfile.positioning}</p></PremiumCard><PremiumCard><h2 className="text-lg font-semibold">What HILTECH Provides</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{companyProfile.whatWeDo.map((item) => <li key={item}>{item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-semibold">Solutions Overview</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{companyProfile.solutionAreas.map((item) => <li key={item}>{item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-semibold">Product & Project Supply</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{companyProfile.productSupply.map((item) => <li key={item}>{item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-semibold">RFQ Workflow</h2><ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">{companyProfile.rfqWorkflow.map((item) => <li key={item}>{item}</li>)}</ol></PremiumCard><PremiumCard><h2 className="text-lg font-semibold">Compliance Note</h2><p className="mt-2 text-sm text-slate-700">{companyProfile.complianceNote}</p></PremiumCard><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-sm text-slate-700">{companyProfile.contactCta}</p><div className="mt-4 flex flex-wrap gap-2"><CTAButton href="/contact">Request Project Quote</CTAButton><CTAButton href="/rfq" variant="secondary">Review RFQ Basket</CTAButton><CTAButton href={site.contact.whatsappGeneralLink} variant="ghost">WhatsApp HILTECH</CTAButton></div></div></article></SectionShell></main>;
}
