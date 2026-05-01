import 'server-only';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && serviceRoleKey);
}

function getBaseUrl() {
  if (!supabaseUrl) throw new Error('SUPABASE_URL is not configured');
  return supabaseUrl.replace(/\/$/, '');
}

function getHeaders() {
  if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
  };
}

async function postgrestInsert<T>(table: string, payload: unknown, prefer: string): Promise<T[]> {
  const response = await fetch(`${getBaseUrl()}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      Prefer: prefer,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase insert failed (${table}): ${response.status} ${body}`);
  }

  return (await response.json()) as T[];
}

export async function insertRFQRequest(payload: {
  request_code: string;
  full_name: string;
  company_name: string | null;
  phone: string;
  email: string;
  project_location: string | null;
  project_notes: string | null;
  request_type: string | null;
  source: string;
  status: string;
  urgency: string | null;
  whatsapp_message: string | null;
}) {
  const rows = await postgrestInsert<{ id: string; request_code: string }>('rfq_requests', payload, 'return=representation');
  const row = rows[0];
  if (!row?.id) throw new Error('Supabase insert failed: missing request id');
  return row;
}

export async function insertRFQItems(
  items: Array<{
    rfq_request_id: string;
    product_id: string | null;
    name: string;
    category: string | null;
    brand: string | null;
    quantity: number | null;
    unit: string | null;
    urgency: string | null;
    notes: string | null;
  }>,
) {
  if (items.length === 0) return;
  await postgrestInsert('rfq_request_items', items, 'return=minimal');
}
