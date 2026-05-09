import type { Metadata } from 'next';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { requirePermission } from '@/lib/server/admin-session';
import { requirePermissionOrRedirect } from '@/lib/server/admin-page-guard';
import { getAdminInsightsData } from '@/lib/server/admin-insights';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'HILTECH Insights', robots: { index: false, follow: false } };
const priorityClass = { high: 'bg-red-100 text-red-800', medium: 'bg-amber-100 text-amber-800', low: 'bg-slate-100 text-slate-700' };

export default async function AdminInsightsPage() {
  const adminAccess = await requirePermissionOrRedirect('reports:view'); if (!adminAccess) return <main className='section'><div className='container'><p className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700'>Not authorized.</p></div></main>;
  const { insights, isUnavailable } = await getAdminInsightsData();
  const high = insights.filter((x) => x.priority === 'high').length;
  const medium = insights.filter((x) => x.priority === 'medium').length;
  const low = insights.filter((x) => x.priority === 'low').length;

  return <AdminShell title='HILTECH Insights' description='Rule-based recommendations from sales, RFQ, product, inventory, and website analytics.'>
    {isUnavailable ? <section className='rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-700'>Insights are temporarily unavailable.</section> : null}
    <section className='grid grid-cols-2 gap-3 md:grid-cols-4'>{[['High priority', high], ['Medium priority', medium], ['Low priority', low], ['Total insights', insights.length]].map(([label, value]) => <div key={String(label)} className='rounded-lg border border-slate-200 bg-white p-3'><p className='text-xs uppercase text-slate-500'>{label}</p><p className='mt-1 text-2xl font-semibold'>{Number(value)}</p></div>)}</section>
    {insights.length === 0 ? <section className='rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600'>No major insights right now.</section> : <section className='grid gap-4'>{insights.map((insight) => <article key={insight.id} className='rounded-xl border border-slate-200 bg-white p-4'><div className='flex flex-wrap items-center gap-2'><span className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityClass[insight.priority]}`}>{insight.priority}</span><span className='rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700'>{insight.category}</span></div><h2 className='mt-2 text-lg font-semibold'>{insight.title}</h2><p className='mt-1 text-sm text-slate-700'>{insight.summary}</p><p className='mt-2 text-sm'><span className='font-semibold'>{insight.metricLabel}:</span> {insight.metricValue}</p><p className='mt-1 text-sm text-slate-700'><span className='font-semibold'>Recommendation:</span> {insight.recommendation}</p><p className='mt-2 text-xs text-slate-500'>Source: {insight.sourceLabel}</p>{insight.href ? <div className='mt-3'><Link href={insight.href} className='rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold'>Open related dashboard</Link></div> : null}</article>)}</section>}
  </AdminShell>;
}
