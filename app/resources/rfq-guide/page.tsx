import type { Metadata } from 'next';
import { CTAButton, PremiumCard, SectionShell } from '@/components/ui/primitives';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'RFQ Preparation Guide | HILTECH Resources',
  description: 'Checklist for preparing complete infrastructure RFQ requests before quotation.',
  alternates: { canonical: `${site.siteUrl}/resources/rfq-guide` },
  openGraph: { title: 'RFQ Preparation Guide | HILTECH', description: 'Prepare your project RFQ with a complete scope and checklist.', url: `${site.siteUrl}/resources/rfq-guide`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

const checklist = [
  'Project location and site access conditions',
  'Site type (office, warehouse, factory, campus, mixed-use)',
  'Estimated number of endpoints, cameras, cabinets, or racks',
  'Preferred brands or technical specifications (if any)',
  'BOQ or quantity list, even if preliminary',
  'Required delivery or implementation timeline',
  'Testing, validation, and handover expectations',
  'Any operational constraints (working hours, phased rollout, safety protocols)',
];

export default function RFQGuidePage() {
  return <main><SectionShell><h1 className="text-3xl font-bold text-slate-900">RFQ Preparation Guide</h1><p className="mt-3 text-slate-700">Before requesting a quote, prepare the essentials below to reduce back-and-forth and improve quotation quality.</p><PremiumCard className="mt-6"><ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">{checklist.map((item) => <li key={item}>{item}</li>)}</ul></PremiumCard><PremiumCard className="mt-4"><h2 className="text-lg font-semibold">How RFQ Basket Helps</h2><p className="mt-2 text-sm text-slate-700">RFQ Basket helps you organize products, quantities, and notes in one place before sharing your request on WhatsApp for quotation coordination.</p></PremiumCard><div className="mt-6 flex flex-wrap gap-2"><CTAButton href="/products-partners">Build RFQ Basket</CTAButton><CTAButton href="/products-partners" variant="secondary">Browse Products</CTAButton><CTAButton href={site.contact.whatsappRFQLink} variant="ghost">WhatsApp HILTECH</CTAButton></div></SectionShell></main>;
}
