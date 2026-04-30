import type { Metadata } from 'next';
import { ServicesGrid } from '@/components/Sections';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services | Enterprise Infrastructure Delivery in Egypt',
  description:
    'Structured cabling, fiber optics, data room infrastructure, CCTV connectivity, testing, and support services for enterprise environments in Egypt.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'HILTECH Services | Enterprise Infrastructure Delivery',
    description:
      'Enterprise infrastructure services across network cabling, fiber optics, data room readiness, CCTV connectivity, and validation workflows in Egypt.',
    url: `${site.siteUrl}/services`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function Page() {
  return <main className="section"><div className="container"><h1 className="text-3xl font-bold leading-tight sm:text-4xl">Infrastructure Services Designed for Reliable Business Operations.</h1><p className="mt-3 text-slate-700">HILTECH provides practical, standards-driven network infrastructure services—from planning and installation to testing and long-term support.</p></div><ServicesGrid /></main>;
}
