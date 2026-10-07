/**
 * Per-instance memory of wake endpoints that answered 429, keyed by channel and
 * membership. Exact Retry-After within one server instance; other instances
 * fall back to the stored http_429 wake row (default cooldown).
 */
type WakeChannel = "grok" | "hmac";

const retryUntilByKey = new Map<string, number>();

const keyOf = (channel: WakeChannel, membershipId: string): string =>
  `${channel}:${membershipId}`;

export const projectWakeRetryAfterRegistry = {
  record: (input: {
    readonly channel: WakeChannel;
    readonly membershipId: string;
    readonly retryAfterSeconds: number;
    readonly nowMs: number;
  }): void => {
    retryUntilByKey.set(
      keyOf(input.channel, input.membershipId),
      input.nowMs + input.retryAfterSeconds * 1000,
    );
  },
  isDeferred: (input: {
    readonly channel: WakeChannel;
    readonly membershipId: string;
    readonly nowMs: number;
  }): boolean => {
    const key = keyOf(input.channel, input.membershipId);
    const until = retryUntilByKey.get(key);
    if (until === undefined) {
      return false;
    }
    if (until <= input.nowMs) {
      retryUntilByKey.delete(key);
      return false;
    }
    return true;
  },
  clear: (): void => {
    retryUntilByKey.clear();
  },
};
