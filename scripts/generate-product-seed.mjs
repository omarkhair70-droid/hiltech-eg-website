import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const productsFile = fs.readFileSync(path.join(repoRoot, 'content/products.ts'), 'utf8');
const visualsFile = fs.readFileSync(path.join(repoRoot, 'content/product-visuals.ts'), 'utf8');

const categorySlugMap = {
  'Fiber Optic Systems': 'fiber-optic-systems',
  'Copper / CAT6 Cabling': 'copper-cat6-cabling',
  'Patch Cords & Connectivity': 'patch-cords-connectivity',
  'Faceplates / Keystone / RJ45': 'faceplates-keystone-rj45',
  'Cabinets / Racks / PDU': 'cabinets-racks-pdu',
  'Cable Management / Duct Systems': 'cable-management-duct-systems',
  'CCTV & Security': 'cctv-security',
};

const productLineRegex = /\{\s*id:\s*'([^']+)',\s*category:\s*'([^']+)',\s*name:\s*'([^']+)',\s*brand:\s*'([^']+)',\s*shortSpecs:\s*'([^']+)',\s*useCase:\s*'([^']+)',\s*image:\s*'([^']*)'\s*\}/g;
const visualRegex = /productId: '([^']+)'[\s\S]*?imagePath: '([^']+)'/g;

const visuals = new Map();
for (const match of visualsFile.matchAll(visualRegex)) {
  visuals.set(match[1], match[2]);
}

const slugify = (value) => value
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const escape = (value) => value.replace(/'/g, "''");

const rows = [];
let sortOrder = 1;
for (const match of productsFile.matchAll(productLineRegex)) {
  const [_, id, category, name, brand, shortSpecs, useCase] = match;
  rows.push({
    product_code: id,
    name,
    slug: slugify(id),
    category,
    category_slug: categorySlugMap[category] ?? null,
    brand,
    short_specs: shortSpecs,
    use_case: useCase,
    image_path: visuals.get(id) ?? null,
    status: 'active',
    sort_order: sortOrder++,
    is_featured: false,
    source: 'seed_static',
  });
}

if (rows.length === 0) {
  throw new Error('No products parsed from content/products.ts');
}

const valuesSql = rows.map((row) => `(
  '${escape(row.product_code)}',
  '${escape(row.name)}',
  '${escape(row.slug)}',
  '${escape(row.category)}',
  ${row.category_slug ? `'${escape(row.category_slug)}'` : 'NULL'},
  '${escape(row.brand)}',
  '${escape(row.short_specs)}',
  '${escape(row.use_case)}',
  ${row.image_path ? `'${escape(row.image_path)}'` : 'NULL'},
  '${row.status}',
  ${row.sort_order},
  ${row.is_featured},
  '${row.source}'
)`).join(',\n');

const sql = `-- Seed products from static catalog content (Phase 25C.1)\nINSERT INTO public.products (\n  product_code,\n  name,\n  slug,\n  category,\n  category_slug,\n  brand,\n  short_specs,\n  use_case,\n  image_path,\n  status,\n  sort_order,\n  is_featured,\n  source\n)\nVALUES\n${valuesSql}\nON CONFLICT (product_code) DO UPDATE SET\n  name = EXCLUDED.name,\n  slug = EXCLUDED.slug,\n  category = EXCLUDED.category,\n  category_slug = EXCLUDED.category_slug,\n  brand = EXCLUDED.brand,\n  short_specs = EXCLUDED.short_specs,\n  use_case = EXCLUDED.use_case,\n  image_path = EXCLUDED.image_path,\n  status = EXCLUDED.status,\n  sort_order = EXCLUDED.sort_order,\n  is_featured = EXCLUDED.is_featured,\n  source = EXCLUDED.source,\n  updated_at = now();\n`;

const outputPath = path.join(repoRoot, 'supabase/migrations/20260501183000_seed_products_from_static.sql');
fs.writeFileSync(outputPath, sql, 'utf8');
console.log(`Generated ${rows.length} product seed rows at ${outputPath}`);
