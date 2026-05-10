import type { Metadata } from 'next';
import TrackClient from '@/app/track/track-client';
import { arTrackMessages } from '@/content/ar/track';
import { site } from '@/content/site';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'تتبع طلب عرض السعر | HILTECH',
  description: 'تابع حالة طلب عرض السعر من HILTECH باستخدام رقم الطلب ونفس رقم الهاتف أو البريد الإلكتروني المستخدم عند الإرسال.',
  alternates: { canonical: `${site.siteUrl}/ar/track`, languages: { en: `${site.siteUrl}/track`, ar: `${site.siteUrl}/ar/track`, 'x-default': `${site.siteUrl}/` } },
};

export default async function Page({ searchParams }: { searchParams?: Promise<{ request_code?: string }> }) {
  const params = await searchParams;
  const initialRequestCode = typeof params?.request_code === 'string' ? params.request_code : '';
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen" dir="rtl">
      <section className="py-16">
        <div className="container max-w-3xl space-y-8">
          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-white">{arTrackMessages.trackTitle}</h1>
            <p className="text-slate-300">{arTrackMessages.trackIntro}</p>
          </div>
          <TrackClient initialRequestCode={initialRequestCode} locale="ar" messages={arTrackMessages} rfqHref="/ar/rfq" contactHref="/ar/contact" />
        </div>
      </section>
    </main>
  );
}

