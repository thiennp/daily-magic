import { adjustAgentLiveRunOutcomeForEmptyWork } from "@/features/agent/utils/adjustAgentLiveRunOutcomeForEmptyWork";
import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { patchAgentLiveProgressWorkStepHonesty } from "@/features/agent/utils/patchAgentLiveProgressWorkStepHonesty";
import { resolveAgentLiveRunOutcome } from "@/features/agent/utils/resolveAgentLiveRunOutcome";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

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
}): {
  readonly steps: readonly AgentLiveProgressStep[];
  readonly outcome: AgentLiveRunOutcome;
  readonly humanSummary: string | null;
} => {
  const resolvedOutcome = resolveAgentLiveRunOutcome({
    status: input.status,
    output: input.output,
    pendingQuestion: input.pendingQuestion,
    approvalWaitingLabel: input.approvalWaitingLabel,
  });
  const outcome = adjustAgentLiveRunOutcomeForEmptyWork({
    outcome: resolvedOutcome,
    isFinished: input.isFinished,
    cleanedLength: input.cleanedLength,
    hasProgressUpdates: input.hasProgressUpdates,
  });

  const patchedWorkSteps = input.steps.map((step) =>
    patchAgentLiveProgressWorkStepHonesty(step, {
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
    steps: patchedWorkSteps,
    outcome,
    humanSummary,
  };
};
