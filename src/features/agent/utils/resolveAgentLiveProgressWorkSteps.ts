import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import { buildAgentLiveProgressTimelineSteps } from "@/features/agent/utils/buildAgentLiveProgressTimelineSteps";
import type { AgentLiveProgressUpdate } from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import { parseAgentLiveProgressCheckpointExchanges } from "@/features/agent/utils/parseAgentLiveProgressCheckpointExchanges";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";
import {
  resolveAgentLiveProgressFallbackWorkDetail,
  resolveAgentLiveProgressFallbackWorkLabel,
} from "@/features/agent/utils/resolveAgentLiveProgressWorkLabel";
import { resolveAgentLiveProgressStallDetail } from "@/features/agent/utils/resolveAgentLiveProgressStallDetail";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const resolveAgentLiveProgressWorkSteps = (input: {
  readonly source: string;
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
    return buildAgentLiveProgressTimelineSteps({
      source: input.source,
      updates: input.updates,
      updateStates: input.updateStates,
      needsInput: input.needsInput,
      pendingQuestion: input.pendingQuestion,
    });
  }

  return [
    ...parseAgentLiveProgressCheckpointExchanges(input.source).flatMap(
      (exchange, index) => [
        {
          id: `checkpoint-q-${index}`,
          label: "Agent asked",
          detail: exchange.question,
          state: "done" as const,
        },
        {
          id: `checkpoint-a-${index}`,
          label: "Your answer",
          detail: exchange.answer,
          state: "done" as const,
        },
      ],
    ),
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
