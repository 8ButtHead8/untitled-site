const requests = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requests.get(ip) || [];

  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    return true;
  }

  recent.push(now);
  requests.set(ip, recent);

  // Periodic cleanup when map gets large
  if (requests.size > 1000) {
    for (const [key, ts] of requests) {
      const valid = ts.filter((t) => now - t < WINDOW_MS);
      if (valid.length === 0) requests.delete(key);
      else requests.set(key, valid);
    }
  }

  return false;
}
