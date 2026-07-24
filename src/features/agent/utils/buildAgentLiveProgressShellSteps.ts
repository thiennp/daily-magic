import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export const buildAgentLiveProgressShellSteps = (input: {
  readonly started: boolean;
  readonly isReadyBanner: boolean;
  readonly isFinished: boolean;
  readonly prepareState: AgentLiveProgressStepState;
  readonly startState: AgentLiveProgressStepState;
  readonly finishState: AgentLiveProgressStepState;
}): {
  readonly leading: readonly [AgentLiveProgressStep, AgentLiveProgressStep];
  readonly finish: AgentLiveProgressStep;
} => ({
  leading: [
    {
      id: "prepare",
      label: "Preparing agent on your Mac",
      detail: null,
      state: input.prepareState,
    },
    {
      id: "start",
      label:
        !input.started && input.isReadyBanner
          ? "Ready for your message"
          : "Agent started",
      detail: null,
      state: input.startState,
    },
  ],
  finish: {
    id: "finish",
    label: input.isFinished ? "Finished" : "Finishing up",
    detail: null,
    state: input.finishState,
  },
});
