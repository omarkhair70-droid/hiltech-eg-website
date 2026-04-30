import type { Metadata } from 'next';
import { ServicesGrid } from '@/components/Sections';
export const metadata: Metadata={title:'Services | HILTECH Network Infrastructure Solutions',description:'Explore HILTECH services: structured cabling, fiber optics, CCTV, data center setup, testing, and maintenance for businesses across Egypt.'};
export default function Page(){return <main className="section"><div className="container"><h1 className="text-4xl font-bold">Infrastructure Services Designed for Reliable Business Operations.</h1><p className="mt-4">HILTECH provides practical, standards-driven network infrastructure services—from planning and installation to testing and long-term support.</p></div><ServicesGrid /></main>}
