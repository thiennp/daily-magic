import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { resolveAgentLiveRunOutcome } from "@/features/agent/utils/resolveAgentLiveRunOutcome";
import { resolveAgentLiveProgressFinishStepState } from "@/features/agent/utils/resolveAgentLiveProgressFinishStepState";
import {
  resolveAgentLiveProgressWorkHonestyDetail,
  resolveAgentLiveProgressWorkHonestyState,
} from "@/features/agent/utils/resolveAgentLiveProgressWorkHonesty";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

const patchWorkStepHonesty = (
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

export const buildAgentLiveProgressHonestyLayer = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly output: string;
  readonly pendingQuestion?: string | null;
  readonly approvalWaitingLabel?: string | null;
  readonly isFinished: boolean;
  readonly cleanedLength: number;
  readonly hasProgressUpdates: boolean;
  readonly workState: AgentLiveProgressStepState;
  readonly steps: readonly AgentLiveProgressStep[];
  readonly finishStep: AgentLiveProgressStep;
}): {
  readonly steps: readonly AgentLiveProgressStep[];
  readonly outcome: AgentLiveRunOutcome;
  readonly humanSummary: string | null;
} => {
  const outcome = resolveAgentLiveRunOutcome({
    status: input.status,
    output: input.output,
    pendingQuestion: input.pendingQuestion,
    approvalWaitingLabel: input.approvalWaitingLabel,
  });

  const finishState = resolveAgentLiveProgressFinishStepState({
    isFinished: input.isFinished,
    outcome,
  });

  const patchedWorkSteps = input.steps.map((step) =>
    patchWorkStepHonesty(step, {
      outcome,
      isFinished: input.isFinished,
      cleanedLength: input.cleanedLength,
      hasProgressUpdates: input.hasProgressUpdates,
      workState: input.workState,
    }),
  );

  const humanSummary =
    outcome.summaryLines.length > 0
      ? outcome.summaryLines.slice(0, 2).join("\n")
      : null;

  return {
    steps: [
      ...patchedWorkSteps,
      {
        ...input.finishStep,
        state: finishState,
        detail:
          finishState === "fallback" || finishState === "failed"
            ? (humanSummary ?? input.finishStep.detail)
            : input.finishStep.detail,
      },
    ],
    outcome,
    humanSummary,
  };
};
