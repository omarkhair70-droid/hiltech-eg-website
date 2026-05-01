import type { Metadata } from 'next';
import ScopeFinderClient from './ScopeFinderClient';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Smart Project Scope Finder | HILTECH',
  description:
    'Answer a few project questions and get a preliminary infrastructure scope direction for cabling, fiber, data rooms, CCTV, testing, and project supply.',
  alternates: { canonical: `${site.siteUrl}/scope-finder` },
  openGraph: { title: 'Smart Project Scope Finder | HILTECH', description: 'Answer a few project questions and get a preliminary infrastructure scope direction for cabling, fiber, data rooms, CCTV, testing, and project supply.', url: `${site.siteUrl}/scope-finder`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function ScopeFinderPage() {
  return <main className="section"><div className="container"><ScopeFinderClient /></div></main>;
}
