import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdminSession } from '@/lib/server/admin-auth';
import { ProductForm } from '../product-form';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'Add Product', robots: { index: false, follow: false } };

export default async function NewProductPage() {
  await requireAdminSession();
  return <main className="section"><div className="container space-y-4"><h1 className="text-2xl font-semibold">Add Product</h1><Link href="/admin/products" className="text-sm underline">Back to Product Admin</Link><ProductForm mode="create" /></div></main>;
}
