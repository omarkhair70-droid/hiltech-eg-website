import type { Metadata } from 'next';
import { ReferenceLogosSection } from '@/components/ReferenceLogos';
import { FieldWorkPreview, FinalCTA, Hero, ProductsRFQPreview, SolutionsPreview, TrustPreview, WhatHiltechDoes } from '@/components/Sections';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | Enterprise Network Infrastructure & Project Supply in Egypt',
  description:
    'Premium network infrastructure delivery in Egypt: structured cabling, fiber optics, data room infrastructure, CCTV connectivity, and project supply support.',
  alternates: { canonical: `${site.siteUrl}/` },
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
      <WhatHiltechDoes />
      <FieldWorkPreview />
      <ReferenceLogosSection />
      <SolutionsPreview />
      <ProductsRFQPreview />
      <TrustPreview />
      <FinalCTA />
    </main>
  );
}
