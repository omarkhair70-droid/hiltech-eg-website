'use client';

import { FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';

type QuoteResponseStatus = 'accepted' | 'rejected' | 'changes_requested';

interface TrackedRequest {
  requestCode: string;
  status: string;
  statusExplanation: string;
  createdAt: string;
  lastUpdatedAt: string;
  customerFirstName?: string | null;
  projectLocation?: string | null;
  itemCount: number;
  items?: Array<{ name: string; category?: string | null; quantity?: number | null; unit?: string | null; notes?: string | null }>;
  quote?: {
    status?: string | null;
    validUntil?: string | null;
    paymentTerms?: string | null;
    deliveryTerms?: string | null;
    subtotal?: number | null;
    discount?: number | null;
    tax?: number | null;
    grandTotal?: number | null;
    items?: Array<{ name: string; quantity?: number | null; unit?: string | null; unitPrice?: number | null; lineTotal?: number | null }>;
  } | null;
  customerResponse?: { status?: string | null; submittedAt?: string | null } | null;
}

interface TrackResponse { ok: boolean; error?: string; request?: TrackedRequest }

const NEXT_STEPS: Record<string, string> = {
  new: 'Your RFQ was received. HILTECH will review the submitted scope and items.',
  in_review: 'Your RFQ is being reviewed. HILTECH may contact you for clarification.',
  quoted: 'Your quotation is ready or being shared. Please review the quotation details below if available.',
  waiting_client: 'HILTECH is waiting for your response or clarification.',
  won: 'This request has been accepted and moved forward.',
  lost: 'This request has been closed.',
  closed: 'This request has been closed or completed.',
};

const TRACKING_ERROR = 'We could not match this RFQ reference with the provided phone/email. Check the reference and contact details.';

export default function TrackClient({ initialRequestCode = '' }: { initialRequestCode?: string }) {
  const [requestCode, setRequestCode] = useState(initialRequestCode);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResponse | null>(null);
  const [responseStatus, setResponseStatus] = useState<QuoteResponseStatus>('accepted');
  const [responseNotes, setResponseNotes] = useState('');
  const [responseLoading, setResponseLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const tracked = result?.request;
  const hasResult = Boolean(result?.ok && tracked);

  const stepMessage = useMemo(() => (tracked ? (NEXT_STEPS[tracked.status] || 'Your RFQ status has been updated. Contact HILTECH if you need clarification.') : ''), [tracked]);

  const quoteResponseAllowed = Boolean(tracked?.quote && tracked?.status === 'quoted' && (!tracked.customerResponse?.status || tracked.customerResponse.status === 'no_response'));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setResponseMessage(null);
    try {
      const response = await fetch('/api/rfq/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request_code: requestCode, phone_or_email: phoneOrEmail }) });
      const body = (await response.json()) as TrackResponse;
      setResult(body);
      if (body.ok && body.request?.quote) trackEvent('quote_viewed', { source: 'track_page' });
    } catch {
      setResult({ ok: false, error: TRACKING_ERROR });
    } finally {
      setLoading(false);
    }
  }

  async function submitQuoteResponse() {
    setResponseLoading(true);
    setResponseMessage(null);
    try {
      const response = await fetch('/api/rfq/quote-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_code: requestCode, phone_or_email: phoneOrEmail, response_status: responseStatus, response_notes: responseNotes }),
      });
      const body = await response.json() as { ok: boolean; error?: string };
      if (!response.ok || !body.ok) {
        setResponseMessage(body.error || 'Unable to save your response right now.');
        return;
      }
      setResponseMessage('Your quote response was submitted successfully.');
      setResult((prev) => prev?.request ? { ...prev, request: { ...prev.request, customerResponse: { status: responseStatus, submittedAt: new Date().toISOString() } } } : prev);
    } catch {
      setResponseMessage('Unable to save your response right now.');
    } finally {
      setResponseLoading(false);
    }
  }

  const fmtDate = (value?: string | null) => (value ? new Date(value).toLocaleString() : null);
  const fmtMoney = (value?: number | null) => (typeof value === 'number' ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : null);

  return <div className="grid gap-6">
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">RFQ Reference<input value={requestCode} onChange={(event) => setRequestCode(event.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
        <label className="text-sm font-medium text-slate-700">Phone or Email<input value={phoneOrEmail} onChange={(event) => setPhoneOrEmail(event.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
      </div>
      <p className="mt-2 text-xs text-slate-600">You can use local or international Egyptian phone format.</p>
      <button disabled={loading} className="mt-4 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Checking…' : 'Track Request'}</button>
    </form>

    {result && !hasResult && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{result.error || TRACKING_ERROR}</div>}

    {hasResult && tracked ? <section className="grid gap-4">
      <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h2 className="text-xl font-semibold text-slate-900">{tracked.requestCode}</h2>
        <p className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">{tracked.status}</p>
        <ul className="mt-4 space-y-1 text-slate-700">
          <li><b>Created:</b> {fmtDate(tracked.createdAt)}</li>
          <li><b>Last update:</b> {fmtDate(tracked.lastUpdatedAt)}</li>
          {tracked.customerFirstName ? <li><b>Customer:</b> {tracked.customerFirstName}</li> : null}
          {tracked.projectLocation ? <li><b>Project location:</b> {tracked.projectLocation}</li> : null}
        </ul>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><h3 className="font-semibold text-slate-900">Next Step</h3><p className="mt-2 text-slate-700">{stepMessage}</p></article>

      <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
        <h3 className="font-semibold text-slate-900">Items Summary</h3>
        {tracked.items?.length ? <div className="mt-3 grid gap-2">{tracked.items.map((item, index) => <div key={`${item.name}-${index}`} className="rounded-lg border border-slate-200 p-3"><p className="font-semibold text-slate-900">{item.name}</p><p className="text-slate-600">{item.category || 'Category not specified'}</p><p className="text-slate-700">Qty: {item.quantity || '-'} {item.unit || ''}</p>{item.notes ? <p className="text-slate-600">Notes: {item.notes}</p> : null}</div>)}</div> : <p className="mt-2 text-slate-700">Items: {tracked.itemCount}</p>}
      </article>

      {tracked.quote ? <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><h3 className="font-semibold text-slate-900">Quote Details</h3><div className="mt-2 grid gap-1 text-slate-700">{tracked.quote.status ? <p><b>Quote status:</b> {tracked.quote.status}</p> : null}{tracked.quote.validUntil ? <p><b>Valid until:</b> {fmtDate(tracked.quote.validUntil)}</p> : null}{tracked.quote.paymentTerms ? <p><b>Payment terms:</b> {tracked.quote.paymentTerms}</p> : null}{tracked.quote.deliveryTerms ? <p><b>Delivery terms:</b> {tracked.quote.deliveryTerms}</p> : null}{fmtMoney(tracked.quote.subtotal) ? <p><b>Subtotal:</b> {fmtMoney(tracked.quote.subtotal)}</p> : null}{fmtMoney(tracked.quote.discount) ? <p><b>Discount:</b> {fmtMoney(tracked.quote.discount)}</p> : null}{fmtMoney(tracked.quote.tax) ? <p><b>Tax:</b> {fmtMoney(tracked.quote.tax)}</p> : null}{fmtMoney(tracked.quote.grandTotal) ? <p><b>Grand total:</b> {fmtMoney(tracked.quote.grandTotal)}</p> : null}</div>{tracked.quote.items?.length ? <div className="mt-3 grid gap-2">{tracked.quote.items.map((item, index) => <div key={`${item.name}-${index}`} className="rounded-lg border border-slate-200 p-3"><p className="font-semibold">{item.name}</p><p>Qty: {item.quantity || '-'} {item.unit || ''}</p>{typeof item.unitPrice === 'number' ? <p>Unit price: {fmtMoney(item.unitPrice)}</p> : null}{typeof item.lineTotal === 'number' ? <p>Line total: {fmtMoney(item.lineTotal)}</p> : null}</div>)}</div> : null}</article> : null}

      {quoteResponseAllowed ? <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><h3 className="font-semibold text-slate-900">Quote Response</h3><div className="mt-3 flex flex-wrap gap-2">{[['accepted', 'Accept quotation'], ['changes_requested', 'Request changes'], ['rejected', 'Reject quotation']].map(([value, label]) => <button key={value} type="button" className={`rounded-md border px-3 py-2 ${responseStatus === value ? 'border-navy-900 bg-navy-900 text-white' : 'border-slate-300'}`} onClick={() => setResponseStatus(value as QuoteResponseStatus)}>{label}</button>)}</div><textarea value={responseNotes} onChange={(event) => setResponseNotes(event.target.value)} rows={3} placeholder="Optional notes" className="mt-3 w-full rounded-md border border-slate-300 p-2" /><button type="button" disabled={responseLoading} onClick={submitQuoteResponse} className="mt-3 rounded-md bg-navy-900 px-4 py-2 text-white disabled:opacity-60">{responseLoading ? 'Submitting…' : 'Submit response'}</button>{responseMessage ? <p className="mt-2 text-slate-700">{responseMessage}</p> : null}</article> : null}
    </section> : null}
  </div>;
}
