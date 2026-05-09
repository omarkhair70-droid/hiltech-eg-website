import type { Metadata } from 'next';
import Link from 'next/link';
import { arPublicCopy } from '@/content/ar/public-copy';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | حلول الشبكات والفايبر وطلبات عروض الأسعار في مصر',
  description: 'توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات في مصر، مع طلب عرض سعر وتتبع حالة الطلب.',
  alternates: { canonical: `${site.siteUrl}/ar`, languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` } },
};

export default function ArabicHomePage() {
  return (
    <main className="container section space-y-10">
      <section className="public-card p-6 md:p-10">
        <p className="public-eyebrow text-orange-600">{arPublicCopy.heroEyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">{arPublicCopy.heroTitle}</h1>
        <p className="public-copy mt-4">{arPublicCopy.heroSubtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/ar/rfq" className="btn-primary">{arPublicCopy.primaryCta}</Link>
          <Link href="/ar/work" className="btn-secondary">{arPublicCopy.secondaryCta}</Link>
          <Link href="/ar/track" className="btn-secondary">{arPublicCopy.trackLink}</Link>
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-5">
        {arPublicCopy.trustStrip.map((item) => <div key={item} className="public-card p-4 text-sm font-semibold">{item}</div>)}
      </section>
      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">{arPublicCopy.deliversTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pe-5 text-slate-700">
          {arPublicCopy.delivers.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">{arPublicCopy.rfqProcessTitle}</h2>
        <ol className="mt-4 list-decimal space-y-2 pe-5 text-slate-700">
          {arPublicCopy.rfqSteps.map((item) => <li key={item}>{item}</li>)}
        </ol>
        <Link href="/ar/products-partners" className="mt-5 inline-flex text-sm font-semibold text-orange-600 underline">{arPublicCopy.secondaryCta}</Link>
      </section>
    </main>
  );
}
