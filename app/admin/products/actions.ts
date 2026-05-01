'use server';

import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/server/admin-auth';
import { createProductAdmin, updateProductAdmin, updateProductStatus } from '@/lib/server/products-admin';
import { PRODUCT_STATUSES, type ProductAdminWritePayload, type ProductStatus } from '@/lib/types/products';

export interface ProductFormState {
  error?: string;
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9-\s_]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function cleanText(value: FormDataEntryValue | null, max = 2000) {
  const text = String(value || '').trim();
  if (!text) return null;
  return text.slice(0, max);
}

function parsePayload(formData: FormData): ProductAdminWritePayload {
  const productCode = slugify(String(formData.get('product_code') || ''));
  const name = String(formData.get('name') || '').trim().slice(0, 180);
  const slug = slugify(String(formData.get('slug') || ''));
  const category = String(formData.get('category') || '').trim().slice(0, 120);
  const status = String(formData.get('status') || 'active') as ProductStatus;
  const imagePath = cleanText(formData.get('image_path'), 255);
  const datasheetUrl = cleanText(formData.get('datasheet_url'), 2000);

  if (!productCode || !name || !slug || !category) throw new Error('Please fill all required fields: product code, name, slug, and category.');
  if (!PRODUCT_STATUSES.includes(status)) throw new Error('Invalid status value.');
  if (imagePath && !imagePath.startsWith('/products/')) throw new Error('Image path must start with /products/ or be empty.');
  if (datasheetUrl) {
    try { new URL(datasheetUrl); } catch { throw new Error('Datasheet URL must be a valid URL.'); }
  }

  const sortOrderRaw = String(formData.get('sort_order') || '').trim();
  const sortOrder = sortOrderRaw === '' ? null : Number(sortOrderRaw);
  if (sortOrderRaw !== '' && !Number.isFinite(sortOrder)) throw new Error('Sort order must be numeric.');

  return {
    product_code: productCode,
    name,
    slug,
    category,
    category_slug: cleanText(formData.get('category_slug'), 120),
    brand: cleanText(formData.get('brand'), 120),
    short_specs: cleanText(formData.get('short_specs'), 1000),
    use_case: cleanText(formData.get('use_case'), 1000),
    description: cleanText(formData.get('description'), 8000),
    image_path: imagePath,
    status,
    sort_order: sortOrder,
    is_featured: String(formData.get('is_featured') || '') === 'on',
    source: 'admin',
    price_note: cleanText(formData.get('price_note'), 1000),
    availability_note: cleanText(formData.get('availability_note'), 1000),
    datasheet_url: datasheetUrl,
    technical_notes: cleanText(formData.get('technical_notes'), 8000),
  };
}

export async function createProductAction(_: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdminSession();
  try {
    const row = await createProductAdmin(parsePayload(formData));
    redirect(`/admin/products/${row.id}`);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to create product.' };
  }
}

export async function updateProductAction(id: string, _: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdminSession();
  try {
    await updateProductAdmin(id, parsePayload(formData));
    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to update product.' };
  }
}

export async function updateProductStatusAction(id: string, status: ProductStatus) {
  await requireAdminSession();
  await updateProductStatus(id, status);
  redirect(`/admin/products/${id}`);
}
