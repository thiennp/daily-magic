import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import {
  resolveAgentLiveProgressWorkHonestyDetail,
  resolveAgentLiveProgressWorkHonestyState,
} from "@/features/agent/utils/resolveAgentLiveProgressWorkHonesty";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export const patchAgentLiveProgressWorkStepHonesty = (
  step: AgentLiveProgressStep,
  input: {
    readonly outcome: AgentLiveRunOutcome;
    readonly isFinished: boolean;
    readonly cleanedLength: number;
    readonly hasProgressUpdates: boolean;
    readonly workState: AgentLiveProgressStepState;
  },
): AgentLiveProgressStep => {
  if (step.id !== "work") {
    return step;
  }

  const honestyState = resolveAgentLiveProgressWorkHonestyState({
    workState:
      step.state === "pending" ||
      step.state === "active" ||
      step.state === "done"
        ? step.state
        : input.workState,
    isFinished: input.isFinished,
    cleanedLength: input.cleanedLength,
    hasProgressUpdates: input.hasProgressUpdates,
    outcome: input.outcome,
  });

  const existingDetail = step.detail;
  const isActiveWithEmptyBody =
    honestyState === "active" && (existingDetail ?? "").trim().length === 0;

  return {
    ...step,
    state: honestyState,
    detail: resolveAgentLiveProgressWorkHonestyDetail({
      state: honestyState,
      existingDetail,
      outcome: input.outcome,
      workLabel: step.label,
      isActiveWithEmptyBody,
    }),
  };
};
