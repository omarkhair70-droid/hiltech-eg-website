import type { Metadata } from 'next';
import { site } from '@/content/site';
import RFQReviewClient from './rfq-review-client';

export const metadata: Metadata = {
  title: 'Review Your RFQ Request | HILTECH',
  description: 'Review your RFQ basket, add project details, and send a structured WhatsApp request for availability and quotation.',
  alternates: { canonical: '/rfq' },
  openGraph: { title: 'Review Your RFQ Request | HILTECH', description: 'Enterprise RFQ review flow for products, quantities, notes, and quotation requests.', url: `${site.siteUrl}/rfq`, images: [site.ogImage] },
};

export default function RFQPage() { return <main className="section"><div className="container"><RFQReviewClient /></div></main>; }
