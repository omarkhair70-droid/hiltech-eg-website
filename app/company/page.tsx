import Link from 'next/link';

export default function CompanyPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-navy-900 text-white">
        <div className="container py-14 md:py-20">
          <p className="text-sm uppercase tracking-[0.14em] text-orange-200">About HILTECH</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">Network infrastructure supply and installation support for business facilities in Egypt</h1>
          <p className="mt-5 max-w-3xl text-base text-slate-100 md:text-lg">HILTECH delivers structured cabling, fiber optic infrastructure, rack and data room setup, CCTV infrastructure readiness, and testing before handover.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/rfq" className="inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Request Project Quote</Link><Link href="/contact" className="inline-flex rounded-md border border-slate-300/80 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">Contact HILTECH</Link></div>
        </div>
      </section>
      <section className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Service areas</h2><p className="mt-3 text-slate-700">HILTECH supports offices, factories, data rooms, and commercial sites with project-based infrastructure scope and delivery.</p></section>
      <section className="border-y border-slate-200 bg-white"><div className="container py-10 md:py-14"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Delivery approach</h2><ol className="mt-5 grid gap-3 md:grid-cols-2"><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">1. Site scope review and requirements alignment.</li><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">2. Product references and implementation planning.</li><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">3. Installation readiness and testing before handover.</li><li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">4. RFQ coordination and follow-up communication.</li></ol></div></section>
    </main>
  );
}
