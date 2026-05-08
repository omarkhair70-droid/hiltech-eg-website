import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/ui/primitives';
import { site } from '@/content/site';

export const metadata: Metadata = { title: 'Field Work & References | HILTECH', description: 'Selected field visuals, testing workflows, and references from HILTECH delivery.', alternates: { canonical: `${site.siteUrl}/work` } };

type Discipline = { key:string; title:string; intro:string; lead:{src:string;alt:string}; support:{src:string;alt:string}[] };
const disciplines:Discipline[] = [
{ key:'fiber', title:'Fiber', intro:'Backbone routing, termination, and clean panel delivery.', lead:{src:'/fiber-distribution-panel.jpg',alt:'Fiber distribution panel with organized termination points.'}, support:[{src:'/fiber-cable-closeup.jpg',alt:'Fiber optic cable closeup.'},{src:'/fiber-termination-box.jpg',alt:'Fiber termination box.'}]},
{ key:'rack', title:'Rack / Data Room', intro:'Rack readiness with cable discipline and maintainable patching.', lead:{src:'/rack-data-room.jpg',alt:'Data room rack layout.'}, support:[{src:'/rack-front-cabling.jpg',alt:'Rack front cabling.'},{src:'/rack-yellow-patching.jpg',alt:'Rack yellow patching.'}]},
{ key:'copper', title:'Copper / Cabling', intro:'Structured copper routing for floor, riser, and patch panels.', lead:{src:'/copper-patch-panel.jpg',alt:'Copper patch panel.'}, support:[{src:'/copper-cable-tray.jpg',alt:'Copper cable tray.'},{src:'/copper-ceiling-routing.jpg',alt:'Copper ceiling routing.'}]},
{ key:'testing', title:'Testing / Validation', intro:'Validation tools used before handover and acceptance.', lead:{src:'/testing-otdr-device.jpg',alt:'OTDR testing device.'}, support:[{src:'/testing-fluke-meter.jpg',alt:'Fluke meter.'},{src:'/testing-power-meter.jpg',alt:'Power meter.'}]},
];

export default async function Page(){
 const hasRefs = await Promise.all([
  fs.access(path.join(process.cwd(),'public/references-partners-panel.jpg')).then(()=>true).catch(()=>false),
  fs.access(path.join(process.cwd(),'public/references-clients-panel.jpg')).then(()=>true).catch(()=>false),
 ]).then(([a,b])=>a&&b);
 return <main><SectionShell>
 <section className="rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 p-6 text-white md:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Proof spine</p><h1 className="mt-2 text-3xl font-bold md:text-5xl">Field Work & References</h1><p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">Real delivery snapshots across fiber, rack rooms, copper pathways, and testing validation.</p></section>
 <div className="mt-8 space-y-8">{disciplines.map((d)=><section key={d.key} className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6"><div className="mb-4 flex items-end justify-between gap-3"><div><h2 className="text-xl font-bold text-slate-900">{d.title}</h2><p className="text-sm text-slate-600">{d.intro}</p></div></div><div className="grid gap-3 md:grid-cols-3"><figure className="md:col-span-2 overflow-hidden rounded-xl"><div className="relative aspect-[16/10]"><Image src={d.lead.src} alt={d.lead.alt} fill className="object-cover"/></div></figure>{d.support.map((s)=><figure key={s.src} className="overflow-hidden rounded-xl border border-slate-200"><div className="relative aspect-[16/10]"><Image src={s.src} alt={s.alt} fill className="object-cover"/></div></figure>)}</div></section>)}</div>
 {hasRefs && <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5"><h2 className="text-lg font-bold text-slate-900">References</h2><div className="mt-4 grid gap-4 md:grid-cols-2"><div className="relative aspect-[16/10] rounded-xl border bg-white"><Image src="/references-partners-panel.jpg" alt="Partners panel" fill className="object-contain p-3"/></div><div className="relative aspect-[16/10] rounded-xl border bg-white"><Image src="/references-clients-panel.jpg" alt="Clients panel" fill className="object-contain p-3"/></div></div></section>}
 <section className="mt-8 flex flex-wrap gap-2"><Link href="/products-partners" className="btn-primary">Browse Products</Link><Link href="/rfq" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">Start RFQ</Link></section>
 </SectionShell></main>
}
