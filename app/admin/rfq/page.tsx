import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdminSession } from '@/lib/server/admin-auth';
import { getRFQSummaryCounts, isRFQAdminBackendConfigured, listRFQRequests } from '@/lib/server/rfq-admin';

const priorityClass=(p:string)=>({urgent:'bg-red-100 text-red-700',high_value:'bg-purple-100 text-purple-700',waiting_customer:'bg-amber-100 text-amber-700',waiting_supplier:'bg-blue-100 text-blue-700',normal:'bg-slate-100 text-slate-700'}[p]||'bg-slate-100 text-slate-700');

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'RFQ Admin Dashboard', robots: { index: false, follow: false } };

function statusClass(status: string) {
  if (status === 'new') return 'bg-blue-100 text-blue-700';
  if (status === 'in_review') return 'bg-amber-100 text-amber-700';
  if (status === 'quoted') return 'bg-purple-100 text-purple-700';
  if (status === 'won') return 'bg-emerald-100 text-emerald-700';
  if (status === 'lost' || status === 'closed') return 'bg-slate-200 text-slate-700';
  return 'bg-slate-100 text-slate-700';
}

export default async function AdminRFQPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  await requireAdminSession();
  const query = await searchParams;

  if (!isRFQAdminBackendConfigured()) {
    return <main className="section"><div className="container"><h1 className="text-2xl font-semibold">RFQ Admin Dashboard</h1><p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">Supabase admin backend is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.</p></div></main>;
  }

  const [summary, rows] = await Promise.all([getRFQSummaryCounts(), listRFQRequests(query)]);

  return <main className="section"><div className="container space-y-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-semibold text-slate-900">RFQ Admin Dashboard</h1><Link href="/admin/products" className="text-sm underline">Go to Product Admin</Link></div><form action="/api/admin/logout" method="post"><button className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">Logout</button></form></div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{[['New', summary.new], ['In review', summary.in_review], ['Quoted', summary.quoted], ['Total', summary.total]].map(([label, value]) => <div key={String(label)} className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-xs uppercase text-slate-500">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div>)}</div>
    <div className='flex flex-wrap gap-2'><a href='/admin/rfq?quick=new_pending' className='rounded border px-2 py-1 text-xs'>New / Pending</a><a href='/admin/rfq?quick=urgent' className='rounded border px-2 py-1 text-xs'>Urgent</a><a href='/admin/rfq?quick=high_value' className='rounded border px-2 py-1 text-xs'>High value</a><a href='/admin/rfq?quick=waiting_customer' className='rounded border px-2 py-1 text-xs'>Waiting customer</a><a href='/admin/rfq?quick=waiting_supplier' className='rounded border px-2 py-1 text-xs'>Waiting supplier</a><a href='/admin/rfq?quick=followup_due' className='rounded border px-2 py-1 text-xs'>Follow-up due</a></div><form className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-6" method="get">
      <input name="search" defaultValue={query.search || ''} placeholder="Search code/name/phone/company" className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
      <input name="source" defaultValue={query.source || ''} placeholder="Source" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
      <input name="urgency" defaultValue={query.urgency || ''} placeholder="Urgency" className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
      <select name="status" defaultValue={query.status || ''} className="rounded-md border border-slate-300 px-3 py-2 text-sm"><option value="">All statuses</option><option value="new">new</option><option value="in_review">in_review</option><option value="quoted">quoted</option><option value="waiting_client">waiting_client</option><option value="won">won</option><option value="lost">lost</option><option value="closed">closed</option></select>
      <select name='sales_priority' defaultValue={query.sales_priority||''} className='rounded-md border border-slate-300 px-3 py-2 text-sm'><option value=''>All priorities</option><option value='normal'>normal</option><option value='urgent'>urgent</option><option value='high_value'>high_value</option><option value='waiting_customer'>waiting_customer</option><option value='waiting_supplier'>waiting_supplier</option></select><input name='quick' defaultValue={query.quick||''} className='hidden'/><button className="rounded-md bg-navy-900 px-3 py-2 text-sm font-semibold text-white md:col-span-6">Apply filters</button>
    </form>
    {rows.length === 0 ? <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">No RFQ requests match current filters.</p> :
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="min-w-full text-sm"><thead className="bg-slate-50 text-left text-slate-600"><tr><th className="px-3 py-2">Request</th><th className="px-3 py-2">Customer / Company</th><th className="px-3 py-2">Contact</th><th className="px-3 py-2">Source</th><th className="px-3 py-2">Urgency</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Priority</th><th className="px-3 py-2">Next follow-up</th><th className="px-3 py-2">Created</th><th className="px-3 py-2">Items</th><th className="px-3 py-2">Action</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} className="border-t border-slate-100"><td className="px-3 py-2 font-semibold">{row.request_code}</td><td className="px-3 py-2">{row.full_name}<div className="text-xs text-slate-500">{row.company_name || '—'}</div></td><td className="px-3 py-2"><div>{row.phone}</div><div className="text-xs text-slate-500">{row.email}</div></td><td className="px-3 py-2">{row.source}</td><td className="px-3 py-2">{row.urgency || '—'}</td><td className="px-3 py-2"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass(row.status)}`}>{row.status}</span></td><td className="px-3 py-2"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityClass(row.sales_priority||'normal')}`}>{row.sales_priority||'normal'}</span></td><td className="px-3 py-2">{row.next_follow_up_at?new Date(row.next_follow_up_at).toLocaleString():'—'}</td><td className="px-3 py-2">{new Date(row.created_at).toLocaleString()}</td><td className="px-3 py-2">{row.item_count}</td><td className="px-3 py-2"><Link className="font-semibold text-navy-900 underline" href={`/admin/rfq/${row.id}`}>View details</Link></td></tr>)}</tbody></table></div>}
  </div></main>;
}
