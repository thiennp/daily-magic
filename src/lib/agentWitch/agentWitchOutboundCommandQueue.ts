import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { recordAgentWitchTraffic } from "@/lib/agentWitch/agentWitchTrafficLog";

interface QueuedCommand {
  readonly id: string;
  readonly enqueuedAtMs: number;
  readonly message: AgentWitchMessage;
}

interface DeviceCommandQueue {
  readonly commands: QueuedCommand[];
  waiters: Array<(command: QueuedCommand | null) => void>;
}

const agentWitchCommandQueueGlobal = globalThis as typeof globalThis & {
  __dailyMagicAgentWitchCommandQueues?: Map<string, DeviceCommandQueue>;
};

const getQueues = (): Map<string, DeviceCommandQueue> => {
  if (
    agentWitchCommandQueueGlobal.__dailyMagicAgentWitchCommandQueues ===
    undefined
  ) {
    agentWitchCommandQueueGlobal.__dailyMagicAgentWitchCommandQueues =
      new Map();
  }
  return agentWitchCommandQueueGlobal.__dailyMagicAgentWitchCommandQueues;
};

const getOrCreateQueue = (deviceId: string): DeviceCommandQueue => {
  const queues = getQueues();
  const existing = queues.get(deviceId);
  if (existing !== undefined) {
    return existing;
  }

  const created: DeviceCommandQueue = { commands: [], waiters: [] };
  queues.set(deviceId, created);
  return created;
};

export const enqueueAgentWitchDeviceCommand = (
  deviceId: string,
  message: AgentWitchMessage,
): void => {
  const queue = getOrCreateQueue(deviceId);
  const command: QueuedCommand = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    enqueuedAtMs: Date.now(),
    message,
  };

  recordAgentWitchTraffic({
    direction: "server_to_mac",
    path: "/api/agent-witch/commands/poll",
    summary: `queued ${message.type} for ${deviceId}`,
    request: { deviceId, message },
  });

  const waiter = queue.waiters.shift();
  if (waiter !== undefined) {
    waiter(command);
    return;
  }

  queue.commands.push(command);
};

export const pollAgentWitchDeviceCommand = async (
  deviceId: string,
  waitMs: number = 25_000,
): Promise<QueuedCommand | null> => {
  const queue = getOrCreateQueue(deviceId);
  const existing = queue.commands.shift();
  if (existing !== undefined) {
    return existing;
  }

  if (waitMs <= 0) {
    return null;
  }

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      const index = queue.waiters.indexOf(onCommand);
      if (index >= 0) {
        queue.waiters.splice(index, 1);
      }
      resolve(null);
    }, waitMs);

    const onCommand = (command: QueuedCommand | null): void => {
      clearTimeout(timer);
      resolve(command);
    };

    queue.waiters.push(onCommand);
  });
};

export const resetAgentWitchCommandQueuesForTests = (): void => {
  agentWitchCommandQueueGlobal.__dailyMagicAgentWitchCommandQueues = new Map();
};
