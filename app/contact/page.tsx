import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact HILTECH | RFQ, WhatsApp & Network Infrastructure Support',
  description: 'Request quotations for structured cabling, fiber optics, data room infrastructure, CCTV connectivity, testing, and project supply in Egypt.',
  alternates: {
    canonical: `${site.siteUrl}/contact`,
    languages: { en: `${site.siteUrl}/contact`, ar: `${site.siteUrl}/ar/contact`, 'x-default': `${site.siteUrl}/` },
  },
};

export default function Page() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white text-balance">Contact HILTECH</h1>
            <p className="mt-4 text-slate-300 max-w-2xl">Request a project quote for structured cabling, fiber optics, data room infrastructure, CCTV connectivity, and testing.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
              Request Project Quote
            </Link>
            <a href={site.contact.whatsappGeneralLink} className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/30 hover:bg-white/10 rounded-md transition-colors">
              Contact via WhatsApp
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-12">
            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">Contact Channels</h2>
              <ul className="space-y-4">
                <li>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">WhatsApp & RFQ</p>
                  <a href={site.contact.whatsappGeneralLink} className="text-slate-300 hover:text-orange-300 transition-colors font-semibold">
                    {site.contact.whatsappLocal}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">Phone</p>
                  <a href={`tel:${site.contact.phone}`} className="text-slate-300 hover:text-orange-300 transition-colors font-semibold">
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">Email</p>
                  <a href={`mailto:${site.contact.email}`} className="text-slate-300 hover:text-orange-300 transition-colors font-semibold">
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">Location</p>
                  <p className="text-slate-300 font-semibold">Cairo, Egypt</p>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">Prepare Before Contacting</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-300 text-sm"><span className="font-semibold">Site type:</span> Office, factory, data room, or commercial facility</span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-300 text-sm"><span className="font-semibold">Scope:</span> Fiber, structured cabling, racks, CCTV infrastructure, testing</span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-300 text-sm"><span className="font-semibold">Quantities:</span> Estimates or product references if available</span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-300 text-sm"><span className="font-semibold">Timeline:</span> Target project date and primary contact details</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

