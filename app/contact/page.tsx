import type { Metadata } from 'next';
import { CTAButton, PremiumCard, SectionShell } from '@/components/ui/primitives';
import { site } from '@/content/site';

export const metadata: Metadata = { title: 'Contact HILTECH | RFQ for Infrastructure Projects', description: 'Request quotations for structured cabling, fiber optics, data room infrastructure, CCTV connectivity, testing, and project supply in Egypt.', alternates: { canonical: `${site.siteUrl}/contact` } };

export default function Page() {
  return (
    <main>
      <SectionShell>
        <h1 className="text-3xl font-bold sm:text-4xl">Contact HILTECH</h1>
        <p className="mt-3 text-slate-700">Request Project Quote is the primary path for project scope, product requirements, and quotation follow-up.</p>
        <div className="mt-4"><CTAButton href="/rfq">Request Project Quote</CTAButton></div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PremiumCard className="bg-white p-4">
            <h2 className="text-xl font-bold text-slate-900">Contact channels</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li><span className="font-semibold">WhatsApp / RFQ:</span> <a className="underline" href={site.contact.whatsappGeneralLink}>{site.contact.whatsappLocal}</a></li>
              <li><span className="font-semibold">Call:</span> <a className="underline" href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>
              <li><span className="font-semibold">Email:</span> <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
              <li><span className="font-semibold">Location:</span> Cairo, Egypt</li>
            </ul>
          </PremiumCard>
          <PremiumCard className="bg-slate-50 p-4">
            <h2 className="text-xl font-bold text-slate-900">What to prepare before contacting</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Site type (office, factory, data room, or commercial site).</li>
              <li>• Required scope (fiber, structured cabling, racks, CCTV infrastructure, testing).</li>
              <li>• Quantity estimates or product references if available.</li>
              <li>• Target timeline and contact person details.</li>
            </ul>
          </PremiumCard>
        </div>
      </SectionShell>
    </main>
  );
}
