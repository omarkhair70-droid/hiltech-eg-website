'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';
import type { TrackMessages } from '@/content/ar/track';

type QuoteResponseStatus = 'accepted' | 'rejected' | 'changes_requested';
interface TrackedRequest { requestCode: string; status: string; statusExplanation: string; createdAt: string; lastUpdatedAt: string; itemCount: number; items?: Array<{ name: string; category?: string | null; quantity?: number | null; unit?: string | null; notes?: string | null }>; quote?: { status?: string | null } | null; customerResponse?: { status?: string | null } | null; }
interface TrackResponse { ok: boolean; error?: string; request?: TrackedRequest }

const enMessages: TrackMessages = {
  trackTitle: 'Track Your RFQ', trackIntro: 'Enter your RFQ reference and the same phone or email used during submission.',
  rfqReference: 'RFQ Reference', phoneOrEmail: 'Phone or Email', trackButton: 'Track Request', tracking: 'Checking...', status: 'Status', created: 'Created', lastUpdate: 'Last update', requestedItems: 'Items Summary', nextStep: 'Next Step', reference: 'Reference', contactHiltech: 'Contact HILTECH', backToRFQ: 'Back to RFQ', notFound: 'We could not match this RFQ reference with the provided phone/email.', verificationHint: 'Check the reference and use the same phone number or email used in your request.', genericError: 'Unable to load request status right now. Please try again.', statusMessages: { new: 'Your RFQ was received. HILTECH will review the submitted scope and items.', in_review: 'Your RFQ is being reviewed. HILTECH may contact you for clarification.', quoted: 'Your quotation is ready or being shared.', waiting_client: 'HILTECH is waiting for your response or clarification.', won: 'This request has been accepted and moved forward.', lost: 'This request has been closed.', closed: 'This request has been closed or completed.' }, statusFallback: 'Your RFQ status has been updated.',
};

export default function TrackClient({ initialRequestCode = '', locale = 'en', messages = enMessages, rfqHref = '/rfq', contactHref = '/contact' }: { initialRequestCode?: string; locale?: 'en' | 'ar'; messages?: TrackMessages; rfqHref?: string; contactHref?: string; }) {
  const [requestCode, setRequestCode] = useState(initialRequestCode); const [phoneOrEmail, setPhoneOrEmail] = useState(''); const [loading, setLoading] = useState(false); const [result, setResult] = useState<TrackResponse | null>(null);
  const tracked = result?.request; const hasResult = Boolean(result?.ok && tracked);
  const stepMessage = useMemo(() => (tracked ? (messages.statusMessages[tracked.status] || messages.statusFallback) : ''), [tracked, messages]);
  const quoteResponseAllowed = Boolean(tracked?.quote && tracked?.status === 'quoted' && (!tracked.customerResponse?.status || tracked.customerResponse.status === 'no_response'));

  async function onSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setResult(null); try { const response = await fetch('/api/rfq/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request_code: requestCode, phone_or_email: phoneOrEmail }) }); const body = (await response.json()) as TrackResponse; setResult(body); if (body.ok && body.request?.quote) trackEvent('quote_viewed', { source: 'track_page' }); } catch { setResult({ ok: false, error: messages.genericError }); } finally { setLoading(false); } }

  const fmtDate = (value?: string | null) => (value ? new Date(value).toLocaleString(locale === 'ar' ? 'ar-EG' : undefined) : null);

  return <div className="grid gap-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    <form onSubmit={onSubmit} className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-200">{messages.rfqReference}<input value={requestCode} onChange={(event) => setRequestCode(event.target.value)} required className="mt-1 w-full rounded-md border border-white/20 bg-slate-950/70 px-3 py-2 text-sm text-slate-100" dir="ltr" /></label>
        <label className="text-sm font-medium text-slate-200">{messages.phoneOrEmail}<input value={phoneOrEmail} onChange={(event) => setPhoneOrEmail(event.target.value)} required className="mt-1 w-full rounded-md border border-white/20 bg-slate-950/70 px-3 py-2 text-sm text-slate-100" dir="ltr" /></label>
      </div>
      <button disabled={loading} className="mt-4 rounded-md bg-orange-600 hover:bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{loading ? messages.tracking : messages.trackButton}</button>
    </form>
    {result && !hasResult && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">{result.error || `${messages.notFound} ${messages.verificationHint}`}</div>}
    {hasResult && tracked ? <section className="grid gap-4">
      <article className="rounded-xl border border-white/15 bg-white/5 p-5 text-sm"><h2 className="text-xl font-semibold text-white"><span dir="ltr">{tracked.requestCode}</span></h2><p className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-slate-200">{messages.status}: {tracked.status}</p><ul className="mt-4 space-y-1 text-slate-300"><li><b>{messages.created}:</b> {fmtDate(tracked.createdAt)}</li><li><b>{messages.lastUpdate}:</b> {fmtDate(tracked.lastUpdatedAt)}</li></ul></article>
      <article className="rounded-xl border border-white/15 bg-white/5 p-5 text-sm"><h3 className="font-semibold text-white">{messages.nextStep}</h3><p className="mt-2 text-slate-300">{stepMessage}</p></article>
      <article className="rounded-xl border border-white/15 bg-white/5 p-5 text-sm"><h3 className="font-semibold text-white">{messages.requestedItems}</h3><p className="mt-2 text-slate-300">{tracked.itemCount}</p></article>
      {quoteResponseAllowed ? <p className="text-xs text-slate-400">Quote response actions are available after review.</p> : null}
      <div className="flex flex-wrap gap-3 text-sm"><Link href={contactHref} className="text-orange-300 underline">{messages.contactHiltech}</Link><Link href={rfqHref} className="text-orange-300 underline">{messages.backToRFQ}</Link></div>
    </section> : null}
  </div>;
}
