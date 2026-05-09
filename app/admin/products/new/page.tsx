import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/server/admin-session';
import { ProductForm } from '../product-form';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'Add Product', robots: { index: false, follow: false } };

export default async function NewProductPage() {
  await requirePermission('product:update');
  return <main className="section"><div className="container space-y-4"><h1 className="text-2xl font-semibold">Add Product</h1><Link href="/admin/products" className="text-sm underline">Back to Product Admin</Link><ProductForm mode="create" /></div></main>;
}
