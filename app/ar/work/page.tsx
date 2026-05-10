import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/ui/primitives';
import { arWorkContent } from '@/content/ar/work';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'أعمال HILTECH الميدانية | دليل تنفيذ وتسليم البنية التحتية',
  description: 'بطاقات إثبات من الأعمال الميدانية توضح نوع العمل، النطاق المنفذ، ومؤشرات الثقة في التسليم والصيانة.',
  alternates: { canonical: `${site.siteUrl}/ar/work`, languages: { en: `${site.siteUrl}/work`, ar: `${site.siteUrl}/ar/work`, 'x-default': `${site.siteUrl}/` } },
};

export default function Page() {
  return (
    <main dir="rtl">
      <SectionShell>
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">إثبات الأعمال الميدانية</p>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">تنفيذ ميداني حقيقي عبر الراك والكابلات والفايبر والاختبار</h1>
          <p className="mt-4 max-w-3xl text-slate-300">{arWorkContent.supporting}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ar/rfq" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500">اطلب عرض سعر</Link>
            <Link href="/ar/contact" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-900">تواصل مع HILTECH</Link>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {arWorkContent.cards.map((card) => (
            <article key={card.title} className="public-card overflow-hidden rounded-2xl bg-slate-900/70 p-0">
              <div className="relative aspect-[16/10] border-b border-white/10 bg-slate-950/70">
                <Image src={card.image} alt={card.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-4">
                <span className="inline-flex rounded-full border border-slate-300 bg-slate-950/70 px-2.5 py-1 text-xs font-semibold text-slate-300">{card.label}</span>
                <h2 className="mt-3 text-lg font-semibold text-white">{card.title}</h2>
                <p className="mt-2 text-sm text-slate-300"><span className="font-semibold text-white">النطاق:</span> {card.scope}</p>
                <p className="mt-2 text-sm text-slate-300"><span className="font-semibold text-white">مؤشر الثقة:</span> {card.confidence}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-slate-950/70 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white">أعمال ميدانية قابلة للتسليم والصيانة</h2>
          <p className="mt-3 max-w-3xl text-slate-300">تركز HILTECH على تنظيم الكابلات، وضوح المسارات، تجهيز الراك بشكل عملي، وتجهيز البنية للاختبار والتشغيل بعد التسليم.</p>
          <ul className="mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <li className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2">مسارات منظمة</li>
            <li className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2">كابلات قابلة للصيانة</li>
            <li className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2">تسليم جاهز للاختبار</li>
            <li className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2">تجهيز عملي للراك</li>
          </ul>
        </section>
      </SectionShell>
    </main>
  );
}
