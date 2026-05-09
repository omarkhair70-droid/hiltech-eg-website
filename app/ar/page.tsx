import type { Metadata } from 'next';
import Link from 'next/link';
import { arPublicCopy } from '@/content/ar/public-copy';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | حلول الشبكات والفايبر وطلبات عروض الأسعار في مصر',
  description: 'توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات في مصر، مع طلب عرض سعر وتتبع حالة الطلب.',
  alternates: { canonical: `${site.siteUrl}/ar`, languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` } },
};

const productCategories = ['كابلات الشبكات', 'الفايبر وملحقاته', 'الراك وغرف البيانات', 'الباتش بانل وODF', 'أدوات الاختبار والتنظيم'];
const whyHiltech = ['طلب عرض سعر منظم', 'تنفيذ ميداني عملي', 'متابعة واضحة', 'اختيار مكونات مناسبة للمشروع'];

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
        <h2 className="text-2xl font-bold text-navy-900">أعمال ميدانية من HILTECH</h2>
        <p className="mt-4 text-slate-700">صور حقيقية معتمدة من أعمال HILTECH في تجهيز وتنفيذ البنية التحتية للشبكات، مع التركيز على التنظيم، جودة التوصيلات، وتجهيز المواقع للتشغيل.</p>
        <Link href="/ar/work" className="mt-5 inline-flex text-sm font-semibold text-orange-600 underline">شاهد أعمالنا</Link>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">تصنيفات المنتجات والحلول</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((item) => <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">{item}</div>)}
        </div>
        <Link href="/ar/products-partners" className="mt-5 inline-flex text-sm font-semibold text-orange-600 underline">تصفح المنتجات</Link>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">لماذا تختار HILTECH؟</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {whyHiltech.map((item) => <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">{item}</div>)}
        </div>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">مراجع المنتجات والسياق الفني</h2>
        <p className="mt-4 text-slate-700">تُعرض مراجع المنتجات لأغراض الكتالوج والسياق الفني فقط، ولا تعني شراكة رسمية إلا إذا تم ذكر ذلك صراحة.</p>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">جاهز لمناقشة مشروعك؟</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <a href={site.contact.whatsappGeneralLink} className="btn-secondary">واتساب / طلب عرض سعر</a>
          <a href={`mailto:${site.contact.email}`} className="btn-secondary" dir="ltr">{site.contact.email}</a>
          <Link href="/ar/track" className="btn-secondary">تتبع طلب عرض السعر</Link>
          <a href="/hiltech-company-profile.pdf" className="btn-secondary">تحميل ملف الشركة</a>
        </div>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">ابدأ طلب عرض السعر الآن</h2>
        <p className="mt-4 text-slate-700">أضف المنتجات أو اكتب نطاق العمل، وسيقوم فريق HILTECH بمراجعة الطلب والتواصل معك للخطوة التالية.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/ar/rfq" className="btn-primary">اطلب عرض سعر</Link>
          <Link href="/ar/track" className="btn-secondary">تتبع طلب العرض</Link>
          <Link href="/ar/contact" className="btn-secondary">تواصل معنا</Link>
        </div>
      </section>
    </main>
  );
}
