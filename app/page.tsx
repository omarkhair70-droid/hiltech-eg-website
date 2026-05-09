import type { Metadata } from 'next';
import {
  FinalCTA,
  Hero,
  ProductEntrySection,
  ProjectScopeSection,
  TrustStrip,
  WorkProofSection,
} from '@/components/Sections';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | Network Infrastructure, Fiber Optics & RFQ in Egypt',
  description:
    'HILTECH supports network infrastructure delivery in Egypt with fiber optics, structured cabling, data room readiness, testing before handover, and RFQ coordination.',
  alternates: {
    canonical: `${site.siteUrl}/`,
    languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` },
  },
  openGraph: {
    title: 'HILTECH | Enterprise Network Infrastructure & Project Supply',
    description:
      'Reliable network infrastructure, data room delivery, CCTV connectivity, testing workflows, and project-based supply for business facilities in Egypt.',
    url: site.siteUrl,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default async function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <ProjectScopeSection />
      <ProductEntrySection />
      <WorkProofSection />
      <FinalCTA />
    </main>
  );
}
