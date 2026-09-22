import {
  AgentRunOutcomeCode,
  isAgentRunOutcomeCode,
  resolveAgentRunOutcomeFromWriterOutput,
} from "@agent-witch/shared/dispatch";

import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  formatAgentRunHonestyFailedSummary,
  isStoppedByUserOutput,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";
import { tryResolveWriterApiMissingCliFallbackTerminalOutcome } from "@/lib/dispatch/tryResolveWriterApiMissingCliFallbackTerminalOutcome";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export const resolveAgentRunHonestyTerminalOutcome = (input: {
  readonly output: string;
  readonly runStatus?: AgentRunStatusValue | null;
  readonly resultOutcomeCode?: string | null;
}): AgentRunHonestyOutcome | null => {
  if (input.runStatus === AgentRunStatus.EXPIRED) {
    return {
      kind: "timed_out",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.timed_out,
      summaryLines: ["Timed out — approval expired before this run finished."],
    };
  }

  const writerApiCliFallbackOutcome =
    tryResolveWriterApiMissingCliFallbackTerminalOutcome({
      output: input.output,
      runStatus: input.runStatus,
    });
  if (writerApiCliFallbackOutcome !== null) {
    return writerApiCliFallbackOutcome;
  }

  if (isStoppedByUserOutput(input.output)) {
    return {
      kind: "stopped",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.stopped,
      summaryLines: ["Stopped — run ended from the console."],
    };
  }

  const codedOutcome =
    input.resultOutcomeCode !== null &&
    input.resultOutcomeCode !== undefined &&
    isAgentRunOutcomeCode(input.resultOutcomeCode)
      ? input.resultOutcomeCode
      : null;

  if (codedOutcome === AgentRunOutcomeCode.SESSION_LIMIT) {
    return {
      kind: "timed_out",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.timed_out,
      summaryLines: [
        "Timed out — this run hit the hard session limit on your Mac.",
      ],
    };
  }

  const writerOutcome = resolveAgentRunOutcomeFromWriterOutput(input.output);
  if (writerOutcome?.code === AgentRunOutcomeCode.SESSION_LIMIT) {
    return {
      kind: "timed_out",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.timed_out,
      summaryLines: [
        writerOutcome.matchedLine ??
          "Timed out — this run hit the hard session limit on your Mac.",
      ],
    };
  }

  if (
    writerOutcome?.code === AgentRunOutcomeCode.PROVIDER_QUOTA ||
    codedOutcome === AgentRunOutcomeCode.PROVIDER_QUOTA ||
    input.runStatus === AgentRunStatus.FAILED ||
    input.runStatus === AgentRunStatus.DENIED
  ) {
    const reason =
      writerOutcome?.matchedLine ??
      (input.runStatus === AgentRunStatus.DENIED
        ? "This run was not approved."
        : "This run failed on your Mac.");
    return {
      kind: "failed",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.failed,
      summaryLines: [formatAgentRunHonestyFailedSummary(reason)],
    };
  }

  if (
    input.runStatus === AgentRunStatus.COMPLETED ||
    input.runStatus === null ||
    input.runStatus === undefined
  ) {
    if (input.output.trim().length === 0) {
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
  }

  return null;
};
