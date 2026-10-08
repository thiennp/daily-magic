import path from "node:path";

import {
  AGENT_TASKS_FILE,
  readAgentTerminalRegistry,
  readJsonFile,
  writeAgentTerminalRegistry,
  writeJsonFileAtomic,
  type AgentTaskState,
  type AgentTerminalRegistry,
} from "./agentWakeLocalFiles";
import { buildAgentWakeTerminalLine } from "./buildAgentWakeTerminalLine";
import {
  isSafeAgentWakeId,
  parseAgentWakePayload,
  type AgentWakePayload,
} from "./parseAgentWakePayload";

export type HandleAgentWakeResult = "injected" | "pending" | "invalid";

const ENTER_DELAY_MS = 150;

const omit = <T>(
  record: Readonly<Record<string, T>>,
  key: string,
): Record<string, T> =>
  Object.fromEntries(Object.entries(record).filter(([k]) => k !== key));

const storeTaskMeta = (
  projectDataDir: string,
  wake: AgentWakePayload,
  at: string,
): void => {
  if (wake.task === undefined || !isSafeAgentWakeId(wake.task.taskId)) return;
  const file = path.join(projectDataDir, wake.projectId, AGENT_TASKS_FILE);
  const tasks = readJsonFile<AgentTaskState>(file, {});
  writeJsonFileAtomic(file, {
    ...tasks,
    [wake.task.taskId]: {
      status: wake.task.status,
      priority: wake.task.priority,
      updatedAt: at,
    },
  });
};

const markPending = (
  registry: AgentTerminalRegistry,
  wake: AgentWakePayload,
  at: string,
): AgentTerminalRegistry => ({
  terminals: omit(registry.terminals, wake.membershipId),
  pending: {
    ...registry.pending,
    [wake.membershipId]: {
      count: (registry.pending[wake.membershipId]?.count ?? 0) + 1,
      lastMessageId: wake.messageId,
      lastKind: wake.kind,
      at,
    },
  },
});

/**
 * `agent.wake`: mirror task meta locally, then type one sanitized line into the
 * agent's registered terminal. No live terminal → record a pending wake only.
 */
export const handleAgentWake = (input: {
  readonly installDir: string;
  readonly projectDataDir: string;
  readonly payload: unknown;
  /** Writes to a PTY; false when the session no longer exists. */
  readonly writeInput: (shellSessionId: string, data: string) => boolean;
  readonly schedule: (run: () => void, delayMs: number) => void;
  readonly now?: () => string;
}): HandleAgentWakeResult => {
  const wake = parseAgentWakePayload(input.payload);
  if (wake === null) return "invalid";
  const at = (input.now ?? (() => new Date().toISOString()))();
  storeTaskMeta(input.projectDataDir, wake, at);
  const registry = readAgentTerminalRegistry(input.installDir);
  const entry = registry.terminals[wake.membershipId];
  const line = buildAgentWakeTerminalLine(wake);
  if (entry !== undefined && input.writeInput(entry.shellSessionId, line)) {
    // Enter is separate so TUIs do not treat it as part of a paste.
    input.schedule(
      () => input.writeInput(entry.shellSessionId, "\r"),
      ENTER_DELAY_MS,
    );
    writeAgentTerminalRegistry(input.installDir, {
      ...registry,
      pending: omit(registry.pending, wake.membershipId),
    });
    return "injected";
  }
  writeAgentTerminalRegistry(input.installDir, markPending(registry, wake, at));
  return "pending";
};

export const registerAgentTerminal = (input: {
  readonly installDir: string;
  readonly projectId: string;
  readonly membershipId: string;
  readonly shellSessionId: string;
  readonly now?: () => string;
}): void => {
  if (
    !isSafeAgentWakeId(input.projectId) ||
    !isSafeAgentWakeId(input.membershipId)
  ) {
    return;
  }
  const registry = readAgentTerminalRegistry(input.installDir);
  writeAgentTerminalRegistry(input.installDir, {
    ...registry,
    terminals: {
      ...registry.terminals,
      [input.membershipId]: {
        shellSessionId: input.shellSessionId,
        projectId: input.projectId,
        registeredAt: (input.now ?? (() => new Date().toISOString()))(),
      },
    },
  });
};

export const unregisterAgentTerminal = (input: {
  readonly installDir: string;
  readonly shellSessionId: string;
}): void => {
  const registry = readAgentTerminalRegistry(input.installDir);
  writeAgentTerminalRegistry(input.installDir, {
    ...registry,
    terminals: Object.fromEntries(
      Object.entries(registry.terminals).filter(
        ([, entry]) => entry.shellSessionId !== input.shellSessionId,
      ),
    ),
  });
};
