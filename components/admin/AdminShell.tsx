import Link from 'next/link';
import type { ReactNode } from 'react';

type AdminShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

const navLinks = [
  { label: 'Overview', href: '/admin' },
  { label: 'RFQs', href: '/admin/rfq' },
  { label: 'Action Center', href: '/admin/actions' },
  { label: 'Sales', href: '/admin/sales' },
  { label: 'Website Analytics', href: '/admin/analytics' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Product Analytics', href: '/admin/products/analytics' },
  { label: 'Reports', href: '/admin/reports' },
  { label: 'Import / Export', href: '/admin/products/import-export' },
  { label: 'Add Product', href: '/admin/products/new' },
] as const;

export default function AdminShell({ title, description, children, actions }: AdminShellProps) {
  return (
    <main className="section">
      <div className="container space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
              {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
            </div>
            <div className="flex flex-wrap gap-2">{actions}</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md border border-slate-300 px-3 py-2 font-medium">
                {link.label}
              </Link>
            ))}
            <form action="/api/admin/logout" method="post">
              <button className="rounded-md border border-slate-300 px-3 py-2 font-medium">Logout</button>
            </form>
          </div>
        </section>
        {children}
      </div>
    </main>
  );
}
