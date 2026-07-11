const PAIR_ATTEMPT_WINDOW_MS = 60_000;
const MAX_PAIR_ATTEMPTS_PER_WINDOW = 10;

export interface PairAttemptRateLimiter {
  readonly isPairAttemptAllowed: (userId: string) => boolean;
  readonly recordPairAttempt: (userId: string) => void;
}

export function createPairAttemptRateLimiter(): PairAttemptRateLimiter {
  const pairAttemptsByUserId = new Map<string, number[]>();

  return {
    isPairAttemptAllowed(userId: string): boolean {
      const now = Date.now();
      const recentAttempts = (pairAttemptsByUserId.get(userId) ?? []).filter(
        (timestamp) => now - timestamp < PAIR_ATTEMPT_WINDOW_MS,
      );
      pairAttemptsByUserId.set(userId, recentAttempts);
      return recentAttempts.length < MAX_PAIR_ATTEMPTS_PER_WINDOW;
    },

    recordPairAttempt(userId: string): void {
      const now = Date.now();
      const recentAttempts = (pairAttemptsByUserId.get(userId) ?? []).filter(
        (timestamp) => now - timestamp < PAIR_ATTEMPT_WINDOW_MS,
      );
      recentAttempts.push(now);
      pairAttemptsByUserId.set(userId, recentAttempts);
    },
  };
}
