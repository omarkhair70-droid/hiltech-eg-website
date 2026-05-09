import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/server/admin-session';
import { requirePermissionOrRedirect } from '@/lib/server/admin-page-guard';
import { ProductForm } from '../product-form';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'Add Product', robots: { index: false, follow: false } };

export default async function NewProductPage() {
  const adminAccess = await requirePermissionOrRedirect('product:update'); if (!adminAccess) return <main className='section'><div className='container'><p className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700'>Not authorized.</p></div></main>;
  return <main className="section"><div className="container space-y-4"><h1 className="text-2xl font-semibold">Add Product</h1><Link href="/admin/products" className="text-sm underline">Back to Product Admin</Link><ProductForm mode="create" /></div></main>;
}
