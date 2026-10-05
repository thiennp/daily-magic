import { PROJECT_MESSAGE_HOURLY_WINDOW_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

export type HourlyDispatchRetryAfter = {
  readonly retryAfterSeconds: number;
  readonly retryAfterAt: string;
};

/**
 * When the oldest counted hourly dispatch ages out of the rolling window,
 * one slot frees. Pure: both times come from the caller.
 */
export const computeHourlyDispatchRetryAfter = (input: {
  readonly oldestCreatedAt: Date;
  readonly now: Date;
}): HourlyDispatchRetryAfter => {
  const retryAtMs =
    input.oldestCreatedAt.getTime() + PROJECT_MESSAGE_HOURLY_WINDOW_MS;
  const retryAfterSeconds = Math.max(
    0,
    Math.ceil((retryAtMs - input.now.getTime()) / 1_000),
  );
  return {
    retryAfterSeconds,
    retryAfterAt: new Date(retryAtMs).toISOString(),
  };
};
