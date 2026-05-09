import AdminShell from '@/components/admin/AdminShell';
import { requireRole } from '@/lib/server/admin-session';
import { listAuditLogs } from '@/lib/server/admin-audit-log';

export const dynamic = 'force-dynamic';

export default async function AdminAuditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireRole(['owner', 'manager']);
  const params = await searchParams;
  const action = typeof params.action === 'string' ? params.action : '';
  const entityType = typeof params.entity_type === 'string' ? params.entity_type : '';
  const adminEmail = typeof params.admin_email === 'string' ? params.admin_email : '';
  const from = typeof params.from === 'string' ? params.from : '';
  const to = typeof params.to === 'string' ? params.to : '';
  let logs = [] as Awaited<ReturnType<typeof listAuditLogs>>;
  let error: string | null = null;
  try { logs = await listAuditLogs({ action, entityType, adminEmail, from, to }); } catch (e) { error = e instanceof Error ? e.message : 'Failed to load audit logs.'; }

  return <AdminShell title='Audit Trail' description='Review critical admin actions recorded for RFQ, quotes, products, reports, and auth.'>
    <section className='rounded-xl border border-slate-200 bg-white p-4'>
      <form className='grid gap-2 md:grid-cols-5'>
        <input name='action' defaultValue={action} placeholder='Action' className='border rounded px-2 py-1' />
        <input name='entity_type' defaultValue={entityType} placeholder='Entity type' className='border rounded px-2 py-1' />
        <input name='admin_email' defaultValue={adminEmail} placeholder='Admin email' className='border rounded px-2 py-1' />
        <input name='from' defaultValue={from} type='date' className='border rounded px-2 py-1' />
        <input name='to' defaultValue={to} type='date' className='border rounded px-2 py-1' />
        <button className='rounded bg-navy-900 px-3 py-2 text-white w-fit'>Filter</button>
      </form>
    </section>
    {error ? <section className='rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm'>{error}</section> : null}
    <section className='rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto'>
      <table className='min-w-full text-sm'><thead><tr className='border-b text-left'><th>Created</th><th>Admin</th><th>Action</th><th>Entity</th><th>Entity ID</th><th>Metadata summary</th></tr></thead><tbody>
        {logs.map((l, i) => <tr key={`${l.created_at}-${i}`} className='border-b align-top'><td>{new Date(l.created_at).toLocaleString()}</td><td>{l.admin_email || '—'}</td><td>{l.action}</td><td>{l.entity_type}</td><td>{l.entity_id || '—'}</td><td className='max-w-sm break-words'>{l.metadata ? JSON.stringify(l.metadata) : '—'}</td></tr>)}
      </tbody></table>
    </section>
  </AdminShell>;
}
