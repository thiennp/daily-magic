import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  formatAgentRunHonestyFailedSummary,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";
import { isAgentRunWriterPrepareFailureInOutput } from "@/lib/dispatch/isAgentRunWriterPrepareFailureInOutput";

const resolvePrepareFailureReasonLine = (output: string): string =>
  output
    .split("\n")
    .map((line) => line.trim())
    .find((line) => /failed to prepare\s+[\w-]+:/i.test(line)) ??
  "This run failed on your computer.";

export const tryResolveAgentRunWriterPrepareFailureTerminalOutcome = (
  output: string,
): AgentRunHonestyOutcome | null => {
  if (!isAgentRunWriterPrepareFailureInOutput(output)) {
    return null;
  }

  return {
    kind: "failed",
    chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.failed,
    summaryLines: [
      formatAgentRunHonestyFailedSummary(
        resolvePrepareFailureReasonLine(output),
      ),
    ],
  };
};
