import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/server/admin-auth';
import { getRFQRequest, RFQ_STATUSES, updateRFQRequestStatus } from '@/lib/server/rfq-admin';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const data = await getRFQRequest(id);
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, data });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const status = String(body?.status || '');
  if (!RFQ_STATUSES.includes(status as any)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  await updateRFQRequestStatus(id, status as any, body?.internalNotes);
  return NextResponse.json({ ok: true });
}
