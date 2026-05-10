import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About HILTECH | Network Infrastructure Delivery in Egypt',
  description: 'Learn how HILTECH delivers network infrastructure scope alignment, field execution, testing before handover, and RFQ coordination across Egypt.',
  alternates: { canonical: `${site.siteUrl}/company`, languages: { en: `${site.siteUrl}/company`, ar: `${site.siteUrl}/ar/company`, 'x-default': `${site.siteUrl}/` } },
  openGraph: { title: 'About HILTECH | Network Infrastructure Delivery in Egypt', description: 'HILTECH company profile and delivery approach for network infrastructure projects in Egypt.', url: `${site.siteUrl}/company`, images: [site.ogImage] },
};

export default function CompanyPage() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <section className="border-b border-white/10 bg-gradient-to-b from-orange-900/20 to-transparent">
        <div className="container py-14 md:py-20">
          <p className="text-sm uppercase tracking-[0.14em] text-orange-300">About HILTECH</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">Network Infrastructure Delivery for Business Facilities in Egypt</h1>
          <p className="mt-5 max-w-4xl text-base text-slate-300 md:text-lg">HILTECH supports companies with structured cabling, fiber optics, racks, data rooms, CCTV infrastructure readiness, testing, and RFQ coordination.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/rfq" className="inline-flex rounded-md bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-500">Request Project Quote</Link><a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer" className="inline-flex rounded-md border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">Download Company Profile</a><Link href="/contact" className="inline-flex rounded-md border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">Contact HILTECH</Link></div>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Who is HILTECH?</h2>
        <p className="mt-3 text-slate-300">HILTECH is an Egypt-based network infrastructure team focused on practical business delivery. We support office and facility projects that need clear scope alignment, reliable product references, and coordinated installation readiness.</p>
        <p className="mt-3 text-slate-300">Our approach is operational: define scope, align product and implementation requirements, verify testing expectations, and keep RFQ communication clear until handover milestones are complete.</p>
      </section>

      <section className="border-y border-white/10"><div className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-white md:text-3xl">What HILTECH delivers</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Structured Cabling','Fiber Optic Infrastructure','Racks & Data Rooms','Testing Before Handover'].map((item) => <article key={item} className="rounded-lg border border-white/15 bg-white/5 p-4"><h3 className="font-semibold text-slate-100">{item}</h3></article>)}</div></div></section>

      <section className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-white md:text-3xl">Service Areas</h2><ul className="mt-4 grid gap-2 text-slate-300 sm:grid-cols-2">{['Offices','Factories','Data rooms','Commercial sites','Warehouses','Schools / campuses'].map((area) => <li key={area} className="rounded-lg border border-white/15 bg-white/5 px-4 py-2">{area}</li>)}</ul></section>

      <section className="border-y border-white/10"><div className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-white md:text-3xl">Delivery Approach</h2><ol className="mt-5 grid gap-3 md:grid-cols-2"><li className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200">1. Site scope review</li><li className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200">2. Product/scope alignment</li><li className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200">3. Installation readiness</li><li className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200">4. Testing before handover</li><li className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200">5. RFQ follow-up</li></ol></div></section>

      <section className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-white md:text-3xl">Contact Confidence</h2><ul className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2"><li><span className="font-semibold text-slate-100">Call:</span> 01000087808</li><li><span className="font-semibold text-slate-100">WhatsApp / RFQ:</span> 01555357807</li><li><span className="font-semibold text-slate-100">Email:</span> info@hiltech-eg.com</li><li><span className="font-semibold text-slate-100">Location:</span> Cairo, Egypt</li></ul></section>
    </main>
  );
}
