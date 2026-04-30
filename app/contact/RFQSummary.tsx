'use client';

import { useEffect, useState } from 'react';
import { getRFQWhatsappLink, readRFQItems, type RFQItem } from '@/lib/rfq';

export default function RFQSummary() {
  const [items, setItems] = useState<RFQItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(readRFQItems());
    sync();
    window.addEventListener('rfq-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('rfq-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (!items.length) return null;

  return (
    <section className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h2 className="text-base font-semibold text-slate-900">Selected RFQ Items</h2>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.id}>{item.name} — Qty: {item.quantity}</li>
        ))}
      </ul>
      <a className="btn-primary mt-3 bg-orange-500 hover:bg-orange-600" href={getRFQWhatsappLink(items)} target="_blank" rel="noreferrer">
        Send selected RFQ via WhatsApp
      </a>
    </section>
  );
}
