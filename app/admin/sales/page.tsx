import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdminSession } from '@/lib/server/admin-auth';
import { getAdminSalesDashboardData, isAdminSalesDashboardBackendConfigured, parseSalesRange } from '@/lib/server/admin-sales-dashboard';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'Sales Dashboard', robots: { index: false, follow: false } };

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EGP', maximumFractionDigits: 2 });

export default async function AdminSalesDashboardPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  await requireAdminSession();
  const query = await searchParams;
  const range = parseSalesRange(query.range);

  if (!isAdminSalesDashboardBackendConfigured()) {
    return <main className='section'><div className='container'><h1 className='text-2xl font-semibold'>Sales Dashboard</h1><p className='mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700'>Supabase admin backend is not configured.</p></div></main>;
  }

  let data: Awaited<ReturnType<typeof getAdminSalesDashboardData>> | null = null;
  try { data = await getAdminSalesDashboardData(range); } catch (error) { console.error('[admin/sales] Failed to load sales dashboard data.'); if (process.env.NODE_ENV !== 'production') console.error(error); }
  if (!data) return <main className='section'><div className='container'><h1 className='text-2xl font-semibold'>Sales Dashboard</h1><p className='rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-700'>Sales data is temporarily unavailable. Please try again shortly.</p></div></main>;

  return <AdminShell title='Sales Dashboard' description='Revenue and pipeline analytics from Supabase operational RFQ and quotation data.' actions={<Link href='/admin/products/analytics' className='rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold'>View Product Analytics</Link>}><section className='rounded-xl border border-slate-200 bg-white p-4'><div className='flex gap-2'>{[7,30,90,365].map((r)=><Link key={r} href={`/admin/sales?range=${r}`} className={`rounded border px-3 py-2 text-sm ${range===r?'bg-navy-900 text-white':'border-slate-300'}`}>{r}d</Link>)}</div></section>
    <section className='grid grid-cols-2 gap-3 md:grid-cols-5'>{[
      ['Total RFQs', data.kpis.totalRfqs],['Quoted RFQs', data.kpis.quotedRfqs],['Published quotes', data.kpis.publishedQuotes],['Accepted / Won', data.kpis.acceptedWon],['Rejected / Lost', data.kpis.rejectedLost],
      ['Open pipeline', currency.format(data.kpis.openPipelineValue)],['Quoted value', currency.format(data.kpis.quotedValue)],['Won value', currency.format(data.kpis.wonValue)],['Avg quotation', currency.format(data.kpis.avgQuotationValue)],['Acceptance rate', `${data.kpis.acceptanceRate.toFixed(1)}%`],
    ].map(([l,v])=><div key={String(l)} className='rounded-lg border bg-white p-3'><p className='text-xs uppercase text-slate-500'>{l}</p><p className='mt-1 text-2xl font-semibold'>{String(v)}</p></div>)}</section>

    <section className='rounded-xl border bg-white p-4'><h2 className='text-lg font-semibold'>Sales pipeline by stage</h2><div className='mt-3 overflow-x-auto'><table className='min-w-full text-sm'><thead className='bg-slate-50 text-left'><tr><th className='px-3 py-2'>Stage</th><th className='px-3 py-2'>Count</th><th className='px-3 py-2'>Value</th></tr></thead><tbody>{[
      ['New / In review', data.pipeline.newInReview],['Quotation draft', data.pipeline.quotationDraft],['Quotation ready', data.pipeline.quotationReady],['Quotation sent / published', data.pipeline.quotationSent],['Customer viewed', data.pipeline.customerViewed],['Customer accepted', data.pipeline.customerAccepted],['Customer rejected / changes requested', data.pipeline.customerRejectedChanges],['Won', data.pipeline.won],['Lost / closed', data.pipeline.lostClosed],
    ].map(([label,row]: any)=><tr key={label} className='border-t'><td className='px-3 py-2'>{label}</td><td className='px-3 py-2'>{row.count}</td><td className='px-3 py-2'>{currency.format(row.value)}</td></tr>)}</tbody></table></div></section>

    <section className='rounded-xl border bg-white p-4'><h2 className='text-lg font-semibold'>Recent high-value opportunities</h2><div className='mt-3 overflow-x-auto'><table className='min-w-full text-sm'><thead className='bg-slate-50 text-left'><tr><th className='px-3 py-2'>Request</th><th className='px-3 py-2'>Customer / Company</th><th className='px-3 py-2'>Quotation</th><th className='px-3 py-2'>Customer response</th><th className='px-3 py-2'>Grand total</th><th className='px-3 py-2'>Priority</th><th className='px-3 py-2'>Next follow-up</th><th className='px-3 py-2'>Action</th></tr></thead><tbody>{data.highValue.length===0?<tr><td colSpan={8} className='px-3 py-3 text-slate-500'>No opportunities in this range.</td></tr>:data.highValue.map((row:any)=><tr key={row.id} className='border-t'><td className='px-3 py-2 font-semibold'>{row.request_code}</td><td className='px-3 py-2'>{row.full_name}<div className='text-xs text-slate-500'>{row.company_name||'—'}</div></td><td className='px-3 py-2'>{row.quotation_status||'not_started'}</td><td className='px-3 py-2'>{row.quote_customer_response_status||'no_response'}</td><td className='px-3 py-2'>{currency.format(row.grand_total)}</td><td className='px-3 py-2'>{row.sales_priority||'normal'}</td><td className='px-3 py-2'>{row.next_follow_up_at?new Date(row.next_follow_up_at).toLocaleString():'—'}</td><td className='px-3 py-2'><Link className='underline font-semibold' href={`/admin/rfq/${row.id}`}>View RFQ</Link></td></tr>)}</tbody></table></div></section>

    <section className='grid gap-3 md:grid-cols-5'>{[['Overdue follow-ups',data.followup.overdueFollowups],['Waiting customer',data.followup.waitingCustomer],['Waiting supplier',data.followup.waitingSupplier],['Published no response',data.followup.publishedNoResponse],['Viewed no response',data.followup.viewedNoResponse]].map(([l,v])=><div key={String(l)} className='rounded-lg border bg-white p-3'><p className='text-xs uppercase text-slate-500'>{l}</p><p className='mt-1 text-2xl font-semibold'>{v}</p></div>)}</section>

    <section className='rounded-xl border bg-white p-4'><h2 className='text-lg font-semibold'>Time trend</h2><div className='mt-3 overflow-x-auto'><table className='min-w-full text-sm'><thead className='bg-slate-50 text-left'><tr><th className='px-3 py-2'>Date</th><th className='px-3 py-2'>RFQs</th><th className='px-3 py-2'>Quoted value</th><th className='px-3 py-2'>Won value</th></tr></thead><tbody>{data.trends.length===0?<tr><td colSpan={4} className='px-3 py-3 text-slate-500'>No trend data in selected range.</td></tr>:data.trends.map((t)=> <tr key={t.date} className='border-t'><td className='px-3 py-2'>{t.date}</td><td className='px-3 py-2'>{t.rfqCount}</td><td className='px-3 py-2'>{currency.format(t.quotedValue)}</td><td className='px-3 py-2'>{currency.format(t.wonValue)}</td></tr>)}</tbody></table></div></section>

    <section className='grid gap-4 lg:grid-cols-2'><div className='rounded-xl border bg-white p-4'><h2 className='text-lg font-semibold'>Top requested products/categories</h2>{data.topRequested.length===0?<p className='mt-2 text-sm text-slate-500'>No product/category request data available from RFQ items.</p>:<ul className='mt-2 space-y-1 text-sm'>{data.topRequested.map((row)=> <li key={row.name} className='flex justify-between border-b py-1'><span>{row.name}</span><span className='font-semibold'>{row.count}</span></li>)}</ul>}</div><div className='rounded-xl border bg-white p-4'><h2 className='text-lg font-semibold'>Top quoted products/categories by value</h2>{data.topQuoted.length===0?<p className='mt-2 text-sm text-slate-500'>Quoted item totals are missing for this range. Add quotation item pricing to improve this ranking.</p>:<ul className='mt-2 space-y-1 text-sm'>{data.topQuoted.map((row)=> <li key={row.name} className='flex justify-between border-b py-1'><span>{row.name}</span><span className='font-semibold'>{currency.format(row.value)}</span></li>)}</ul>}</div></section>
  </AdminShell>;
}
