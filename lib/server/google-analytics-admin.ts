import 'server-only';
import { createSign } from 'node:crypto';

type GoogleAnalyticsDashboardSummary = {
  sevenDayTotals: {
    activeUsers: number;
    sessions: number;
    views: number;
    eventCount: number;
  };
  topPages30Days: Array<{ pagePath: string; pageTitle: string; views: number; activeUsers: number }>;
  keyEvents30Days: Array<{ eventName: string; eventCount: number }>;
};

type GAReportRow = {
  dimensionValues?: Array<{ value?: string }>;
  metricValues?: Array<{ value?: string }>;
};

const GA_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const RUN_REPORT_URL = 'https://analyticsdata.googleapis.com/v1beta';
const KEY_EVENT_ALLOWLIST = [
  'rfq_form_start', 'rfq_form_submit', 'rfq_submit', 'rfq_track_view', 'rfq_track_open',
  'quote_request', 'quote_start', 'quote_submit', 'product_view', 'product_list_view',
  'select_item', 'view_item', 'view_item_list', 'generate_lead'
] as const;

function getConfig() {
  return {
    propertyId: process.env.GA4_PROPERTY_ID?.trim() ?? '',
    clientEmail: process.env.GA_CLIENT_EMAIL?.trim() ?? '',
    privateKey: (process.env.GA_PRIVATE_KEY ?? '').replace(/\\n/g, '\n').trim()
  };
}

function base64UrlEncode(input: string) {
  return Buffer.from(input).toString('base64url');
}

function createSignedJwt(clientEmail: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = { iss: clientEmail, scope: GA_SCOPE, aud: TOKEN_URL, exp: now + 3600, iat: now };
  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(privateKey).toString('base64url');
  return `${unsignedToken}.${signature}`;
}

async function getAccessToken(clientEmail: string, privateKey: string) {
  const assertion = createSignedJwt(clientEmail, privateKey);
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion
  });
  const response = await fetch(TOKEN_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body, cache: 'no-store' });
  if (!response.ok) throw new Error('token-request-failed');
  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error('token-missing');
  return data.access_token;
}

async function runReport(accessToken: string, propertyId: string, payload: Record<string, unknown>) {
  const response = await fetch(`${RUN_REPORT_URL}/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store'
  });
  if (!response.ok) throw new Error('ga-report-failed');
  return response.json() as Promise<{ rows?: GAReportRow[] }>;
}

export function isGoogleAnalyticsAdminConfigured() {
  const { propertyId, clientEmail, privateKey } = getConfig();
  return Boolean(propertyId && clientEmail && privateKey);
}

const asNumber = (value?: string) => Number.isFinite(Number(value ?? '0')) ? Number(value ?? '0') : 0;

export async function getGoogleAnalyticsDashboardSummary(): Promise<GoogleAnalyticsDashboardSummary | null> {
  if (!isGoogleAnalyticsAdminConfigured()) return null;
  const { propertyId, clientEmail, privateKey } = getConfig();
  try {
    const accessToken = await getAccessToken(clientEmail, privateKey);
    const [totals, pages, events] = await Promise.all([
      runReport(accessToken, propertyId, { dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }], metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }, { name: 'eventCount' }] }),
      runReport(accessToken, propertyId, { dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }], metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 8 }),
      runReport(accessToken, propertyId, { dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: { filter: { fieldName: 'eventName', inListFilter: { values: [...KEY_EVENT_ALLOWLIST] } } }, orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }], limit: 8 })
    ]);

    const totalsRow = totals.rows?.[0];
    return {
      sevenDayTotals: { activeUsers: asNumber(totalsRow?.metricValues?.[0]?.value), sessions: asNumber(totalsRow?.metricValues?.[1]?.value), views: asNumber(totalsRow?.metricValues?.[2]?.value), eventCount: asNumber(totalsRow?.metricValues?.[3]?.value) },
      topPages30Days: (pages.rows ?? []).map((row) => ({ pagePath: row.dimensionValues?.[0]?.value || '/', pageTitle: row.dimensionValues?.[1]?.value || 'Untitled', views: asNumber(row.metricValues?.[0]?.value), activeUsers: asNumber(row.metricValues?.[1]?.value) })),
      keyEvents30Days: (events.rows ?? []).map((row) => ({ eventName: row.dimensionValues?.[0]?.value || 'event', eventCount: asNumber(row.metricValues?.[0]?.value) }))
    };
  } catch {
    console.error('[admin-ga] Analytics data unavailable.');
    return null;
  }
}
