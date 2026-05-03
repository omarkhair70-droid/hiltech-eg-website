'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';
import { buildRFQWhatsappMessage, getRFQWhatsappLink, normalizeRFQItem, readRFQItems, writeRFQItems, type RFQItem, type RFQProjectDetails } from '@/lib/rfq';

const projectFields = [
  ['fullName', 'Full Name'],
  ['companyName', 'Company Name'],
  ['phoneNumber', 'Phone Number'],
  ['emailAddress', 'Email Address'],
  ['projectLocation', 'Project Location'],
] as const;

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; requestCode: string }
  | { status: 'error'; message: string };

export default function RFQReviewClient() {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [project, setProject] = useState<RFQProjectDetails>({});
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const updateItem = (id: string, patch: Partial<RFQItem>) => setItems((prev) => prev.map((entry) => (entry.id === id ? normalizeRFQItem({ ...entry, ...patch }) : entry)));
  const message = buildRFQWhatsappMessage(items, project);

  const hasScopeFinderImports = useMemo(
    () => items.some((item) => item.notes.toLowerCase().includes('added from smart scope finder')),
    [items],
  );

  const source = hasScopeFinderImports ? 'scope_finder' : 'rfq_page';

  async function submitRFQ() {
    if (submitState.status === 'submitting') return;
    setSubmitState({ status: 'submitting' });
    trackEvent('rfq_submit_attempt', { item_count: items.length, total_units: count, source });

    try {
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName: project.fullName,
            companyName: project.companyName,
            phone: project.phoneNumber,
            email: project.emailAddress,
            projectLocation: project.projectLocation,
            projectNotes: project.projectNotes,
            requestType: null,
          },
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            category: item.category,
            brand: item.brand,
            quantity: item.quantity,
            unit: item.unit,
            urgency: item.urgency,
            notes: item.notes,
          })),
          urgency: null,
          source,
          whatsappMessage: message,
        }),
      });

      const data = (await response.json()) as { ok: boolean; requestCode?: string; error?: string };
      if (!response.ok || !data.ok || !data.requestCode) {
        setSubmitState({ status: 'error', message: data.error || 'We couldn’t save your RFQ right now. You can still send it via WhatsApp.' });
        trackEvent('rfq_submit_error', { item_count: items.length, total_units: count, source, error_type: 'save_failed' });
        return;
      }

      setSubmitState({ status: 'success', requestCode: data.requestCode });
      trackEvent('rfq_submit_success', { item_count: items.length, total_units: count, source });
    } catch {
      setSubmitState({ status: 'error', message: 'We couldn’t save your RFQ right now. You can still send it via WhatsApp.' });
      trackEvent('rfq_submit_error', { item_count: items.length, total_units: count, source, error_type: 'network_error' });
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold leading-tight sm:text-3xl">Review Your RFQ Request</h1>
      <p className="mt-2 text-slate-700">Build your project supply request, add quantities and notes, then send it directly to HILTECH for availability and quotation.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border p-4"><p className="font-semibold">RFQ Summary</p><p className="text-sm text-slate-600">{items.length} items • {count} total units</p></div>{hasScopeFinderImports ? <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Starter items imported from Scope Finder. Please adjust quantities, specs, and notes before sending.</p> : null}
          {items.length === 0 ? <div className="rounded-xl border bg-slate-50 p-5"><p className="font-semibold">Your RFQ basket is empty.</p><p className="mt-1 text-sm text-slate-600">Start by adding products for a structured supply request.</p><div className="mt-3 flex flex-wrap gap-2"><Link className="btn-primary" href="/products-partners">Browse Products</Link><Link className="inline-flex items-center rounded-lg border px-4 py-2" href="/contact">Request Project Quote</Link></div></div> : items.map((item) => <article key={item.id} className="rounded-xl border p-4"><h3 className="font-semibold">{item.name}</h3><p className="text-xs text-slate-600">{item.category} • {item.brand}</p><div className="mt-2 grid gap-2 sm:flex sm:flex-wrap sm:items-center"><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: item.quantity - 1 })}>-</button><input type="number" min={1} className="w-full rounded border px-2 py-1 sm:w-20" value={item.quantity} onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) || 1 })} /><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}>+</button><input className="w-full rounded border px-2 py-1 text-sm sm:w-24" value={item.unit} onChange={(e) => updateItem(item.id, { unit: e.target.value })} /><select className="w-full rounded border px-2 py-1 text-sm sm:w-auto" value={item.urgency || 'Standard'} onChange={(e) => updateItem(item.id, { urgency: e.target.value as RFQItem['urgency'] })}><option>Standard</option><option>Urgent</option></select><button className="text-sm font-medium text-red-700 sm:ml-auto" onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}>Remove</button></div><textarea className="mt-2 w-full rounded border p-2" rows={2} value={item.notes} onChange={(e) => updateItem(item.id, { notes: e.target.value })} placeholder="Item notes" /></article>)}
        </section>
        <aside className="space-y-4">
          <div className="rounded-xl border p-4"><p className="font-semibold">Project details</p><div className="mt-2 space-y-2">{projectFields.map(([key, label]) => <input key={key} className="w-full rounded border px-3 py-2 text-sm" placeholder={label} value={project[key] || ''} onChange={(e) => setProject((p) => ({ ...p, [key]: e.target.value }))} />)}<textarea className="w-full rounded border px-3 py-2 text-sm" rows={3} placeholder="Project Notes" value={project.projectNotes || ''} onChange={(e) => setProject((p) => ({ ...p, projectNotes: e.target.value }))} /></div></div>
          <div className="rounded-xl border p-4 text-sm"><p className="font-semibold">RFQ guidance</p><ul className="mt-2 list-disc space-y-1 pl-4 text-slate-600"><li>Add quantities</li><li>Include preferred brands</li><li>Mention delivery timing</li><li>Add site/project notes</li></ul></div>
          <button className="btn-primary w-full justify-center" onClick={submitRFQ} disabled={submitState.status === 'submitting' || items.length === 0}>{submitState.status === 'submitting' ? 'Saving RFQ...' : 'Submit RFQ Request'}</button>
          {submitState.status === 'success' ? <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900"><p>RFQ request saved. Reference: {submitState.requestCode}</p><p className="mt-1 text-emerald-800">Save this reference number. You can use it with your phone or email to track request status later.</p></div> : null}
          {submitState.status === 'error' ? <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{submitState.message}</p> : null}
          {submitState.status === 'success' ? <Link href={`/track?request_code=${encodeURIComponent(submitState.requestCode)}`} className="inline-flex w-full justify-center rounded-lg border px-4 py-2" onClick={() => trackEvent('rfq_track_click', { source: 'rfq_page' })}>Track this RFQ</Link> : null}
          <a className="inline-flex w-full justify-center rounded-lg border px-4 py-2" href={getRFQWhatsappLink(items, project)} target="_blank" rel="noreferrer" onClick={() => trackEvent('rfq_whatsapp_click', { item_count: items.length, total_units: count, source: 'rfq_page', after_save: submitState.status === 'success' })}>{submitState.status === 'success' ? 'Send via WhatsApp too' : 'WhatsApp HILTECH'}</a>
          <button className="inline-flex w-full justify-center rounded-lg border px-4 py-2" onClick={async () => { await navigator.clipboard.writeText(message); trackEvent('rfq_copy_message', { item_count: items.length, total_units: count, source: 'rfq_page' }); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>Copy RFQ Message</button>
          {copied ? <p className="text-xs text-emerald-700">Copied.</p> : null}
          <button className="inline-flex w-full justify-center rounded-lg border px-4 py-2" onClick={() => { trackEvent('rfq_clear', { item_count: items.length, total_units: count, source: 'rfq_page' }); setItems([]); }}>Clear Basket</button>
          <Link href="/products-partners" className="inline-flex w-full justify-center rounded-lg border px-4 py-2" onClick={() => trackEvent('rfq_browse_products_click', { source: 'rfq_page' })}>Browse Products</Link>
        </aside>
      </div>
    </div>
  );
}
