import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | حلول الشبكات والفايبر وطلبات عروض الأسعار في مصر',
  description: 'توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات في مصر، مع طلب عرض سعر وتتبع حالة الطلب.',
  alternates: { canonical: `${site.siteUrl}/ar`, languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` } },
};

const trustStrip = ['تنفيذ داخل مصر', 'كابلات شبكات منظمة', 'حلول فايبر', 'تجهيز الراك', 'اختبار قبل التسليم', 'تتبع طلب العرض', 'متابعة عبر واتساب'];

export default function ArabicHomePage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy-900 via-navy-900 to-slate-900 py-10 text-white sm:py-14 md:py-20">
        <div className="container grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="public-eyebrow text-orange-300">حلول البنية التحتية للشبكات في مصر</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">حلول شبكات وفايبر وراك جاهزة للتنفيذ والتسعير</h1>
            <p className="mt-4 text-sm text-slate-100 sm:text-base">تساعد HILTECH الشركات في مصر على تجهيز البنية التحتية للشبكات، من تحديد النطاق واختيار المنتجات إلى التنفيذ والاختبار وطلب عرض السعر.</p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link href="/ar/rfq" className="btn-primary w-full justify-center sm:w-auto">اطلب عرض سعر</Link>
              <Link href="/ar/products-partners" className="btn-secondary w-full justify-center sm:w-auto">تصفح المنتجات</Link>
            </div>
          </div>
          <article className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
            <div className="relative aspect-[4/3] w-full"><Image src="/rack-data-room.jpg" alt="إثبات أعمال ميدانية" fill className="object-cover" /></div>
            <div className="p-4"><p className="public-eyebrow text-orange-200">إثبات ميداني</p><div className="mt-2 flex flex-wrap gap-2">{['كابلات منظمة', 'فايبر / ODF', 'تجهيز الراك', 'اختبار قبل التسليم'].map((tag)=><span key={tag} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold">{tag}</span>)}</div></div>
          </article>
        </div>
      </section>



      <section className="container section"><div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{[['24/7','دعم فني'],['+1000','منتج تم توريده'],['+500','مشروع تم تنفيذه'],['+10','سنوات خبرة']].map(([value,label])=><article key={String(label)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"><p className="text-lg font-bold text-navy-900" dir="ltr">{value}</p><p className="text-xs font-semibold text-slate-600">{label}</p></article>)}</div></div></section>

      <section className="container section"><div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4"><ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{trustStrip.map((item)=><li key={item} className="public-marker justify-center text-center sm:text-sm">{item}</li>)}</ul></div></section>

      <section className="container section space-y-5"><h2 className="text-2xl font-bold text-navy-900">ما الذي تقدمه HILTECH؟</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['كابلات الشبكات المنظمة','تنفيذ وتنظيم كابلات الشبكات ونقاط الاتصال والباتش بانل بما يدعم التشغيل والصيانة.'],['البنية التحتية للفايبر','تجهيز مسارات الفايبر وODF والباتش كورد والملحقات المطلوبة حسب نطاق المشروع.'],['الراك وغرف البيانات','تجهيز الراك وتنظيم المكونات ومسارات الكابلات داخل غرف البيانات والمواقع الفنية.'],['الاختبار والتسليم','اختبار التوصيلات وتنظيم التسليم الفني لتقليل الأخطاء قبل التشغيل الفعلي.']].map(([title,text]) => <article key={String(title)} className="public-card p-4"><h3 className="font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-700">{text}</p></article>)}</div></section>


      <section className="container section space-y-5"><h2 className="text-2xl font-bold text-navy-900">جهّز نطاق مشروع كامل</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[
        ['تجهيز شبكة مكتب', ['كابلات CAT6', 'باتش بانل', 'فيس بليت', 'ملحقات الراك', 'الاختبار']],
        ['تجهيز راك وغرفة بيانات', ['راك', 'PDU', 'تنظيم الكابلات', 'باتش بانل', 'التسمية والاختبار']],
        ['نطاق فايبر وODF', ['كابل فايبر', 'ODF', 'باتش كورد', 'اللحام والاختبار']],
        ['بنية تحتية للكاميرات', ['نقاط شبكة', 'كابلات', 'تجهيز الراك', 'جاهزية الطاقة والشبكة']],
      ].map(([title,items]) => <article key={String(title)} className="public-card p-4"><h3 className="font-semibold text-slate-900">{title}</h3><ul className="mt-2 space-y-1 text-sm text-slate-700">{(items as string[]).map((line)=><li key={line}>• {line}</li>)}</ul></article>)}</div></section>

      <section className="bg-slate-50"><div className="container section space-y-5"><h2 className="text-2xl font-bold text-navy-900">أعمال ميدانية قابلة للتسليم والصيانة</h2><div className="grid gap-3 sm:grid-cols-3">{[
        ['تجهيز الراك وغرف البيانات', '/rack-front-cabling.jpg', 'نطاق العمل: تنظيم الراك ومسارات الكابلات.'],
        ['أعمال الفايبر / ODF', '/fiber-splicing-workbench.jpg', 'نطاق العمل: تجهيز المسار والـ ODF للتسليم.'],
        ['الكابلات المنظمة والاختبار', '/testing-otdr-device.jpg', 'ملاحظة ثقة: اختبار قبل التسليم والتشغيل.'],
      ].map(([title,src,note])=><article key={String(title)} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="relative aspect-[16/10] w-full"><Image src={String(src)} alt={String(title)} fill className="object-cover" /></div><div className="p-3.5"><h3 className="font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-700">{note}</p><Link href="/ar/work" className="mt-2 inline-block text-sm font-semibold text-orange-700">عرض الأعمال</Link></div></article>)}</div></div></section>

      <section className="container section"><article className="public-card p-6"><h2 className="text-2xl font-bold text-navy-900">تصفح المنتجات وأضف عناصر المشروع إلى سلة طلب عرض سعر واحدة.</h2><div className="mt-5 flex flex-col gap-2.5 sm:flex-row"><Link href="/ar/products-partners" className="btn-secondary w-full justify-center sm:w-auto">تصفح المنتجات</Link></div></article></section>



      <section className="container section space-y-5"><h2 className="text-2xl font-bold text-navy-900">تصنيفات المنتجات والحلول</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['أنظمة الفايبر','حلول الفايبر وODF والباتش كورد وملحقات الربط.'],['كابلات الشبكات CAT6','كابلات الشبكات والباتش كورد ومكونات الربط المنظمة.'],['الراك والكبائن وPDU','راك وكبائن وPDU وتجهيزات غرف البيانات.'],['الباتش بانل والربط','تنظيم نقاط الربط والتوزيع داخل الراك والمواقع الفنية.']].map(([title,desc])=><article key={String(title)} className="public-card p-4"><h3 className="font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-700">{desc}</p><Link href="/ar/products-partners" className="mt-2 inline-block text-sm font-semibold text-orange-700">عرض المنتجات</Link></article>)}</div></section>

      <section className="container section"><article className="public-card p-6"><h2 className="text-2xl font-bold text-navy-900">من اختيار المنتجات إلى طلب عرض سعر منظم</h2><ol className="mt-4 grid gap-3 sm:grid-cols-3">{['اختر المنتجات','أضف الكميات','أرسل وتابع الطلب'].map((step, index) => <li key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold"><span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-white">{index + 1}</span>{step}</li>)}</ol><div className="mt-5 flex flex-col gap-2.5 sm:flex-row"><Link href="/ar/rfq" className="btn-primary w-full justify-center sm:w-auto">اطلب عرض سعر</Link><Link href="/ar/track" className="btn-secondary w-full justify-center sm:w-auto">تتبع طلب العرض</Link></div></article></section>

      <section className="container section"><article className="public-card p-6"><h2 className="text-2xl font-bold text-navy-900">لماذا تختار HILTECH؟</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['طلب عرض سعر منظم','أرسل المنتجات والكميات وملاحظات المشروع في طلب واحد واضح.'],['تنفيذ ميداني عملي','التخطيط يراعي المسارات والراك والاختبار والتسليم.'],['متابعة واضحة','تابع الطلب من خلال رقم مرجعي أو عبر الهاتف وواتساب.'],['اختيار مكونات مناسب','يتم ربط مراجع المنتجات باحتياج المشروع قبل عرض السعر.']].map(([title,text]) => <article key={String(title)} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-700">{text}</p></article>)}</div></article></section>

      <section className="container section"><article className="public-card p-6"><h2 className="text-2xl font-bold text-navy-900">مراجع المنتجات والسياق الفني</h2><p className="mt-3 text-slate-700">تُعرض مراجع المنتجات والعلامات التجارية لأغراض الكتالوج والسياق الفني فقط، ولا تعني شراكة رسمية إلا إذا تم ذكر ذلك صراحة.</p><Link href="/ar/products-partners" className="mt-3 inline-flex text-sm font-semibold text-orange-700 underline">تصفح المنتجات</Link></article></section>

      <section className="container section"><article className="public-card p-6"><h2 className="text-2xl font-bold text-navy-900">جاهز لمناقشة مشروعك؟</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm font-semibold"><a href={site.contact.whatsappGeneralLink} className="btn-secondary">واتساب / طلب عرض سعر</a><a href={`mailto:${site.contact.email}`} className="btn-secondary" dir="ltr">{site.contact.email}</a><a href={`tel:${site.contact.phone}`} className="btn-secondary" dir="ltr">{site.contact.phone}</a><a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer" className="btn-secondary">تحميل ملف الشركة</a><Link href="/ar/track" className="btn-secondary">تتبع طلب عرض السعر</Link></div></article></section>

      <section className="bg-navy-800 py-10 text-white"><div className="container"><h2 className="text-3xl font-bold">جاهز لتسعير مشروع البنية التحتية؟</h2><p className="mt-3 max-w-3xl text-slate-100">أرسل المنتجات والكميات أو BOQ أو متطلبات الموقع، وسيقوم فريق HILTECH بمراجعة النطاق ومتابعة عرض السعر.</p><div className="mt-5 flex flex-col gap-2.5 sm:flex-row"><Link href="/ar/rfq" className="btn-primary w-full justify-center sm:w-auto">اطلب عرض سعر</Link><a href={site.contact.whatsappGeneralLink} className="inline-flex w-full items-center justify-center rounded-md border border-white/35 px-4 py-2.5 text-sm font-semibold text-white sm:w-auto">تواصل عبر واتساب</a></div></div></section>
    </main>
  );
}
