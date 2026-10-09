const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_ADDRESS = 5;
const MAX_TRACKED = 20_000;

const sentAt = new Map<string, number[]>();

/**
 * Magic-link mail: at most 5 an hour per address (not per IP, which a caller can fake), so nobody
 * can use the sign-in form to bomb an inbox or burn the mail quota. In memory, per process.
 * Returns false when the address is over its limit.
 */
export const allowMagicLinkRequest = (
  email: string,
  now: number = Date.now(),
): boolean => {
  const key = email.trim().toLowerCase();
  if (key.length === 0) return true;
  if (sentAt.size > MAX_TRACKED) {
    for (const [tracked, times] of sentAt) {
      if (times.every((at) => now - at > WINDOW_MS)) sentAt.delete(tracked);
    }
  }
  const recent = (sentAt.get(key) ?? []).filter((at) => now - at <= WINDOW_MS);
  if (recent.length >= MAX_PER_ADDRESS) {
    sentAt.set(key, recent);
    return false;
  }
  sentAt.set(key, [...recent, now]);
  return true;
};

export const resetMagicLinkRateLimitForTests = (): void => {
  sentAt.clear();
};
