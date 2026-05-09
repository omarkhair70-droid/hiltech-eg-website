import 'server-only';

import { isSupabaseConfigured } from '@/lib/server/supabase-admin';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type AuditLogRow = {
  created_at: string;
  admin_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
};

function redactValue(key: string, value: unknown): unknown {
  const lowered = key.toLowerCase();
  if (/(password|secret|token|service_role|authorization|cookie)/.test(lowered)) return '[REDACTED]';
  if (typeof value === 'string' && (value.includes('@') || /\+?\d[\d\s-]{7,}/.test(value))) return '[REDACTED]';
  return value;
}

export function redactAuditMetadata(metadata: Record<string, unknown> | null): Record<string, unknown> | null {
  if (!metadata) return null;
  const out: Record<string, unknown> = {};
  Object.entries(metadata).slice(0, 8).forEach(([k, v]) => { out[k] = redactValue(k, v); });
  return out;
}

export async function listAuditLogs(filters: { action?: string; entityType?: string; adminEmail?: string; from?: string; to?: string }) {
  if (!isSupabaseConfigured() || !supabaseUrl || !serviceRoleKey) return [] as AuditLogRow[];
  const params = new URLSearchParams({ select: 'created_at,admin_email,action,entity_type,entity_id,metadata', order: 'created_at.desc', limit: '100' });
  if (filters.action) params.set('action', `eq.${filters.action}`);
  if (filters.entityType) params.set('entity_type', `eq.${filters.entityType}`);
  if (filters.adminEmail) params.set('admin_email', `ilike.*${filters.adminEmail}*`);
  if (filters.from) params.set('created_at', `gte.${new Date(filters.from).toISOString()}`);
  if (filters.to) params.append('created_at', `lte.${new Date(filters.to + 'T23:59:59Z').toISOString()}`);
  const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/admin_audit_log?${params.toString()}`, { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` }, cache: 'no-store' });
  if (!res.ok) throw new Error('Audit log table is unavailable.');
  const rows = (await res.json()) as AuditLogRow[];
  return rows.map((r) => ({ ...r, metadata: redactAuditMetadata(r.metadata) }));
}
