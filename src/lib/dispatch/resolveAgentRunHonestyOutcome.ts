import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  formatAgentRunHonestyFailedSummary,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { buildAgentRunHonestyWaitingYouSummary } from "@/lib/dispatch/buildAgentRunHonestyWaitingYouSummary";
import type {
  AgentRunHonestyLiveStatus,
  AgentRunHonestyOutcome,
} from "@/lib/dispatch/agentRunHonestyOutcome.type";
import { resolveAgentRunHonestyTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

const isHonestyLiveInProgress = (status: AgentRunHonestyLiveStatus): boolean =>
  status === "streaming" ||
  status === "waiting_approval" ||
  status === "stopping";

export const resolveAgentRunHonestyOutcome = (input: {
  readonly status: AgentRunHonestyLiveStatus;
  readonly output: string;
  readonly pendingQuestion?: string | null;
  readonly approvalWaitingLabel?: string | null;
  readonly runStatus?: AgentRunStatusValue | null;
  readonly resultOutcomeCode?: string | null;
}): AgentRunHonestyOutcome => {
  const needsInput = (input.pendingQuestion ?? "").trim().length > 0;

  if (
    input.runStatus === AgentRunStatus.PENDING_APPROVAL ||
    input.status === "waiting_approval" ||
    needsInput
  ) {
    return {
      kind: "waiting_you",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.waiting_you,
      summaryLines: buildAgentRunHonestyWaitingYouSummary(input),
    };
  }

  if (input.status === "starting") {
    return {
      kind: "connecting",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.connecting,
      summaryLines: [],
    };
  }

  if (input.status === "stopping") {
    const stoppingTerminal = resolveAgentRunHonestyTerminalOutcome({
      output: input.output,
      runStatus: input.runStatus ?? AgentRunStatus.RUNNING,
      resultOutcomeCode: input.resultOutcomeCode,
    });
    if (stoppingTerminal?.kind === "degraded") {
      return stoppingTerminal;
    }
  }

  if (
    isHonestyLiveInProgress(input.status) ||
    input.runStatus === AgentRunStatus.RUNNING
  ) {
    return {
      kind: "running",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.running,
      summaryLines: [],
    };
  }

  if (input.status === "error") {
    const terminal = resolveAgentRunHonestyTerminalOutcome({
      output: input.output,
      runStatus: input.runStatus ?? AgentRunStatus.FAILED,
      resultOutcomeCode: input.resultOutcomeCode,
    });
    return (
      terminal ?? {
        kind: "failed",
        chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.failed,
        summaryLines: [
          formatAgentRunHonestyFailedSummary(
            "Something went wrong while running on your Mac.",
          ),
        ],
      }
    );
  }

  if (input.status === "finished") {
    const terminal = resolveAgentRunHonestyTerminalOutcome({
      output: input.output,
      runStatus: input.runStatus ?? AgentRunStatus.COMPLETED,
      resultOutcomeCode: input.resultOutcomeCode,
    });
    if (terminal !== null) {
      return terminal;
    }
  }

  return {
    kind: "running",
    chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.running,
    summaryLines: [],
  };
};
