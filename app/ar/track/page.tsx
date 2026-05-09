import type { Metadata } from 'next';
import TrackClient from '@/app/track/track-client';
import { arTrackMessages } from '@/content/ar/track';
import { site } from '@/content/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'تتبع طلب عرض السعر | HILTECH',
  description: 'تابع حالة طلب عرض السعر من HILTECH باستخدام رقم الطلب ونفس رقم الهاتف أو البريد الإلكتروني المستخدم عند الإرسال.',
  alternates: { canonical: `${site.siteUrl}/ar/track` },
};

export default async function Page({ searchParams }: { searchParams?: Promise<{ request_code?: string }> }) {
  const params = await searchParams;
  const initialRequestCode = typeof params?.request_code === 'string' ? params.request_code : '';
  return <main className="section"><div className="container max-w-3xl" dir="rtl"><div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5"><h1 className="text-2xl font-bold text-slate-900">{arTrackMessages.trackTitle}</h1><p className="mt-2 text-sm text-slate-700">{arTrackMessages.trackIntro}</p></div><TrackClient initialRequestCode={initialRequestCode} locale="ar" messages={arTrackMessages} rfqHref="/ar/rfq" contactHref="/ar/contact" /></div></main>;
}
