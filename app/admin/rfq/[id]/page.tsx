import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import CopyMessageButton from './copy-message-button';
import { requireAdminSession } from '@/lib/server/admin-auth';
import { getRFQRequest, isRFQAdminBackendConfigured, RFQ_STATUSES, updateRFQRequestStatus } from '@/lib/server/rfq-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'RFQ Request Detail', robots: { index: false, follow: false } };

export default async function RFQDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;

  if (!isRFQAdminBackendConfigured()) {
    return <main className="section"><div className="container"><p className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">Supabase admin backend is not configured.</p></div></main>;
  }

  const rfq = await getRFQRequest(id);
  if (!rfq) notFound();

  async function updateAction(formData: FormData) {
    'use server';
    await requireAdminSession();
    const status = String(formData.get('status') || 'new');
    const internalNotes = String(formData.get('internalNotes') || '');
    if (!RFQ_STATUSES.includes(status as any)) throw new Error('Invalid status');
    await updateRFQRequestStatus(id, status as any, internalNotes);
    redirect(`/admin/rfq/${id}`);
  }

  const whatsappCustomerLink = rfq.phone ? `https://wa.me/${rfq.phone.replace(/\D/g, '')}` : null;

  return <main className="section"><div className="container space-y-5"><a href="/admin/rfq" className="text-sm font-semibold text-navy-900 underline">← Back to list</a>
    <h1 className="text-2xl font-semibold text-slate-900">RFQ {rfq.request_code}</h1>
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-xl border border-slate-200 bg-white p-4 text-sm"><h2 className="mb-2 font-semibold">Customer / Project</h2><ul className="space-y-1"><li><b>Name:</b> {rfq.full_name}</li><li><b>Company:</b> {rfq.company_name || '—'}</li><li><b>Phone:</b> {rfq.phone}</li><li><b>Email:</b> {rfq.email}</li><li><b>Location:</b> {rfq.project_location || '—'}</li><li><b>Project notes:</b> {rfq.project_notes || '—'}</li><li><b>Request type:</b> {rfq.request_type || '—'}</li><li><b>Source:</b> {rfq.source}</li></ul>
      <div className="mt-3 flex flex-wrap gap-2 text-xs"><a href={`tel:${rfq.phone}`} className="rounded border border-slate-300 px-2 py-1">Call</a><a href={`mailto:${rfq.email}`} className="rounded border border-slate-300 px-2 py-1">Email</a>{whatsappCustomerLink && <a href={whatsappCustomerLink} target="_blank" className="rounded border border-slate-300 px-2 py-1" rel="noreferrer">WhatsApp</a>}</div></section>
      <section className="rounded-xl border border-slate-200 bg-white p-4 text-sm"><h2 className="mb-2 font-semibold">RFQ Metadata</h2><ul className="space-y-1"><li><b>Status:</b> {rfq.status}</li><li><b>Urgency:</b> {rfq.urgency || '—'}</li><li><b>Created:</b> {new Date(rfq.created_at).toLocaleString()}</li><li><b>Last status change:</b> {rfq.last_status_changed_at ? new Date(rfq.last_status_changed_at).toLocaleString() : '—'}</li></ul></section>
    </div>
    {rfq.whatsapp_message && <section className="rounded-xl border border-slate-200 bg-white p-4 text-sm"><div className="mb-2 flex items-center justify-between"><h2 className="font-semibold">Stored WhatsApp message</h2><CopyMessageButton text={rfq.whatsapp_message} /></div><pre className="whitespace-pre-wrap rounded border border-slate-200 bg-slate-50 p-3 text-xs">{rfq.whatsapp_message}</pre></section>}
    <section className="rounded-xl border border-slate-200 bg-white p-4"><h2 className="mb-2 font-semibold">Requested items</h2><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="text-left text-slate-600"><tr><th className="px-2 py-1">Name</th><th className="px-2 py-1">Qty</th><th className="px-2 py-1">Unit</th><th className="px-2 py-1">Brand</th><th className="px-2 py-1">Category</th><th className="px-2 py-1">Urgency</th><th className="px-2 py-1">Notes</th></tr></thead><tbody>{rfq.rfq_request_items?.map((item: any) => <tr key={item.id} className="border-t border-slate-100"><td className="px-2 py-1">{item.name}</td><td className="px-2 py-1">{item.quantity ?? '—'}</td><td className="px-2 py-1">{item.unit || '—'}</td><td className="px-2 py-1">{item.brand || '—'}</td><td className="px-2 py-1">{item.category || '—'}</td><td className="px-2 py-1">{item.urgency || '—'}</td><td className="px-2 py-1">{item.notes || '—'}</td></tr>)}</tbody></table></div>{(!rfq.rfq_request_items || rfq.rfq_request_items.length === 0) && <p className="text-sm text-slate-600">No items found.</p>}</section>
    <form action={updateAction} className="rounded-xl border border-slate-200 bg-white p-4"><h2 className="mb-3 font-semibold">Update status</h2><div className="grid gap-3 md:grid-cols-2"><select name="status" defaultValue={rfq.status} className="rounded-md border border-slate-300 px-3 py-2 text-sm">{RFQ_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}</select><input name="internalNotes" defaultValue={rfq.internal_notes || ''} placeholder="Internal notes" className="rounded-md border border-slate-300 px-3 py-2 text-sm" /></div><button className="mt-3 rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">Save</button></form>
  </div></main>;
}
