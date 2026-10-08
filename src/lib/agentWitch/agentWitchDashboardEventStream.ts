import {
  addDashboardUserEventWaiter,
  currentDashboardEventSeq,
  type DashboardEvent,
  latestDashboardUserEventSeq,
  readDashboardUserEventsAfter,
  removeDashboardUserEventWaiter,
} from "@/lib/agentWitch/agentWitchDashboardEventBuffer";

/**
 * Stream start cursor: resume after a valid Last-Event-ID (native EventSource
 * reconnect), else start at the user's newest event. An id ahead of this
 * process (older deploy) starts fresh instead of waiting forever.
 */
export const resolveDashboardStreamStartSeq = (
  userId: string,
  lastEventId: string | null,
): number => {
  const parsed = Number.parseInt(lastEventId ?? "", 10);
  const latest = latestDashboardUserEventSeq(userId);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return latest;
  }
  return parsed > currentDashboardEventSeq() ? latest : parsed;
};

export const waitForDashboardUserEvents = async (
  userId: string,
  afterSeq: number,
  waitMs: number,
  signal?: AbortSignal,
): Promise<readonly DashboardEvent[]> => {
  const existingEvents = readDashboardUserEventsAfter(userId, afterSeq);
  if (existingEvents.length > 0) {
    return existingEvents;
  }

  if (waitMs <= 0 || signal?.aborted) {
    return [];
  }

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      onEventOrAbort();
    }, waitMs);

    const onEventOrAbort = () => {
      clearTimeout(timer);
      removeDashboardUserEventWaiter(userId, onEventOrAbort);
      signal?.removeEventListener("abort", onEventOrAbort);
      resolve(readDashboardUserEventsAfter(userId, afterSeq));
    };

    if (signal) {
      signal.addEventListener("abort", onEventOrAbort);
    }

    addDashboardUserEventWaiter(userId, onEventOrAbort);
  });
};
