import {
  AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL,
  formatAgentLiveRunFailedSummary,
} from "@/features/agent/utils/agentLiveRunHonestyCopy.constant";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";

export const adjustAgentLiveRunOutcomeForEmptyWork = (input: {
  readonly outcome: AgentLiveRunOutcome;
  readonly isFinished: boolean;
  readonly cleanedLength: number;
  readonly hasProgressUpdates: boolean;
}): AgentLiveRunOutcome => {
  if (
    !input.isFinished ||
    input.cleanedLength > 0 ||
    input.hasProgressUpdates ||
    input.outcome.kind !== "passed"
  ) {
    return input.outcome;
  }

  return {
    kind: "failed",
    chipLabel: AGENT_LIVE_RUN_OUTCOME_CHIP_LABEL.failed,
    summaryLines: [
      formatAgentLiveRunFailedSummary("No agent output was captured"),
    ],
  };
};
