'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { productIntelligenceCategories, productIntelligenceSlugByCategory } from '@/content/product-intelligence';
import { productVisuals } from '@/content/product-visuals';
import { productCategories, products as staticProducts, type ProductItem } from '@/content/products';
import { site } from '@/content/site';
import { trackEvent } from '@/lib/client/analytics';
import { getRFQWhatsappLink, normalizeRFQItem, readRFQItems, writeRFQItems, type RFQItem } from '@/lib/rfq';

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 12;

function toRFQItem(item: ProductItem): RFQItem {
  return normalizeRFQItem({ id: item.id, name: item.name, category: item.category, brand: item.brand, specs: item.shortSpecs, quantity: 1 });
}

const visualsByProductId = new Map(productVisuals.map((visual) => [visual.productId, visual]));

function ProductVisual({ item }: { item: ProductItem }) {
  const visual = visualsByProductId.get(item.id);
  const imagePath = item.image || visual?.imagePath || '';
  const alt = visual?.alt || `Product image for ${item.name}`;
  const [broken, setBroken] = useState(false);

  if (!imagePath || broken) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 p-4"><div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Illustrative visual</p>
          <p className="mt-1 px-4 text-sm font-medium text-slate-100">{item.name}</p>
        </div>
      </div></div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 p-4">
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <Image
        src={imagePath}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-contain p-3"
        onError={() => setBroken(true)}
      />
      </div>
    </div>
  );
}

