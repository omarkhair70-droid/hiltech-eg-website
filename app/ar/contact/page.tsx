import type { Metadata } from 'next';
import Link from 'next/link';
import { arContactContent } from '@/content/ar/contact';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'تواصل مع HILTECH | طلب عرض سعر للشبكات والفايبر',
  description: 'تواصل مع HILTECH لطلبات عروض الأسعار والاستفسارات الخاصة بحلول الشبكات والفايبر والراك والبنية التحتية.',
  alternates: {
    canonical: `${site.siteUrl}/ar/contact`,
    languages: { en: `${site.siteUrl}/contact`, ar: `${site.siteUrl}/ar/contact`, 'x-default': `${site.siteUrl}/` },
  },
};

export default function Page() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" dir="rtl">
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white text-balance">{arContactContent.title}</h1>
            <p className="mt-4 text-slate-300 max-w-2xl">{arContactContent.intro}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/ar/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
              اطلب عرض سعر
            </Link>
            <a href={site.contact.whatsappGeneralLink} className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/30 hover:bg-white/10 rounded-md transition-colors">
              تواصل عبر واتساب
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-12">
            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">طرق التواصل</h2>
              <ul className="space-y-4">
                <li>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">{arContactContent.whatsapp}</p>
                  <a dir="ltr" href={site.contact.whatsappGeneralLink} className="text-slate-300 hover:text-orange-300 transition-colors font-semibold">
                    {site.contact.whatsappLocal}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">{arContactContent.email}</p>
                  <a dir="ltr" href={`mailto:${site.contact.email}`} className="text-slate-300 hover:text-orange-300 transition-colors font-semibold">
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">{arContactContent.address}</p>
                  <p className="text-slate-300 font-semibold">{site.contact.addressAr}</p>
                </li>
                <li>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Link href="/ar/rfq" className="text-orange-300 hover:text-orange-200 transition-colors text-sm font-semibold">
                      اطلب عرض سعر
                    </Link>
                    <span className="text-slate-500">/</span>
                    <Link href="/ar/track" className="text-orange-300 hover:text-orange-200 transition-colors text-sm font-semibold">
                      تتبع الطلب
                    </Link>
                    <span className="text-slate-500">/</span>
                    <a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer" className="text-orange-300 hover:text-orange-200 transition-colors text-sm font-semibold">
                      ملف الشركة
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">{arContactContent.checklistTitle}</h2>
              <ul className="space-y-3">
                {arContactContent.checklist.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

