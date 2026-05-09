import type { Metadata } from 'next';
import { site } from '@/content/site';
import RFQReviewClient from './rfq-review-client';

export const metadata: Metadata = {
  title: 'Request Project Quote | HILTECH Network Infrastructure',
  description: 'Review your RFQ basket, add project details, and send a structured WhatsApp request for availability and quotation.',
  alternates: { canonical: `${site.siteUrl}/rfq`, languages: { en: `${site.siteUrl}/rfq`, ar: `${site.siteUrl}/ar/rfq`, 'x-default': `${site.siteUrl}/` } },
  openGraph: { title: 'Request Project Quote | HILTECH Network Infrastructure', description: 'Enterprise RFQ review flow for products, quantities, notes, and quotation requests.', url: `${site.siteUrl}/rfq`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function RFQPage() {
  return (
    <main className="section">
      <div className="container">
        <RFQReviewClient />
      </div>
    </main>
  );
}
