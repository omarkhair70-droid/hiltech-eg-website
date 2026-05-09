import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | حلول الشبكات والفايبر وطلبات عروض الأسعار في مصر',
  description: 'توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات في مصر، مع طلب عرض سعر وتتبع حالة الطلب.',
  alternates: { canonical: `${site.siteUrl}/ar`, languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` } },
};

const heroChips = ['تنفيذ داخل مصر', 'اختبارات قبل التسليم', 'متابعة مشاريع 24/7', 'دعم عبر واتساب'];

const quickCategories = [
  { label: 'فايبر', href: '/ar/products-partners?category=fiber' },
  { label: 'كابلات نحاسية', href: '/ar/products-partners?category=copper-cables' },
  { label: 'راك وكبائن', href: '/ar/products-partners?category=racks-cabinets' },
  { label: 'CCTV / كاميرات', href: '/ar/products-partners?category=cctv' },
  { label: 'ملحقات', href: '/ar/products-partners?category=accessories' },
];

const supplierReferences = ['Molex', 'Nexans', 'Legrand', 'Schneider Electric', 'CommScope', 'Corning', 'Panduit'];

const services = [
  'الفايبر',
  'تركيب وتنظيم الراك',
  'الكابلات النحاسية',
  'تصميم ومعاينة الموقع',
  'الاختبارات',
  'إدارة مشاريع الشبكات',
];

const productPreview = [
  { title: 'أنظمة فايبر وODF', image: '/fiber-splicing-workbench.jpg', desc: 'مكونات الربط واللحام والاختبار لمشاريع الفايبر المؤسسية.' },
  { title: 'راك وغرف بيانات', image: '/rack-data-room.jpg', desc: 'حلول تنظيم الراك والكبائن وPDU ومسارات الكابلات.' },
  { title: 'شبكات نحاسية وPatching', image: '/rack-front-cabling.jpg', desc: 'كابلات CAT6 ومكونات توزيع الشبكات ونقاط الربط.' },
];

const qualityTools = ['Fluke', 'OTDR', 'Power Meter', 'Digital Copper Tester'];

const proofMetrics = [
  ['+10', 'سنوات خبرة'],
  ['+500', 'مشروع تم تنفيذه'],
  ['+1000', 'منتج تم توريده'],
  ['24/7', 'دعم ومتابعة فنية'],
];

export default function ArabicHomePage() {
  return (
    <main className="overflow-x-clip bg-[#030712] text-white">
      <section className="relative border-b border-white/10 pb-28 pt-12 sm:pt-16 lg:pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="container relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-orange-200">
              حلول البنية التحتية للشبكات للمؤسسات
            </span>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">تنفيذ وتوريد حلول الشبكات والفايبر والراك بمعايير مؤسسية</h1>
            <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
              تساعد HILTECH الشركات داخل مصر في تصميم وتوريد وتنفيذ البنية التحتية للشبكات، مع إدارة واضحة للنطاق واختبارات موثقة قبل التسليم.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/ar/rfq" className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">
                اطلب عرض سعر
              </Link>
              <Link
                href="/ar/products-partners"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                تصفح المنتجات
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {heroChips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <article className="rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl sm:p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/15 bg-[#071226] p-4 text-center">
                <p className="text-2xl font-bold text-orange-300">99.9%</p>
                <p className="mt-1 text-xs text-slate-300">استقرار الإشارة</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-[#071226] p-4 text-center">
                <p className="text-2xl font-bold text-orange-300">24/7</p>
                <p className="mt-1 text-xs text-slate-300">متابعة فنية</p>
              </div>
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/15 bg-[#071226]">
              <div className="relative aspect-[16/9] w-full">
                <Image src="/rack-data-room.jpg" alt="أنظمة شبكات للمؤسسات" fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-lg font-bold">أنظمة شبكات للمؤسسات</p>
                <p className="mt-1 text-sm text-slate-300">تنفيذ عملي للفايبر والكابلات والراك مع جاهزية للتوسع والصيانة.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="container relative -mt-14 pb-6">
        <div className="rounded-3xl border border-white/20 bg-[#0a162b]/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
          <p className="text-xs font-semibold text-orange-200">تصفح سريع للمنتجات</p>
          <h2 className="mt-2 text-2xl font-bold">ابدأ من التصنيف المناسب لنطاق مشروعك</h2>
          <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-300">ابحث باسم المنتج أو التصنيف ثم أكمل إلى الكتالوج الكامل</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {quickCategories.map((category) => (
              <Link
                key={category.label}
                href={category.href}
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-sm font-semibold transition hover:border-orange-300/50 hover:bg-white/10"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="text-center text-xs text-slate-300">مراجع علامات ومنظومات مستخدمة ضمن نطاق المنتجات والحلول المعروضة:</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-200">
            {supplierReferences.map((name) => (
              <span key={name} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-10">
        <h2 className="text-2xl font-bold sm:text-3xl">خدمات HILTECH</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service} className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <h3 className="text-lg font-semibold">{service}</h3>
              <p className="mt-2 text-sm text-slate-300">تنفيذ ميداني منظم يربط نطاق العمل بالمنتجات والاختبار والتسليم.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold sm:text-3xl">نظرة سريعة على المنتجات</h2>
          <Link href="/ar/products-partners" className="text-sm font-semibold text-orange-300 hover:text-orange-200">
            تصفح الكتالوج الكامل
          </Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {productPreview.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
              <div className="relative aspect-[16/10] w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <h2 className="text-2xl font-bold sm:text-3xl">الجودة والاختبارات الفنية</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {qualityTools.map((tool) => (
            <article key={tool} className="rounded-2xl border border-white/15 bg-[#071226] p-5 text-center">
              <p className="text-lg font-bold text-orange-300">{tool}</p>
              <p className="mt-1 text-xs text-slate-300">ضمن منظومة القياس والتحقق قبل التسليم</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofMetrics.map(([value, label]) => (
            <article key={String(label)} className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
              <p className="text-2xl font-bold text-orange-300" dir="ltr">
                {value}
              </p>
              <p className="mt-1 text-sm text-slate-200">{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-16 pt-8">
        <article className="rounded-3xl border border-orange-300/40 bg-gradient-to-r from-orange-500/20 to-[#0a162b] p-6 sm:p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">جاهز لتسعير مشروع الشبكات؟</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-200 sm:text-base">أرسل نطاق المشروع أو BOQ وسيقوم فريق HILTECH بمراجعة المتطلبات وإصدار عرض سعر منظم.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/ar/rfq" className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-400">
              اطلب عرض سعر
            </Link>
            <a
              href={site.contact.whatsappGeneralLink}
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
