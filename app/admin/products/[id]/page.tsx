import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requirePermission } from '@/lib/server/admin-session';
import { getProductAdmin } from '@/lib/server/products-admin';
import { ProductForm } from '../product-form';
import { updateProductStatusAction } from '../actions';
import ImagePreview from '../image-preview';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: 'Edit Product', robots: { index: false, follow: false } };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePermission('product:update');
  const { id } = await params;
  const product = await getProductAdmin(id);
  if (!product) notFound();
  return <main className="section"><div className="container space-y-4"><div><h1 className="text-2xl font-semibold">Edit Product</h1><Link href="/admin/products" className="text-sm underline">Back to Product Admin</Link></div>
  <div className="grid gap-4 lg:grid-cols-3"><div className="lg:col-span-2"><ProductForm mode="edit" product={product} /></div><aside className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm"><p><strong>Created:</strong> {new Date(product.created_at).toLocaleString()}</p><p><strong>Updated:</strong> {new Date(product.updated_at).toLocaleString()}</p><p><strong>Source:</strong> {product.source}</p>{product.category_slug ? <p><a className="underline" href={`/products-partners/${product.category_slug}`} target="_blank">Open category intelligence page</a></p> : null}<hr className="my-2"/><p><strong>Stock status:</strong> {product.stock_status}</p><p><strong>Stock qty:</strong> {product.stock_quantity ?? '—'}</p><p><strong>Low stock threshold:</strong> {product.low_stock_threshold ?? '—'}</p><p><strong>Last stock checked:</strong> {product.last_stock_checked_at ? new Date(product.last_stock_checked_at).toLocaleString() : '—'}</p>
  {product.image_path ? <ImagePreview src={product.image_path} alt={product.name} /> : <p className="text-slate-500">No image path set.</p>}
  <div className="space-y-2"><form action={updateProductStatusAction.bind(null, product.id, 'hidden')}><button className="w-full rounded border border-slate-300 px-3 py-2">Hide product</button></form><form action={updateProductStatusAction.bind(null, product.id, 'active')}><button className="w-full rounded border border-slate-300 px-3 py-2">Restore active</button></form><form action={updateProductStatusAction.bind(null, product.id, 'archived')}><button className="w-full rounded border border-slate-300 px-3 py-2">Archive product</button></form></div></aside></div></div></main>;
}
