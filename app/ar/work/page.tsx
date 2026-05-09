import type { Metadata } from 'next';
import Link from 'next/link';
import { arWorkContent } from '@/content/ar/work';
import { site } from '@/content/site';

export const metadata: Metadata = { title: 'أعمال HILTECH الميدانية | تجهيزات الشبكات والفايبر', description: 'استعرض صورًا حقيقية معتمدة من أعمال HILTECH في تجهيز وتنفيذ البنية التحتية للشبكات والفايبر والراك.', alternates: { canonical: `${site.siteUrl}/ar/work`, languages: { en: `${site.siteUrl}/work`, ar: `${site.siteUrl}/ar/work`, 'x-default': `${site.siteUrl}/` } } };

export default function Page() { return <main className="section" dir="rtl"><div className="container"><h1 className="text-3xl font-bold">{arWorkContent.title}</h1><p className="mt-3 text-slate-700">{arWorkContent.intro}</p><p className="mt-2 text-slate-700">{arWorkContent.supporting}</p><p className="mt-2 text-sm text-slate-600">الصور المعروضة هي Approved real HILTECH visuals للاستخدام التعريفي العام.</p><div className="mt-5 flex gap-3"><Link href="/work" className="btn-secondary">استعراض المعرض</Link><Link href="/ar/rfq" className="btn-primary">اطلب عرض سعر</Link></div></div></main>; }
