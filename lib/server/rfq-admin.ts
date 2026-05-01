import 'server-only';

import { cache } from 'react';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const RFQ_STATUSES = ['new', 'in_review', 'quoted', 'waiting_client', 'won', 'lost', 'closed'] as const;
export type RFQStatus = (typeof RFQ_STATUSES)[number];

export function isRFQAdminBackendConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function getHeaders() {
  if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  };
}

function getBaseUrl() {
  if (!SUPABASE_URL) throw new Error('SUPABASE_URL is not configured');
  return SUPABASE_URL.replace(/\/$/, '');
}

async function supabaseFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${getBaseUrl()}/rest/v1/${path}`, {
    ...init,
    headers: { ...getHeaders(), ...(init?.headers || {}) },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status} ${await response.text()}`);
  return response;
}

export interface RFQListFilters {
  status?: string;
  source?: string;
  urgency?: string;
  search?: string;
}

export const listRFQRequests = cache(async (filters: RFQListFilters = {}) => {
  const params = new URLSearchParams({
    select: 'id,request_code,full_name,company_name,phone,email,project_location,source,urgency,status,created_at,rfq_request_items(count)',
    order: 'created_at.desc',
    limit: '100',
  });

  if (filters.status && RFQ_STATUSES.includes(filters.status as RFQStatus)) params.set('status', `eq.${filters.status}`);
  if (filters.source) params.set('source', `eq.${filters.source}`);
  if (filters.urgency) params.set('urgency', `eq.${filters.urgency}`);
  if (filters.search) {
    const value = filters.search.replace(/,/g, ' ').trim();
    if (value) params.set('or', `(request_code.ilike.*${value}*,full_name.ilike.*${value}*,company_name.ilike.*${value}*,phone.ilike.*${value}*)`);
  }

  const response = await supabaseFetch(`rfq_requests?${params.toString()}`);
  const rows = await response.json() as Array<any>;

  return rows.map((row) => ({
    ...row,
    item_count: Array.isArray(row.rfq_request_items) ? Number(row.rfq_request_items[0]?.count || 0) : 0,
  }));
});

export async function getRFQRequest(id: string) {
  const params = new URLSearchParams({
    select: 'id,request_code,full_name,company_name,phone,email,project_location,project_notes,request_type,source,urgency,status,internal_notes,whatsapp_message,created_at,last_status_changed_at,rfq_request_items(id,name,quantity,unit,brand,category,urgency,notes,created_at)',
    id: `eq.${id}`,
    limit: '1',
  });
  const response = await supabaseFetch(`rfq_requests?${params.toString()}`);
  const rows = await response.json() as Array<any>;
  return rows[0] ?? null;
}

export async function getRFQSummaryCounts() {
  const response = await supabaseFetch('rfq_requests?select=status');
  const rows = await response.json() as Array<{ status: string }>;
  return rows.reduce(
    (acc, row) => {
      acc.total += 1;
      if (row.status === 'new') acc.new += 1;
      if (row.status === 'in_review') acc.in_review += 1;
      if (row.status === 'quoted') acc.quoted += 1;
      return acc;
    },
    { new: 0, in_review: 0, quoted: 0, total: 0 },
  );
}

export async function updateRFQRequestStatus(id: string, status: RFQStatus, internalNotes?: string) {
  if (!RFQ_STATUSES.includes(status)) throw new Error('Invalid status value');
  const payload = {
    status,
    internal_notes: internalNotes?.trim() || null,
    last_status_changed_at: new Date().toISOString(),
  };
  await supabaseFetch(`rfq_requests?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(payload),
  });
}
