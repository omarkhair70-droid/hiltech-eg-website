import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/server/admin-session';
import { listRFQRequests } from '@/lib/server/rfq-admin';

export async function GET(request: Request) {
  try { await requirePermission('rfq:view'); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }
  const { searchParams } = new URL(request.url);
  const data = await listRFQRequests({
    status: searchParams.get('status') || undefined,
    source: searchParams.get('source') || undefined,
    urgency: searchParams.get('urgency') || undefined,
    search: searchParams.get('search') || undefined,
  });
  return NextResponse.json({ ok: true, data });
}
