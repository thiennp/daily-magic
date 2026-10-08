import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  formatAgentRunHonestyFailedSummary,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";
import { resolveAntigravityCliHeadlessRunFailureReason } from "@/lib/dispatch/isAntigravityCliHeadlessRunFailureInOutput";
import { tryResolveAgentRunWriterPrepareFailureTerminalOutcome } from "@/lib/dispatch/tryResolveAgentRunWriterPrepareFailureTerminalOutcome";

export const resolveAgentRunHonestyCompletedTerminalOutcome = (
  output: string,
): AgentRunHonestyOutcome => {
  const prepareFailureOutcome =
    tryResolveAgentRunWriterPrepareFailureTerminalOutcome(output);
  if (prepareFailureOutcome !== null) {
    return prepareFailureOutcome;
  }

  const antigravityHeadlessFailureReason =
    resolveAntigravityCliHeadlessRunFailureReason(output);
  if (antigravityHeadlessFailureReason !== null) {
    return {
      kind: "failed",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.failed,
      summaryLines: [
        formatAgentRunHonestyFailedSummary(antigravityHeadlessFailureReason),
      ],
    };
  }

  if (output.trim().length === 0) {
    return {
      kind: "failed",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.failed,
      summaryLines: [
        formatAgentRunHonestyFailedSummary("No agent output was captured"),
      ],
    };
  }

  return {
    kind: "passed",
    chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.passed,
    summaryLines: [],
  };
};
