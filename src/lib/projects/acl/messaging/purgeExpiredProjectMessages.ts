import { PROJECT_MESSAGE_PURGE_MIN_INTERVAL_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { purgeStaleProjectMessageComputerAcks } from "@/lib/projects/acl/messaging/purgeStaleProjectMessageComputerAcks";
import { wakeProjectComputersForUnsavedOverdue } from "@/lib/projects/acl/messaging/wakeProjectComputerForUnsavedOverdue";

const state: { lastPurgeAtMs: number; inFlight: Promise<number> | null } = {
  lastPurgeAtMs: 0,
  inFlight: null,
};

export const resetProjectMessagePurgeForTests = (): void => {
  state.lastPurgeAtMs = 0;
  state.inFlight = null;
};

/**
 * Keep-300: no age-based DELETE of project_messages. Still runs the throttled
 * unsaved-overdue wake and stale computer-ack cleanup.
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
      await wakeProjectComputersForUnsavedOverdue({ now: new Date() });
      await purgeStaleProjectMessageComputerAcks();
      state.lastPurgeAtMs = Date.now();
      return 0;
    } finally {
      state.inFlight = null;
    }
  })();

  return state.inFlight;
};
