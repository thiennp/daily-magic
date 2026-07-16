import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { updateAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const updateAgentRunSessionStatus = (
  runId: string,
  status: AgentRunStatusValue,
  fields?: {
    readonly resultOutput?: string | null;
    readonly resultExitCode?: number | null;
    readonly denialReason?: string | null;
    readonly approvalExpiresAt?: string | null;
  },
): AgentRunRecord | null => {
  const now = new Date().toISOString();
  const startedAt = status === AgentRunStatus.RUNNING ? now : undefined;
  const completedAt =
    status === AgentRunStatus.COMPLETED ||
    status === AgentRunStatus.FAILED ||
    status === AgentRunStatus.DENIED ||
    status === AgentRunStatus.EXPIRED
      ? now
      : undefined;

  return (
    updateAgentRunSession(runId, {
      status,
      ...(fields?.resultOutput !== undefined
        ? { resultOutput: fields.resultOutput }
        : {}),
      ...(fields?.resultExitCode !== undefined
        ? { resultExitCode: fields.resultExitCode }
        : {}),
      ...(fields?.denialReason !== undefined
        ? { denialReason: fields.denialReason }
        : {}),
      ...(startedAt !== undefined ? { startedAt } : {}),
      ...(completedAt !== undefined ? { completedAt } : {}),
      updatedAt: now,
    }) ?? null
  );
};
