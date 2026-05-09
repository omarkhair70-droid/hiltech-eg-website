import type { Metadata } from 'next';
import { site } from '@/content/site';
import TrackClient from './track-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Track Your RFQ | HILTECH',
  description: 'Track the current status of your RFQ request using your request reference and contact details.',
  alternates: { canonical: `${site.siteUrl}/track`, languages: { en: `${site.siteUrl}/track`, ar: `${site.siteUrl}/ar/track`, 'x-default': `${site.siteUrl}/` } },
};

interface TrackPageProps {
  searchParams?: Promise<{ request_code?: string }>;
}

export default async function TrackPage({ searchParams }: TrackPageProps) {
  const params = await searchParams;
  const initialRequestCode = typeof params?.request_code === 'string' ? params.request_code : '';

  return <main className="section"><div className="container max-w-3xl"><div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Customer tracking</p><h1 className="mt-2 text-2xl font-bold text-slate-900">Track Your RFQ</h1><p className="mt-2 text-sm text-slate-700">Enter your RFQ reference and the same phone or email used during submission.</p><p className="mt-2 text-sm text-slate-700" dir="rtl">أدخل رقم RFQ ونفس رقم الهاتف أو البريد المستخدم وقت الإرسال.</p></div><TrackClient initialRequestCode={initialRequestCode} /></div></main>;
}
