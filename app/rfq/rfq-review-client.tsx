'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';
import { buildRFQWhatsappMessage, getRFQWhatsappLink, normalizeRFQItem, readRFQItems, writeRFQItems, type RFQItem, type RFQProjectDetails } from '@/lib/rfq';
import { isValidEgyptPhone } from '@/lib/phone';

const projectFields = [
  ['fullName', 'Full Name'],
  ['companyName', 'Company Name'],
  ['phoneNumber', 'Phone Number'],
  ['emailAddress', 'Email Address'],
  ['projectLocation', 'Project Location'],
] as const;



type FormErrors = Partial<Record<'fullName' | 'phoneNumber' | 'emailAddress', string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [copyReferenceState, setCopyReferenceState] = useState<'idle' | 'copied'>('idle');
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

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



  function validateProjectDetails() {
    const nextErrors: FormErrors = {};

    if (!project.fullName?.trim() || project.fullName.trim().length < 2) nextErrors.fullName = 'Enter your full name.';
    if (!project.phoneNumber?.trim() || !isValidEgyptPhone(project.phoneNumber)) nextErrors.phoneNumber = 'Enter a valid Egyptian phone number.';
    if (!project.emailAddress?.trim() || !emailPattern.test(project.emailAddress.trim())) nextErrors.emailAddress = 'Enter a valid email address.';

    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0] as keyof FormErrors | undefined;
    if (firstInvalid === 'fullName') fullNameRef.current?.focus();
    if (firstInvalid === 'phoneNumber') phoneRef.current?.focus();
    if (firstInvalid === 'emailAddress') emailRef.current?.focus();
    return Object.keys(nextErrors).length === 0;
  }

  async function submitRFQ() {
    if (submitState.status === 'submitting') return;
    if (!validateProjectDetails()) return;
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
      <h1 className="text-2xl font-bold leading-tight sm:text-3xl">Review Your RFQ</h1>
      <p className="mt-2 text-slate-700">Build your project supply request, add quantities and notes, then send it directly to HILTECH for availability and quotation.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-3 items-start">
        <section className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border p-4"><p className="font-semibold">RFQ Summary</p><p className="text-sm text-slate-600">{items.length} items • {count} total units</p></div>{hasScopeFinderImports ? <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Starter items imported from Scope Finder. Please adjust quantities, specs, and notes before sending.</p> : null}
          {items.length === 0 ? <div className="rounded-xl border bg-slate-50 p-5"><p className="font-semibold">Your RFQ basket is empty.</p><p className="mt-1 text-sm text-slate-600">Start by adding products for a structured supply request.</p><div className="mt-3 flex flex-wrap gap-2"><Link className="btn-primary" href="/products-partners">Browse Products</Link><Link className="inline-flex items-center rounded-lg border px-4 py-2" href="/contact">Request Project Quote</Link></div></div> : items.map((item) => <article key={item.id} className="rounded-xl border p-4"><h3 className="font-semibold">{item.name}</h3><p className="text-xs text-slate-600">{item.category} • {item.brand}</p><div className="mt-2 grid gap-2 sm:flex sm:flex-wrap sm:items-center"><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: item.quantity - 1 })}>-</button><input type="number" min={1} className="w-full rounded border px-2 py-1 sm:w-20" value={item.quantity} onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) || 1 })} /><button className="rounded border px-2" onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}>+</button><input className="w-full rounded border px-2 py-1 text-sm sm:w-24" value={item.unit} onChange={(e) => updateItem(item.id, { unit: e.target.value })} /><select className="w-full rounded border px-2 py-1 text-sm sm:w-auto" value={item.urgency || 'Standard'} onChange={(e) => updateItem(item.id, { urgency: e.target.value as RFQItem['urgency'] })}><option>Standard</option><option>Urgent</option></select><button className="text-sm font-medium text-red-700 sm:ml-auto" onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}>Remove</button></div><textarea className="mt-2 w-full rounded border p-2" rows={2} value={item.notes} onChange={(e) => updateItem(item.id, { notes: e.target.value })} placeholder="Item notes" /></article>)}
        </section>
        <aside className="space-y-4">
          <div className="rounded-xl border p-4"><p className="font-semibold">Project details</p><p className="mt-1 text-xs text-slate-500">Required: Full Name, Phone Number, Email Address</p><div className="mt-2 space-y-2">{projectFields.map(([key, label]) => { const isRequired = key === 'fullName' || key === 'phoneNumber' || key === 'emailAddress'; const error = key === 'fullName' ? errors.fullName : key === 'phoneNumber' ? errors.phoneNumber : key === 'emailAddress' ? errors.emailAddress : ''; const ref = key === 'fullName' ? fullNameRef : key === 'phoneNumber' ? phoneRef : key === 'emailAddress' ? emailRef : undefined; return <div key={key}><label className="mb-1 block text-xs font-semibold text-slate-700">{label}{isRequired ? " *" : " (Optional)"}</label><input ref={ref as any} className={`w-full rounded border px-3 py-2 text-sm ${error ? 'border-red-500' : ''}`} value={project[key] || ''} onChange={(e) => { setProject((p) => ({ ...p, [key]: e.target.value })); if (error) setErrors((prev) => ({ ...prev, [key]: '' })); }} />{error ? <p className="mt-1 text-xs text-red-700">{error}</p> : null}</div>; })}<textarea className="w-full rounded border px-3 py-2 text-sm" rows={3} placeholder="Project Notes (optional)" value={project.projectNotes || ''} onChange={(e) => setProject((p) => ({ ...p, projectNotes: e.target.value }))} /></div></div>
          <div className="rounded-xl border p-4 text-sm"><p className="font-semibold">What happens after submission?</p><ul className="mt-2 list-disc space-y-1 pl-4 text-slate-600"><li>We review your project scope.</li><li>We confirm product availability and suitable alternatives.</li><li>We contact you by phone or WhatsApp if clarification is needed.</li><li>You receive a quotation or follow-up request from HILTECH.</li></ul></div>
          <button className="btn-primary w-full justify-center" onClick={submitRFQ} disabled={submitState.status === 'submitting' || items.length === 0}>{submitState.status === 'submitting' ? 'Saving RFQ...' : 'Submit RFQ Request'}</button>
          {submitState.status === 'success' ? <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900"><p className="font-semibold">RFQ submitted successfully</p><p className="mt-1">Reference: <span className="font-semibold">{submitState.requestCode}</span></p><p className="mt-1 text-emerald-800">Save this reference to track your request.</p><button className="mt-2 inline-flex rounded border border-emerald-300 bg-white px-3 py-1 text-xs font-medium" onClick={async () => { try { await navigator.clipboard.writeText(submitState.requestCode); setCopyReferenceState('copied'); setTimeout(() => setCopyReferenceState('idle'), 1500); } catch {} }}>Copy Reference</button>{copyReferenceState === 'copied' ? <p className="mt-1 text-xs">Copied</p> : null}</div> : null}
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
