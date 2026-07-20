import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * Process-wide so Next.js API routes and WebSocket handlers share run state.
 */
const agentRunSessionGlobal = globalThis as typeof globalThis & {
  __dailyMagicAgentRunSessions?: Map<string, AgentRunRecord>;
};

const sessions = (): Map<string, AgentRunRecord> => {
  if (agentRunSessionGlobal.__dailyMagicAgentRunSessions === undefined) {
    agentRunSessionGlobal.__dailyMagicAgentRunSessions = new Map();
  }
  return agentRunSessionGlobal.__dailyMagicAgentRunSessions;
};

export const registerAgentRunSession = (run: AgentRunRecord): void => {
  sessions().set(run.id, run);
};

export const getAgentRunSession = (runId: string): AgentRunRecord | undefined =>
  sessions().get(runId);

export const updateAgentRunSession = (
  runId: string,
  patch: Partial<
    Pick<
      AgentRunRecord,
      | "status"
      | "resultOutput"
      | "resultExitCode"
      | "denialReason"
      | "startedAt"
      | "completedAt"
      | "updatedAt"
      | "approvalExpiresAt"
      | "lastRunHeartbeatAt"
    >
  >,
): AgentRunRecord | undefined => {
  const existing = sessions().get(runId);
  if (existing === undefined) {
    return undefined;
  }

  const updated: AgentRunRecord = {
    ...existing,
    ...patch,
    updatedAt: patch.updatedAt ?? new Date().toISOString(),
  };
  sessions().set(runId, updated);
  return updated;
};

export const removeAgentRunSession = (runId: string): void => {
  sessions().delete(runId);
};

export const listAgentRunSessionsForUser = (
  userId: string,
): readonly AgentRunRecord[] =>
  [...sessions().values()].filter(
    (run) => run.requesterUserId === userId || run.executorUserId === userId,
  );

export const listAllAgentRunSessions = (): readonly AgentRunRecord[] => [
  ...sessions().values(),
];

export const isAgentRunSessionRunning = (
  runId: string,
  executorUserId: string,
): boolean => {
  const run = sessions().get(runId);
  return (
    run !== undefined &&
    run.executorUserId === executorUserId &&
    run.status === ("running" satisfies AgentRunStatusValue)
  );
};

export const clearAgentRunSessionsForTests = (): void => {
  sessions().clear();
};
