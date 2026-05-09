'use client';

import Link from 'next/link';
import { useState } from 'react';
import { normalizeRFQItem, normalizeRFQQuantity, readRFQItems, writeRFQItems } from '@/lib/rfq';

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
  labels?: {
    addToRFQ: string;
    technicalNotes: string;
    backToProducts: string;
    addedToRFQ: string;
  };
  productsHref?: string;
}

export default function ProductDetailActions({ product, intelligenceHref, labels, productsHref = '/products-partners' }: Props) {
  const [added, setAdded] = useState(false);
  const t = labels || {
    addToRFQ: 'Add to RFQ',
    technicalNotes: 'Technical Notes',
    backToProducts: 'Back to Products',
    addedToRFQ: 'Added to RFQ',
  };

  const addToRFQ = () => {
    const existing = readRFQItems();
    const found = existing.find((item) => item.id === product.id);
    const next = found
      ? existing.map((item) => (item.id === product.id ? { ...item, quantity: normalizeRFQQuantity(item.quantity + 1) } : item))
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
        <button type="button" onClick={addToRFQ} className="btn-primary w-full justify-center sm:w-auto">{t.addToRFQ}</button>
        {intelligenceHref ? <Link href={intelligenceHref} className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 sm:w-auto">{t.technicalNotes}</Link> : null}
        <Link href={productsHref} className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 sm:w-auto">{t.backToProducts}</Link>
      </div>
      {added ? <p className="text-sm font-medium text-emerald-700">{t.addedToRFQ}</p> : null}
    </div>
  );
}
