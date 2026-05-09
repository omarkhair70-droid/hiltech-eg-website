import type { Metadata } from 'next';
import { arRFQMessages } from '@/content/ar/rfq';
import { site } from '@/content/site';
import RFQReviewClient from '@/app/rfq/rfq-review-client';

export const metadata: Metadata = {
  title: 'طلب عرض سعر | HILTECH',
  description: 'أرسل طلب عرض سعر منظم لمنتجات أو أعمال الشبكات والفايبر والراك، وتابع حالة الطلب لاحقًا برقم المرجع.',
  alternates: { canonical: `${site.siteUrl}/ar/rfq`, languages: { en: `${site.siteUrl}/rfq`, ar: `${site.siteUrl}/ar/rfq`, 'x-default': `${site.siteUrl}/` } },
};

export default function ArabicRFQPage() {
  return (
    <main className="section bg-slate-950" dir="rtl">
      <div className="container">
        <RFQReviewClient locale="ar" messages={arRFQMessages} productsHref="/ar/products-partners" trackHrefBase="/ar/track" contactHref="/ar/contact" />
      </div>
    </main>
  );
}
