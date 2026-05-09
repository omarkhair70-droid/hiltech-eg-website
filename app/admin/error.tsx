'use client';

import Link from 'next/link';

export default function AdminErrorPage() {
  return (
    <main className='section'>
      <div className='container max-w-xl space-y-4'>
        <h1 className='text-2xl font-semibold text-slate-900'>Admin area could not load.</h1>
        <p className='text-sm text-slate-700'>Please refresh or contact the site owner.</p>
        <div className='flex flex-wrap gap-3'>
          <Link href='/admin/login' className='rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white'>
            Return to admin login
          </Link>
          <form action='/api/admin/logout' method='post'>
            <button type='submit' className='rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800'>
              Sign out
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
