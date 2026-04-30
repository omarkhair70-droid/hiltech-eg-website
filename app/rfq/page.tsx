import type { Metadata } from 'next';
import { RFQFlowDiagram, TechnicalDiagramPanel } from '@/components/diagrams';
import { site } from '@/content/site';
import RFQReviewClient from './rfq-review-client';

export const metadata: Metadata = {
  title: 'Review Your RFQ Request | HILTECH',
  description: 'Review your RFQ basket, add project details, and send a structured WhatsApp request for availability and quotation.',
  alternates: { canonical: '/rfq' },
  openGraph: { title: 'Review Your RFQ Request | HILTECH', description: 'Enterprise RFQ review flow for products, quantities, notes, and quotation requests.', url: `${site.siteUrl}/rfq`, images: [site.ogImage] },
};

export default function RFQPage() {
  return <main className="section"><div className="container"><div className="mb-6"><TechnicalDiagramPanel title="Procurement Workflow Visual" subtitle="Select products → add quantities and notes → review request → send to HILTECH for confirmation." labels={["Product Selection", "RFQ Basket", "Review", "WhatsApp Submission"]} note="Conceptual workflow visual to support request quality."><RFQFlowDiagram /></TechnicalDiagramPanel></div><RFQReviewClient /></div><p className="container mt-2 text-sm text-slate-600">Need help preparing your request? <a className="font-semibold text-navy-900 underline" href="/resources/rfq-guide">Review the RFQ Preparation Guide</a>.</p></main>;
}
