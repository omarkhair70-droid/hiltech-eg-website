import type { Metadata } from 'next';
import Link from 'next/link';
import { arCompanyContent } from '@/content/ar/company';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'من هي HILTECH؟ | حلول البنية التحتية للشبكات',
  description: 'تعرف على HILTECH ودورها في توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات والمواقع التجارية في مصر.',
  alternates: { canonical: `${site.siteUrl}/ar/company` },
};

export default function Page() { return <main className="section" dir="rtl"><div className="container max-w-4xl"><h1 className="text-3xl font-bold text-navy-900">{arCompanyContent.title}</h1><p className="mt-4 text-slate-700">{arCompanyContent.intro}</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{arCompanyContent.points.map((point)=> <li key={point} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">{point}</li>)}</ul><div className="mt-6 flex flex-wrap gap-3"><Link href="/ar/rfq" className="btn-primary">اطلب عرض سعر</Link><a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer" className="btn-secondary">تحميل ملف الشركة</a><Link href="/ar/contact" className="btn-secondary">تواصل معنا</Link></div></div></main>; }
