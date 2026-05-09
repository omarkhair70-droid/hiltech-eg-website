import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/server/admin-session';
import { getRFQRequest, RFQ_SALES_PRIORITIES, RFQ_STATUSES, updateRFQRequestWorkflow } from '@/lib/server/rfq-admin';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requirePermission('rfq:view'); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }
  const { id } = await params;
  const data = await getRFQRequest(id);
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, data });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requirePermission('rfq:update'); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }
  const { id } = await params;
  const body = await request.json();
  const status = String(body?.status || '');
  const salesPriority = String(body?.salesPriority || 'normal');
  const internalNotes = String(body?.internalNotes || '').trim();
  if (!RFQ_STATUSES.includes(status as any)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  if (!RFQ_SALES_PRIORITIES.includes(salesPriority as any)) return NextResponse.json({ error: 'Invalid sales priority' }, { status: 400 });
  if (internalNotes.length > 2000) return NextResponse.json({ error: 'Internal notes too long' }, { status: 400 });
  await updateRFQRequestWorkflow(id, { status: status as any, salesPriority: salesPriority as any, nextFollowUpAt: body?.nextFollowUpAt || null, internalNotes: internalNotes || null });
  return NextResponse.json({ ok: true });
}
