import 'server-only';

export type EmailProvider = 'none' | 'resend';

export interface SendEmailInput {
  subject: string;
  html: string;
  text: string;
  from?: string;
  to?: string[];
}

export type SendEmailResult =
  | { ok: true; provider: EmailProvider; messageId?: string }
  | { ok: false; provider: EmailProvider; error: string };

function getProvider(): EmailProvider {
  const raw = (process.env.EMAIL_PROVIDER || 'none').trim().toLowerCase();
  if (raw === 'resend') return 'resend';
  return 'none';
}

function parseCommaRecipients(value?: string): string[] {
  return (value || '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

export function getNotifyRecipients() {
  return parseCommaRecipients(process.env.RFQ_NOTIFY_TO);
}

function getDefaultFrom() {
  return (process.env.RFQ_NOTIFY_FROM || '').trim();
}

async function sendViaResend(input: Required<SendEmailInput>): Promise<SendEmailResult> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) return { ok: false, provider: 'resend', error: 'RESEND_API_KEY is not configured' };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
    cache: 'no-store',
  });

  const bodyText = await response.text();
  let parsed: { id?: string; message?: string } = {};
  try {
    parsed = bodyText ? JSON.parse(bodyText) : {};
  } catch {
    parsed = {};
  }

  if (!response.ok) {
    const errorMessage = parsed.message || bodyText || `Resend API error ${response.status}`;
    return { ok: false, provider: 'resend', error: errorMessage };
  }

  return { ok: true, provider: 'resend', messageId: parsed.id };
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const provider = getProvider();
  const to = input.to && input.to.length > 0 ? input.to : getNotifyRecipients();
  const from = (input.from || getDefaultFrom()).trim();

  if (!from) return { ok: false, provider, error: 'RFQ_NOTIFY_FROM is not configured' };
  if (to.length === 0) return { ok: false, provider, error: 'RFQ_NOTIFY_TO has no recipients' };

  const normalized: Required<SendEmailInput> = {
    subject: input.subject.trim(),
    html: input.html,
    text: input.text,
    from,
    to,
  };

  if (!normalized.subject) return { ok: false, provider, error: 'Email subject is required' };

  if (provider === 'none') {
    return { ok: false, provider, error: 'EMAIL_PROVIDER is not configured for delivery (set to resend)' };
  }

  return sendViaResend(normalized);
}
