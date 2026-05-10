'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { productIntelligenceCategories, productIntelligenceSlugByCategory } from '@/content/product-intelligence';
import { productVisuals } from '@/content/product-visuals';
import { productCategories, products as staticProducts, type ProductItem } from '@/content/products';
import { trackEvent } from '@/lib/client/analytics';
import { getRFQWhatsappLink, normalizeRFQItem, normalizeRFQQuantity, readRFQItems, writeRFQItems, type RFQItem } from '@/lib/rfq';

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 12;
const ARABIC_ALIAS_MAP: Record<string, string[]> = {
  '\u0643\u0627\u0628\u0644\u0627\u062a': ['cable', 'cables', 'cat6', 'copper'],
  '\u0641\u0627\u064a\u0628\u0631': ['fiber', 'optic', 'om3', 'os2'],
  '\u0631\u0627\u0643\u0627\u062a': ['rack', 'cabinet', 'pdu'],
  '\u0643\u0627\u0645\u064a\u0631\u0627\u062a': ['cctv', 'camera', 'security'],
  '\u0623\u0644\u064a\u0627\u0641': ['fiber', 'optic'],
  '\u0634\u0628\u0643\u0629': ['network', 'connectivity', 'switching'],
};

function toRFQItem(item: ProductItem): RFQItem {
  return normalizeRFQItem({
    id: item.id,
    name: item.name,
    category: item.category,
    brand: item.brand,
    specs: item.shortSpecs,
    quantity: 1,
    priceNote: item.priceNote,
  });
}

const visualsByProductId = new Map(productVisuals.map((visual) => [visual.productId, visual]));

