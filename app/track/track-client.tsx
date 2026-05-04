'use client';

import { FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';

interface TrackResponse {
  ok: boolean;
  error?: string;
  request?: {
    requestCode: string;
    status: string;
    statusExplanation: string;
    createdAt: string;
    lastUpdatedAt: string;
    customerDisplayName: string;
    projectLocation: string | null;
    itemCount: number;
    items: Array<{ name: string; quantity?: number | null; unit?: string | null; quotedUnitPrice?: number | null; quotedLineTotal?: number | null }>;
    quote?: null | {
      quotationStatus: string;
      quotationCurrency: string;
      quotationValidUntil: string | null;
      quotationPaymentTerms: string | null;
      quotationDeliveryTerms: string | null;
      quotationNotes: string | null;
      quotePublicMessage: string | null;
      customerResponseStatus: 'no_response' | 'accepted' | 'rejected' | 'changes_requested';
      customerResponseNotes: string | null;
      customerRespondedAt: string | null;
      subtotal: number;
      discount: number;
      tax: number;
      grandTotal: number;
    };
  };
}

export default function TrackClient({ initialRequestCode = '' }: { initialRequestCode?: string }) {
  const [requestCode, setRequestCode] = useState(initialRequestCode);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResponse | null>(null);
  const [responseType, setResponseType] = useState<'accepted'|'rejected'|'changes_requested'>('accepted');
  const [responseNotes, setResponseNotes] = useState('');

  const tracked = result?.request || null;
  const hasResult = Boolean(result?.ok && tracked);

  const timeline=(status:string)=> status==='new'||status==='in_review' ? ['HILTECH is reviewing your request.','HILTECH may contact you for missing details.'] : status==='quoted' ? ['Quotation preparation is in progress.'] : ['Request update is available.'];

  const updatedLabel = useMemo(() => {
    if (!tracked) return '';
    return new Date(tracked.lastUpdatedAt).toLocaleString();
  }, [tracked]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/rfq/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_code: requestCode, phone_or_email: phoneOrEmail }),
      });
      const body = await response.json() as TrackResponse;
      setResult(body);
      if (body.ok && body.request?.quote) trackEvent('quote_viewed', { source: 'track_page' });
    } catch {
      setResult({ ok: false, error: 'We couldn’t verify this request. Please check the reference code and contact details.' });
    } finally {
      setLoading(false);
    }
  }
  async function submitQuoteResponse() {
    if (!tracked) return;
    const res = await fetch('/api/rfq/quote-response', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request_code: requestCode, phone_or_email: phoneOrEmail, response_status: responseType, response_notes: responseNotes }) });
    const body = await res.json() as TrackResponse;
    if (!body.ok) return setResult(body);
    trackEvent('quote_response_submitted', { response_status: responseType });
    await onSubmit({ preventDefault() {} } as FormEvent<HTMLFormElement>);
  }

  return <div className="grid gap-6"><form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4"><div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium text-slate-700">RFQ Reference<input value={requestCode} onChange={(event) => setRequestCode(event.target.value)} name="request_code" required maxLength={64} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="RFQ-20260501-..." /></label><label className="text-sm font-medium text-slate-700">Phone or Email<input value={phoneOrEmail} onChange={(event) => setPhoneOrEmail(event.target.value)} name="phone_or_email" required maxLength={160} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Same phone/email used in your request" /></label></div><button disabled={loading} className="mt-4 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Checking…' : 'Track Request'}</button></form>

    {result && !hasResult && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{result.error || 'We couldn’t verify this request. Please check the reference code and contact details.'}</div>}

    {hasResult && tracked && <section className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Tracking result</p><h2 className="mt-2 text-xl font-semibold text-slate-900">{tracked.requestCode}</h2><p className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">{tracked.status}</p><p className="mt-2 text-slate-700">{tracked.statusExplanation}</p><ul className='mt-2 list-disc list-inside text-slate-700'>{timeline(tracked.status).map((t)=> <li key={t}>{t}</li>)}</ul><ul className="mt-4 space-y-1 text-slate-700"><li><b>Customer:</b> {tracked.customerDisplayName}</li><li><b>Created:</b> {new Date(tracked.createdAt).toLocaleString()}</li><li><b>Last update:</b> {updatedLabel}</li>{tracked.projectLocation && <li><b>Project location:</b> {tracked.projectLocation}</li>}<li><b>Item count:</b> {tracked.itemCount}</li></ul>{tracked.quote && <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="font-semibold">Quotation ({tracked.quote.quotationStatus})</p><p className="text-xs text-slate-600">Final pricing, availability, and delivery remain subject to HILTECH confirmation.</p>{tracked.quote.quotePublicMessage && <p className="mt-2">{tracked.quote.quotePublicMessage}</p>}<p className="mt-2"><b>Valid until:</b> {tracked.quote.quotationValidUntil || '—'}</p><table className="mt-3 min-w-full"><thead><tr className="text-left"><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>{tracked.items.map((item,idx)=><tr key={idx}><td>{item.name}</td><td>{item.quantity ?? '—'} {item.unit || ''}</td><td>{tracked.quote?.quotationCurrency} {Number(item.quotedUnitPrice || 0).toFixed(2)}</td><td>{tracked.quote?.quotationCurrency} {Number(item.quotedLineTotal || 0).toFixed(2)}</td></tr>)}</tbody></table><p className="mt-2"><b>Subtotal:</b> {tracked.quote.quotationCurrency} {tracked.quote.subtotal.toFixed(2)} · <b>Discount:</b> {tracked.quote.quotationCurrency} {tracked.quote.discount.toFixed(2)} · <b>Tax:</b> {tracked.quote.quotationCurrency} {tracked.quote.tax.toFixed(2)} · <b>Grand total:</b> {tracked.quote.quotationCurrency} {tracked.quote.grandTotal.toFixed(2)}</p><p><b>Payment terms:</b> {tracked.quote.quotationPaymentTerms || '—'}</p><p><b>Delivery terms:</b> {tracked.quote.quotationDeliveryTerms || '—'}</p>{tracked.quote.quotationNotes && <p><b>Notes:</b> {tracked.quote.quotationNotes}</p>}
      {tracked.quote.customerResponseStatus === 'no_response' ? <div className="mt-3 space-y-2"><select value={responseType} onChange={(e)=>setResponseType(e.target.value as any)} className="rounded border px-2 py-1"><option value="accepted">Accept quotation</option><option value="rejected">Reject quotation</option><option value="changes_requested">Request changes</option></select>{responseType !== 'accepted' && <textarea maxLength={1000} value={responseNotes} onChange={(e)=>setResponseNotes(e.target.value)} placeholder="Optional note (max 1000 chars)" className="w-full rounded border p-2" />}<button onClick={submitQuoteResponse} className="rounded bg-navy-900 px-3 py-2 text-white">Submit response</button></div> : <p className="mt-3 rounded border border-emerald-200 bg-emerald-50 p-2">Thank you. Your response: <b>{tracked.quote.customerResponseStatus}</b>{tracked.quote.customerResponseNotes ? ` — ${tracked.quote.customerResponseNotes}` : ''}</p>}
      </div>}{tracked.items.length > 0 && <div className="mt-3"><p className="font-semibold text-slate-800">Requested items</p><ul className="mt-1 list-inside list-disc text-slate-700">{tracked.items.map((item, idx) => <li key={`${item.name}-${idx}`}>{item.name}</li>)}</ul></div>}<a href="https://wa.me/201555357807" target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 font-semibold text-navy-900">Contact HILTECH via WhatsApp</a></section>}
  </div>;
}
