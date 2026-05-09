import 'server-only';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type AdminAuditAction = string;

export const ADMIN_AUDIT_ACTIONS = {
  ADMIN_LOGIN_SUCCESS: 'admin.login.success',
  ADMIN_LOGIN_FAILED: 'admin.login.failed',
  ADMIN_LOGOUT: 'admin.logout',
  RFQ_STATUS_UPDATED: 'rfq.status.updated',
  RFQ_QUOTE_PUBLISHED: 'rfq.quote.published',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_IMPORTED: 'product.imported',
  ADMIN_USER_ROLE_CHANGED: 'admin.user.role_changed',
} as const;

export type AdminAuditInput = {
  adminUserId?: string | null;
  adminEmail?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown> | null;
};

function sanitizeMetadata(metadata?: Record<string, unknown> | null): Record<string, unknown> | null {
  if (!metadata) return null;
  const entries = Object.entries(metadata)
    .filter(([, value]) => value !== undefined && typeof value !== 'function')
    .slice(0, 20)
    .map(([key, value]) => [key, typeof value === 'bigint' ? value.toString() : value]);

  const sanitized = Object.fromEntries(entries);
  const json = JSON.stringify(sanitized);
  if (json.length > 4000) return { truncated: true };
  return sanitized;
}

export async function logAdminAction(input: AdminAuditInput): Promise<void> {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;

    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/admin_audit_log`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      cache: 'no-store',
      body: JSON.stringify({
        admin_user_id: input.adminUserId ?? null,
        admin_email: input.adminEmail ?? null,
        action: input.action,
        entity_type: input.entityType,
        entity_id: input.entityId ?? null,
        metadata: sanitizeMetadata(input.metadata),
      }),
    });

    if (!response.ok) {
      console.warn('admin audit log write failed', response.status);
    }
  } catch (error) {
    console.warn('admin audit log write failed', error);
  }
}
