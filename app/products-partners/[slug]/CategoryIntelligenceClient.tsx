'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ProductIntelligenceCategory } from '@/content/product-intelligence';
import type { ProductItem } from '@/content/products';
import { site } from '@/content/site';
import { getRFQWhatsappLink, normalizeRFQItem, readRFQItems, type RFQItem, writeRFQItems } from '@/lib/rfq';

interface Props {
  category: ProductIntelligenceCategory;
  relatedProducts: ProductItem[];
}

export default function CategoryIntelligenceClient({ category, relatedProducts }: Props) {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);

  const addItem = (item: ProductItem) => {
    const normalized = normalizeRFQItem({ id: item.id, name: item.name, brand: item.brand, category: item.category, specs: item.shortSpecs, quantity: 1 });
    setItems((prev) => {
      const found = prev.find((entry) => entry.id === item.id);
      if (found) return prev.map((entry) => (entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry));
      return [...prev, normalized];
    });
    setJustAdded(item.id);
    setTimeout(() => setJustAdded((curr) => (curr === item.id ? null : curr)), 1500);
  };

  const basketCount = useMemo(() => items.reduce((total, entry) => total + entry.quantity, 0), [items]);
  const starterItems = relatedProducts.slice(0, 3);

  return (
    <>
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-bold text-slate-900 md:text-xl">Prepare this category for RFQ</h2>
        <p className="mt-2 text-sm text-slate-600">Add product examples, estimate quantities, and include site notes so HILTECH can confirm availability and quotation.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link className="btn-primary w-full justify-center sm:w-auto" href="/products-partners">Browse matching products</Link>
          <Link className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 sm:w-auto" href="/rfq">Review RFQ Basket</Link>
          <Link className="inline-flex w-full items-center justify-center rounded-lg border border-orange-300 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 sm:w-auto" href="/contact">Request Project Quote</Link>
        </div>
        {starterItems.length > 0 ? <div className="mt-4 rounded-xl border border-navy-900/10 bg-navy-50 p-4"><h3 className="text-sm font-semibold text-slate-900">Add category starter items to RFQ</h3><p className="mt-1 text-xs text-slate-600">Adds a starter set of example components. You can edit quantities or remove items later.</p><div className="mt-3 flex flex-wrap gap-2">{starterItems.map((item) => <button key={item.id} type="button" onClick={() => addItem(item)} className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-slate-400">+ {item.name}</button>)}</div></div> : null}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
        <p className="mt-1 text-sm text-slate-600">Sample components from this category to support RFQ preparation and scope clarity.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <article key={item.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="inline-flex w-fit rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-700">{item.category}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-2 text-xs text-slate-600"><span className="font-semibold text-slate-800">Brand:</span> {item.brand}</p>
              <p className="mt-1 text-xs text-slate-600"><span className="font-semibold text-slate-800">Specs:</span> {item.shortSpecs}</p>
              <p className="mt-1 text-xs text-slate-600"><span className="font-semibold text-slate-800">Use case:</span> {item.useCase}</p>
              <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">Price and availability upon request</p>
              <div className="mt-auto pt-3">
                <button type="button" onClick={() => addItem(item)} className="btn-primary w-full justify-center text-sm">Add to RFQ</button>
                {justAdded === item.id ? <p className="mt-1 text-xs font-medium text-emerald-700">Added to RFQ basket</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-navy-900 bg-navy-900 p-6 text-white">
        <h2 className="text-xl font-bold">Move from category planning to finalized request</h2>
        <p className="mt-2 text-sm text-slate-200">Your basket currently includes {basketCount} item(s). Continue with RFQ review or share your request scope directly with HILTECH.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy-900" href="/rfq">Build RFQ Basket</Link>
          <Link className="inline-flex items-center rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white" href="/contact">Request Project Quote</Link>
          <a className="inline-flex items-center rounded-lg border border-orange-300 bg-orange-500 px-4 py-2 text-sm font-semibold text-white" href={getRFQWhatsappLink(items)} target="_blank" rel="noreferrer">WhatsApp HILTECH</a>
        </div>
      </section>
    </>
  );
}
