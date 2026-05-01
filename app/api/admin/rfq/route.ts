import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/server/admin-auth';
import { listRFQRequests } from '@/lib/server/rfq-admin';

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const data = await listRFQRequests({
    status: searchParams.get('status') || undefined,
    source: searchParams.get('source') || undefined,
    urgency: searchParams.get('urgency') || undefined,
    search: searchParams.get('search') || undefined,
  });
  return NextResponse.json({ ok: true, data });
}
