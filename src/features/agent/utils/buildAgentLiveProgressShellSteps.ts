import {
  AGENT_LIVE_PROGRESS_PREPARE_STEP_LABEL,
  AGENT_LIVE_PROGRESS_READY_FOR_MESSAGE_LABEL,
  AGENT_LIVE_PROGRESS_START_STEP_LABEL,
} from "@/features/agent/utils/agentLiveProgressMarketplaceStepLabels.constant";
import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export const buildAgentLiveProgressShellSteps = (input: {
  readonly started: boolean;
  readonly isReadyBanner: boolean;
  readonly prepareState: AgentLiveProgressStepState;
  readonly startState: AgentLiveProgressStepState;
}): readonly [AgentLiveProgressStep, AgentLiveProgressStep] => [
  {
    id: "prepare",
    label: AGENT_LIVE_PROGRESS_PREPARE_STEP_LABEL,
    detail: null,
    state: input.prepareState,
  },
  {
    id: "start",
    label:
      !input.started && input.isReadyBanner
        ? AGENT_LIVE_PROGRESS_READY_FOR_MESSAGE_LABEL
        : AGENT_LIVE_PROGRESS_START_STEP_LABEL,
    detail: null,
    state: input.startState,
  },
];
