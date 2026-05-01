import 'server-only';

import { sendEmail } from '@/lib/server/email';

type RFQItemSummary = {
  name: string;
  quantity: number | null;
  unit: string | null;
};

export interface NewRFQNotificationInput {
  id: string;
  requestCode: string;
  customerName: string;
  companyName: string | null;
  phone: string;
  email: string;
  projectLocation: string | null;
  urgency: string | null;
  source: string;
  requestType: string | null;
  items: RFQItemSummary[];
}

function safe(value: string | null | undefined) {
  return (value || '').trim();
}

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getBaseUrl() {
  const value = (process.env.APP_BASE_URL || '').trim();
  return value ? value.replace(/\/$/, '') : '';
}

function itemLine(item: RFQItemSummary) {
  const qty = item.quantity === null ? '' : ` x ${item.quantity}`;
  const unit = safe(item.unit) ? ` ${safe(item.unit)}` : '';
  return `${safe(item.name)}${qty}${unit}`.trim();
}

export async function sendNewRFQInternalNotification(input: NewRFQNotificationInput) {
  const baseUrl = getBaseUrl();
  const detailLink = baseUrl ? `${baseUrl}/admin/rfq/${input.id}` : `/admin/rfq/${input.id}`;
  const listLink = baseUrl ? `${baseUrl}/admin/rfq` : '/admin/rfq';
  const trackLink = baseUrl ? `${baseUrl}/track` : '/track';

  const itemLines = input.items.map(itemLine).filter(Boolean);
  const subject = `New RFQ Received — ${input.requestCode}`;

  const rows: Array<[string, string]> = [
    ['Request code', input.requestCode],
    ['Customer', input.customerName],
    ['Company', safe(input.companyName) || '—'],
    ['Phone', input.phone],
    ['Email', input.email],
    ['Project location', safe(input.projectLocation) || '—'],
    ['Urgency', safe(input.urgency) || '—'],
    ['Source', safe(input.source) || '—'],
    ['Request type', safe(input.requestType) || '—'],
    ['Item count', `${input.items.length}`],
  ];

  const html = `
    <h2>New RFQ Received — ${esc(input.requestCode)}</h2>
    <table cellpadding="6" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #d1d5db; font-family: Arial, sans-serif; font-size: 14px;">
      ${rows.map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`).join('')}
    </table>
    <h3>Items</h3>
    <ul>
      ${itemLines.length > 0 ? itemLines.map((line) => `<li>${esc(line)}</li>`).join('') : '<li>No items listed</li>'}
    </ul>
    <p><strong>Admin detail:</strong> <a href="${esc(detailLink)}">${esc(detailLink)}</a></p>
    <p><strong>Admin list:</strong> <a href="${esc(listLink)}">${esc(listLink)}</a></p>
    <p><strong>Public tracking note:</strong> Customer can track via <a href="${esc(trackLink)}">${esc(trackLink)}</a> with request code + phone/email.</p>
  `.trim();

  const text = [
    subject,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Items:',
    ...(itemLines.length > 0 ? itemLines.map((line) => `- ${line}`) : ['- No items listed']),
    '',
    `Admin detail: ${detailLink}`,
    `Admin list: ${listLink}`,
    `Public tracking note: Customer can track via ${trackLink} with request code + phone/email.`,
  ].join('\n');

  return sendEmail({ subject, html, text });
}
