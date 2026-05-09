import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminAuthMode, getCurrentAdmin } from '@/lib/server/admin-session';
import { isAdminConfigured } from '@/lib/server/admin-auth';
import { isSupabaseAuthConfigured } from '@/lib/server/supabase-auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'HILTECH Admin Login',
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid: 'Invalid login details.',
  not_authorized: 'This account is not authorized for admin access.',
  inactive: 'This admin account is disabled.',
  config: 'Admin authentication is not configured.',
  rate_limited: 'Too many attempts. Please wait and try again.',
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getCurrentAdmin()) redirect('/admin/rfq');

  const params = await searchParams;
  const mode = getAdminAuthMode();
  const configured = mode === 'legacy' ? isAdminConfigured() : isSupabaseAuthConfigured();

  return (
    <main className="section">
      <div className="container max-w-lg">
        <h1 className="text-2xl font-semibold text-slate-900">HILTECH Admin Login</h1>
        {mode === 'supabase' && <p className="mt-2 text-sm text-slate-600">Sign in with your assigned admin account.</p>}
        {!configured && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">Admin authentication is not configured.</p>}
        {params.error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{ERROR_MESSAGES[params.error] || 'Invalid login details.'}</p>}
        <form className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-5" action="/api/admin/login" method="post">
          {mode === 'supabase' && (
            <>
              <label className="block text-sm font-medium text-slate-800" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" autoComplete="email" />
            </>
          )}
          <label className="block text-sm font-medium text-slate-800" htmlFor="password">{mode === 'legacy' ? 'Admin password' : 'Password'}</label>
          <input id="password" name="password" type="password" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" autoComplete={mode === 'legacy' ? 'current-password' : 'off'} />
          <button type="submit" className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">Sign in</button>
        </form>
      </div>
    </main>
  );
}
