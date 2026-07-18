import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

interface DashboardEvent {
  readonly id: string;
  readonly enqueuedAtMs: number;
  readonly raw: string;
}

interface UserEventBuffer {
  readonly events: DashboardEvent[];
  waiters: Array<(event: DashboardEvent | null) => void>;
}

const dashboardEventsGlobal = globalThis as typeof globalThis & {
  __dailyMagicAgentWitchDashboardEvents?: Map<string, UserEventBuffer>;
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

export const enqueueDashboardUserEvent = (
  userId: string,
  message: AgentWitchMessage,
): void => {
  const buffer = getOrCreateBuffer(userId);
  const event: DashboardEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    enqueuedAtMs: Date.now(),
    raw: JSON.stringify(message),
  };

  const waiter = buffer.waiters.shift();
  if (waiter !== undefined) {
    waiter(event);
    return;
  }

  buffer.events.push(event);
  if (buffer.events.length > 200) {
    buffer.events.shift();
  }
};

export const pollDashboardUserEvent = async (
  userId: string,
  waitMs: number = 25_000,
): Promise<DashboardEvent | null> => {
  const buffer = getOrCreateBuffer(userId);
  const existing = buffer.events.shift();
  if (existing !== undefined) {
    return existing;
  }

  if (waitMs <= 0) {
    return null;
  }

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      const index = buffer.waiters.indexOf(onEvent);
      if (index >= 0) {
        buffer.waiters.splice(index, 1);
      }
      resolve(null);
    }, waitMs);

    const onEvent = (event: DashboardEvent | null): void => {
      clearTimeout(timer);
      resolve(event);
    };

    buffer.waiters.push(onEvent);
  });
};
