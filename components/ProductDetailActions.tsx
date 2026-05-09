'use client';

import Link from 'next/link';
import { useState } from 'react';
import { normalizeRFQItem, readRFQItems, writeRFQItems } from '@/lib/rfq';

interface Props {
  product: {
    id: string;
    name: string;
    category: string;
    brand: string;
    shortSpecs: string;
    priceNote?: string | null;
  };
  intelligenceHref?: string;
}

export default function ProductDetailActions({ product, intelligenceHref }: Props) {
  const [added, setAdded] = useState(false);

  const addToRFQ = () => {
    const existing = readRFQItems();
    const found = existing.find((item) => item.id === product.id);
    const next = found
      ? existing.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [
          ...existing,
          normalizeRFQItem({
            id: product.id,
            name: product.name,
            category: product.category,
            brand: product.brand,
            specs: product.shortSpecs,
            priceNote: product.priceNote,
            quantity: 1,
          }),
        ];

    writeRFQItems(next);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="mt-5 space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={addToRFQ} className="btn-primary w-full justify-center sm:w-auto">Add to RFQ</button>
        {intelligenceHref ? <Link href={intelligenceHref} className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 sm:w-auto">Technical Notes</Link> : null}
        <Link href="/products-partners" className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 sm:w-auto">Back to products</Link>
      </div>
      {added ? <p className="text-sm font-medium text-emerald-700">Added to RFQ</p> : null}
    </div>
  );
}
