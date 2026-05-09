export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { PRODUCT_CSV_COLUMNS, buildCsv } from '@/lib/server/products-csv';
import { requirePermission } from '@/lib/server/admin-session';

export async function GET() {
  await requirePermission('product:import');
  const csv = buildCsv([
    { product_code: 'pump-1001', name: 'Centrifugal Pump 1001', brand: 'HILTECH', category: 'Pumps', status: 'active', price_note: 'Contact for latest price', availability_note: 'Available in 3 days', datasheet_url: 'https://example.com/pump-1001.pdf', technical_notes: 'IP55 motor', image_url: '/products/pump-1001.jpg', sort_order: 10, stock_status: 'in_stock', stock_quantity: 24, low_stock_threshold: 5, inventory_notes: 'Main warehouse', last_stock_checked_at: new Date().toISOString() },
    { product_code: 'valve-2002', name: 'Industrial Valve 2002', brand: 'HILTECH', category: 'Valves', status: 'active', price_note: '', availability_note: 'Limited availability', datasheet_url: '', technical_notes: 'Stainless steel', image_url: '/products/valve-2002.jpg', sort_order: 20, stock_status: 'low_stock', stock_quantity: 2, low_stock_threshold: 5, inventory_notes: 'Reorder requested', last_stock_checked_at: new Date().toISOString() },
  ], PRODUCT_CSV_COLUMNS);
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="hiltech-products-template.csv"' } });
}
