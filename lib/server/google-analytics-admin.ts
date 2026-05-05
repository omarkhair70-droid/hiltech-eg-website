import 'server-only';

type DashboardTotals = {
  activeUsers: number;
  sessions: number;
  screenPageViews: number;
  eventCount: number;
};

type TopPage = {
  pagePath: string;
  pageTitle: string;
  views: number;
  activeUsers: number;
};

type KeyEvent = {
  eventName: string;
  eventCount: number;
};

export type GoogleAnalyticsDashboardSummary = {
  totalsLast7Days: DashboardTotals;
  topPagesLast30Days: TopPage[];
  keyEventsLast30Days: KeyEvent[];
};

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const GA_OAUTH_CLIENT_ID = process.env.GA_OAUTH_CLIENT_ID;
const GA_OAUTH_CLIENT_SECRET = process.env.GA_OAUTH_CLIENT_SECRET;
const GA_OAUTH_REFRESH_TOKEN = process.env.GA_OAUTH_REFRESH_TOKEN;

const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GA4_DATA_API_URL = 'https://analyticsdata.googleapis.com/v1beta';

const PUBLIC_KEY_EVENTS = [
  'rfq_submit',
  'rfq_start',
  'product_view',
  'product_details_view',
  'product_list_view',
  'quote_request_click',
  'quote_request_submit',
  'contact_whatsapp_click',
  'contact_email_click',
  'contact_phone_click',
];

export function isGoogleAnalyticsAdminConfigured() {
  return Boolean(GA4_PROPERTY_ID && GA_OAUTH_CLIENT_ID && GA_OAUTH_CLIENT_SECRET && GA_OAUTH_REFRESH_TOKEN);
}

async function getAccessToken() {
  if (!isGoogleAnalyticsAdminConfigured()) throw new Error('Google Analytics admin OAuth is not configured');

  const body = new URLSearchParams({
    client_id: String(GA_OAUTH_CLIENT_ID),
    client_secret: String(GA_OAUTH_CLIENT_SECRET),
    refresh_token: String(GA_OAUTH_REFRESH_TOKEN),
    grant_type: 'refresh_token',
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
  });

  const response = await fetch(OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`OAuth token request failed: ${response.status}`);
  }

  const json = await response.json() as { access_token?: string };
  if (!json.access_token) throw new Error('OAuth token response missing access_token');
  return json.access_token;
}

async function runReport(accessToken: string, payload: Record<string, unknown>) {
  const response = await fetch(`${GA4_DATA_API_URL}/properties/${GA4_PROPERTY_ID}:runReport`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`GA4 report request failed: ${response.status}`);
  }

  return response.json() as Promise<{ rows?: Array<{ dimensionValues?: Array<{ value?: string }>; metricValues?: Array<{ value?: string }> }> }>;
}

function toInt(value?: string) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? Math.round(parsed) : 0;
}

export async function getGoogleAnalyticsDashboardSummary(): Promise<GoogleAnalyticsDashboardSummary> {
  const accessToken = await getAccessToken();

  const [totalsRes, pagesRes, eventsRes] = await Promise.all([
    runReport(accessToken, {
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }, { name: 'eventCount' }],
      limit: 1,
    }),
    runReport(accessToken, {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 8,
    }),
    runReport(accessToken, {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: { values: PUBLIC_KEY_EVENTS },
        },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 10,
    }),
  ]);

  const totalsValues = totalsRes.rows?.[0]?.metricValues ?? [];

  return {
    totalsLast7Days: {
      activeUsers: toInt(totalsValues[0]?.value),
      sessions: toInt(totalsValues[1]?.value),
      screenPageViews: toInt(totalsValues[2]?.value),
      eventCount: toInt(totalsValues[3]?.value),
    },
    topPagesLast30Days: (pagesRes.rows ?? []).map((row) => ({
      pagePath: row.dimensionValues?.[0]?.value || '/',
      pageTitle: row.dimensionValues?.[1]?.value || 'Untitled',
      views: toInt(row.metricValues?.[0]?.value),
      activeUsers: toInt(row.metricValues?.[1]?.value),
    })),
    keyEventsLast30Days: (eventsRes.rows ?? []).map((row) => ({
      eventName: row.dimensionValues?.[0]?.value || 'unknown_event',
      eventCount: toInt(row.metricValues?.[0]?.value),
    })),
  };
}
