import type { Metadata } from 'next';
import { Hero, Process, ProductsSupply, Sectors, ServicesGrid } from '@/components/Sections';

export const metadata: Metadata = { title:'HILTECH | Reliable Network Infrastructure in Egypt', description:'HILTECH delivers structured cabling, fiber optics, CCTV, data center setup, testing, and project-based supply for enterprise connectivity projects across Egypt.' };

export default function Home(){return <main><Hero /><ServicesGrid /><ProductsSupply /><Sectors /><Process /><section className="section bg-navy-800 text-white"><div className="container"><h2 className="text-3xl font-bold">Brands and product ecosystems we work with</h2><p className="mt-3">Project-based supply and infrastructure delivery are subject to availability and client confirmation.</p></div></section></main>}
