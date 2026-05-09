import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'حلول الشبكات والفايبر والراك | HILTECH',
  description: 'حلول عربية متكاملة لتجهيز الشبكات والفايبر والراك وغرف البيانات والبنية التحتية للكاميرات في مصر.',
  alternates: {
    canonical: `${site.siteUrl}/ar/solutions`,
    languages: {
      en: `${site.siteUrl}/solutions`,
      ar: `${site.siteUrl}/ar/solutions`,
      'x-default': `${site.siteUrl}/solutions`,
    },
  },
};

const cards = [
  ['الكابلات المنظمة', 'تنفيذ وتنظيم كابلات الشبكات ونقاط الاتصال والباتش بانل بما يناسب تشغيل الموقع وصيانته.'],
  ['حلول الفايبر', 'تجهيز مسارات الفايبر وODF والباتش كورد والملحقات الفنية حسب احتياج المشروع.'],
  ['الراك وغرف البيانات', 'تنظيم الراك والكبائن وPDU ومسارات الكابلات داخل غرف البيانات والمواقع الفنية.'],
  ['البنية التحتية للكاميرات', 'تجهيز نقاط ومسارات الشبكات الداعمة لأنظمة CCTV والبنية الأمنية.'],
  ['اختبار الشبكات والتسليم', 'اختبار التوصيلات وتنظيم التسليم الفني قبل التشغيل الفعلي.'],
  ['توريد المشاريع وطلبات عروض الأسعار', 'اختيار المكونات وتجهيز طلب عرض سعر منظم حسب نطاق المشروع والكميات المطلوبة.'],
] as const;

export default function ArabicSolutionsPage() {return <main className="section" dir="rtl"><section className="container py-10 md:py-14"><h1 className="text-3xl font-bold text-slate-900 md:text-4xl">حلول HILTECH للبنية التحتية للشبكات</h1><p className="mt-4 max-w-3xl text-slate-700">تساعد HILTECH الشركات في تنفيذ وتجهيز حلول الشبكات والفايبر والراك وغرف البيانات والبنية التحتية للكاميرات، بداية من تحديد النطاق وحتى طلب عرض السعر والتسليم.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{cards.map(([title, desc]) => <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold text-slate-900">{title}</h2><p className="mt-2 text-sm text-slate-700">{desc}</p></article>)}</div><div className="mt-8 flex flex-wrap gap-3"><Link href="/ar/rfq" className="btn-primary">اطلب عرض سعر</Link><Link href="/ar/products-partners" className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700">تصفح المنتجات</Link><Link href="/ar/contact" className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700">تواصل معنا</Link></div></section></main>;}
