import { NextResponse } from 'next/server';
import { getAdminAuthMode, getCurrentAdmin } from '@/lib/server/admin-session';
import { isSupabaseAuthConfigured } from '@/lib/server/supabase-auth';
import { isRFQAdminBackendConfigured } from '@/lib/server/rfq-admin';

export async function GET() {
  let admin = null;
  try { admin = await getCurrentAdmin(); } catch { admin = null; }
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });

  return NextResponse.json({
    authMode: getAdminAuthMode(),
    hasSupabaseUrl: Boolean(process.env.SUPABASE_URL?.trim()),
    hasSupabaseAnonKey: Boolean(process.env.SUPABASE_ANON_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()),
    hasSupabaseServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
    hasLegacyPassword: Boolean(process.env.ADMIN_PASSWORD?.trim()),
    hasAdminSessionSecret: Boolean(process.env.ADMIN_SESSION_SECRET?.trim()),
    supabaseAuthConfigured: isSupabaseAuthConfigured(),
    rfqAdminBackendConfigured: isRFQAdminBackendConfigured(),
  }, { headers: { 'Cache-Control': 'no-store' } });
}
