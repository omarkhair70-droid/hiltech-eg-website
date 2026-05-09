import type { Metadata } from 'next';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { requirePermission } from '@/lib/server/admin-session';
import { getAdminActionCenterData, isAdminActionCenterConfigured } from '@/lib/server/admin-action-center';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'Action Center', robots: { index: false, follow: false } };

const badgeClass = 'rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700';

function displayName(row: { company_name: string | null; full_name: string | null }) {
  return row.company_name || row.full_name || '—';
}

function dateValue(value: string | null) {
  return value ? new Date(value).toLocaleString() : '—';
}

type ActionListSection = {
  title: string;
  rows: Awaited<ReturnType<typeof getAdminActionCenterData>>['newRFQs'];
  detail: (row: Awaited<ReturnType<typeof getAdminActionCenterData>>['newRFQs'][number]) => string;
  empty: string;
};

export default async function AdminActionCenterPage() {
  await requirePermission('reports:view');

  if (!isAdminActionCenterConfigured()) {
    return <main className="section"><div className="container"><p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700">Action Center backend is not configured.</p></div></main>;
  }

  let data: Awaited<ReturnType<typeof getAdminActionCenterData>>;
  try {
    data = await getAdminActionCenterData();
  } catch {
    console.error('[admin] Action Center data load failed.');
    return <main className="section"><div className="container"><p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700">Action Center data is temporarily unavailable.</p></div></main>;
  }

  const cards = [
    ['New RFQs', data.newRFQs.length],
    ['Overdue follow-ups', data.overdueFollowUps.length],
    ['Quotes ready', data.quotesReadyToPublish.length],
    ['Awaiting response', data.publishedAwaitingResponse.length],
    ['Viewed no response', data.quoteViewedNoResponse.length],
    ['High-value/urgent', data.highValueUrgent.length],
    ['Waiting customer/supplier', data.waitingSupplierCustomer.length],
    ['Inventory attention', data.inventoryAttention.length],
  ];
  const listSections: ActionListSection[] = [
    { title: 'Follow-ups overdue', rows: data.overdueFollowUps, detail: (row) => `Priority ${row.sales_priority || 'normal'} · ${dateValue(row.next_follow_up_at)}`, empty: 'No overdue follow-ups.' },
    { title: 'Quotes ready to publish', rows: data.quotesReadyToPublish, detail: (row) => row.quotation_status || 'ready', empty: 'No quotes ready to publish.' },
    { title: 'Published quotes awaiting response', rows: data.publishedAwaitingResponse, detail: (row) => `Sent ${dateValue(row.quote_sent_at)} · Viewed ${dateValue(row.quote_customer_last_viewed_at)}`, empty: 'No published quotes awaiting response.' },
    { title: 'Quote viewed but no response', rows: data.quoteViewedNoResponse, detail: (row) => `Viewed ${dateValue(row.quote_customer_last_viewed_at)} · Sent ${dateValue(row.quote_sent_at)}`, empty: 'No viewed quotes awaiting response.' },
    { title: 'High-value / urgent RFQs', rows: data.highValueUrgent, detail: (row) => `${row.status || '—'} · ${row.quotation_status || 'not_started'} · ${row.sales_priority || '—'}`, empty: 'No high-value or urgent RFQs.' },
    { title: 'Supplier/customer waiting', rows: data.waitingSupplierCustomer, detail: (row) => `${row.status || '—'} · ${row.sales_priority || '—'} · Follow-up ${dateValue(row.next_follow_up_at)}`, empty: 'No waiting customer/supplier RFQs.' },
  ];

  return <AdminShell title="Action Center" description="Follow-ups, quotes, inventory, and RFQ actions that need attention." actions={<Link href='/admin/insights' className='rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold'>View Insights</Link>}>
    <section className='grid grid-cols-2 gap-3 md:grid-cols-4'>{cards.map(([label, count]) => <div key={String(label)} className='rounded-lg border border-slate-200 bg-white p-3'><p className='text-xs uppercase text-slate-500'>{label}</p><p className='mt-1 text-2xl font-semibold'>{Number(count)}</p></div>)}</section>

    <section className='space-y-3 rounded-xl border border-slate-200 bg-white p-4'><h2 className='text-lg font-semibold'>New RFQs to review ({data.newRFQs.length})</h2>{data.newRFQs.length===0?<p className='text-sm text-slate-600'>No new RFQs to review.</p>:<div className='overflow-x-auto'><table className='min-w-full text-sm'><thead className='bg-slate-50 text-left text-slate-600'><tr><th className='px-3 py-2'>Request</th><th className='px-3 py-2'>Company / Display</th><th className='px-3 py-2'>Status</th><th className='px-3 py-2'>Urgency / Priority</th><th className='px-3 py-2'>Created</th><th className='px-3 py-2'>Action</th></tr></thead><tbody>{data.newRFQs.map((row)=><tr key={row.id} className='border-t border-slate-100'><td className='px-3 py-2 font-semibold'>{row.request_code}</td><td className='px-3 py-2'>{displayName(row)}</td><td className='px-3 py-2'><span className={badgeClass}>{row.status || '—'}</span></td><td className='px-3 py-2'>{row.urgency || row.sales_priority || '—'}</td><td className='px-3 py-2'>{dateValue(row.created_at)}</td><td className='px-3 py-2'><Link href={`/admin/rfq/${row.id}`} className='font-semibold underline'>Open</Link></td></tr>)}</tbody></table></div>}</section>

    {listSections.map((section) => <section key={section.title} className='rounded-xl border border-slate-200 bg-white p-4'><h2 className='text-lg font-semibold'>{section.title} ({section.rows.length})</h2>{section.rows.length===0?<p className='mt-2 text-sm text-slate-600'>{section.empty}</p>:<ul className='mt-3 space-y-2'>{section.rows.map((row)=><li key={row.id} className='flex flex-col justify-between gap-2 rounded-lg border border-slate-100 p-3 md:flex-row md:items-center'><div><p className='font-semibold'>{row.request_code} · {displayName(row)}</p><p className='text-xs text-slate-600'>{section.detail(row)}</p></div><Link href={`/admin/rfq/${row.id}`} className='text-sm font-semibold underline'>Open</Link></li>)}</ul>}</section>)}

    <section className='space-y-3 rounded-xl border border-slate-200 bg-white p-4'><h2 className='text-lg font-semibold'>Inventory attention ({data.inventoryAttention.length})</h2>{data.inventoryAttention.length===0?<p className='text-sm text-slate-600'>No products currently need stock attention.</p>:<div className='overflow-x-auto'><table className='min-w-full text-sm'><thead className='bg-slate-50 text-left text-slate-600'><tr><th className='px-3 py-2'>Code</th><th className='px-3 py-2'>Name</th><th className='px-3 py-2'>Category</th><th className='px-3 py-2'>Stock status</th><th className='px-3 py-2'>Stock qty</th><th className='px-3 py-2'>Low threshold</th><th className='px-3 py-2'>Action</th></tr></thead><tbody>{data.inventoryAttention.map((row)=><tr key={row.id} className='border-t border-slate-100'><td className='px-3 py-2 font-semibold'>{row.product_code || '—'}</td><td className='px-3 py-2'>{row.name}</td><td className='px-3 py-2'>{row.category || '—'}</td><td className='px-3 py-2'><span className={badgeClass}>{row.stock_status || 'unknown'}</span></td><td className='px-3 py-2'>{row.stock_quantity ?? '—'}</td><td className='px-3 py-2'>{row.low_stock_threshold ?? '—'}</td><td className='px-3 py-2'><Link href={`/admin/products/${row.id}`} className='font-semibold underline'>Edit product</Link></td></tr>)}</tbody></table></div>}</section>
  </AdminShell>;
}
