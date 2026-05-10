'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { popularSearchShortcuts, siteSearchIndex, type SearchEntry, type SearchType } from '@/lib/site-search';
import { getLocalizedPath } from '@/lib/i18n/routes';

interface SiteSearchProps {
  onNavigate?: () => void;
  className?: string;
}

const typeStyles: Record<SearchType, string> = {
  Products: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  Solutions: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  Services: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Resources: 'bg-amber-50 text-amber-700 border-amber-100',
  Guides: 'bg-violet-50 text-violet-700 border-violet-100',
  Pages: 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function SiteSearch({ onNavigate, className }: SiteSearchProps) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 20);
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return popularSearchShortcuts;

    const scored = siteSearchIndex
      .map((entry) => ({ entry, score: scoreEntry(entry, normalized) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

    return scored.slice(0, 10).map((item) => item.entry);
  }, [query]);

  const grouped = useMemo(() => {
    const order: SearchType[] = ['Products', 'Solutions', 'Services', 'Resources', 'Guides', 'Pages'];
    return order
      .map((type) => ({ type, items: results.filter((entry) => entry.type === type) }))
      .filter((group) => group.items.length > 0);
  }, [results]);

  const closeSearch = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <>
      <button
        type="button"
        className={className ?? 'inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {isArabic ? 'بحث' : 'Search'}
      </button>
      {open ? (
        <div className="fixed inset-0 z-[60] bg-slate-900/35 p-3 sm:p-6" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="border-b border-slate-200 p-3 sm:p-4">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={isArabic ? 'ابحث عن المنتجات أو الحلول أو طلب عرض السعر...' : 'Search products, solutions, RFQ, resources...'}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-orange-500/60 placeholder:text-slate-400 focus:ring"
              />
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-3 sm:p-4">
              {grouped.length === 0 ? <p className="text-sm text-slate-500">{isArabic ? 'لا توجد نتائج مطابقة.' : 'No matching results found.'}</p> : null}
              <div className="space-y-5">
                {grouped.map((group) => (
                  <section key={group.type}>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{getTypeLabel(group.type, Boolean(isArabic))}</h3>
                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <Link key={`${group.type}-${item.title}-${item.href}`} href={getLocalizedHref(item.href, Boolean(isArabic))} onClick={closeSearch} className="block rounded-lg border border-slate-200 bg-white p-3 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/40">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-slate-900">{Boolean(isArabic) ? getArabicPageTitle(item.title) : item.title}</p>
                            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${typeStyles[item.type]}`}>{getTypeLabel(item.type, Boolean(isArabic))}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600">{Boolean(isArabic) ? getArabicPageDescription(item) : item.description}</p>
                          <div className="mt-2 flex items-center justify-between gap-2"> 
                            <p className="truncate text-xs font-medium text-slate-500">{getLocalizedHref(item.href, Boolean(isArabic))}</p>
                            {item.type === 'Products' ? <span className="text-[11px] font-semibold text-orange-700">فتح ضمن المنتجات</span> : null}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function scoreEntry(entry: SearchEntry, normalizedQuery: string): number {
  const title = entry.title.toLowerCase();
  const description = entry.description.toLowerCase();
  const keywords = entry.keywords.map((keyword) => keyword.toLowerCase());

  if (title === normalizedQuery) return 100;
  if (title.startsWith(normalizedQuery)) return 80;
  if (title.includes(normalizedQuery)) return 65;
  if (keywords.some((keyword) => keyword === normalizedQuery)) return 50;
  if (keywords.some((keyword) => keyword.includes(normalizedQuery))) return 35;
  if (description.includes(normalizedQuery)) return 20;
  if (entry.type.toLowerCase().includes(normalizedQuery)) return 10;
  return 0;
}


const arabicTypeLabels: Record<SearchType, string> = {
  Products: 'المنتجات',
  Solutions: 'الحلول',
  Services: 'الخدمات',
  Resources: 'الموارد',
  Guides: 'الأدلة',
  Pages: 'الصفحات',
};

const arabicPageTitleMap: Record<string, string> = { Home: 'الرئيسية', 'Products & Partners': 'المنتجات', 'Start RFQ': 'طلب عرض سعر', 'Track RFQ': 'تتبع طلب العرض', Company: 'الشركة', Contact: 'تواصل معنا', 'Field Work & References': 'أعمالنا', Services: 'الخدمات', Solutions: 'الحلول', 'Browse Products': 'المنتجات' };
const arabicPageDescriptionMap: Record<string, string> = {
  Home: 'الصفحة الرئيسية مع نبذة عن قدرات هيلتك وروابط سريعة.',
  'Products & Partners': 'تصفح المنتجات والعلامات التجارية وأضف العناصر إلى سلة طلب عرض السعر.',
  Solutions: 'حلول بنية تحتية موجهة لنتائج الأعمال.',
  Services: 'خدمات التنفيذ والتركيب والاختبار الميداني للبنية التحتية.',
  'Field Work & References': 'مراجع أعمال ميدانية وصور تنفيذ المشاريع.',
  Company: 'تعرف على الشركة وخبراتها ومجالات العمل.',
  Contact: 'تواصل معنا للتخطيط للمشروعات والدعم.',
  'Start RFQ': 'ابدأ طلب عرض السعر وأرسل متطلبات المشروع.',
  'Track RFQ': 'تابع حالة طلب عرض السعر المرسل.',
};

function getTypeLabel(type: SearchType, isArabic: boolean): string {
  return isArabic ? arabicTypeLabels[type] : type;
}

function getLocalizedHref(href: string, isArabic: boolean): string {
  return isArabic ? getLocalizedPath(href, 'ar') : getLocalizedPath(href, 'en');
}

function getArabicPageTitle(title: string): string {
  return arabicPageTitleMap[title] || title;
}

function getArabicPageDescription(item: SearchEntry): string { return arabicPageDescriptionMap[item.title] || item.description; }
