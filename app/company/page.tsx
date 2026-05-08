import Image from 'next/image';
import Link from 'next/link';

const supportList = [
  'Contractors needing product and scope coordination',
  'IT teams preparing network infrastructure',
  'Business facilities planning cabling, racks, CCTV, or testing',
  'Procurement teams requesting availability and quotation',
];

const processSteps = ['Project Supply', 'Infrastructure Readiness', 'Testing Support'] as const;

export default function CompanyPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-navy-900 text-white">
        <div className="container py-14 md:py-20">
          <p className="text-sm uppercase tracking-[0.14em] text-orange-200">Hiltech Network System - H.N.S</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">Infrastructure delivery support for business network projects in Egypt</h1>
          <p className="mt-5 max-w-3xl text-base text-slate-100 md:text-lg">HILTECH supports structured cabling, fiber, racks, data room readiness, CCTV connectivity, testing workflows, and project supply coordination.</p>
          <p className="mt-3 text-sm text-slate-200" dir="rtl">حلول بنية تحتية للشبكات للمشروعات والمنشآت التجارية داخل مصر.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/work" className="inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">View Field Work</Link>
            <Link href="/products-partners" className="inline-flex rounded-md border border-slate-300/80 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">Browse Products</Link>
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Who HILTECH Supports</h2>
        <ul className="mt-4 space-y-2">
          {supportList.map((item) => (
            <li key={item} className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 md:text-base">{item}</li>
          ))}
        </ul>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container py-10 md:py-14">
          <h2 className="text-2xl font-bold text-navy-900 md:text-3xl">How HILTECH Works</h2>
          <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="mr-2 text-orange-500">01</span>Scope</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="mr-2 text-orange-500">02</span>Product selection</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="mr-2 text-orange-500">03</span>Supply coordination</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="mr-2 text-orange-500">04</span>Installation readiness</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="mr-2 text-orange-500">05</span>Testing / validation support</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="mr-2 text-orange-500">06</span>RFQ / handover communication</li>
          </ol>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Delivery Model</h2>
        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
          <ol className="grid gap-2 md:grid-cols-3 md:items-center">
            {processSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">{index + 1}</span>
                <span>{step}</span>
                {index < processSteps.length - 1 ? <span className="ml-auto hidden text-slate-400 md:inline">→</span> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container py-10 md:py-14">
          <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1.15fr_1fr] md:items-center md:p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 bg-white">
              <Image src="/field-execution-technician.jpg" alt="Field execution team working on network infrastructure routing and installation readiness." fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Field Proof</p>
              <h2 className="mt-1.5 text-xl font-bold text-navy-900">Real site execution context for infrastructure delivery.</h2>
              <p className="mt-2 text-sm text-slate-700">Review field snapshots that show routing discipline, installation execution, and handover readiness.</p>
              <Link href="/work" className="mt-4 inline-flex rounded-md border border-navy-900 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white">View Field Work</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <h2 className="text-xl font-bold text-navy-900 md:text-2xl">Company Resources</h2>
        <div className="mt-3 flex flex-wrap gap-2.5">
          <Link href="/resources" className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">Resources Hub</Link>
          <Link href="/track" className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">Track RFQ</Link>
          <Link href="/contact" className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">Contact HILTECH</Link>
        </div>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="container py-12 md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to define your project scope?</h2>
          <p className="mt-3 max-w-2xl text-slate-200">Start with products, review field proof, then send your requirements for quotation and availability review.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/rfq" className="inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Send Project Requirements</Link>
            <Link href="/contact" className="inline-flex text-sm font-semibold text-orange-200 hover:text-orange-100">Contact HILTECH</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
