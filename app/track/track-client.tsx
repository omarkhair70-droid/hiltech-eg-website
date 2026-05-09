'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';
import type { TrackMessages } from '@/content/ar/track';

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

const defaultMessages: TrackMessages = {
  trackTitle: 'Track Your RFQ',
  trackIntro: 'Enter your RFQ reference and the same phone or email used during submission.',
  rfqReference: 'RFQ Reference',
  phoneOrEmail: 'Phone or Email',
  trackButton: 'Track Request',
  tracking: 'Checking…',
  status: 'Status',
  created: 'Created',
  lastUpdate: 'Last update',
  requestedItems: 'Items Summary',
  nextStep: 'Next Step',
  reference: 'Reference',
  contactHiltech: 'Contact HILTECH',
  backToRFQ: 'Back to RFQ',
  notFound: 'We could not match this RFQ reference with the provided phone/email.',
  verificationHint: 'Check the reference and use the same phone/email used during submission.',
  genericError: 'Unable to load request status right now. Please try again.',
  statusMessages: {
    new: 'Your RFQ was received. HILTECH will review the submitted scope and items.',
    in_review: 'Your RFQ is being reviewed. HILTECH may contact you for clarification.',
    quoted: 'Your quotation is ready or being shared.',
    waiting_client: 'HILTECH is waiting for your response or clarification.',
    won: 'This request has been accepted and moved forward.',
    lost: 'This request has been closed.',
    closed: 'This request has been closed or completed.',
  },
  fallbackStatus: 'Your RFQ status has been updated.',
};

export default function TrackClient({ initialRequestCode = '', locale = 'en', messages = defaultMessages, rfqHref = '/rfq', contactHref = '/contact' }: { initialRequestCode?: string; locale?: 'en' | 'ar'; messages?: TrackMessages; rfqHref?: string; contactHref?: string }) {
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

  const stepMessage = useMemo(() => (tracked ? (messages.statusMessages[tracked.status] || messages.fallbackStatus) : ''), [tracked, messages]);

  const quoteResponseAllowed = Boolean(tracked?.quote && tracked?.status === 'quoted' && (!tracked.customerResponse?.status || tracked.customerResponse.status === 'no_response'));

  async function onSubmit(event: FormEvent<HTMLFormElement>) { /* unchanged */
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
      setResult({ ok: false, error: messages.genericError });
    } finally {
      setLoading(false);
    }
  }

  const fmtDate = (value?: string | null) => (value ? new Date(value).toLocaleString(locale === 'ar' ? 'ar-EG' : undefined) : null);

  return <div className="grid gap-6" dir={locale === 'ar' ? 'rtl' : undefined}>
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">{messages.rfqReference}<input dir="ltr" value={requestCode} onChange={(event) => setRequestCode(event.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
        <label className="text-sm font-medium text-slate-700">{messages.phoneOrEmail}<input dir="ltr" value={phoneOrEmail} onChange={(event) => setPhoneOrEmail(event.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
      </div>
      <button disabled={loading} className="mt-4 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{loading ? messages.tracking : messages.trackButton}</button>
    </form>

    {result && !hasResult && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{result.error || `${messages.notFound} ${messages.verificationHint}`}</div>}

    {hasResult && tracked ? <section className="grid gap-4">
      <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><h2 className="text-xl font-semibold text-slate-900"><span className="text-slate-500">{messages.reference}: </span><span dir="ltr">{tracked.requestCode}</span></h2><p className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">{tracked.status}</p><ul className="mt-4 space-y-1 text-slate-700"><li><b>{messages.created}:</b> {fmtDate(tracked.createdAt)}</li><li><b>{messages.lastUpdate}:</b> {fmtDate(tracked.lastUpdatedAt)}</li></ul></article>
      <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><h3 className="font-semibold text-slate-900">{messages.nextStep}</h3><p className="mt-2 text-slate-700">{stepMessage}</p></article>
      <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><h3 className="font-semibold text-slate-900">{messages.requestedItems}</h3><p className="mt-2 text-slate-700">{tracked.itemCount}</p></article>
      {quoteResponseAllowed ? <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><h3 className="font-semibold text-slate-900">Quote Response</h3><div className="mt-3 flex flex-wrap gap-2">{[['accepted', 'Accept quotation'], ['changes_requested', 'Request changes'], ['rejected', 'Reject quotation']].map(([value, label]) => <button key={value} type="button" className={`rounded-md border px-3 py-2 ${responseStatus === value ? 'border-navy-900 bg-navy-900 text-white' : 'border-slate-300'}`} onClick={() => setResponseStatus(value as QuoteResponseStatus)}>{label}</button>)}</div><textarea value={responseNotes} onChange={(event) => setResponseNotes(event.target.value)} rows={3} placeholder="Optional notes" className="mt-3 w-full rounded-md border border-slate-300 p-2" /><button type="button" disabled={responseLoading} className="mt-3 rounded-md bg-navy-900 px-4 py-2 text-white disabled:opacity-60">Submit response</button>{responseMessage ? <p className="mt-2 text-slate-700">{responseMessage}</p> : null}</article> : null}
      <div className="flex flex-wrap gap-3"><Link href={contactHref} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">{messages.contactHiltech}</Link><Link href={rfqHref} className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">{messages.backToRFQ}</Link></div>
    </section> : null}
  </div>;
}
