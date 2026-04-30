export const RFQ_STORAGE_KEY = 'hiltech_rfq_basket_v1';
export const RFQ_PHONE_NUMBER = '201555357807';

export interface RFQItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  specs: string;
  quantity: number;
  note?: string;
}

export function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readRFQItems(): RFQItem[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(RFQ_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RFQItem[];

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && item.id && item.name)
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }));
  } catch {
    return [];
  }
}

export function writeRFQItems(items: RFQItem[]) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('rfq-updated'));
  } catch {
    // no-op
  }
}

export function buildRFQWhatsappMessage(items: RFQItem[]) {
  const lines = ['HILTECH RFQ Request', '', 'Products:'];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`Category: ${item.category}`);
    lines.push(`Brand: ${item.brand}`);
    lines.push(`Qty: ${item.quantity}`);
    if (item.note?.trim()) lines.push(`Notes: ${item.note.trim()}`);
    lines.push('');
  });

  lines.push('Please confirm availability and quotation.');
  return lines.join('\n');
}

export function getRFQWhatsappLink(items: RFQItem[]) {
  return `https://wa.me/${RFQ_PHONE_NUMBER}?text=${encodeURIComponent(buildRFQWhatsappMessage(items))}`;
}
