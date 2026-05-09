'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/content/site';

const footerServices = [
  { label: 'Structured Cabling', href: '/solutions/structured-cabling' },
  { label: 'Fiber Infrastructure', href: '/solutions/fiber-backbone' },
  { label: 'Data Room Readiness', href: '/solutions/data-rooms' },
  { label: 'Project Supply & RFQ', href: '/products-partners' },
];

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  const servicesHeading = isArabic ? 'الخدمات' : 'Services';
  const contactHeading = isArabic ? 'تواصل معنا' : 'Contact';
  const resourcesHeading = isArabic ? 'الموارد' : 'Resources';

  const servicesLinks = isArabic
    ? [
        { label: 'حلول البنية التحتية للشبكات', href: '/ar/services' },
        { label: 'المنتجات', href: '/ar/products-partners' },
        { label: 'أعمالنا', href: '/ar/work' },
        { label: 'الشركة', href: '/ar/company' },
      ]
    : footerServices;

  const resourcesLinks = isArabic
    ? [
        { label: 'الصفحة الرئيسية', href: '/ar' },
        { label: 'المنتجات', href: '/ar/products-partners' },
        { label: 'اطلب عرض سعر', href: '/ar/rfq' },
        { label: 'تتبع طلب العرض', href: '/ar/track' },
        { label: 'اتصل بنا', href: '/ar/contact' },
        { label: 'تحميل ملف الشركة', href: '/hiltech-company-profile.pdf' },
      ]
    : [
        { label: 'Resources Hub', href: '/resources' },
        { label: 'RFQ Preparation Guide', href: '/resources/rfq-guide' },
        { label: 'Company', href: '/company' },
        { label: 'Work', href: '/work' },
        { label: 'Resources', href: '/resources' },
        { label: 'Track RFQ', href: '/track' },
        { label: 'Scope Finder', href: '/scope-finder' },
      ];

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container grid gap-8 py-12 md:grid-cols-4 md:py-16">
        <div>
          <div translate="no" className="inline-flex rounded-xl border border-slate-700/80 bg-white/5 px-3 py-2 shadow-sm">
            <Image src="/logo-dark.png" alt="HILTECH brand logo" width={152} height={44} className="h-8 w-auto object-contain" />
          </div>
          <p className="mt-2.5 text-slate-100">{site.officialName}</p>
          <p className="text-orange-300">{site.slogan}</p>
          <p className="mt-1 text-sm text-slate-300">{isArabic ? 'حلول تنفيذ وتجهيز البنية التحتية للشبكات للمشروعات داخل مصر.' : 'Network infrastructure support for business facilities in Egypt.'}</p>
          <p className="mt-3 text-sm text-slate-300">© HILTECH. All rights reserved.
            <span className="block text-xs text-slate-400" dir="rtl">حلول البنية التحتية التقنية للمشروعات داخل مصر.</span></p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">{servicesHeading}</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            {servicesLinks.map((service) => (
              <li key={service.label}>
                <Link className="underline decoration-slate-500 underline-offset-4 hover:text-white" href={service.href}>{service.label}</Link>
              </li>
            ))}
          </ul>
          <Link href={isArabic ? '/ar/rfq' : '/rfq'} className="mt-3 inline-flex rounded-md border border-orange-300/40 px-3 py-1.5 text-sm font-semibold text-orange-300 hover:bg-white/10">{isArabic ? 'اطلب عرض سعر' : 'Request Project Quote'}</Link>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">{contactHeading}</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            <li dir="ltr"><a className="underline decoration-slate-500 underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li dir="ltr"><a className="underline decoration-slate-500 underline-offset-4" href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>
            <li dir="ltr"><a className="underline decoration-slate-500 underline-offset-4" href={site.contact.whatsappGeneralLink}>{site.contact.whatsappIntl}</a></li>
            <li>{site.contact.addressEn}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">{resourcesHeading}</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            {resourcesLinks.map((resource) => (
              <li key={`${resource.label}-${resource.href}`}>
                <Link className="underline decoration-slate-500 underline-offset-4" href={resource.href}>{resource.label}</Link>
              </li>
            ))}
          </ul>
          {!isArabic ? <h4 className="mt-4 font-semibold">Compliance</h4> : null}
          <p className="mt-2 text-xs text-slate-400" dir="rtl">جميع الإشارات التجارية والفنية لأغراض توضيح النطاق فقط.</p>
          <p className="mt-3 text-sm text-slate-300">
            {isArabic
              ? 'تُعرض مراجع العلامات والمنتجات ضمن نطاق التنفيذ الفني فقط، ولا تعني شراكة رسمية إلا إذا تم ذكر ذلك صراحة.'
              : 'Brands and product references indicate ecosystems we work with and do not imply formal partnership unless explicitly stated.'}
          </p>
          {isArabic ? (
            <Link href="/ar/track" className="mt-3 inline-flex text-sm font-semibold text-orange-300 underline">تتبع طلب العرض</Link>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
