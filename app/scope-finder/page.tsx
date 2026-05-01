import type { Metadata } from 'next';
import ScopeFinderClient from './ScopeFinderClient';

export const metadata: Metadata = {
  title: 'Smart Project Scope Finder | HILTECH',
  description:
    'Answer a few project questions and get a preliminary infrastructure scope direction for cabling, fiber, data rooms, CCTV, testing, and project supply.',
  alternates: { canonical: 'https://hiltech-eg.com/scope-finder' },
  openGraph: { title: 'Smart Project Scope Finder | HILTECH', description: 'Answer a few project questions and get a preliminary infrastructure scope direction for cabling, fiber, data rooms, CCTV, testing, and project supply.', url: 'https://hiltech-eg.com/scope-finder', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
};

export default function ScopeFinderPage() {
  return <main className="section"><div className="container"><ScopeFinderClient /></div></main>;
}
