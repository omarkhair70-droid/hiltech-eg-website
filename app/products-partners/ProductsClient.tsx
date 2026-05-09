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

function ProductVisual({ item }: { item: ProductItem }) {
  const visual = visualsByProductId.get(item.id);
  const imagePath = item.image || visual?.imagePath || '';
  const alt = visual?.alt || `Product image for ${item.name}`;
  const [broken, setBroken] = useState(false);

  if (!imagePath || broken) {
    return <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 p-4"><div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-center"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Illustrative visual</p><p className="mt-1 px-4 text-sm font-medium text-slate-100">{item.name}</p></div></div></div>;
  }

  return <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 p-4"><div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5"><div className="absolute left-3 top-3 z-10 h-0.5 w-6 rounded-full bg-orange-400/80" /><Image src={imagePath} alt={alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain p-3" onError={() => setBroken(true)} /></div></div>;
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

  const updateItem = (id: string, patch: Partial<RFQItem>) => setItems((prev) => prev.map((entry) => (entry.id === id ? normalizeRFQItem({ ...entry, ...patch }) : entry)));

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

  return <><section className="mt-4 rounded-xl border border-slate-200 bg-white p-3 md:sticky md:top-16 md:z-20 md:mt-6 md:bg-white/95 md:p-4 md:backdrop-blur"><h2 className="text-xl font-bold md:text-2xl">{t?.categoriesLabel || 'Browse by Category'}</h2><div className="mt-3"><input value={query} onChange={(e) => { const nextQuery = e.target.value; setQuery(nextQuery); setUrlState(activeCategory, nextQuery); }} placeholder={t?.searchPlaceholder || 'Search: CAT6, fiber, rack, ODF, patch panel...'} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/20" /></div><div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"><button onClick={() => { setActiveCategory('All'); setUrlState('All', query); }} className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold shadow-sm md:px-4 md:py-1.5 md:text-sm ${activeCategory === 'All' ? 'border border-orange-200 bg-orange-50 text-orange-700' : 'border border-slate-300 bg-white text-slate-700'}`}>{t?.allCategories || 'All'}</button>{productCategories.map((category) => <button key={category} onClick={() => { setActiveCategory(category); setUrlState(category, query); }} className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition md:px-4 md:py-1.5 md:text-sm ${activeCategory === category ? 'border border-orange-200 bg-orange-50 text-orange-700' : 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'}`}>{category}</button>)}</div>{hasActiveFilters ? <div className="mt-3"><button onClick={clearFilters} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 md:text-sm">{t?.clearFilters || 'Clear filters'}</button></div> : null}<p className="mt-3 text-sm text-slate-600">{query.trim() ? (t?.showingResultsFor ? t.showingResultsFor.replace('{count}', String(filteredProducts.length)).replace('{query}', query.trim()) : `Showing ${filteredProducts.length} results for “${query.trim()}”`) : (t?.showingOfProducts ? t.showingOfProducts.replace('{shown}', String(visibleProducts.length)).replace('{total}', String(filteredProducts.length)) : `Showing ${visibleProducts.length} of ${filteredProducts.length} products`)}</p></section><section id="all" ref={gridRef} className="mt-8 pb-44 md:mt-10 md:pb-24">{filteredProducts.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center"><p className="text-base font-semibold text-slate-900">{t?.noProductsFound || t?.noResults || 'No products found. Try another keyword or start RFQ with your project notes.'}</p><div className="mt-4 flex flex-wrap justify-center gap-2"><button onClick={clearFilters} className="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">{t?.clearFilters || 'Clear filters'}</button><Link href={rfqHref} className="btn-primary">{t?.goToRFQ || 'Start RFQ'}</Link></div></div> : <><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleProducts.map((item) => { const slug = productIntelligenceSlugByCategory[item.category]; return (<article id={`product-${item.id}`} key={item.id} className={`flex h-full scroll-mt-28 flex-col rounded-2xl border bg-white p-4 shadow-sm transition md:p-5 ${highlightedProductId === item.id ? 'border-orange-300 ring-2 ring-orange-400 ring-offset-2' : 'border-slate-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md'}`}><ProductVisual item={item} /><div className="mt-4"><Link href={slug ? `/products-partners/intelligence/${slug}` : '/products-partners'} className="mb-2 inline-flex w-fit rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-700 md:text-[10px]">{item.category}</Link><h3 className="break-words text-base font-bold leading-tight text-slate-900"><Link href={`/products-partners/${item.id}`} className="hover:underline">{item.name}</Link></h3><div className="mt-2 space-y-1.5 text-sm text-slate-600"><p><span className="font-semibold text-slate-800">{t?.specsLabel || 'Specs:'}</span> {item.shortSpecs}</p></div><p className="mt-2 text-xs font-medium text-slate-600">{item.priceNote?.trim() ? (t?.priceRefLabel ? `${t.priceRefLabel} ${item.priceNote.trim()}` : `Price ref: ${item.priceNote.trim()}`) : (t?.priceOnRequest || 'Price on request')}</p></div><div className="mt-auto pt-3"><div className="flex flex-wrap gap-2"><button className="btn-primary px-4 py-2.5 text-sm" onClick={() => addToRFQ(item)} type="button">{t?.addToRFQ || 'Add to RFQ'}</button><Link className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" href={`/products-partners/${item.id}`}>{isArabic ? 'عرض التفاصيل بالإنجليزية' : (t?.viewDetails || 'View details')}</Link><Link className="inline-flex items-center px-1 py-2 text-xs font-medium text-slate-600 underline-offset-2 hover:underline" href={slug ? `/products-partners/intelligence/${slug}` : '/products-partners'}>{isArabic ? 'ملاحظات فنية بالإنجليزية' : (t?.technicalNotes || 'Technical Notes')}</Link></div>{justAdded === item.id ? <p className="mt-2 text-xs font-medium text-emerald-700">{t?.addedToRFQ || 'Added to RFQ'}</p> : null}</div></article>);})}</div>{hasMore ? <div className="mt-6 flex justify-center"><button type="button" onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)} className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">{t?.loadMoreProducts || 'Load More Products'}</button></div> : null}<div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{t?.needHelpScoping || 'Need help scoping items?'} <Link className="font-semibold text-navy-900 underline" href="/scope-finder">{t?.startScopeFinder || 'Start Scope Finder'}</Link>.</div></>}</section><section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">{t?.technicalNotes || 'Technical Notes'} {t?.technicalNotesOptional || '(Optional)'}</h2><p className="mt-2 text-sm text-slate-600">{t?.technicalGuidesHelp || 'Use these guides when you need deeper technical context after building your RFQ list.'}</p><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{productIntelligenceCategories.map((category) => <article key={category.slug} className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-orange-700">{category.eyebrow}</p><h3 className="mt-1 text-lg font-semibold text-slate-900">{category.title}</h3><p className="mt-2 text-sm text-slate-600">{category.intro}</p><div className="mt-3 flex flex-wrap gap-2">{category.relatedCapabilityTags.slice(0, 2).map((tag) => <span key={tag} className="rounded-full border border-slate-300 px-2 py-0.5 text-[11px] text-slate-600">{tag}</span>)}</div><Link className="mt-4 inline-flex items-center text-sm font-semibold text-orange-700" href={`/products-partners/intelligence/${category.slug}`}>{t?.viewTechnicalNotes || `View ${t?.technicalNotes || 'Technical Notes'}`} →</Link></article>)}</div></section><button type="button" onClick={() => { trackEvent('rfq_basket_open', { item_count: items.length, total_units: totalUnits }); setOpen(true); }} className="fixed right-3 z-40 rounded-full bg-navy-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lg ring-1 ring-black/10 transition hover:bg-navy-800 bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] md:bottom-6 md:right-6 md:px-4 md:py-3 md:text-sm">{t?.basketTitle || 'RFQ Basket'} ({count})</button>{open ? <div className="fixed inset-0 z-50"><div className="absolute inset-0 bg-slate-900/30" onClick={() => setOpen(false)} /><aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl"><div className="sticky top-0 bg-navy-900 px-5 py-4 text-white"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{t?.basketTitle || 'RFQ Basket'} ({items.length})</h3><button onClick={() => setOpen(false)} className="rounded-md border border-white/30 px-2 py-1 text-sm">{t?.close || 'Close'}</button></div><p className="mt-2 text-sm text-slate-100">{t?.basketIntro || 'Build your project supply request, add quantities and notes, then send it directly to HILTECH. Final quotation confirmed after RFQ review.'}</p></div><div className="space-y-4 p-5">{items.length === 0 ? <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"><p className="font-semibold text-slate-800">{t?.basketEmpty || 'Your RFQ basket is currently empty.'}</p><p className="mt-1 text-slate-600">Add products to define your request faster.</p><Link href={productsHref} onClick={() => setOpen(false)} className="mt-3 inline-flex rounded-lg bg-navy-900 px-3 py-2 text-white">{t?.browseProducts || t?.continueBrowsing || 'Browse Products'}</Link></div> : items.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 p-3"><h4 className="font-semibold text-slate-900">{item.name}</h4><p className="mt-1 text-xs text-slate-600">{item.category} • {item.brand}</p><p className="mt-1 break-words text-xs font-medium text-slate-700">{item.priceNote?.trim() ? t?.priceRefLabel ? `${t.priceRefLabel} ${item.priceNote.trim()}` : `Reference: ${item.priceNote.trim()}` : (t?.priceOnRequest || 'Price on request')}</p><div className="mt-2 flex flex-wrap items-center gap-2"><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: normalizeRFQQuantity(item.quantity - 1) })}>-</button><span className="text-sm font-semibold">{t?.qtyLabel || 'Qty:'} {item.quantity}</span><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: normalizeRFQQuantity(item.quantity + 1) })}>+</button><input className="w-full min-w-0 rounded border border-slate-300 px-2 py-1 text-xs sm:ml-auto sm:w-24" value={item.unit} onChange={(e) => updateItem(item.id, { unit: e.target.value })} /></div><textarea className="mt-2 w-full rounded-md border border-slate-300 p-2 text-xs" rows={2} value={item.notes} onChange={(e) => updateItem(item.id, { notes: e.target.value })} placeholder={t?.addItemNotes || 'Add item notes'} /><button className="mt-2 text-xs font-semibold text-red-600" onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}>{t?.removeItem || 'Remove item'}</button></article>)}<div className="flex flex-wrap gap-2"><Link href={rfqHref} onClick={() => { trackEvent('rfq_basket_review_click', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' }); setOpen(false); }} className="btn-primary">{t?.reviewRfqBasket || t?.goToRFQ || 'Review RFQ Basket'}</Link><a className="btn-primary bg-orange-500 hover:bg-orange-600" href={getRFQWhatsappLink(items.map((item) => normalizeRFQItem(item)))} target="_blank" rel="noreferrer" onClick={() => trackEvent('rfq_whatsapp_click', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' })}>{t?.sendViaWhatsapp || 'Send via WhatsApp'}</a><button className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={() => { trackEvent('rfq_basket_clear', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' }); setItems([]); }}>{t?.clearBasket || 'Clear Basket'}</button></div></div></aside></div> : null}</>;
}
