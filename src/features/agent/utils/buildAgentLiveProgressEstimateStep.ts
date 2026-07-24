import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import {
  AGENT_LIVE_PROGRESS_ESTIMATE_STEP_ACTIVE_DETAIL,
  AGENT_LIVE_PROGRESS_ESTIMATE_STEP_LABEL,
} from "@/features/agent/utils/agentLiveProgressEstimate.constant";
import { formatAgentLiveWorkingEstimateLabel } from "@/features/agent/utils/formatAgentLiveWorkingEstimateLabel";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export const buildAgentLiveProgressEstimateStep = (input: {
  readonly estimateState: AgentLiveProgressStepState;
  readonly estimateSeconds?: number | null;
  readonly hasEstimate: boolean;
}): AgentLiveProgressStep => {
  const estimateDetail =
    input.estimateState === "active"
      ? AGENT_LIVE_PROGRESS_ESTIMATE_STEP_ACTIVE_DETAIL
      : input.hasEstimate && input.estimateSeconds != null
        ? `${formatAgentLiveWorkingEstimateLabel(input.estimateSeconds)} planned`
        : null;

  return {
    id: "estimate",
    label: AGENT_LIVE_PROGRESS_ESTIMATE_STEP_LABEL,
    detail: estimateDetail,
    state: input.estimateState,
  };
};
