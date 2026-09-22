import { resolveAgentRunHonestyOutcomeFromRecord } from "@/lib/dispatch/resolveAgentRunHonestyOutcome";
import { resolveAgentLiveRunOutcomeChipClassName } from "@/features/agent/utils/agentLiveRunOutcomeChip.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const resolveHomeRunningJobBadgeOverride = (input: {
  readonly run: AgentRunRecord;
  readonly approvalWaitingLabel: string | null;
}): string | null => {
  const outcome = resolveAgentRunHonestyOutcomeFromRecord({
    status: input.run.status,
    resultOutput: input.run.resultOutput,
    resultOutcomeCode: input.run.resultOutcomeCode,
    approvalWaitingLabel: input.approvalWaitingLabel,
  });
  if (outcome.kind === "waiting_you") {
    return outcome.chipLabel;
  }
  if (input.run.status === AgentRunStatus.PENDING_APPROVAL) {
    return outcome.chipLabel;
  }
  if (input.run.status === AgentRunStatus.RUNNING) {
    return outcome.chipLabel;
  }
  return (input.approvalWaitingLabel ?? "").trim().length > 0
    ? input.approvalWaitingLabel
    : null;
};

export const resolveHomeRunningJobBadgeClassName = (input: {
  readonly run: AgentRunRecord;
  readonly approvalWaitingLabel: string | null;
}): string | null => {
  const outcome = resolveAgentRunHonestyOutcomeFromRecord({
    status: input.run.status,
    resultOutput: input.run.resultOutput,
    resultOutcomeCode: input.run.resultOutcomeCode,
    approvalWaitingLabel: input.approvalWaitingLabel,
  });
  if (
    outcome.kind === "waiting_you" ||
    outcome.kind === "running" ||
    input.run.status === AgentRunStatus.PENDING_APPROVAL ||
    input.run.status === AgentRunStatus.RUNNING
  ) {
    return resolveAgentLiveRunOutcomeChipClassName(outcome.kind);
  }
  return null;
};
