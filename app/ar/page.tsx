import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | حلول الشبكات والفايبر وطلبات عروض الأسعار في مصر',
  description: 'توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات في مصر، مع طلب عرض سعر وتتبع حالة الطلب.',
  alternates: { canonical: `${site.siteUrl}/ar`, languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` } },
};

const trustStrip = ['تنفيذ داخل مصر', 'فايبر • راك • كابلات شبكات', 'اختبار قبل التسليم', 'تتبع طلبات عروض الأسعار', 'متابعة عبر واتساب'];

const deliverables = [
  ['كابلات الشبكات المنظمة', 'تنفيذ وتنظيم كابلات الشبكات ونقاط الاتصال والباتش بانل بما يدعم التشغيل والصيانة.'],
  ['البنية التحتية للفايبر', 'تجهيز مسارات الفايبر وODF والباتش كورد والملحقات المطلوبة حسب نطاق المشروع.'],
  ['الراك وغرف البيانات', 'تجهيز الراك وتنظيم المكونات ومسارات الكابلات داخل غرف البيانات والمواقع الفنية.'],
  ['الاختبار والتسليم', 'اختبار التوصيلات وتنظيم التسليم الفني لتقليل الأخطاء قبل التشغيل الفعلي.'],
];

export default function ArabicHomePage() {
  return (
    <main className="container section space-y-12">
      <section className="grid gap-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6 md:grid-cols-2 md:gap-6 md:p-10">
        <div>
          <p className="public-eyebrow text-orange-600 text-xs">حلول البنية التحتية للشبكات في مصر</p>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-navy-900 sm:text-3xl md:text-4xl">توريد وتنفيذ حلول الشبكات والفايبر والراك للشركات</h1>
          <p className="public-copy mt-3 text-sm leading-7 sm:mt-4">تدعم HILTECH الشركات في تخطيط وتوريد وتنفيذ واختبار حلول كابلات الشبكات، الفايبر، الراك، غرف البيانات، وتجهيزات البنية التحتية للكاميرات، مع طلب عرض سعر منظم وتتبع حالة الطلب.</p>
          <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            <Link href="/ar/rfq" className="btn-primary">اطلب عرض سعر</Link>
            <Link href="/ar/work" className="btn-secondary">شاهد أعمالنا</Link>
            <Link href="/ar/track" className="btn-secondary w-full sm:w-auto">تتبع طلب عرض السعر</Link>
          </div>
        </div>
        <div className="relative min-h-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:min-h-64">
          <Image src="/infrastructure-network-detail.jpg" alt="تنفيذ بنية تحتية للشبكات" fill className="object-cover" />
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-5">
        {trustStrip.map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold">{item}</div>)}
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-navy-900">ما الذي تقدمه HILTECH؟</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {deliverables.map(([title, text]) => <article key={title} className="public-card p-5"><h3 className="text-lg font-semibold text-navy-900">{title}</h3><p className="mt-2 text-sm text-slate-700">{text}</p></article>)}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-navy-900">أعمال ميدانية من HILTECH</h2>
        <p className="text-slate-700">صور حقيقية معتمدة من أعمال HILTECH في تجهيز وتنفيذ البنية التحتية للشبكات، مع التركيز على التنظيم، جودة التوصيلات، الاختبار، وتجهيز المواقع للتشغيل.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['الفايبر وODF', '/fiber-patch-panel-closeup.jpg'],
            ['الراك وغرف البيانات', '/rack-data-room.jpg'],
            ['الكابلات المنظمة', '/copper-patch-panel.jpg'],
            ['الاختبار والتسليم', '/testing-fluke-meter.jpg'],
          ].map(([label, src]) => (
            <article key={label} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative h-40"><Image src={src} alt={label} fill className="object-cover" /></div>
              <p className="p-3 text-sm font-semibold text-slate-800">{label}</p>
            </article>
          ))}
        </div>
        <Link href="/ar/work" className="inline-flex text-sm font-semibold text-orange-600 underline">شاهد أعمالنا</Link>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">من اختيار المنتجات إلى طلب عرض سعر منظم</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {['اختر المنتجات أو نطاق العمل', 'أضف الكميات وملاحظات المشروع', 'أرسل الطلب وتابع حالته برقم الطلب'].map((step, index) => <li key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold"><span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-white">{index + 1}</span>{step}</li>)}
        </ol>
        <div className="mt-5 flex flex-wrap gap-3"><Link href="/ar/rfq" className="btn-primary">ابدأ طلب عرض السعر</Link><Link href="/ar/track" className="btn-secondary">تتبع طلب العرض</Link></div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-navy-900">تصنيفات المنتجات والحلول</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['أنظمة الفايبر', 'حلول الفايبر وODF والباتش كورد وملحقات الربط.'],
            ['كابلات الشبكات CAT6', 'كابلات الشبكات والباتش كورد ومكونات الربط المنظمة.'],
            ['الراك والكبائن وPDU', 'راك وكبائن وPDU وتجهيزات غرف البيانات.'],
            ['الباتش بانل وODF', 'تنظيم نقاط الربط والتوزيع داخل الراك والمواقع الفنية.'],
            ['CCTV والبنية التحتية الأمنية', 'تجهيزات البنية التحتية الداعمة لأنظمة الكاميرات.'],
            ['أدوات الاختبار والتنظيم', 'أدوات ومستلزمات تساعد على الاختبار والتنظيم والتسليم.'],
          ].map(([title, description]) => (
            <article key={title} className="public-card p-5"><h3 className="text-base font-semibold text-navy-900">{title}</h3><p className="mt-2 text-sm text-slate-700">{description}</p><Link href="/ar/products-partners" className="mt-3 inline-flex text-sm font-semibold text-orange-600">عرض المنتجات</Link></article>
          ))}
        </div>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">لماذا تختار HILTECH؟</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ['طلب عرض سعر منظم', 'أرسل المنتجات والكميات وملاحظات المشروع في طلب واحد واضح.'],
            ['تنفيذ ميداني عملي', 'التخطيط يراعي المسارات، الراك، الاختبار، والتسليم.'],
            ['متابعة واضحة', 'تابع الطلب من خلال رقم مرجعي، أو تواصل عبر الهاتف وواتساب.'],
            ['اختيار مكونات مناسب', 'يتم ربط مراجع المنتجات باحتياج المشروع قبل عرض السعر.'],
          ].map(([title, text]) => <article key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-700">{text}</p></article>)}
        </div>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">مراجع المنتجات والسياق الفني</h2>
        <p className="mt-4 text-slate-700">تُعرض مراجع المنتجات والعلامات التجارية لأغراض الكتالوج والسياق الفني فقط، ولا تعني شراكة رسمية إلا إذا تم ذكر ذلك صراحة.</p>
        <Link href="/ar/products-partners" className="mt-4 inline-flex text-sm font-semibold text-orange-600 underline">تصفح المنتجات</Link>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">جاهز لمناقشة مشروعك؟</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm font-semibold">
          <a href={site.contact.whatsappGeneralLink} className="btn-secondary">واتساب / طلب عرض سعر</a>
          <a href={`mailto:${site.contact.email}`} className="btn-secondary" dir="ltr">{site.contact.email}</a>
          <a href={`tel:${site.contact.phone}`} className="btn-secondary" dir="ltr">{site.contact.phone}</a>
          <a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer" className="btn-secondary">تحميل ملف الشركة</a>
          <Link href="/ar/track" className="btn-secondary">تتبع طلب عرض السعر</Link>
        </div>
      </section>

      <section className="public-card p-6">
        <h2 className="text-2xl font-bold text-navy-900">ابدأ طلب عرض السعر الآن</h2>
        <p className="mt-4 text-slate-700">أضف المنتجات أو اكتب نطاق العمل، وسيقوم فريق HILTECH بمراجعة الطلب والتواصل معك للخطوة التالية.</p>
        <div className="mt-5 flex flex-wrap gap-3"><Link href="/ar/rfq" className="btn-primary">اطلب عرض سعر</Link><Link href="/ar/track" className="btn-secondary">تتبع طلب العرض</Link><Link href="/ar/contact" className="btn-secondary">تواصل معنا</Link></div>
      </section>
    </main>
  );
}
