import type { Metadata } from 'next';
import Link from 'next/link';
import { arContactContent } from '@/content/ar/contact';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'تواصل مع HILTECH | طلب عرض سعر للشبكات والفايبر',
  description: 'تواصل مع HILTECH لطلبات عروض الأسعار والاستفسارات الخاصة بحلول الشبكات والفايبر والراك والبنية التحتية.',
  alternates: { canonical: `${site.siteUrl}/ar/contact` },
};

export default function Page() { return <main className="section" dir="rtl"><div className="container max-w-4xl"><h1 className="text-3xl font-bold text-navy-900">{arContactContent.title}</h1><p className="mt-3 text-slate-700">{arContactContent.intro}</p><div className="mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-xl border p-4"><p className="font-semibold">{arContactContent.whatsapp}</p><p dir="ltr"><a href={site.contact.whatsappGeneralLink} className="underline">{site.contact.whatsappLocal}</a></p><p className="mt-2 font-semibold">{arContactContent.email}</p><p dir="ltr"><a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a></p><p className="mt-2 font-semibold">{arContactContent.address}</p><p>{site.contact.addressAr}</p></div><div className="rounded-xl border p-4"><p className="font-semibold">{arContactContent.checklistTitle}</p><ul className="mt-3 space-y-2">{arContactContent.checklist.map((item)=><li key={item}>• {item}</li>)}</ul></div></div><div className="mt-6 flex flex-wrap gap-3"><Link href="/ar/rfq" className="btn-primary">اطلب عرض سعر</Link><Link href="/ar/track" className="btn-secondary">تتبع طلب عرض السعر</Link><a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer" className="btn-secondary">تحميل ملف الشركة</a></div></div></main>; }