function ProductVisual({ item, isArabic = false }: { item: ProductItem; isArabic?: boolean }) {
  const visual = visualsByProductId.get(item.id);
  const imagePath = item.image || visual?.imagePath || '';
  const alt = visual?.alt || `Product image for ${item.name}`;
  const [broken, setBroken] = useState(false);

  if (!imagePath || broken) {
    return <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm"><div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-center"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{isArabic ? 'صورة توضيحية للمنتج' : 'Illustrative visual'}</p><p className="mt-1 px-4 text-sm font-medium text-slate-100">{item.name}</p></div></div></div>;
  }

  return <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm"><div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5"><div className="absolute left-3 top-3 z-10 h-0.5 w-6 rounded-full bg-orange-400/80" /><Image src={imagePath} alt={alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain p-3" onError={() => setBroken(true)} /></div></div>;
}

function expandQuery(rawQuery: string) {
  const normalized = rawQuery.trim().toLowerCase();
  if (!normalized) return [];
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const expanded = new Set(tokens);

  for (const token of tokens) {
    (ARABIC_ALIAS_MAP[token] || []).forEach((alias) => expanded.add(alias));
  }

  return Array.from(expanded);
}

export default function ProductsClient({ initialProducts = staticProducts, locale = 'en', messages, rfqHref = '/rfq', productsHref = '/products-partners' }: { initialProducts?: ProductItem[]; locale?: 'en'|'ar'; messages?: any; rfqHref?: string; productsHref?: string }) {
  const t = messages;
  const isArabic = locale === 'ar';
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [items, setItems] = useState<RFQItem[]>([]);
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [highlightedProductId, setHighlightedProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | (typeof productCategories)[number]>('All');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + normalizeRFQQuantity(item.quantity), 0), [items]);
  const totalUnits = count;

  const baseCategoryProducts = useMemo(
    () => (activeCategory === 'All' ? initialProducts : initialProducts.filter((item) => item.category === activeCategory)),
    [activeCategory, initialProducts],
  );

  const queryTokens = useMemo(() => expandQuery(query), [query]);

  const filteredProducts = useMemo(() => {
    if (!queryTokens.length) return baseCategoryProducts;

    return baseCategoryProducts.filter((item) => {
      const haystack = [item.name, item.brand, item.category, item.shortSpecs, item.useCase].join(' ').toLowerCase();
      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [baseCategoryProducts, queryTokens]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeCategory, query]);

  useEffect(() => {
    trackEvent('product_category_filter', {
      category: activeCategory,
      visible_count: visibleProducts.length,
      total_count: filteredProducts.length,
    });
  }, [activeCategory, filteredProducts.length, visibleProducts.length]);

  useEffect(() => {
    const productParam = searchParams.get('product');
    const categoryParam = searchParams.get('category');
    const queryParam = searchParams.get('q');

    setQuery(queryParam?.trim() || '');

    if (productParam) {
      const target = initialProducts.find((item) => item.id === productParam);
      if (!target) return;
      setActiveCategory(target.category);
      setVisibleCount((prev) => Math.max(prev, initialProducts.filter((item) => item.category === target.category).length));
      setHighlightedProductId(target.id);
      return;
    }

    if (categoryParam && productCategories.includes(categoryParam as (typeof productCategories)[number])) {
      setActiveCategory(categoryParam as (typeof productCategories)[number]);
      setHighlightedProductId(null);
      window.setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }

    setActiveCategory('All');
    setHighlightedProductId(null);
  }, [initialProducts, searchParams]);

  useEffect(() => {
    if (!highlightedProductId) return;
    const timeout = window.setTimeout(() => {
      const node = document.getElementById(`product-${highlightedProductId}`);
      if (!node) return;
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => {
        node.classList.add('ring-2', 'ring-orange-400', 'ring-offset-2');
      }, 200);
    }, 180);

    const clear = window.setTimeout(() => {
      setHighlightedProductId((curr) => (curr === highlightedProductId ? null : curr));
    }, 5000);

    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(clear);
    };
  }, [highlightedProductId]);

  const setUrlState = (nextCategory: typeof activeCategory, nextQuery: string, includeProduct = false) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory !== 'All') params.set('category', nextCategory);
    else params.delete('category');

    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    else params.delete('q');

    if (!includeProduct) params.delete('product');

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('All');
    setHighlightedProductId(null);
    setVisibleCount(INITIAL_VISIBLE);
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(query.trim()) || activeCategory !== 'All' || Boolean(searchParams.get('product'));
  const localizeCategory = (category: string) => isArabic ? (t?.categoryLabels?.[category] || category) : category;
  const productDetailHref = (id: string) => isArabic ? `/ar/products-partners/${id}` : `/products-partners/${id}`;

  const arabicIntelligenceLabels: Record<string, { title: string; intro: string }> = {
    fiber: {
      title: 'ملاحظات فنية للفايبر',
      intro: 'سياق فني يساعد على فهم مكونات الفايبر وODF والباتش كورد قبل طلب عرض السعر.',
    },
    copper: {
      title: 'ملاحظات فنية للكابلات النحاسية',
      intro: 'إرشادات سريعة لاختيار الكابلات وملحقات التوصيل المناسبة قبل تجهيز طلب التسعير.',
    },
    patching: {
      title: 'ملاحظات فنية للربط والتوصيل',
      intro: 'ملخص عملي حول عناصر الباتش كورد والتنظيم لضمان توافق المكونات داخل المشروع.',
    },
    access: {
      title: 'ملاحظات فنية لنقاط الشبكة',
      intro: 'نظرة مختصرة على الفيس بليت والكيستون وتنسيق المخارج بما يلائم نطاق العمل.',
    },
    infrastructure: {
      title: 'ملاحظات فنية للبنية التحتية',
      intro: 'محتوى مساعد لفهم الراك والكابينات وإدارة الطاقة قبل طلب العرض النهائي.',
    },
    pathways: {
      title: 'ملاحظات فنية لمسارات الكابلات',
      intro: 'توجيهات أساسية لتخطيط المسارات والدكت بما يدعم تنفيذًا منظمًا وسهل الصيانة.',
    },
    security: {
      title: 'ملاحظات فنية للبنية الأمنية',
      intro: 'نقاط فنية مختصرة لمكونات CCTV والملحقات قبل إدراجها ضمن طلب عرض السعر.',
    },
  };

  const intelligenceHref = (slug?: string) => {
    if (!slug) return isArabic ? '/ar/products-partners' : '/products-partners';
    return isArabic ? `/ar/products-partners/intelligence/${slug}` : `/products-partners/intelligence/${slug}`;
  };

  const updateItem = (id: string, patch: Partial<RFQItem>) => setItems((prev) => prev.map((entry) => (entry.id === id ? normalizeRFQItem({ ...entry, ...patch }) : entry)));

  const scopeKits = isArabic
    ? [
        { title: 'تجهيز شبكة مكتب', items: ['كابلات CAT6', 'باتش بانل', 'فيس بليت', 'ملحقات الراك', 'الاختبار'], href: '/ar/rfq' },
        { title: 'تجهيز راك وغرفة بيانات', items: ['راك', 'PDU', 'تنظيم الكابلات', 'باتش بانل', 'التسمية والاختبار'], href: '/ar/rfq' },
        { title: 'نطاق فايبر وODF', items: ['كابل فايبر', 'ODF', 'باتش كورد', 'اللحام والاختبار'], href: '/ar/rfq' },
        { title: 'بنية تحتية للكاميرات', items: ['نقاط شبكة', 'كابلات', 'راك', 'تجهيزات الطاقة والشبكة'], href: '/ar/rfq' },
      ]
    : [
        { title: 'Office Network Setup', items: ['CAT6 cabling', 'patch panel', 'faceplates', 'rack accessories', 'testing'], href: '/rfq' },
        { title: 'Rack Room Preparation', items: ['racks', 'PDU', 'cable management', 'patch panels', 'labeling/testing'], href: '/rfq' },
        { title: 'Fiber Backbone Scope', items: ['fiber cable', 'ODF', 'patch cords', 'splicing/testing'], href: '/rfq' },
        { title: 'CCTV Infrastructure Scope', items: ['network points', 'cabling', 'racks', 'power/network preparation'], href: '/rfq' },
      ];


  const addToRFQ = (product: ProductItem) => {
    setItems((prev) => {
      const found = prev.find((entry) => entry.id === product.id);
      const nextItems = found ? prev.map((entry) => (entry.id === product.id ? { ...entry, quantity: normalizeRFQQuantity(entry.quantity + 1) } : entry)) : [...prev, toRFQItem(product)];

      trackEvent('product_add_to_rfq', {
        product_id: product.id,
        product_name: product.name,
        category: product.category,
        brand: product.brand,
        basket_count_after: nextItems.length,
      });

      return nextItems;
    });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded((curr) => (curr === product.id ? null : curr)), 1400);
  };


  return <><section className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3 md:mt-6 md:bg-slate-900/95 md:p-4"><h2 className="text-xl font-bold md:text-2xl">{t?.categoriesLabel || 'Browse by Category'}</h2><div className="mt-3"><input value={query} onChange={(e) => { const nextQuery = e.target.value; setQuery(nextQuery); setUrlState(activeCategory, nextQuery); }} placeholder={t?.searchPlaceholder || 'Search: CAT6, fiber, rack, ODF, patch panel...'} className="w-full rounded-lg border border-white/20 px-3 py-2 text-sm text-white shadow-sm focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-400/20" /></div><div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"><button onClick={() => { setActiveCategory('All'); setUrlState('All', query); }} className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold shadow-sm md:px-4 md:py-1.5 md:text-sm ${activeCategory === 'All' ? 'border border-orange-500/40 bg-orange-500/10 text-orange-200' : 'border border-white/20 bg-white/5 text-slate-200'}`}>{t?.allCategories || 'All'}</button>{productCategories.map((category) => <button key={category} onClick={() => { setActiveCategory(category); setUrlState(category, query); }} className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition md:px-4 md:py-1.5 md:text-sm ${activeCategory === category ? 'border border-orange-500/40 bg-orange-500/10 text-orange-200' : 'border border-white/20 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-gradient-to-br from-white/10 to-white/5'}`}>{localizeCategory(category)}</button>)}</div>{hasActiveFilters ? <div className="mt-3"><button onClick={clearFilters} className="inline-flex rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-gradient-to-br from-white/10 to-white/5 md:text-sm">{t?.clearFilters || 'Clear filters'}</button></div> : null}<p className="mt-3 text-sm text-slate-300">{query.trim() ? (t?.showingResultsFor ? t.showingResultsFor.replace('{count}', String(filteredProducts.length)).replace('{query}', query.trim()) : `Showing ${filteredProducts.length} results for “${query.trim()}”`) : (t?.showingOfProducts ? t.showingOfProducts.replace('{shown}', String(visibleProducts.length)).replace('{total}', String(filteredProducts.length)) : `Showing ${visibleProducts.length} of ${filteredProducts.length} products`)}</p></section><section className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4 md:p-6"><h2 className="text-xl font-bold text-white md:text-2xl">{isArabic ? 'جهّز نطاق مشروع كامل' : 'Build a Complete Project Scope'}</h2><p className="mt-2 text-sm text-slate-300">{isArabic ? 'ابدأ طلب عرض سعر يشمل كل عناصر التنفيذ المطلوبة لمشروعك.' : 'Start an RFQ that covers all required deliverables for your project.'}</p><div className="mt-4 grid gap-3 md:grid-cols-2">{scopeKits.map((kit) => <article key={kit.title} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4"><h3 className="text-base font-semibold text-white">{kit.title}</h3><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-200">{kit.items.map((point) => <li key={point}>{point}</li>)}</ul><Link href={kit.href} className="mt-3 inline-flex text-sm font-semibold text-navy-900 underline">{isArabic ? 'ابدأ طلب عرض بهذا النطاق' : 'Start RFQ with this scope'}</Link></article>)}</div></section><section id="all" ref={gridRef} className="mt-8 pb-44 md:mt-10 md:pb-24">{filteredProducts.length === 0 ? <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center"><p className="text-base font-semibold text-white">{t?.noProductsFound || t?.noResults || 'No products found. Try another keyword or start RFQ with your project notes.'}</p><div className="mt-4 flex flex-wrap justify-center gap-2"><button onClick={clearFilters} className="inline-flex rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-slate-200">{t?.clearFilters || 'Clear filters'}</button><Link href={rfqHref} className="btn-primary">{t?.goToRFQ || 'Start RFQ'}</Link></div></div> : <><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleProducts.map((item) => { const slug = productIntelligenceSlugByCategory[item.category]; return (<article id={`product-${item.id}`} key={item.id} className={`flex h-full scroll-mt-28 flex-col rounded-2xl border bg-white/5 p-4 shadow-sm transition md:p-5 ${highlightedProductId === item.id ? 'border-orange-300 ring-2 ring-orange-400 ring-offset-2' : 'border-white/15 hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-md'}`}><Link href={productDetailHref(item.id)} className="block cursor-pointer" aria-label={item.name}><ProductVisual item={item} isArabic={isArabic} /></Link><div className="mt-4"><Link href={intelligenceHref(slug)} className="mb-2 inline-flex w-fit cursor-pointer rounded-full border border-orange-100 bg-orange-500/10 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-orange-200 md:text-[10px]">{localizeCategory(item.category)}</Link><Link href={productDetailHref(item.id)} className="block cursor-pointer rounded-lg hover:bg-gradient-to-br from-white/10 to-white/5"><h3 className="break-words text-base font-bold leading-tight text-white hover:underline">{item.name}</h3></Link></div><p className="mt-2 text-xs text-slate-300">{isArabic ? 'أضف كل عناصر المشروع للحصول على تسعير أدق للنطاق بالكامل.' : 'Add all required items to quote the full project scope.'}</p><div className="mt-auto pt-3"><div className="flex flex-wrap gap-2"><button className="btn-primary px-4 py-2.5 text-sm" onClick={() => addToRFQ(item)} type="button">{t?.addToRFQ || 'Add to RFQ'}</button><Link className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-gradient-to-br from-white/10 to-white/5" href={productDetailHref(item.id)}>{t?.viewDetails || 'View details'}</Link><Link className="inline-flex items-center px-1 py-2 text-xs font-medium text-slate-300 underline-offset-2 hover:underline" href={intelligenceHref(slug)}>{t?.technicalNotes || 'Technical Notes'}</Link></div>{justAdded === item.id ? <p className="mt-2 text-xs font-medium text-emerald-700">{t?.addedToRFQ || 'Added to RFQ'}</p> : null}</div></article>);})}</div>{hasMore ? <div className="mt-6 flex justify-center"><button type="button" onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)} className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-gradient-to-br from-white/10 to-white/5">{t?.loadMoreProducts || 'Load More Products'}</button></div> : null}<div className="mt-6 rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 px-4 py-3 text-sm text-slate-200">{t?.needHelpScoping || 'Need help scoping items?'} <Link className="font-semibold text-navy-900 underline" href={isArabic ? '/ar/scope-finder' : '/scope-finder'}>{t?.startScopeFinder || 'Start Scope Finder'}</Link>.</div></>}</section><section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-5 md:p-6"><h2 className="text-2xl font-bold text-white">{isArabic ? 'ملاحظات فنية اختيارية' : `${t?.technicalNotes || 'Technical Notes'} ${t?.technicalNotesOptional || '(Optional)'}`}</h2><p className="mt-2 text-sm text-slate-300">{t?.technicalGuidesHelp || 'Use these guides when you need deeper technical context after building your RFQ list.'}</p><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{productIntelligenceCategories.map((category) => <article key={category.slug} className="rounded-xl border border-white/15 bg-gradient-to-br from-slate-900/90 to-slate-800/70 p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-orange-200">{isArabic ? 'مرجع فني' : category.eyebrow}</p><h3 className="mt-1 text-lg font-semibold text-white">{isArabic ? (arabicIntelligenceLabels[category.slug]?.title || 'ملاحظات فنية') : category.title}</h3><p className="mt-2 text-sm text-slate-300">{isArabic ? (arabicIntelligenceLabels[category.slug]?.intro || 'قد تتضمن المراجع الفنية بعض المصطلحات الإنجليزية حسب طبيعة المنتجات.') : category.intro}</p><div className="mt-3 flex flex-wrap gap-2">{(isArabic ? ['قد تتضمن مصطلحات إنجليزية', 'روابط عربية متاحة'] : category.relatedCapabilityTags.slice(0, 2)).map((tag) => <span key={tag} className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-slate-300">{tag}</span>)}</div><Link className="mt-4 inline-flex items-center text-sm font-semibold text-orange-200" href={intelligenceHref(category.slug)}>{isArabic ? 'عرض الملاحظات الفنية ←' : (t?.viewTechnicalNotes || `View ${t?.technicalNotes || 'Technical Notes'}`) + ' →'}</Link></article>)}</div></section><button type="button" onClick={() => { trackEvent('rfq_basket_open', { item_count: items.length, total_units: totalUnits }); setOpen(true); }} className="fixed right-3 z-40 rounded-full bg-navy-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lg ring-1 ring-black/10 transition hover:bg-navy-800 bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] md:bottom-6 md:right-6 md:px-4 md:py-3 md:text-sm">{t?.basketTitle || 'RFQ Basket'} ({count})</button>{open ? <div className="fixed inset-0 z-50"><div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px]" onClick={() => setOpen(false)} /><aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-white/15 bg-slate-950/95 shadow-2xl backdrop-blur-xl"><div className="sticky top-0 border-b border-white/10 bg-slate-950/95 px-5 py-4 text-white backdrop-blur"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{t?.basketTitle || 'RFQ Basket'} ({items.length})</h3><button onClick={() => setOpen(false)} className="rounded-md border border-white/30 px-2 py-1 text-sm">{t?.close || 'Close'}</button></div><p className="mt-2 text-sm text-slate-100">{t?.basketIntro || 'Build your project supply request, add quantities and notes, then send it directly to HILTECH. Final quotation confirmed after RFQ review.'}</p></div><div className="space-y-4 p-5 md:p-6"><p className="rounded-xl border border-orange-100 bg-orange-500/10 px-3 py-2 text-xs text-slate-200">{t?.basketScopeHint || (isArabic ? 'أضف كل العناصر المطلوبة قبل الإرسال حتى يتمكن فريق HILTECH من تسعير نطاق المشروع بالكامل.' : 'Add all required items before submitting so HILTECH can quote the full project scope.')}</p>{items.length === 0 ? <div className="rounded-xl border border-white/15 bg-slate-900/70 p-5 text-sm leading-6"><p className="font-semibold text-white">{t?.basketEmpty || 'Your RFQ basket is currently empty.'}</p><p className="mt-1 text-slate-300">{t?.basketEmptyHint || 'Add products to define your request faster.'}</p><Link href={productsHref} onClick={() => setOpen(false)} className="mt-3 inline-flex rounded-lg bg-navy-900 px-3 py-2 text-white">{t?.browseProducts || t?.continueBrowsing || 'Browse Products'}</Link></div> : items.map((item) => <article key={item.id} className="rounded-xl border border-white/15 bg-slate-900/60 p-4"><h4 className="font-semibold text-white">{item.name}</h4><p className="mt-1 text-xs text-slate-300">{localizeCategory(item.category)} • {item.brand}</p><p className="mt-1 break-words text-xs font-medium text-slate-200">{item.priceNote?.trim() ? t?.priceRefLabel ? `${t.priceRefLabel} ${item.priceNote.trim()}` : `Reference: ${item.priceNote.trim()}` : (t?.priceOnRequest || 'Price on request')}</p><div className="mt-2 flex flex-wrap items-center gap-2"><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: normalizeRFQQuantity(item.quantity - 1) })}>-</button><span className="text-sm font-semibold">{t?.qtyLabel || 'Qty:'} {item.quantity}</span><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: normalizeRFQQuantity(item.quantity + 1) })}>+</button><input className="w-full min-w-0 rounded border border-white/20 px-2 py-1 text-xs sm:ml-auto sm:w-24" value={item.unit} onChange={(e) => updateItem(item.id, { unit: e.target.value })} /></div><textarea className="mt-2 w-full rounded-md border border-white/20 p-2 text-xs" rows={2} value={item.notes} onChange={(e) => updateItem(item.id, { notes: e.target.value })} placeholder={t?.addItemNotes || 'Add item notes'} /><button className="mt-2 text-xs font-semibold text-red-600" onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}>{t?.removeItem || 'Remove item'}</button></article>)}<div className="flex flex-wrap gap-2"><Link href={rfqHref} onClick={() => { trackEvent('rfq_basket_review_click', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' }); setOpen(false); }} className="btn-primary">{t?.reviewRfqBasket || t?.goToRFQ || 'Review RFQ Basket'}</Link><a className="inline-flex items-center rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-200 hover:bg-orange-100" href={getRFQWhatsappLink(items.map((item) => normalizeRFQItem(item)))} target="_blank" rel="noreferrer" onClick={() => trackEvent('rfq_whatsapp_click', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' })}>{t?.sendViaWhatsapp || 'Send via WhatsApp'}</a><button className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-500 hover:bg-gradient-to-br from-white/10 to-white/5" onClick={() => { trackEvent('rfq_basket_clear', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' }); setItems([]); }}>{t?.clearBasket || 'Clear Basket'}</button></div></div></aside></div> : null}</>;
}
