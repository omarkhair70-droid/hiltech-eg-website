import 'server-only';

import { createProductAdmin, listProductsAdmin, updateProductAdmin } from '@/lib/server/products-admin';
import { PRODUCT_STATUSES, PRODUCT_STOCK_STATUSES, type ProductAdminWritePayload, type ProductRow, type ProductStatus, type ProductStockStatus } from '@/lib/types/products';

export const PRODUCT_CSV_COLUMNS = [
  'product_code','name','brand','category','status','price_note','availability_note','datasheet_url','technical_notes','image_url','sort_order','stock_status','stock_quantity','low_stock_threshold','inventory_notes','last_stock_checked_at',
] as const;

type CsvColumn = (typeof PRODUCT_CSV_COLUMNS)[number];

type CsvRow = Record<CsvColumn, string>;

const MAX_TEXT = 2000;

export function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return '';
  const text = String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function buildCsv(rows: Array<Record<string, unknown>>, columns = PRODUCT_CSV_COLUMNS): string {
  const header = columns.join(',');
  const body = rows.map((row) => columns.map((col) => csvEscape(row[col])).join(','));
  return [header, ...body].join('\n');
}

export function parseCsv(input: string): { headers: string[]; rows: string[][] } {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += char;
    } else if (char === '"') inQuotes = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (char !== '\r') field += char;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  const [headers = [], ...data] = rows;
  return { headers: headers.map((h) => h.trim()), rows: data };
}

function cleanText(v: string, max = MAX_TEXT) { const t = v.trim(); return t ? t.slice(0, max) : null; }
function parseNullableInt(v: string, label: string, nonNegative = false) {
  const t = v.trim();
  if (!t) return null;
  const n = Number(t);
  if (!Number.isInteger(n) || (nonNegative && n < 0)) throw new Error(`${label} must be ${nonNegative ? 'a non-negative' : 'an'} integer.`);
  return n;
}

export function productRowsToCsvRows(products: ProductRow[]): Array<Record<string, unknown>> {
  return products.map((p) => ({
    product_code: p.product_code, name: p.name, brand: p.brand ?? '', category: p.category ?? '', status: p.status ?? '',
    price_note: p.price_note ?? '', availability_note: p.availability_note ?? '', datasheet_url: p.datasheet_url ?? '', technical_notes: p.technical_notes ?? '',
    image_url: p.image_path ?? '', sort_order: p.sort_order ?? '', stock_status: p.stock_status ?? '', stock_quantity: p.stock_quantity ?? '',
    low_stock_threshold: p.low_stock_threshold ?? '', inventory_notes: p.inventory_notes ?? '', last_stock_checked_at: p.last_stock_checked_at ?? '',
  }));
}

export async function exportProductsCsv() {
  const products = await listProductsAdmin({ limit: 1000 });
  return buildCsv(productRowsToCsvRows(products));
}

export async function processProductsCsvImport(rows: CsvRow[], opts: { dryRun: boolean; createMissing: boolean }) {
  const summary = { totalRows: rows.length, validRows: 0, invalidRows: 0, wouldUpdate: 0, wouldCreate: 0, skipped: 0, errors: [] as string[] };
  const existing = await listProductsAdmin({ limit: 2000 });
  const byCode = new Map(existing.map((p) => [p.product_code, p]));

  for (let i = 0; i < rows.length; i++) {
    const line = i + 2;
    const row = rows[i];
    try {
      const productCode = row.product_code.trim().toLowerCase();
      if (!productCode) throw new Error('product_code is required.');
      const status = cleanText(row.status, 20) as ProductStatus | null;
      if (status && !PRODUCT_STATUSES.includes(status)) throw new Error('status is invalid.');
      const stockStatus = cleanText(row.stock_status, 20) as ProductStockStatus | null;
      if (stockStatus && !PRODUCT_STOCK_STATUSES.includes(stockStatus)) throw new Error('stock_status is invalid.');

      const payload: Partial<ProductAdminWritePayload> = {
        name: cleanText(row.name, 180) ?? undefined,
        brand: cleanText(row.brand, 120),
        category: cleanText(row.category, 120) ?? undefined,
        status: status ?? undefined,
        price_note: cleanText(row.price_note, 1000),
        availability_note: cleanText(row.availability_note, 1000),
        datasheet_url: cleanText(row.datasheet_url, 2000),
        technical_notes: cleanText(row.technical_notes, 2000),
        image_path: cleanText(row.image_url, 255),
        sort_order: parseNullableInt(row.sort_order, 'sort_order'),
        stock_status: stockStatus ?? undefined,
        stock_quantity: parseNullableInt(row.stock_quantity, 'stock_quantity', true),
        low_stock_threshold: parseNullableInt(row.low_stock_threshold, 'low_stock_threshold', true),
        inventory_notes: cleanText(row.inventory_notes, 2000),
        last_stock_checked_at: cleanText(row.last_stock_checked_at, 50),
      };

      const found = byCode.get(productCode);
      if (found) {
        summary.validRows++; summary.wouldUpdate++;
        if (!opts.dryRun) await updateProductAdmin(found.id, payload);
      } else if (opts.createMissing) {
        if (!payload.name) throw new Error('name is required when create_missing is enabled.');
        if (!payload.category) throw new Error('category is required when create_missing is enabled.');
        summary.validRows++; summary.wouldCreate++;
        if (!opts.dryRun) {
          await createProductAdmin({
            product_code: productCode,
            name: payload.name,
            slug: productCode,
            category: payload.category,
            status: payload.status ?? 'active',
            stock_status: payload.stock_status ?? 'unknown',
            source: 'admin',
            ...payload,
          } as ProductAdminWritePayload);
        }
      } else {
        summary.skipped++;
      }
    } catch (e) {
      summary.invalidRows++;
      summary.errors.push(`Row ${line}: ${e instanceof Error ? e.message : 'Invalid row.'}`);
    }
  }
  return summary;
}

export function normalizeImportRows(headers: string[], dataRows: string[][]): CsvRow[] {
  const expected = [...PRODUCT_CSV_COLUMNS];
  const missing = expected.filter((h) => !headers.includes(h));
  if (missing.length) throw new Error(`Missing required columns: ${missing.join(', ')}`);
  return dataRows.filter((r) => r.some((c) => c.trim())).map((values) => {
    const row = {} as CsvRow;
    for (const col of PRODUCT_CSV_COLUMNS) row[col] = values[headers.indexOf(col)] ?? '';
    return row;
  });
}
