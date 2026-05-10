import type { Metadata } from 'next';
import Link from 'next/link';
import { arCompanyContent } from '@/content/ar/company';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'من هي HILTECH؟ | حلول البنية التحتية للشبكات',
  description: 'تعرف على HILTECH ودورها في توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات والمواقع التجارية في مصر.',
  alternates: {
    canonical: `${site.siteUrl}/ar/company`,
    languages: { en: `${site.siteUrl}/company`, ar: `${site.siteUrl}/ar/company`, 'x-default': `${site.siteUrl}/` },
  },
};

export default function Page() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" dir="rtl">
      <section className="bg-gradient-to-b from-orange-900/20 to-transparent py-16 border-b border-white/10">
        <div className="container space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white text-balance">{arCompanyContent.title}</h1>
            <p className="mt-4 max-w-4xl text-slate-300 leading-relaxed">{arCompanyContent.intro}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/ar/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
              اطلب عرض سعر
            </Link>
            <a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/30 hover:bg-white/10 rounded-md transition-colors">
              تحميل ملف الشركة
            </a>
            <Link href="/ar/contact" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/30 hover:bg-white/10 rounded-md transition-colors">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <ul className="grid gap-4 sm:grid-cols-2">
            {arCompanyContent.points.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 text-slate-300 space-y-3"
              >
                <div className="inline-flex w-2 h-8 rounded bg-orange-500" />
                <p className="text-sm leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

