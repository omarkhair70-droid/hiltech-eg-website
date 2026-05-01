import type { Metadata } from 'next';
import { site } from '@/content/site';
import TrackClient from './track-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Track Your RFQ Request | HILTECH',
  description: 'Track the current status of your RFQ request using your request reference and contact details.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${site.siteUrl}/track` },
};

export default function TrackPage() {
  return <main className="section"><div className="container max-w-3xl"><div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Customer tracking</p><h1 className="mt-2 text-2xl font-bold text-slate-900">Track Your RFQ Request</h1><p className="mt-2 text-sm text-slate-700">Enter your RFQ reference and the same phone/email used during submission.</p></div><TrackClient /></div></main>;
}
