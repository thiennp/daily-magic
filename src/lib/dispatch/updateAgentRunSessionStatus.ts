import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  getAgentRunSession,
  updateAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import { toAgentRunNeonMetaText } from "@/lib/dispatch/toAgentRunNeonMetaText";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const updateAgentRunSessionStatus = (
  runId: string,
  status: AgentRunStatusValue,
  fields?: {
    readonly resultOutput?: string | null;
    readonly resultExitCode?: number | null;
    readonly resultOutcomeCode?: string | null;
    readonly denialReason?: string | null;
    readonly approvalExpiresAt?: string | null;
    readonly estimateSeconds?: number | null;
    readonly actualSeconds?: number | null;
  },
): AgentRunRecord | null => {
  const now = new Date().toISOString();
  const startedAt = status === AgentRunStatus.RUNNING ? now : undefined;
  const isTerminal =
    status === AgentRunStatus.COMPLETED ||
    status === AgentRunStatus.FAILED ||
    status === AgentRunStatus.DENIED ||
    status === AgentRunStatus.EXPIRED;
  const completedAt = isTerminal ? now : undefined;
  const existing = isTerminal ? getAgentRunSession(runId) : undefined;

  const resultOutput =
    typeof fields?.resultOutput === "string"
      ? toAgentRunNeonMetaText(fields.resultOutput)
      : fields?.resultOutput;
  const denialReason =
    typeof fields?.denialReason === "string"
      ? toAgentRunNeonMetaText(fields.denialReason)
      : fields?.denialReason;

  return (
    updateAgentRunSession(runId, {
      status,
      ...(resultOutput !== undefined ? { resultOutput } : {}),
      ...(fields?.resultExitCode !== undefined
        ? { resultExitCode: fields.resultExitCode }
        : {}),
      ...(fields?.resultOutcomeCode !== undefined
        ? { resultOutcomeCode: fields.resultOutcomeCode }
        : {}),
      ...(denialReason !== undefined ? { denialReason } : {}),
      ...(startedAt !== undefined ? { startedAt } : {}),
      ...(completedAt !== undefined ? { completedAt } : {}),
      ...(typeof fields?.estimateSeconds === "number"
        ? { estimateSeconds: fields.estimateSeconds }
        : {}),
      ...(typeof fields?.actualSeconds === "number"
        ? { actualSeconds: fields.actualSeconds }
        : {}),
      ...(existing !== undefined
        ? { prompt: toAgentRunNeonMetaText(existing.prompt) }
        : {}),
      updatedAt: now,
    }) ?? null
  );
};
