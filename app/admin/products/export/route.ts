export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/server/admin-session';
import { exportProductsCsv } from '@/lib/server/products-csv';
import { logAdminAction } from '@/lib/server/admin-audit';

export async function GET() {
  await requirePermission('product:import');
  try {
    const csv = await exportProductsCsv();
    void logAdminAction({ action: 'product.exported', entityType: 'product', entityId: 'csv-export', metadata: { bytes: csv.length } });
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="hiltech-products-export-${date}.csv"` } });
  } catch (error) {
    console.error('Product CSV export failed', error);
    return NextResponse.json({ error: 'Failed to export products CSV.' }, { status: 500 });
  }
}
