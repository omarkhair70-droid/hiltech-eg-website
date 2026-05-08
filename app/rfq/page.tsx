import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';
import RFQReviewClient from './rfq-review-client';

export const metadata: Metadata = { title: 'Review Your RFQ Request | HILTECH', description: 'Review your RFQ basket, add project details, and send a structured request.', alternates: { canonical: `${site.siteUrl}/rfq` } };

export default function RFQPage() {
  return <main className='section'><div className='container'><section className='rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 p-5 text-white md:p-7'><p className='text-xs uppercase tracking-[0.2em] text-orange-300 font-semibold'>RFQ workflow</p><h1 className='mt-2 text-3xl font-bold'>Review and Submit RFQ</h1><p className='mt-2 text-sm text-slate-200'>Confirm items, add site details, and submit one structured request.</p></section><div className='mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700'>Need scope help first? <Link href='/scope-finder' className='font-semibold text-navy-900 underline'>Start Scope Finder</Link>.</div><div className='mt-5'><RFQReviewClient /></div><p className='mt-4 text-sm text-slate-600'>Preparation checklist: <Link href='/resources/rfq-guide' className='font-semibold text-navy-900 underline'>RFQ Guide</Link>.</p></div></main>;
}
