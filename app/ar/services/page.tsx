import type { Metadata } from 'next';
import Link from 'next/link';
import { arServicesContent } from '@/content/ar/services';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'خدمات HILTECH | الشبكات والفايبر والراك',
  description: 'خدمات توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك وغرف البيانات للشركات في مصر.',
  alternates: { canonical: `${site.siteUrl}/ar/services` },
};

export default function Page() {
  return <main className="section" dir="rtl"><div className="container max-w-5xl"><h1 className="text-3xl font-bold text-navy-900">{arServicesContent.title}</h1><p className="mt-3 text-slate-700">{arServicesContent.intro}</p><div className="mt-6 grid gap-4 md:grid-cols-2">{arServicesContent.groups.map((group)=> <article key={group.title} className="rounded-xl border border-slate-200 bg-white p-4"><h2 className="font-bold text-slate-900">{group.title}</h2><p className="mt-2 text-slate-700">{group.description}</p></article>)}</div><div className="mt-6 flex flex-wrap gap-3"><Link href="/ar/rfq" className="btn-primary">اطلب عرض سعر</Link><Link href="/ar/products-partners" className="btn-secondary">تصفح المنتجات</Link></div></div></main>;
}
