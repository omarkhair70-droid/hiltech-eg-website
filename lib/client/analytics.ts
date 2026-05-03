export type AnalyticsParamValue = string | number | boolean;
export type AnalyticsParams = Record<string, AnalyticsParamValue>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sanitizeParams(params?: AnalyticsParams): AnalyticsParams | undefined {
  if (!params) return undefined;

  const safe: AnalyticsParams = {};

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      safe[key] = value;
    }
  }

  return Object.keys(safe).length > 0 ? safe : undefined;
}

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  try {
    const safeParams = sanitizeParams(params);
    window.gtag('event', eventName, safeParams);
  } catch {
    // no-op by design
  }
}
