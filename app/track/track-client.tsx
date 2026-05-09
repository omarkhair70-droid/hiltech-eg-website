'use client';

import { FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';

interface TrackResponse { ok: boolean; error?: string; request?: any }

export default function TrackClient({ initialRequestCode = '' }: { initialRequestCode?: string }) {
  const [requestCode, setRequestCode] = useState(initialRequestCode);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResponse | null>(null);
  const tracked = result?.request;
  const hasResult = Boolean(result?.ok && tracked);
  const updatedLabel = useMemo(() => (tracked ? new Date(tracked.lastUpdatedAt).toLocaleString() : ''), [tracked]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/rfq/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request_code: requestCode, phone_or_email: phoneOrEmail }) });
      const body = (await response.json()) as TrackResponse;
      setResult(body);
      if (body.ok && body.request?.quote) trackEvent('quote_viewed', { source: 'track_page' });
    } catch {
      setResult({ ok: false, error: 'We could not match this RFQ reference with the provided phone/email. Check the reference and contact details.' });
    } finally { setLoading(false); }
  }

  return <div className="grid gap-6"><form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4"><div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium text-slate-700">RFQ Reference<input value={requestCode} onChange={(event) => setRequestCode(event.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label><label className="text-sm font-medium text-slate-700">Phone or Email<input value={phoneOrEmail} onChange={(event) => setPhoneOrEmail(event.target.value)} required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" /></label></div><p className="mt-2 text-xs text-slate-600">You can use local or international Egyptian phone format.</p><button disabled={loading} className="mt-4 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Checking…' : 'Track Request'}</button></form>
{result && !hasResult && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{result.error || 'We could not match this RFQ reference with the provided phone/email. Check the reference and contact details.'}</div>}
{hasResult && <section className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><h2 className="text-xl font-semibold text-slate-900">{tracked.requestCode}</h2><p className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">{tracked.status}</p><p className="mt-2 text-slate-700">{tracked.statusExplanation}</p><ul className="mt-4 space-y-1 text-slate-700"><li><b>Created:</b> {new Date(tracked.createdAt).toLocaleString()}</li><li><b>Last update:</b> {updatedLabel}</li><li><b>Items:</b> {tracked.itemCount}</li></ul></section>}
</div>;
}
