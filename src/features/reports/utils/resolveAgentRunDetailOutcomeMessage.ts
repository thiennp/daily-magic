import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export const resolveAgentRunDetailOutcomeMessage = (input: {
  readonly status: AgentRunStatusValue;
  readonly resultOutput: string | null;
  readonly denialReason: string | null;
  readonly reportSummary: string | null | undefined;
}): string | null => {
  if (input.denialReason !== null && input.denialReason.trim().length > 0) {
    return input.denialReason.trim();
  }

  if (input.resultOutput !== null && input.resultOutput.trim().length > 0) {
    return null;
  }

  const reportLine =
    input.reportSummary !== null &&
    input.reportSummary !== undefined &&
    input.reportSummary.trim().length > 0
      ? input.reportSummary.trim()
      : null;

  if (input.status === AgentRunStatus.FAILED) {
    return (
      reportLine ??
      "This run failed on your Mac. Open Agent Witch on that Mac or start a New task to try again."
    );
  }

  if (input.status === AgentRunStatus.EXPIRED) {
    return "Approval for this run expired before your Mac could finish.";
  }

  if (input.status === AgentRunStatus.DENIED) {
    return "This run was not approved.";
  }

  if (input.status === AgentRunStatus.COMPLETED && reportLine !== null) {
    return reportLine;
  }

  return null;
};
