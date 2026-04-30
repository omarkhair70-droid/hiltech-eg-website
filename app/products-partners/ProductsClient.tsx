'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { productCategories, products, type ProductItem } from '@/content/products';
import { site } from '@/content/site';
import { getRFQWhatsappLink, readRFQItems, writeRFQItems, type RFQItem } from '@/lib/rfq';

function toRFQItem(item: ProductItem): RFQItem {
  return { id: item.id, name: item.name, category: item.category, brand: item.brand, specs: item.shortSpecs, quantity: 1 };
}

export default function ProductsClient() {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const addToRFQ = (product: ProductItem) => {
    setItems((prev) => {
      const found = prev.find((entry) => entry.id === product.id);
      if (found) return prev.map((entry) => (entry.id === product.id ? { ...entry, quantity: entry.quantity + 1 } : entry));
      return [...prev, toRFQItem(product)];
    });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded((curr) => (curr === product.id ? null : curr)), 1400);
  };

  return (
    <>
      <p className="mt-4 max-w-4xl text-slate-700">Infrastructure products, cabling systems, cabinets, connectivity components, and security-ready supplies organized for project-based procurement and availability requests.</p>
      <p className="mt-3 rounded-lg border border-navy-900/10 bg-navy-900 px-4 py-2.5 text-sm text-white">Build a project RFQ list and send it to HILTECH for availability, technical confirmation, and quotation.</p>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-3 md:sticky md:top-16 md:z-20 md:mt-8 md:bg-white/95 md:p-4 md:backdrop-blur"><h2 className="text-xl font-bold md:text-2xl">Browse by Category</h2><div className="mt-2 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible"><a className="shrink-0 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 shadow-sm md:px-4 md:py-1.5 md:text-sm" href="#all">All</a>{productCategories.map((category) => (<a key={category} className="shrink-0 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 md:px-4 md:py-1.5 md:text-sm" href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{category}</a>))}</div></section>

      <section id="all" className="mt-10 space-y-12">{productCategories.map((category) => { const categoryProducts = products.filter((item) => item.category === category); const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-'); return (<div key={category} id={categoryId} className="scroll-mt-24 md:scroll-mt-20"><h3 className="text-2xl font-bold tracking-tight text-slate-900">{category}</h3><p className="mt-1 text-sm text-slate-600">Category-aligned components selected to support compatibility, deployment quality, and procurement planning.</p><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{categoryProducts.map((item) => (<article key={item.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md md:p-5"><div className="mb-4 h-1 w-12 rounded-full bg-orange-400" /><p className="mb-2 inline-flex w-fit rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-700 md:text-[10px]">{item.category}</p><h3 className="text-lg font-bold leading-tight text-slate-900">{item.name}</h3><div className="mt-3 space-y-1.5 text-sm text-slate-600"><p><span className="font-semibold text-slate-800">Brand:</span> {item.brand}</p><p><span className="font-semibold text-slate-800">Specs:</span> {item.shortSpecs}</p><p><span className="font-semibold text-slate-800">Use case:</span> {item.useCase}</p></div><p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">Price and availability upon request</p><div className="mt-auto pt-3"><div className="flex flex-wrap gap-2"><button className="btn-primary px-4 py-2.5 text-sm" onClick={() => addToRFQ(item)} type="button">Add to RFQ</button><Link className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50" href="/contact">Request Availability</Link><a className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50" href={site.contact.whatsappRFQLink}>WhatsApp</a></div>{justAdded === item.id ? <p className="mt-2 text-xs font-medium text-emerald-700">Added to RFQ</p> : null}</div></article>))}</div></div>);})}</section>

      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-5 right-4 z-40 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 transition hover:bg-navy-800 md:bottom-6 md:right-6">RFQ Basket ({count})</button>

      {open ? <div className="fixed inset-0 z-50"><div className="absolute inset-0 bg-slate-900/30" onClick={() => setOpen(false)} /><aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl"><div className="sticky top-0 flex items-center justify-between bg-navy-900 px-5 py-4 text-white"><h3 className="text-lg font-semibold">RFQ Basket</h3><button onClick={() => setOpen(false)} aria-label="Close RFQ Basket" className="rounded-md border border-white/30 px-2 py-1 text-sm">Close</button></div><div className="space-y-4 p-5">{items.length === 0 ? <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">No items selected yet.</p> : items.map((item) => (<article key={item.id} className="rounded-xl border border-slate-200 p-3"><h4 className="font-semibold text-slate-900">{item.name}</h4><p className="mt-1 text-xs text-slate-600">{item.category} • {item.brand}</p><p className="mt-1 text-xs text-slate-500">{item.specs}</p><div className="mt-2 flex items-center gap-2"><button className="rounded border px-2" onClick={() => setItems((prev) => prev.map((entry) => entry.id === item.id ? { ...entry, quantity: Math.max(1, entry.quantity - 1) } : entry))}>-</button><span className="text-sm font-semibold">Qty: {item.quantity}</span><button className="rounded border px-2" onClick={() => setItems((prev) => prev.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry))}>+</button><button className="ml-auto text-xs font-semibold text-red-600" onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}>Remove</button></div><label className="mt-2 block text-xs font-medium text-slate-700">Note<textarea className="mt-1 w-full rounded-md border border-slate-300 p-2 text-xs" rows={2} value={item.note ?? ''} onChange={(event) => setItems((prev) => prev.map((entry) => entry.id === item.id ? { ...entry, note: event.target.value } : entry))} /></label></article>))}<div className="flex flex-wrap gap-2"><a className="btn-primary bg-orange-500 hover:bg-orange-600" href={getRFQWhatsappLink(items)} target="_blank" rel="noreferrer">Send RFQ via WhatsApp</a><Link className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" href="/contact" onClick={() => setOpen(false)}>Continue to Request Quote</Link><button className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={() => setItems([])}>Clear Basket</button></div></div></aside></div> : null}
    </>
  );
}
