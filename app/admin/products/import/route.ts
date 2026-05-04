import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/server/admin-auth';
import { normalizeImportRows, parseCsv, processProductsCsvImport } from '@/lib/server/products-csv';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_ROWS = 500;

export async function POST(request: Request) {
  await requireAdminSession();
  try {
    const form = await request.formData();
    const file = form.get('file');
    const dryRun = String(form.get('dry_run') || '') === 'on';
    const createMissing = String(form.get('create_missing') || '') === 'on';

    if (!(file instanceof File)) return NextResponse.json({ error: 'Please upload a CSV file.' }, { status: 400 });
    if (!file.name.toLowerCase().endsWith('.csv')) return NextResponse.json({ error: 'Only .csv files are supported.' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'File is too large. Maximum size is 2MB.' }, { status: 400 });

    const text = await file.text();
    const { headers, rows } = parseCsv(text);
    if (rows.length > MAX_ROWS) return NextResponse.json({ error: `CSV row limit exceeded. Maximum ${MAX_ROWS} rows.` }, { status: 400 });

    const normalized = normalizeImportRows(headers, rows);
    const summary = await processProductsCsvImport(normalized, { dryRun, createMissing });
    return NextResponse.json({ ok: true, dryRun, createMissing, summary });
  } catch (error) {
    console.error('Product CSV import failed', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Import failed. Please review your CSV and try again.' }, { status: 400 });
  }
}
