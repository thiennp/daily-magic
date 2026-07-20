import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveProgressUpdate } from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";
import {
  resolveAgentLiveProgressFallbackWorkDetail,
  resolveAgentLiveProgressFallbackWorkLabel,
} from "@/features/agent/utils/resolveAgentLiveProgressWorkLabel";
import { resolveAgentLiveProgressStallDetail } from "@/features/agent/utils/resolveAgentLiveProgressStallDetail";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const resolveAgentLiveProgressWorkSteps = (input: {
  readonly updates: readonly AgentLiveProgressUpdate[];
  readonly updateStates: readonly AgentLiveProgressStepState[];
  readonly needsInput: boolean;
  readonly pendingQuestion?: string | null;
  readonly status: AgentLiveTerminalStatus;
  readonly started: boolean;
  readonly isFinished: boolean;
  readonly cleaned: string;
  readonly workState: AgentLiveProgressStepState;
  readonly stallState?: AgentLiveProgressStallState;
}): readonly AgentLiveProgressStep[] => {
  if (input.updates.length > 0) {
    const progressSteps: AgentLiveProgressStep[] = input.updates.map(
      (update, index) => ({
        id: `progress-${index}`,
        label: update.title,
        detail: update.detail.length > 0 ? update.detail : null,
        state: input.needsInput
          ? "done"
          : (input.updateStates[index] ?? "pending"),
      }),
    );

    if (!input.needsInput) {
      return progressSteps;
    }

    const question = (input.pendingQuestion ?? "").trim();
    return [
      ...progressSteps,
      {
        id: "await-input",
        label: "Waiting for your answer",
        detail: question.length > 0 ? question : null,
        state: "active",
      },
    ];
  }

  return [
    {
      id: "work",
      label: resolveAgentLiveProgressFallbackWorkLabel({
        needsInput: input.needsInput,
        status: input.status,
        started: input.started,
        isFinished: input.isFinished,
        cleaned: input.cleaned,
      }),
      detail: resolveAgentLiveProgressStallDetail({
        stallState: input.stallState ?? "none",
        fallbackDetail: resolveAgentLiveProgressFallbackWorkDetail({
          cleaned: input.cleaned,
          needsInput: input.needsInput,
          isFinished: input.isFinished,
          pendingQuestion: input.pendingQuestion,
        }),
      }),
      state: input.workState,
    },
  ];
};
