import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  formatAgentRunHonestyFailedSummary,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import type {
  AgentRunHonestyLiveStatus,
  AgentRunHonestyOutcome,
} from "@/lib/dispatch/agentRunHonestyOutcome.type";
import { mapAgentRunStatusToHonestyLiveStatus } from "@/lib/dispatch/mapAgentRunStatusToHonestyLiveStatus";
import { resolveAgentRunHonestyTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyTerminalOutcome";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

const isHonestyLiveWorking = (status: AgentRunHonestyLiveStatus): boolean =>
  status === "starting" ||
  status === "streaming" ||
  status === "waiting_approval" ||
  status === "stopping";

const buildWaitingYouSummary = (input: {
  readonly approvalWaitingLabel?: string | null;
  readonly pendingQuestion?: string | null;
}): readonly string[] => {
  const approval = (input.approvalWaitingLabel ?? "").trim();
  if (approval.length > 0) {
    return [approval];
  }
  const question = (input.pendingQuestion ?? "").trim();
  if (question.length > 0) {
    return [question];
  }
  return ["Waiting on you — your input is needed to continue."];
};

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
      summaryLines: buildWaitingYouSummary(input),
    };
  }

  if (
    isHonestyLiveWorking(input.status) ||
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
      runStatus: AgentRunStatus.FAILED,
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

export const resolveAgentRunHonestyOutcomeFromRecord = (input: {
  readonly status: AgentRunStatusValue;
  readonly resultOutput: string | null;
  readonly resultOutcomeCode?: string | null;
  readonly pendingQuestion?: string | null;
  readonly approvalWaitingLabel?: string | null;
}): AgentRunHonestyOutcome =>
  resolveAgentRunHonestyOutcome({
    status: mapAgentRunStatusToHonestyLiveStatus(input.status),
    output: input.resultOutput ?? "",
    pendingQuestion: input.pendingQuestion,
    approvalWaitingLabel: input.approvalWaitingLabel,
    runStatus: input.status,
    resultOutcomeCode: input.resultOutcomeCode ?? null,
  });
