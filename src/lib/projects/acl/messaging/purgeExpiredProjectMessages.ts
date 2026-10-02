import {
  PROJECT_MESSAGE_PURGE_MIN_INTERVAL_MS,
  PROJECT_MESSAGE_UNACKED_TTL_DAYS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { getSql } from "@/lib/db";

const state: { lastPurgeAtMs: number; inFlight: Promise<number> | null } = {
  lastPurgeAtMs: 0,
  inFlight: null,
};

export const resetProjectMessagePurgeForTests = (): void => {
  state.lastPurgeAtMs = 0;
  state.inFlight = null;
};

/**
 * Hard-delete unacked project_messages older than TTL.
 * CASCADE removes project_message_deliveries. Idempotent + throttled.
 */
export const purgeExpiredProjectMessages = async (input?: {
  readonly force?: boolean;
}): Promise<number> => {
  const now = Date.now();
  if (
    !input?.force &&
    state.lastPurgeAtMs > 0 &&
    now - state.lastPurgeAtMs < PROJECT_MESSAGE_PURGE_MIN_INTERVAL_MS
  ) {
    return 0;
  }
  if (state.inFlight !== null) {
    return state.inFlight;
  }

  state.inFlight = (async () => {
    try {
      const sql = getSql();
      const ttlDays = PROJECT_MESSAGE_UNACKED_TTL_DAYS;
      // Tagged template cannot interpolate INTERVAL easily — use make_interval.
      const result = await sql`
        DELETE FROM project_messages
        WHERE created_at < NOW() - make_interval(days => ${ttlDays})
        RETURNING id
      `;
      const deleted = Array.isArray(result) ? result.length : 0;
      state.lastPurgeAtMs = Date.now();
      return deleted;
    } finally {
      state.inFlight = null;
    }
  })();

  return state.inFlight;
};
