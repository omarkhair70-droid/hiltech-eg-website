import type { RFQItem } from '@/lib/rfq';

const MAX_ITEMS = 100;
const MAX_PAYLOAD_CHARS = 250000;

const LIMITS = {
  fullName: 120,
  companyName: 160,
  phone: 60,
  email: 160,
  projectLocation: 160,
  projectNotes: 3000,
  requestType: 120,
  source: 80,
  urgency: 40,
  whatsappMessage: 8000,
  itemName: 200,
  itemCategory: 120,
  itemBrand: 120,
  itemUnit: 40,
  itemUrgency: 40,
  itemNotes: 1000,
  itemProductId: 120,
};

interface RawPayload {
  customer?: {
    fullName?: unknown;
    companyName?: unknown;
    phone?: unknown;
    email?: unknown;
    projectLocation?: unknown;
    projectNotes?: unknown;
    requestType?: unknown;
  };
  items?: unknown;
  urgency?: unknown;
  source?: unknown;
  whatsappMessage?: unknown;
}

export interface ValidatedRFQPayload {
  customer: {
    fullName: string;
    companyName: string | null;
    phone: string;
    email: string;
    projectLocation: string | null;
    projectNotes: string | null;
    requestType: string | null;
  };
  items: Array<{
    productId: string | null;
    name: string;
    category: string | null;
    brand: string | null;
    quantity: number | null;
    unit: string | null;
    urgency: string | null;
    notes: string | null;
  }>;
  urgency: string | null;
  source: string;
  whatsappMessage: string | null;
}

const trimString = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const limited = (v: unknown, max: number) => {
  const value = trimString(v);
  return value ? value.slice(0, max) : null;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeItem(item: Partial<RFQItem> & Record<string, unknown>) {
  const name = trimString(item.name).slice(0, LIMITS.itemName);
  if (!name) throw new Error('Each RFQ item requires a name.');

  const quantityRaw = item.quantity;
  let quantity: number | null = null;
  if (quantityRaw !== undefined && quantityRaw !== null && `${quantityRaw}`.trim() !== '') {
    const parsed = Number(quantityRaw);
    if (!Number.isFinite(parsed) || parsed <= 0) throw new Error('Item quantity must be a valid positive number.');
    quantity = parsed;
  }

  return {
    productId: limited(item.id ?? item.productId, LIMITS.itemProductId),
    name,
    category: limited(item.category, LIMITS.itemCategory),
    brand: limited(item.brand, LIMITS.itemBrand),
    quantity,
    unit: limited(item.unit, LIMITS.itemUnit),
    urgency: limited(item.urgency, LIMITS.itemUrgency),
    notes: limited(item.notes, LIMITS.itemNotes),
  };
}

export function validateRFQPayload(payload: unknown): ValidatedRFQPayload {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid request payload.');

  const payloadSize = JSON.stringify(payload).length;
  if (payloadSize > MAX_PAYLOAD_CHARS) throw new Error('RFQ payload is too large.');

  const input = payload as RawPayload;
  const customer = input.customer ?? {};

  const fullName = trimString(customer.fullName).slice(0, LIMITS.fullName);
  const phone = trimString(customer.phone).slice(0, LIMITS.phone);
  const email = trimString(customer.email).slice(0, LIMITS.email).toLowerCase();

  if (!fullName) throw new Error('Full name is required.');
  if (!phone) throw new Error('Phone is required.');
  if (!email) throw new Error('Email is required.');
  if (!emailRegex.test(email)) throw new Error('Email format is invalid.');

  if (!Array.isArray(input.items) || input.items.length === 0) throw new Error('At least one RFQ item is required.');
  if (input.items.length > MAX_ITEMS) throw new Error(`RFQ supports a maximum of ${MAX_ITEMS} items per submission.`);

  const items = input.items.map((item) => {
    if (!item || typeof item !== 'object') throw new Error('Each RFQ item must be an object.');
    return normalizeItem(item as Partial<RFQItem> & Record<string, unknown>);
  });

  return {
    customer: {
      fullName,
      companyName: limited(customer.companyName, LIMITS.companyName),
      phone,
      email,
      projectLocation: limited(customer.projectLocation, LIMITS.projectLocation),
      projectNotes: limited(customer.projectNotes, LIMITS.projectNotes),
      requestType: limited(customer.requestType, LIMITS.requestType),
    },
    items,
    urgency: limited(input.urgency, LIMITS.urgency),
    source: limited(input.source, LIMITS.source) ?? 'rfq_page',
    whatsappMessage: limited(input.whatsappMessage, LIMITS.whatsappMessage),
  };
}
