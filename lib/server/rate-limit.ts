import 'server-only';

const ipBuckets = new Map<string, { count: number; resetAt: number }>();

function cleanup(now: number) {
  for (const [key, bucket] of ipBuckets.entries()) {
    if (bucket.resetAt <= now) {
      ipBuckets.delete(key);
    }
  }
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  const realIp = request.headers.get('x-real-ip') || '';
  const candidate = (forwarded.split(',')[0] || realIp || 'unknown').trim();
  return candidate || 'unknown';
}

export function checkRateLimit({ key, windowMs, maxRequests }: { key: string; windowMs: number; maxRequests: number }) {
  const now = Date.now();
  cleanup(now);

  const current = ipBuckets.get(key);
  if (!current || current.resetAt <= now) {
    ipBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= maxRequests) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  current.count += 1;
  ipBuckets.set(key, current);
  return { allowed: true, retryAfter: 0 };
}

// TODO: This in-memory limiter is an MVP and should be replaced with Redis/Upstash (or equivalent) for distributed production deployments.
