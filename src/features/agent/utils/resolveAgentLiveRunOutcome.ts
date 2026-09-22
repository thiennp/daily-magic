import { resolveAgentRunOutcomeFromWriterOutput } from "@agent-witch/shared/dispatch";

import {
  AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL,
  formatAgentLiveRunDegradedSummary,
  formatAgentLiveRunFailedSummary,
  isCliFallbackMarketplacePlanEstimateBackend,
  resolveMarketplacePlanEstimateFallbackReason,
} from "@/features/agent/utils/agentLiveRunHonestyCopy.constant";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { isAgentLiveTerminalWorking } from "@/features/agent/utils/isAgentLiveTerminalWorking";
import { parseMarketplacePlanEstimateFromOutput } from "@/features/agent/utils/parseMarketplacePlanEstimateFromOutput";

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
  return ["Your input is needed to continue this run."];
};

export const resolveAgentLiveRunOutcome = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly output: string;
  readonly pendingQuestion?: string | null;
  readonly approvalWaitingLabel?: string | null;
}): AgentLiveRunOutcome => {
  const needsInput = (input.pendingQuestion ?? "").trim().length > 0;

  if (input.status === "waiting_approval" || needsInput) {
    return {
      kind: "waiting_you",
      chipLabel: AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL.waiting_you,
      summaryLines: buildWaitingYouSummary(input),
    };
  }

  if (input.status === "error") {
    const writerOutcome = resolveAgentRunOutcomeFromWriterOutput(input.output);
    const reason =
      writerOutcome?.matchedLine ??
      "Something went wrong while running on your Mac.";
    return {
      kind: "failed",
      chipLabel: AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL.failed,
      summaryLines: [formatAgentLiveRunFailedSummary(reason)],
    };
  }

  if (isAgentLiveTerminalWorking(input.status) || input.status === "stopping") {
    return {
      kind: "running",
      chipLabel: AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL.running,
      summaryLines: [],
    };
  }

  if (input.status === "finished") {
    const writerOutcome = resolveAgentRunOutcomeFromWriterOutput(input.output);
    if (writerOutcome !== null) {
      const reason =
        writerOutcome.matchedLine ??
        "The writer stopped before completing your request.";
      return {
        kind: "failed",
        chipLabel: AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL.failed,
        summaryLines: [formatAgentLiveRunFailedSummary(reason)],
      };
    }

    const planEstimate = parseMarketplacePlanEstimateFromOutput(input.output);
    if (
      isCliFallbackMarketplacePlanEstimateBackend(planEstimate?.backend ?? null)
    ) {
      const reason = resolveMarketplacePlanEstimateFallbackReason(
        planEstimate?.reasonCode ?? null,
      );
      return {
        kind: "degraded",
        chipLabel: AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL.degraded,
        summaryLines: [formatAgentLiveRunDegradedSummary(reason)],
      };
    }

    return {
      kind: "passed",
      chipLabel: AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL.passed,
      summaryLines: ["Your Mac agent finished this run."],
    };
  }

  return {
    kind: "running",
    chipLabel: AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL.running,
    summaryLines: [],
  };
};
