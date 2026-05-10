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

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <section className="py-16">
        <div className="container max-w-3xl space-y-8">
          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Customer Tracking</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white">Track Your RFQ</h1>
            <p className="text-slate-300">Enter your RFQ reference and the same phone or email used during submission.</p>
            <p className="text-slate-300 text-sm" dir="rtl">أدخل رقم RFQ ونفس رقم الهاتف أو البريد المستخدم وقت الإرسال.</p>
          </div>
          <TrackClient initialRequestCode={initialRequestCode} />
        </div>
      </section>
    </main>
  );
}

