'use client';

import { FormEvent, useMemo, useState } from 'react';

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
    items: Array<{ name: string }>;
  };
}

export default function TrackClient({ initialRequestCode = '' }: { initialRequestCode?: string }) {
  const [requestCode, setRequestCode] = useState(initialRequestCode);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResponse | null>(null);

  const tracked = result?.request || null;
  const hasResult = Boolean(result?.ok && tracked);

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
    } catch {
      setResult({ ok: false, error: 'We couldn’t verify this request. Please check the reference code and contact details.' });
    } finally {
      setLoading(false);
    }
  }

  return <div className="grid gap-6"><form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4"><div className="grid gap-3 md:grid-cols-2"><label className="text-sm font-medium text-slate-700">RFQ Reference<input value={requestCode} onChange={(event) => setRequestCode(event.target.value)} name="request_code" required maxLength={64} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="RFQ-20260501-..." /></label><label className="text-sm font-medium text-slate-700">Phone or Email<input value={phoneOrEmail} onChange={(event) => setPhoneOrEmail(event.target.value)} name="phone_or_email" required maxLength={160} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Same phone/email used in your request" /></label></div><button disabled={loading} className="mt-4 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Checking…' : 'Track Request'}</button></form>

    {result && !hasResult && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{result.error || 'We couldn’t verify this request. Please check the reference code and contact details.'}</div>}

    {hasResult && tracked && <section className="rounded-xl border border-slate-200 bg-white p-5 text-sm"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Tracking result</p><h2 className="mt-2 text-xl font-semibold text-slate-900">{tracked.requestCode}</h2><p className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">{tracked.status}</p><p className="mt-2 text-slate-700">{tracked.statusExplanation}</p><ul className="mt-4 space-y-1 text-slate-700"><li><b>Customer:</b> {tracked.customerDisplayName}</li><li><b>Created:</b> {new Date(tracked.createdAt).toLocaleString()}</li><li><b>Last update:</b> {updatedLabel}</li>{tracked.projectLocation && <li><b>Project location:</b> {tracked.projectLocation}</li>}<li><b>Item count:</b> {tracked.itemCount}</li></ul>{tracked.items.length > 0 && <div className="mt-3"><p className="font-semibold text-slate-800">Requested items</p><ul className="mt-1 list-inside list-disc text-slate-700">{tracked.items.map((item, idx) => <li key={`${item.name}-${idx}`}>{item.name}</li>)}</ul></div>}<a href="https://wa.me/201555357807" target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 font-semibold text-navy-900">Contact HILTECH via WhatsApp</a></section>}
  </div>;
}
