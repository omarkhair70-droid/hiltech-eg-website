import type { Metadata } from 'next';
import { Hero, Process, ProductsSupply, Sectors, ServicesGrid } from '@/components/Sections';

export const metadata: Metadata = { title:'HILTECH | Reliable Network Infrastructure in Egypt', description:'HILTECH delivers structured cabling, fiber optics, CCTV, data center setup, testing, and project-based supply for enterprise connectivity projects across Egypt.' };

const brands = ['Leviton', 'Panduit', 'Legrand', 'Schneider Electric', 'APC', 'Hikvision', '3M', 'CommScope / SYSTIMAX', 'Premium Line', 'HPE Aruba Networking'];

export default function Home(){return <main><Hero /><ServicesGrid /><ProductsSupply /><Sectors /><Process /><section className="section bg-navy-800 text-white"><div className="container"><h2 className="text-3xl font-bold">Brands and product ecosystems we work with</h2><p className="mt-3 max-w-4xl text-slate-200">HILTECH works across recognized infrastructure, networking, power, and security product ecosystems depending on project scope, compatibility, and availability.</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{brands.map((brand)=><div key={brand} className="rounded-lg border border-slate-600 bg-navy-900/40 p-3 text-sm font-semibold">{brand}</div>)}</div><p className="mt-6 text-sm text-slate-300">Brand references are shown to describe product ecosystems and technologies that may be used or supplied in project delivery. They do not imply formal partnership unless explicitly stated.</p></div></section></main>}
