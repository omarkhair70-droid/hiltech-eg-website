'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { PRODUCT_STOCK_STATUSES, type ProductRow } from '@/lib/types/products';
import { createProductAction, type ProductFormState, updateProductAction } from './actions';

const initialState: ProductFormState = {};

function SubmitButton({ mode }: { mode: 'create' | 'edit' }) {
  const { pending } = useFormStatus();
  return <button disabled={pending} className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{pending ? 'Saving…' : mode === 'create' ? 'Create Product' : 'Save Changes'}</button>;
}

export function ProductForm({ mode, product }: { mode: 'create' | 'edit'; product?: ProductRow }) {
  const action = mode === 'create' ? createProductAction : updateProductAction.bind(null, product!.id);
  const [state, formAction] = useFormState(action, initialState);

  return <form action={formAction} className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
    {state.error ? <p className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">{state.error}</p> : null}
    <div className="grid gap-3 md:grid-cols-2">
      {['product_code','name','slug','category','category_slug','brand','short_specs','use_case','image_path','price_note','availability_note','datasheet_url'].map((field) => <label key={field} className="text-sm"><span className="mb-1 block font-medium capitalize">{field.replaceAll('_',' ')}</span><input name={field} defaultValue={String((product as any)?.[field] ?? '')} className="w-full rounded-md border border-slate-300 px-3 py-2"/></label>)}
      <label className="text-sm"><span className="mb-1 block font-medium">Status</span><select name="status" defaultValue={product?.status || 'active'} className="w-full rounded-md border border-slate-300 px-3 py-2"><option value="active">active</option><option value="hidden">hidden</option><option value="archived">archived</option></select></label>
      <label className="text-sm"><span className="mb-1 block font-medium">Sort order</span><input name="sort_order" type="number" defaultValue={product?.sort_order ?? ''} className="w-full rounded-md border border-slate-300 px-3 py-2"/></label>
      <label className="flex items-center gap-2 pt-7 text-sm font-medium"><input name="is_featured" type="checkbox" defaultChecked={Boolean(product?.is_featured)} /> Featured</label>
    </div>
    <label className="block text-sm"><span className="mb-1 block font-medium">Description</span><textarea name="description" defaultValue={product?.description ?? ''} className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"/></label>
    <label className="block text-sm"><span className="mb-1 block font-medium">Technical notes</span><textarea name="technical_notes" defaultValue={product?.technical_notes ?? ''} className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"/></label>

    <div className="rounded-lg border border-slate-200 p-3">
      <h2 className="text-base font-semibold">Inventory</h2>
      <p className="mb-3 text-xs text-slate-500">Inventory notes and exact quantity are internal admin-only fields.</p>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm"><span className="mb-1 block font-medium">Stock status</span><select name="stock_status" defaultValue={product?.stock_status || 'unknown'} className="w-full rounded-md border border-slate-300 px-3 py-2">{PRODUCT_STOCK_STATUSES.map((s)=><option key={s} value={s}>{s}</option>)}</select></label>
        <label className="text-sm"><span className="mb-1 block font-medium">Last stock checked at</span><input name="last_stock_checked_at" type="datetime-local" defaultValue={product?.last_stock_checked_at ? new Date(product.last_stock_checked_at).toISOString().slice(0,16) : ''} className="w-full rounded-md border border-slate-300 px-3 py-2"/></label>
        <label className="text-sm"><span className="mb-1 block font-medium">Stock quantity</span><input name="stock_quantity" type="number" min={0} defaultValue={product?.stock_quantity ?? ''} className="w-full rounded-md border border-slate-300 px-3 py-2"/></label>
        <label className="text-sm"><span className="mb-1 block font-medium">Low stock threshold</span><input name="low_stock_threshold" type="number" min={0} defaultValue={product?.low_stock_threshold ?? ''} className="w-full rounded-md border border-slate-300 px-3 py-2"/></label>
        <label className="flex items-center gap-2 pt-7 text-sm font-medium md:col-span-2"><input name="mark_stock_checked_now" type="checkbox" /> Mark checked now</label>
      </div>
      <label className="mt-3 block text-sm"><span className="mb-1 block font-medium">Inventory notes (internal only)</span><textarea name="inventory_notes" defaultValue={product?.inventory_notes ?? ''} className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"/></label>
    </div>

    <SubmitButton mode={mode} />
    {mode === 'create' ? <p className="text-xs text-slate-500">Required: product code, name, slug, category. image_path must start with /products/.</p> : null}
  </form>;
}
