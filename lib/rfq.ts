export const RFQ_STORAGE_KEY = 'hiltech_rfq_basket_v2';
export const RFQ_PHONE_NUMBER = '201555357807';

export const MIN_RFQ_QUANTITY = 1;
export const MAX_RFQ_QUANTITY = 9999;
export const RFQ_QUANTITY_ERROR = 'Quantity must be between 1 and 9999.';

export function normalizeRFQQuantity(value: unknown): number {
  const numeric = typeof value === 'string' && value.trim() === '' ? Number.NaN : Number(value);
  if (!Number.isFinite(numeric) || Number.isNaN(numeric)) return MIN_RFQ_QUANTITY;
  const floored = Math.floor(numeric);
  if (floored < MIN_RFQ_QUANTITY) return MIN_RFQ_QUANTITY;
  if (floored > MAX_RFQ_QUANTITY) return MAX_RFQ_QUANTITY;
  return floored;
}

export type RFQUrgency = 'Standard' | 'Urgent';

export interface RFQItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  specs: string;
  quantity: number;
  unit: string;
  notes: string;
  urgency?: RFQUrgency;
  priceNote?: string | null;
}

export interface RFQProjectDetails {
  fullName?: string;
  companyName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  projectLocation?: string;
  projectNotes?: string;
}

export function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function normalizeRFQItem(item: Partial<RFQItem> & { id: string; name: string }): RFQItem {
  const normalizedPriceNote = item.priceNote?.trim();

  return {
    id: item.id,
    name: item.name,
    category: item.category ?? 'General',
    brand: item.brand ?? 'Not specified',
    specs: item.specs ?? 'Not specified',
    quantity: normalizeRFQQuantity(item.quantity),
    unit: item.unit?.trim() || 'pcs',
    notes: item.notes ?? '',
    urgency: item.urgency,
    priceNote: normalizedPriceNote ? normalizedPriceNote : null,
  };
}

export function readRFQItems(): RFQItem[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(RFQ_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<Partial<RFQItem> & { id?: string; name?: string }>;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item?.id && item?.name).map((item) => normalizeRFQItem(item as RFQItem));
  } catch {
    return [];
  }
}

export function writeRFQItems(items: RFQItem[]) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('rfq-updated'));
  } catch {}
}

const safe = (value?: string) => value?.trim() || 'Not provided';

export function buildRFQWhatsappMessage(items: RFQItem[], project?: RFQProjectDetails) {
  const lines = [
    'Hello HILTECH,',
    'I would like to request availability and quotation for the following RFQ:',
    '',
    'Project Details:',
    `Name: ${safe(project?.fullName)}`,
    `Company: ${safe(project?.companyName)}`,
    `Phone: ${safe(project?.phoneNumber)}`,
    `Email: ${safe(project?.emailAddress)}`,
    `Location: ${safe(project?.projectLocation)}`,
    `Notes: ${safe(project?.projectNotes)}`,
    '',
    'RFQ Items:',
  ];

  if (items.length === 0) {
    lines.push('No specific items selected yet. Please advise based on project details.');
  } else {
    items.map((item) => normalizeRFQItem(item)).forEach((item, index) => {
      lines.push(`${index + 1}. ${item.name}`);
      lines.push(`Category: ${safe(item.category)}`);
      lines.push(`Brand: ${safe(item.brand)}`);
      lines.push(`Specs: ${safe(item.specs)}`);
      lines.push(`Quantity: ${item.quantity}`);
      lines.push(`Unit: ${safe(item.unit)}`);
      lines.push(`Priority: ${item.urgency || 'Standard'}`);
      lines.push(`Notes: ${safe(item.notes)}`);
      lines.push('');
    });
  }

  lines.push('Please confirm availability, pricing, and next steps.');
  return lines.join('\n');
}

export function getRFQWhatsappLink(items: RFQItem[], project?: RFQProjectDetails) {
  return `https://wa.me/${RFQ_PHONE_NUMBER}?text=${encodeURIComponent(buildRFQWhatsappMessage(items, project))}`;
}
