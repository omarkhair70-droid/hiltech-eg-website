import type { Metadata } from 'next';
import Link from 'next/link';
import { arCompanyContent } from '@/content/ar/company';
import { site } from '@/content/site';

export const metadata: Metadata = { title: 'من هي HILTECH؟ | حلول البنية التحتية للشبكات', description: 'تعرف على HILTECH ودورها في توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات والمواقع التجارية في مصر.', alternates: { canonical: `${site.siteUrl}/ar/company` } };

export default function Page() { return <main className="bg-slate-50" dir="rtl"><section className="bg-navy-900 text-white"><div className="container py-14"><h1 className="text-3xl font-bold">{arCompanyContent.title}</h1><p className="mt-4 max-w-4xl text-slate-100">{arCompanyContent.intro}</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/ar/rfq" className="inline-flex rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white">اطلب عرض سعر</Link><a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer" className="inline-flex rounded-md border border-slate-300/80 px-5 py-2.5 text-sm font-semibold text-slate-100">تحميل ملف الشركة</a><Link href="/ar/contact" className="inline-flex rounded-md border border-slate-300/80 px-5 py-2.5 text-sm font-semibold text-slate-100">تواصل معنا</Link></div></div></section><section className="container py-10"><ul className="grid gap-3 sm:grid-cols-2">{arCompanyContent.points.map((item) => <li key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-slate-800">{item}</li>)}</ul></section></main>; }
