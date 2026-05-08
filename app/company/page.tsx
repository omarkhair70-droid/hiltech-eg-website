import Link from 'next/link';

const supportList = [
  'Contractors needing product and scope coordination',
  'IT teams preparing network infrastructure',
  'Business facilities planning cabling, racks, CCTV, or testing',
  'Procurement teams requesting availability and quotation',
];

const processSteps = ['Scope', 'Product selection', 'Supply coordination', 'Installation readiness', 'Testing / validation support', 'RFQ / handover communication'];

const deliveryModel = [
  { title: 'Project Supply', copy: 'Coordinate availability, compatibility, and quotation inputs for network infrastructure line items.' },
  { title: 'Infrastructure Readiness', copy: 'Support structured cabling, fiber, rack, and data room preparation requirements before implementation.' },
  { title: 'Testing Support', copy: 'Align testing workflow expectations for validation, reporting, and delivery communication.' },
];

export default function CompanyPage() {
  return (
    <main className="bg-slate-50">
      <section className="bg-navy-900 text-white"><div className="container py-14 md:py-20"><p className="text-sm uppercase tracking-[0.14em] text-orange-200">Hiltech Network System - H.N.S</p><h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">Infrastructure delivery support for business network projects in Egypt</h1><p className="mt-5 max-w-3xl text-base text-slate-100 md:text-lg">HILTECH supports structured cabling, fiber, racks, data room readiness, CCTV connectivity, testing workflows, and project supply coordination.</p><p className="mt-3 text-sm text-slate-200" dir="rtl">حلول بنية تحتية للشبكات للمشروعات والمنشآت التجارية داخل مصر.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/work" className="inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">View Field Work</Link><Link href="/products-partners" className="inline-flex rounded-md border border-slate-300/80 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10">Browse Products</Link></div></div></section>
      <section className="container py-12 md:py-16"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Who HILTECH Supports</h2><ul className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">{supportList.map((item) => (<li key={item} className="px-5 py-4 text-sm font-medium text-slate-700 md:text-base">{item}</li>))}</ul></section>
      <section className="border-y border-slate-200 bg-white"><div className="container py-12 md:py-16"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">How HILTECH Works</h2><ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{processSteps.map((step, index) => (<li key={step} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"><span className="mr-2 text-orange-500">0{index + 1}</span>{step}</li>))}</ol></div></section>
      <section className="container py-12 md:py-16"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Delivery Model</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{deliveryModel.map((item) => (<article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5"><h3 className="text-lg font-semibold text-navy-900">{item.title}</h3><p className="mt-2 text-sm text-slate-700">{item.copy}</p></article>))}</div></section>
      <section className="border-y border-slate-200 bg-white"><div className="container py-12 md:py-16"><div className="rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Field Proof</p><h2 className="mt-2 text-2xl font-bold text-navy-900">Review field delivery references and implementation outcomes.</h2><p className="mt-3 max-w-2xl text-sm text-slate-700">Explore completed site snapshots and execution context to validate scope readiness before your RFQ submission.</p><Link href="/work" className="mt-5 inline-flex rounded-md border border-navy-900 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white">View Field Work</Link></div></div></section>
      <section className="container py-12 md:py-16"><h2 className="text-2xl font-bold text-navy-900 md:text-3xl">Company Resources</h2><div className="mt-5 flex flex-wrap gap-3"><Link href="/resources" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">Resources Hub</Link><Link href="/track" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">Track RFQ</Link><Link href="/contact" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">Contact HILTECH</Link><Link href="/resources/company-profile" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">Company Profile</Link></div></section>
      <section className="bg-navy-900 text-white"><div className="container py-12 md:py-16"><h2 className="text-2xl font-bold md:text-3xl">Ready to define your project scope?</h2><p className="mt-3 max-w-2xl text-slate-200">Start with products, review field proof, then send your requirements for quotation and availability review.</p><div className="mt-6 flex flex-wrap items-center gap-3"><Link href="/rfq" className="inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Send Project Requirements</Link><Link href="/contact" className="inline-flex text-sm font-semibold text-orange-200 hover:text-orange-100">Contact HILTECH</Link></div></div></section>
    </main>
  );
}
