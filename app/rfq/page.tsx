import type { Metadata } from 'next';
import { site } from '@/content/site';
import RFQReviewClient from './rfq-review-client';

export const metadata: Metadata = {
  title: 'Review Your RFQ Request | HILTECH',
  description: 'Review your RFQ basket, add project details, and send a structured WhatsApp request for availability and quotation.',
  alternates: { canonical: `${site.siteUrl}/rfq` },
  openGraph: { title: 'Review Your RFQ Request | HILTECH', description: 'Enterprise RFQ review flow for products, quantities, notes, and quotation requests.', url: `${site.siteUrl}/rfq`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function RFQPage() {
  return <main className="section"><div className="container"><div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">RFQ workflow</p><p className="mt-2 text-sm text-slate-700">Review selected items, add project details, then send your RFQ to HILTECH. Not sure what to include? Start the Scope Finder first.</p></div><p className="mb-4 text-sm text-slate-700">Not sure what your project needs? <a className="font-semibold text-navy-900 underline" href="/scope-finder">Start Scope Finder</a>.</p><RFQReviewClient /></div><p className="container mt-2 text-sm text-slate-600">Need help preparing your request? <a className="font-semibold text-navy-900 underline" href="/resources/rfq-guide">Review the RFQ Preparation Guide</a>.</p></main>;
}
