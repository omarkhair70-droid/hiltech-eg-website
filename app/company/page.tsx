import Link from 'next/link';

export default function CompanyPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-navy-900 text-white">
        <div className="container py-14 md:py-20">
          <p className="text-sm uppercase tracking-[0.14em] text-orange-200">About HILTECH</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">Network Infrastructure Delivery for Business Facilities in Egypt</h1>
          <p className="mt-5 max-w-4xl text-base text-slate-100 md:text-lg">HILTECH supports companies with structured cabling, fiber optics, racks, data rooms, CCTV infrastructure readiness, testing, and RFQ coordination.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/rfq" className="inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Request Project Quote</Link><Link href="/contact" className="inline-flex rounded-md border border-slate-300/80 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">Contact HILTECH</Link></div>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Who is HILTECH?</h2>
        <p className="mt-3 text-slate-700">HILTECH is an Egypt-based network infrastructure team focused on practical business delivery. We support office and facility projects that need clear scope alignment, reliable product references, and coordinated installation readiness.</p>
        <p className="mt-3 text-slate-700">Our approach is operational: define scope, align product and implementation requirements, verify testing expectations, and keep RFQ communication clear until handover milestones are complete.</p>
      </section>

      <section className="border-y border-slate-200 bg-white"><div className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">What HILTECH delivers</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Structured Cabling','Fiber Optic Infrastructure','Racks & Data Rooms','Testing Before Handover'].map((item) => <article key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4"><h3 className="font-semibold text-slate-900">{item}</h3></article>)}</div></div></section>

      <section className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Service Areas</h2><ul className="mt-4 grid gap-2 text-slate-700 sm:grid-cols-2">{['Offices','Factories','Data rooms','Commercial sites','Warehouses','Schools / campuses'].map((area) => <li key={area} className="rounded-lg border border-slate-200 bg-white px-4 py-2">{area}</li>)}</ul></section>

      <section className="border-y border-slate-200 bg-white"><div className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Delivery Approach</h2><ol className="mt-5 grid gap-3 md:grid-cols-2"><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">1. Site scope review</li><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">2. Product/scope alignment</li><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">3. Installation readiness</li><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">4. Testing before handover</li><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">5. RFQ follow-up</li></ol></div></section>

      <section className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Contact Confidence</h2><ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2"><li><span className="font-semibold">Call:</span> 01000087808</li><li><span className="font-semibold">WhatsApp / RFQ:</span> 01555357807</li><li><span className="font-semibold">Email:</span> info@hiltech-eg.com</li><li><span className="font-semibold">Location:</span> Cairo, Egypt</li></ul></section>
    </main>
  );
}
