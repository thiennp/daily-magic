import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { resolveAgentRunHonestyOutcomeFromRecord } from "@/lib/dispatch/resolveAgentRunHonestyOutcomeFromRecord";

export const resolveAgentRunDetailOutcomeMessage = (input: {
  readonly status: AgentRunStatusValue;
  readonly resultOutput: string | null;
  readonly denialReason: string | null;
  readonly reportSummary: string | null | undefined;
  readonly resultOutcomeCode?: string | null;
  /** Terminal output when `resultOutput` was not persisted (e.g. fast Failed can't-run). */
  readonly supplementalResultOutput?: string | null;
}): string | null => {
  if (input.denialReason !== null && input.denialReason.trim().length > 0) {
    return input.denialReason.trim();
  }

  const outputForHonesty = (
    input.resultOutput !== null && input.resultOutput.trim().length > 0
      ? input.resultOutput
      : (input.supplementalResultOutput ?? "").trim().length > 0
        ? (input.supplementalResultOutput ?? "").trim()
        : ""
  ).trim();

  if (outputForHonesty.length > 0) {
    const honestySummary =
      resolveAgentRunHonestyOutcomeFromRecord({
        status: input.status,
        resultOutput: outputForHonesty,
        resultOutcomeCode: input.resultOutcomeCode ?? null,
      }).summaryLines[0]?.trim() ?? "";
    if (honestySummary.length > 0) {
      return honestySummary;
    }
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
      "This run failed on your computer. Open Agent Witch on that computer or start a New task to try again."
    );
  }

  if (input.status === AgentRunStatus.EXPIRED) {
    return "Approval for this run expired before your computer could finish.";
  }

  if (input.status === AgentRunStatus.DENIED) {
    return "This run was not approved.";
  }

  if (input.status === AgentRunStatus.COMPLETED && reportLine !== null) {
    return reportLine;
  }

  return null;
};
