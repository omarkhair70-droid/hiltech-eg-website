import type { Metadata } from 'next';
import { Hero, Process, Sectors, ServicesGrid } from '@/components/Sections';

export const metadata: Metadata = { title:'HILTECH | Reliable Network Infrastructure in Egypt', description:'HILTECH delivers structured cabling, fiber optics, CCTV, data center setup, testing, and maintenance for businesses across Egypt. Request a quote today.' };

export default function Home(){return <main><Hero /><ServicesGrid /><Sectors /><Process /><section className="section bg-navy-800 text-white"><div className="container"><h2 className="text-3xl font-bold">Brands and product ecosystems we work with</h2><p className="mt-3">Brand references indicate technologies used in delivery and do not imply formal partnership unless explicitly stated.</p></div></section></main>}
