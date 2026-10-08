import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export interface DashboardEvent {
  readonly seq: number;
  readonly enqueuedAtMs: number;
  readonly raw: string;
}

/**
 * Hub→dashboard events per user. Before 9c8a811d/662eae04 each event went to
 * ONE waiter, so two SSE streams (floater + harness, two tabs) or a zombie
 * poller from a closed stream stole checkpoint asks, heartbeats and results.
 * Now every stream reads the ring after its own cursor.
 */
const DASHBOARD_EVENT_RING_MAX = 1000;
const DASHBOARD_EVENT_RING_MAX_AGE_MS = 120_000;

interface UserEventBuffer {
  events: DashboardEvent[];
  waiters: Array<() => void>;
}

const dashboardEventsGlobal = globalThis as typeof globalThis & {
  __dailyMagicAgentWitchDashboardEvents?: Map<string, UserEventBuffer>;
  __dailyMagicAgentWitchDashboardEventsSeq?: number;
};

const getBuffers = (): Map<string, UserEventBuffer> => {
  if (
    dashboardEventsGlobal.__dailyMagicAgentWitchDashboardEvents === undefined
  ) {
    dashboardEventsGlobal.__dailyMagicAgentWitchDashboardEvents = new Map();
  }
  return dashboardEventsGlobal.__dailyMagicAgentWitchDashboardEvents;
};

const getOrCreateBuffer = (userId: string): UserEventBuffer => {
  const buffers = getBuffers();
  const existing = buffers.get(userId);
  if (existing !== undefined) {
    return existing;
  }

  const created: UserEventBuffer = { events: [], waiters: [] };
  buffers.set(userId, created);
  return created;
};

/**
 * Seq starts at the process start time (ms) so a browser reconnecting with a
 * Last-Event-ID from before a deploy/restart never sits ahead of the cursor.
 */
const nextGlobalSeq = (): number => {
  const current =
    dashboardEventsGlobal.__dailyMagicAgentWitchDashboardEventsSeq ??
    Date.now();
  dashboardEventsGlobal.__dailyMagicAgentWitchDashboardEventsSeq = current + 1;
  return current + 1;
};

/** Highest seq issued by this process (0 before the first event). */
export const currentDashboardEventSeq = (): number =>
  dashboardEventsGlobal.__dailyMagicAgentWitchDashboardEventsSeq ?? 0;

export const enqueueDashboardUserEvent = (
  userId: string,
  message: AgentWitchMessage,
): void => {
  const buffer = getOrCreateBuffer(userId);
  const now = Date.now();
  const event: DashboardEvent = {
    seq: nextGlobalSeq(),
    enqueuedAtMs: now,
    raw: JSON.stringify(message),
  };

  const cutoff = now - DASHBOARD_EVENT_RING_MAX_AGE_MS;
  buffer.events = [...buffer.events, event]
    .filter((e) => e.enqueuedAtMs >= cutoff)
    .slice(-DASHBOARD_EVENT_RING_MAX);

  const waitersToResolve = buffer.waiters;
  buffer.waiters = [];
  for (const waiter of waitersToResolve) {
    waiter();
  }
};

export const readDashboardUserEventsAfter = (
  userId: string,
  afterSeq: number,
): readonly DashboardEvent[] => {
  const buffer = getOrCreateBuffer(userId);
  return buffer.events.filter((e) => e.seq > afterSeq);
};

export const latestDashboardUserEventSeq = (userId: string): number =>
  getOrCreateBuffer(userId).events.at(-1)?.seq ?? 0;

export const addDashboardUserEventWaiter = (
  userId: string,
  waiter: () => void,
): void => {
  getOrCreateBuffer(userId).waiters.push(waiter);
};

export const removeDashboardUserEventWaiter = (
  userId: string,
  waiter: () => void,
): void => {
  const buffer = getOrCreateBuffer(userId);
  buffer.waiters = buffer.waiters.filter((entry) => entry !== waiter);
};
