import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | حلول الشبكات والفايبر وطلبات عروض الأسعار في مصر',
  description: 'توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات في مصر، مع طلب عرض سعر وتتبع حالة الطلب.',
  alternates: { canonical: `${site.siteUrl}/ar`, languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` } },
};

const capabilities = ['فايبر أوبتك', 'كابلات منظمة', 'تجهيز الراك', 'اختبار قبل التسليم'];
const services = ['تمديد ولحام الفايبر', 'تركيب وتنظيم الراك', 'تمديد الكابلات النحاسية', 'تصميم ومعاينة الموقع', 'اختبارات الشبكات', 'إدارة مشاريع الشبكات'];
const productCategories = [
  { label: 'فايبر أوبتك', category: 'Fiber Optic Systems' },
  { label: 'كابلات CAT6', category: 'Copper / CAT6 Cabling' },
  { label: 'باتش كورد وربط', category: 'Patch Cords & Connectivity' },
  { label: 'راك وكبائن', category: 'Cabinets / Racks / PDU' },
  { label: 'CCTV والبنية الأمنية', category: 'CCTV & Security' },
  { label: 'ملحقات الشبكات', category: 'Cable Management / Duct Systems' },
];
const scopeStarters = [
  { title: 'تجهيز شبكة مكتب', items: ['كابلات CAT6', 'باتش بانل', 'فيس بليت', 'ملحقات الراك', 'الاختبار'] },
  { title: 'تجهيز راك وغرفة بيانات', items: ['راك', 'PDU', 'تنظيم الكابلات', 'باتش بانل', 'التسمية والاختبار'] },
  { title: 'نطاق فايبر وODF', items: ['كابل فايبر', 'ODF', 'باتش كورد', 'اللحام والاختبار'] },
  { title: 'بنية تحتية للكاميرات', items: ['نقاط شبكة', 'كابلات', 'تجهيز الراك', 'جاهزية الطاقة والشبكة'] },
];
const metrics = [
  { value: '10+', label: 'سنوات خبرة' },
  { value: '500+', label: 'مشروع تم تنفيذه' },
  { value: '1000+', label: 'منتج تم توريده' },
  { value: '24/7', label: 'دعم فني' },
];

export default function ArabicHomePage() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* HERO SECTION */}
      <section className="relative min-h-screen py-12 text-white sm:py-16 md:py-20 overflow-hidden">
        {/* Background grid and glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Orange glow */}
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full filter opacity-40" />
          
          {/* Blue glow */}
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/15 blur-3xl rounded-full filter opacity-30" />
        </div>

        <div className="container relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Main Content */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">حلول البنية التحتية للشبكات في مصر</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-balance">
                  حلول شبكات وفايبر وراك جاهزة للتنفيذ والتسعير
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                تساعد HILTECH الشركات في مصر على تجهيز البنية التحتية للشبكات، من تحديد النطاق واختيار المنتجات إلى التنفيذ والاختبار وطلب عرض السعر.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row pt-2">
                <Link href="/ar/rfq" className="btn-primary w-full sm:w-auto justify-center">اطلب عرض سعر</Link>
                <Link href="/ar/products-partners" className="inline-flex items-center justify-center px-5 py-2.5 font-semibold text-white transition-colors border border-white/30 rounded-md hover:bg-white/10">تصفح المنتجات</Link>
              </div>

              {/* Capability chips */}
              <div className="flex flex-wrap gap-2 pt-4">
                {capabilities.map((cap) => (
                  <span key={cap} className="inline-flex items-center px-3 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-xs font-semibold text-orange-200">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Premium Visual Card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 space-y-6">
                {/* Metric Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-4 text-center">
                    <p className="text-2xl font-bold text-orange-300">99.9%</p>
                    <p className="text-xs font-semibold text-slate-300 mt-1">استقرار الإشارة</p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-4 text-center">
                    <p className="text-2xl font-bold text-orange-300">24/7</p>
                    <p className="text-xs font-semibold text-slate-300 mt-1">متابعة فنية</p>
                  </div>
                </div>

                {/* Main visual area */}
                <div className="relative rounded-xl overflow-hidden">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/rack-data-room.jpg"
                      alt="أنظمة شبكات للمؤسسات"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-semibold text-white">أنظمة شبكات للمؤسسات</p>
                    <p className="text-xs text-slate-300 mt-1">تصميم • تنفيذ • اختبار • تسليم</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING QUICK BROWSE PANEL */}
      <section className="relative -mt-16 z-20">
        <div className="container">
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400">تصفح سريع للمنتجات</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">اختار التصنيف وابدأ طلب عرض السعر</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {productCategories.map((category) => (
                <Link
                  key={category.label}
                  href={`/ar/products-partners?category=${encodeURIComponent(category.category)}`}
                  className="group relative rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 p-3 text-center transition-all"
                >
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-orange-300 transition-colors">
                    {category.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-12 mt-12">
        <div className="container">
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6">
            <p className="text-xs font-semibold text-slate-400 mb-4">منظومات ومراجع منتجات ضمن الكتالوج الفني</p>
            <div className="flex flex-wrap gap-2">
              {['Fluke', 'Corning', 'CommScope', 'Siemon', 'Panduit', 'OTDR'].map((partner) => (
                <span key={partner} className="text-xs font-semibold text-slate-300 px-3 py-1.5 rounded border border-white/15 bg-white/5">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">الخدمات</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">خدمات وحلول HILTECH</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 hover:border-orange-500/50 transition-colors">
                <div className="inline-flex w-3 h-3 rounded-full bg-orange-500 mb-4" />
                <h3 className="font-semibold text-white text-sm">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT SCOPE SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">النطاقات</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">جهّز نطاق مشروع كامل</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {scopeStarters.map((scope) => (
              <div key={scope.title} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-5 space-y-4">
                <h3 className="font-semibold text-white">{scope.title}</h3>
                <ul className="space-y-2">
                  {scope.items.map((item) => (
                    <li key={item} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIELD WORK SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">الإثبات الميداني</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">أعمال قابلة للتسليم والصيانة</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { title: 'تجهيز الراك وغرف البيانات', src: '/rack-front-cabling.jpg', desc: 'تنظيم الراك ومسارات الكابلات بمعايير احترافية', href: '/ar/work#rack-data-room' },
              { title: 'أعمال الفايبر / ODF', src: '/fiber-splicing-workbench.jpg', desc: 'تجهيز المسار والـ ODF للتسليم والتشغيل', href: '/ar/work#fiber-odf' },
              { title: 'الاختبار والتحقق', src: '/testing-otdr-device.jpg', desc: 'اختبار قبل التسليم والتشغيل الفعلي', href: '/ar/work#testing-handover' },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group relative rounded-xl overflow-hidden border border-white/15 bg-white/5 hover:border-orange-500/50 transition-all">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-300">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW SECTION */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 sm:p-12 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">تصفح المنتجات والحلول</h2>
              <p className="text-slate-300 max-w-2xl">تصفح المنتجات وأضف عناصر المشروع إلى سلة طلب عرض سعر واحدة. نظام متكامل لإدارة احتياجات مشروعك.</p>
            </div>
            <Link href="/ar/products-partners" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
              تصفح المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* RFQ PROCESS SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">العملية</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">من اختيار المنتجات إلى عرض السعر</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {['اختر المنتجات', 'أضف الكميات', 'أرسل وتابع الطلب'].map((step, idx) => (
              <div key={step} className="relative">
                <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 text-center space-y-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white font-bold">
                    {idx + 1}
                  </div>
                  <p className="font-semibold text-white">{step}</p>
                </div>
                {idx < 2 && <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/ar/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors flex-1 sm:flex-none">
              اطلب عرض سعر
            </Link>
            <Link href="/ar/track" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/30 hover:bg-white/10 rounded-md transition-colors flex-1 sm:flex-none">
              تتبع الطلب
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">الأسباب</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">لماذا تختار HILTECH؟</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'طلب عرض سعر منظم', desc: 'أرسل المنتجات والكميات في طلب واحد واضح' },
              { title: 'تنفيذ ميداني عملي', desc: 'التخطيط يراعي المسارات والراك والاختبار' },
              { title: 'متابعة واضحة', desc: 'تابع الطلب عبر الهاتف أو واتساب' },
              { title: 'اختيار مكونات مناسب', desc: 'ربط مراجع المنتجات باحتياج المشروع' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-5 space-y-2">
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTING SECTION */}
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">الجودة</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">معايير الاختبار والتحقق</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Fluke Test', 'OTDR', 'Power Meter', 'Digital Copper Tester'].map((tool) => (
              <div key={tool} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 text-center space-y-3">
                <div className="inline-flex w-2 h-8 rounded bg-orange-500" />
                <p className="font-semibold text-white text-sm">{tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 text-center space-y-3">
                <p className="text-4xl sm:text-5xl font-black text-orange-400">{metric.value}</p>
                <p className="font-semibold text-slate-300 text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-r from-orange-600/20 to-orange-500/10 backdrop-blur-sm p-8 sm:p-12 space-y-6">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/40 blur-3xl rounded-full" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">جاهز لتسعير مشروع البنية التحتية؟</h2>
              <p className="text-slate-200 max-w-2xl">أرسل المنتجات والكميات أو BOQ أو متطلبات الموقع، وسيقوم فريق HILTECH بمراجعة النطاق ومتابعة عرض السعر.</p>
            </div>

            <div className="relative z-10 flex flex-col gap-3 sm:flex-row pt-4">
              <Link href="/ar/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
                اطلب عرض سعر
              </Link>
              <a href={site.contact.whatsappGeneralLink} className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/40 hover:bg-white/10 rounded-md transition-colors">
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
