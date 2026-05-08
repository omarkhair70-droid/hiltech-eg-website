import type { Metadata } from 'next';
import { site } from '@/content/site';
import TrackClient from './track-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'Track Your RFQ Request | HILTECH', description: 'Track the status of your RFQ request.', robots: { index: false, follow: false }, alternates: { canonical: `${site.siteUrl}/track` } };

export default async function TrackPage({ searchParams }: { searchParams?: Promise<{ request_code?: string }> }) {
  const params = await searchParams;
  const initialRequestCode = typeof params?.request_code === 'string' ? params.request_code : '';
  return <main className='section'><div className='container max-w-3xl'><section className='rounded-2xl border border-slate-200 bg-white p-5'><p className='text-xs font-semibold uppercase tracking-wide text-orange-600'>RFQ utility</p><h1 className='mt-1 text-2xl font-bold text-slate-900'>Track RFQ Request</h1><p className='mt-2 text-sm text-slate-600'>Enter RFQ reference and the same contact used at submission.</p></section><div className='mt-5'><TrackClient initialRequestCode={initialRequestCode} /></div></div></main>;
}
