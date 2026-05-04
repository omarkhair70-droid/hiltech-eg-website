import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/server/admin-auth';
import { exportProductsCsv } from '@/lib/server/products-csv';

export async function GET() {
  await requireAdminSession();
  try {
    const csv = await exportProductsCsv();
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="hiltech-products-export-${date}.csv"` } });
  } catch (error) {
    console.error('Product CSV export failed', error);
    return NextResponse.json({ error: 'Failed to export products CSV.' }, { status: 500 });
  }
}