export default function ProductsClient({ initialProducts = staticProducts }: { initialProducts?: ProductItem[] }) {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | (typeof productCategories)[number]>('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalUnits = count;

  const updateItem = (id: string, patch: Partial<RFQItem>) => setItems((prev) => prev.map((entry) => (entry.id === id ? normalizeRFQItem({ ...entry, ...patch }) : entry)));

  const filteredProducts = useMemo(
    () => (activeCategory === 'All' ? initialProducts : initialProducts.filter((item) => item.category === activeCategory)),
    [activeCategory, initialProducts]
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeCategory]);

  useEffect(() => {
    trackEvent('product_category_filter', {
      category: activeCategory,
      visible_count: visibleProducts.length,
      total_count: filteredProducts.length,
    });
  }, [activeCategory, filteredProducts.length, visibleProducts.length]);

  const addToRFQ = (product: ProductItem) => {
    setItems((prev) => {
      const found = prev.find((entry) => entry.id === product.id);
      const nextItems = found
        ? prev.map((entry) => (entry.id === product.id ? { ...entry, quantity: entry.quantity + 1 } : entry))
        : [...prev, toRFQItem(product)];

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

  return <><p className="mt-4 max-w-4xl text-slate-700">Browse categories, filter products, and add required items to your RFQ basket.</p><p className="mt-3 rounded-lg border border-navy-900/10 bg-navy-900 px-4 py-2.5 text-sm text-white">HILTECH confirms final availability and quotation after RFQ submission.</p><section className="mt-6 rounded-xl border border-slate-200 bg-white p-3 md:sticky md:top-16 md:z-20 md:mt-8 md:bg-white/95 md:p-4 md:backdrop-blur"><h2 className="text-xl font-bold md:text-2xl">Browse by Category</h2><div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"><button onClick={() => setActiveCategory('All')} className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold shadow-sm md:px-4 md:py-1.5 md:text-sm ${activeCategory === 'All' ? 'border border-orange-200 bg-orange-50 text-orange-700' : 'border border-slate-300 bg-white text-slate-700'}`}>All</button>{productCategories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition md:px-4 md:py-1.5 md:text-sm ${activeCategory === category ? 'border border-orange-200 bg-orange-50 text-orange-700' : 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'}`}>{category}</button>)}</div><p className="mt-3 text-sm text-slate-600">Showing {visibleProducts.length} of {filteredProducts.length} products</p></section><section id="all" className="mt-8 pb-44 md:mt-10 md:pb-24"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleProducts.map((item) => { const slug = productIntelligenceSlugByCategory[item.category]; return (<article key={item.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md md:p-5"><ProductVisual item={item} /><div className="mt-4"><Link href={slug ? `/products-partners/${slug}` : '/products-partners'} className="mb-2 inline-flex w-fit rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-700 md:text-[10px]">{item.category}</Link><h3 className="text-base font-bold leading-tight text-slate-900 break-words">{item.name}</h3><div className="mt-2 space-y-1.5 text-sm text-slate-600"><p><span className="font-semibold text-slate-800">Brand:</span> {item.brand}</p><p><span className="font-semibold text-slate-800">Specs:</span> {item.shortSpecs}</p><p><span className="font-semibold text-slate-800">Use case:</span> {item.useCase}</p></div><p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">Price and availability upon request</p></div><div className="mt-auto pt-3"><div className="flex flex-wrap gap-2"><button className="btn-primary px-4 py-2.5 text-sm" onClick={() => addToRFQ(item)} type="button">Add to RFQ</button><Link className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50" href={slug ? `/products-partners/${slug}` : '/products-partners'}>Category Guide</Link></div>{justAdded === item.id ? <p className="mt-2 text-xs font-medium text-emerald-700">Added to RFQ</p> : null}</div></article>);})}</div>{hasMore ? <div className="mt-6 flex justify-center"><button type="button" onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)} className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Load More Products</button></div> : null}</section><section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Category Guide (Optional)</h2><p className="mt-2 text-sm text-slate-600">Use these guides when you need deeper technical context after building your RFQ list.</p><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{productIntelligenceCategories.map((category) => <article key={category.slug} className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-orange-700">{category.eyebrow}</p><h3 className="mt-1 text-lg font-semibold text-slate-900">{category.title}</h3><p className="mt-2 text-sm text-slate-600">{category.intro}</p><div className="mt-3 flex flex-wrap gap-2">{category.relatedCapabilityTags.slice(0, 2).map((tag) => <span key={tag} className="rounded-full border border-slate-300 px-2 py-0.5 text-[11px] text-slate-600">{tag}</span>)}</div><Link className="mt-4 inline-flex items-center text-sm font-semibold text-orange-700" href={`/products-partners/${category.slug}`}>View Category Guide →</Link></article>)}</div></section><button type="button" onClick={() => { trackEvent('rfq_basket_open', { item_count: items.length, total_units: totalUnits }); setOpen(true); }} className="fixed right-3 z-40 rounded-full bg-navy-900 px-3 py-2 text-[11px] font-semibold text-white shadow-lg ring-1 ring-black/10 transition hover:bg-navy-800 bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] md:bottom-6 md:right-6 md:px-4 md:py-3 md:text-sm">RFQ Basket ({count})</button>{open ? <div className="fixed inset-0 z-50"><div className="absolute inset-0 bg-slate-900/30" onClick={() => setOpen(false)} /><aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl"><div className="sticky top-0 bg-navy-900 px-5 py-4 text-white"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold">RFQ Basket ({items.length})</h3><button onClick={() => setOpen(false)} className="rounded-md border border-white/30 px-2 py-1 text-sm">Close</button></div><p className="mt-2 text-sm text-slate-100">Build your project supply request, add quantities and notes, then send it directly to HILTECH for availability and quotation.</p></div><div className="space-y-4 p-5">{items.length === 0 ? <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"><p className="font-semibold text-slate-800">Your RFQ basket is currently empty.</p><p className="mt-1 text-slate-600">Add products to define your request faster.</p><Link href="/products-partners" onClick={() => setOpen(false)} className="mt-3 inline-flex rounded-lg bg-navy-900 px-3 py-2 text-white">Browse Products</Link></div> : items.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 p-3"><h4 className="font-semibold text-slate-900">{item.name}</h4><p className="mt-1 text-xs text-slate-600">{item.category} • {item.brand}</p><div className="mt-2 flex flex-wrap items-center gap-2"><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: item.quantity - 1 })}>-</button><span className="text-sm font-semibold">Qty: {item.quantity}</span><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}>+</button><input className="w-full min-w-0 rounded border border-slate-300 px-2 py-1 text-xs sm:ml-auto sm:w-24" value={item.unit} onChange={(e) => updateItem(item.id, { unit: e.target.value })} /></div><textarea className="mt-2 w-full rounded-md border border-slate-300 p-2 text-xs" rows={2} value={item.notes} onChange={(e) => updateItem(item.id, { notes: e.target.value })} placeholder="Add item notes" /><button className="mt-2 text-xs font-semibold text-red-600" onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}>Remove item</button></article>)}<div className="flex flex-wrap gap-2"><Link href="/rfq" onClick={() => { trackEvent('rfq_basket_review_click', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' }); setOpen(false); }} className="btn-primary">Review RFQ Basket</Link><a className="btn-primary bg-orange-500 hover:bg-orange-600" href={getRFQWhatsappLink(items)} target="_blank" rel="noreferrer" onClick={() => trackEvent('rfq_whatsapp_click', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' })}>Send via WhatsApp</a><button className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={() => { trackEvent('rfq_basket_clear', { item_count: items.length, total_units: totalUnits, source: 'products_drawer' }); setItems([]); }}>Clear Basket</button></div></div></aside></div> : null}</>;
}
