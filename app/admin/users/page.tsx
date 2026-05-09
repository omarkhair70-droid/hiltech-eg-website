import AdminShell from '@/components/admin/AdminShell';
import { getAdminAuthMode, requirePermission } from '@/lib/server/admin-session';
import { logAdminAction } from '@/lib/server/admin-audit';
import { createAdminProfileForExistingAuthUser, listAdminProfiles, updateAdminProfileActive, updateAdminProfileRole } from '@/lib/server/admin-users';
import { ADMIN_ROLES, type AdminRole } from '@/lib/server/admin-permissions';

export const dynamic = 'force-dynamic';

async function createProfileAction(formData: FormData) {
  'use server';
  const admin = await requirePermission('admin_users:manage');
  const userId = String(formData.get('user_id') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const fullName = String(formData.get('full_name') || '').trim();
  const role = String(formData.get('role') || '').trim() as AdminRole;
  await createAdminProfileForExistingAuthUser({ userId, email, fullName, role });
  await logAdminAction({ adminUserId: admin.id, adminEmail: admin.email, action: 'admin.user.created', entityType: 'admin_profile', entityId: userId, metadata: { target_email: email, target_user_id: userId, new_role: role } });
}

async function updateRoleAction(formData: FormData) {
  'use server';
  const admin = await requirePermission('admin_users:manage');
  const userId = String(formData.get('user_id') || '');
  const oldRole = String(formData.get('old_role') || '');
  const newRole = String(formData.get('new_role') || '') as AdminRole;
  await updateAdminProfileRole(userId, newRole);
  await logAdminAction({ adminUserId: admin.id, adminEmail: admin.email, action: 'admin.user.role_changed', entityType: 'admin_profile', entityId: userId, metadata: { target_user_id: userId, old_role: oldRole, new_role: newRole } });
}

async function toggleActiveAction(formData: FormData) {
  'use server';
  const admin = await requirePermission('admin_users:manage');
  const userId = String(formData.get('user_id') || '');
  const targetEmail = String(formData.get('email') || '');
  const oldActive = String(formData.get('old_active') || '') === 'true';
  const newActive = !oldActive;
  if (admin.id && admin.id === userId && !newActive) throw new Error('Owner cannot deactivate self.');
  await updateAdminProfileActive(userId, newActive);
  await logAdminAction({ adminUserId: admin.id, adminEmail: admin.email, action: newActive ? 'admin.user.activated' : 'admin.user.deactivated', entityType: 'admin_profile', entityId: userId, metadata: { target_email: targetEmail, target_user_id: userId, old_active: oldActive, new_active: newActive } });
}

export default async function AdminUsersPage() {
  await requirePermission('admin_users:manage');
  const authMode = getAdminAuthMode();
  let profiles = [] as Awaited<ReturnType<typeof listAdminProfiles>>;
  let error: string | null = null;
  try { profiles = await listAdminProfiles(); } catch (e) { error = e instanceof Error ? e.message : 'Failed to load admin profiles.'; }

  return <AdminShell title='Admin Users' description='Manage admin profiles, roles, and active status for Enterprise Admin Auth.'>
    <section className='rounded-xl border border-slate-200 bg-white p-4 space-y-2 text-sm'>
      <p><span className='font-semibold'>Current auth mode:</span> ADMIN_AUTH_MODE={authMode}</p>
      {authMode === 'legacy' ? <p className='rounded border border-amber-200 bg-amber-50 p-2 text-amber-800'>Legacy shared-password auth is still active. Supabase admin users are prepared for migration and should be enabled only after first-owner verification.</p> : null}
      <p className='rounded border border-slate-200 bg-slate-50 p-2'>MFA status: Not implemented in this release (planned Phase 2B using Supabase Auth MFA).</p>
    </section>
    {error ? <section className='rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm'>{error}</section> : null}
    <section className='rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto'>
      <table className='min-w-full text-sm'><thead><tr className='text-left border-b'><th>Email</th><th>Name</th><th>Role</th><th>Status</th><th>Created</th><th>Updated</th><th>Last login</th><th>Actions</th></tr></thead><tbody>
        {profiles.map((p) => <tr key={p.id} className='border-b align-top'><td>{p.email}</td><td>{p.full_name || '—'}</td><td>{p.role}</td><td>{p.is_active ? 'Active' : 'Inactive'}</td><td>{new Date(p.created_at).toLocaleString()}</td><td>{p.updated_at ? new Date(p.updated_at).toLocaleString() : '—'}</td><td>{'Not tracked yet'}</td><td className='space-y-2 py-2'>
          <form action={updateRoleAction} className='flex gap-2'>
            <input type='hidden' name='user_id' value={p.id} /><input type='hidden' name='old_role' value={p.role} />
            <select name='new_role' defaultValue={p.role} className='border rounded px-2 py-1'>{ADMIN_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}</select>
            <button className='border rounded px-2 py-1'>Change role</button>
          </form>
          <form action={toggleActiveAction}><input type='hidden' name='user_id' value={p.id} /><input type='hidden' name='email' value={p.email} /><input type='hidden' name='old_active' value={String(p.is_active)} /><button className='border rounded px-2 py-1'>{p.is_active ? 'Deactivate' : 'Activate'}</button></form>
        </td></tr>)}
      </tbody></table>
    </section>
    <section className='rounded-xl border border-slate-200 bg-white p-4 text-sm'>
      <h2 className='text-lg font-semibold'>Create profile for existing Supabase Auth user</h2>
      <p className='text-slate-600'>Create the auth user first in Supabase Dashboard, then add admin profile.</p>
      <form action={createProfileAction} className='mt-3 grid gap-2 md:grid-cols-2'>
        <input name='user_id' placeholder='Auth user UUID' required className='border rounded px-2 py-1' />
        <input name='email' placeholder='Email' type='email' required className='border rounded px-2 py-1' />
        <input name='full_name' placeholder='Full name (optional)' className='border rounded px-2 py-1' />
        <select name='role' defaultValue='manager' className='border rounded px-2 py-1'>{ADMIN_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}</select>
        <button className='rounded bg-navy-900 px-3 py-2 text-white md:col-span-2 w-fit'>Create / upsert admin profile</button>
      </form>
    </section>
  </AdminShell>;
}
