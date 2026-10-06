import {
  PROJECT_MESSAGE_PURGE_MIN_INTERVAL_MS,
  PROJECT_MESSAGE_UNACKED_TTL_DAYS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { purgeStaleProjectMessageComputerAcks } from "@/lib/projects/acl/messaging/purgeStaleProjectMessageComputerAcks";
import { PROJECT_COMPUTER_HISTORY_ON_STATES } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import { wakeProjectComputersForUnsavedOverdue } from "@/lib/projects/acl/messaging/wakeProjectComputerForUnsavedOverdue";
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
 * Projects with computer history on_configuring/on_ready/degraded are excluded: History ON
 * never deletes for age (only after computerAck). This path instead runs the
 * throttled unsaved-overdue wake.
 * Archived rows (Inbox Clear all) are never age-purged: no purge timer.
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
      const result = await sql`
        DELETE FROM project_messages
        WHERE created_at < NOW() - make_interval(days => ${ttlDays})
          AND archived_at IS NULL
          AND NOT EXISTS (
            SELECT 1 FROM project_computer_history_settings s
            WHERE s.project_id = project_messages.project_id
              AND s.state = ANY(${[...PROJECT_COMPUTER_HISTORY_ON_STATES]}::text[])
          )
        RETURNING id
      `;
      await wakeProjectComputersForUnsavedOverdue({ now: new Date() });
      await purgeStaleProjectMessageComputerAcks();
      const deleted = Array.isArray(result) ? result.length : 0;
      state.lastPurgeAtMs = Date.now();
      return deleted;
    } finally {
      state.inFlight = null;
    }
  })();

  return state.inFlight;
};
