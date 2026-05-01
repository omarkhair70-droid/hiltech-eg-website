import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated, isAdminConfigured } from '@/lib/server/admin-auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'HILTECH Admin Login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdminAuthenticated()) redirect('/admin/rfq');
  const params = await searchParams;
  const configured = isAdminConfigured();

  return (
    <main className="section">
      <div className="container max-w-lg">
        <h1 className="text-2xl font-semibold text-slate-900">HILTECH Admin Login</h1>
        {!configured && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">Admin dashboard is not configured. Set ADMIN_DASHBOARD_PASSWORD and ADMIN_SESSION_SECRET.</p>}
        {params.error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">Invalid password. Please try again.</p>}
        <form className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-5" action="/api/admin/login" method="post">
          <label className="block text-sm font-medium text-slate-800" htmlFor="password">Admin password</label>
          <input id="password" name="password" type="password" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          <button type="submit" className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">Sign in</button>
        </form>
      </div>
    </main>
  );
}
