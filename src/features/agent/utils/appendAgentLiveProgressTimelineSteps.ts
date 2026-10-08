import { cleanAgentLiveCheckpointText } from "@/features/agent/utils/cleanAgentLiveCheckpointText";
import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveProgressTimelineEntry } from "@/features/agent/utils/buildAgentLiveProgressTimelineEntries";
import type { AgentLiveProgressUpdate } from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export const appendProgressStepsUntilIndex = (input: {
  readonly updates: readonly AgentLiveProgressUpdate[];
  readonly updateStates: readonly AgentLiveProgressStepState[];
  readonly needsInput: boolean;
  readonly progressIndex: number;
  readonly progressCursor: number;
  readonly steps: readonly AgentLiveProgressStep[];
}): readonly AgentLiveProgressStep[] => {
  if (input.progressCursor > input.progressIndex) {
    return input.steps;
  }

  const update = input.updates[input.progressCursor];
  if (update === undefined) {
    return input.steps;
  }

  const detail = update.detail.length > 0 ? update.detail : null;
  const state: AgentLiveProgressStepState = input.needsInput
    ? "done"
    : (input.updateStates[input.progressCursor] ?? "pending");
  const previous = input.steps.at(-1);
  // bd93cdcc: the same progress block (title + detail) reported twice is one step.
  if (
    previous !== undefined &&
    previous.label === update.title &&
    (previous.detail ?? null) === detail
  ) {
    return appendProgressStepsUntilIndex({
      ...input,
      progressCursor: input.progressCursor + 1,
      steps: [...input.steps.slice(0, -1), { ...previous, state }],
    });
  }

  return appendProgressStepsUntilIndex({
    ...input,
    progressCursor: input.progressCursor + 1,
    steps: [
      ...input.steps,
      {
        id: `progress-${input.progressCursor}`,
        label: update.title,
        detail,
        state,
      },
    ],
  });
};

export const appendTimelineEntry = (
  steps: readonly AgentLiveProgressStep[],
  entry: AgentLiveProgressTimelineEntry,
): readonly AgentLiveProgressStep[] => {
  if (entry.kind === "checkpoint-question" && entry.question !== undefined) {
    return [
      ...steps,
      {
        id: `checkpoint-q-${steps.length}`,
        label: "Agent asked",
        detail: cleanAgentLiveCheckpointText(entry.question),
        state: "done",
      },
    ];
  }

  if (entry.kind === "checkpoint-answer" && entry.answer !== undefined) {
    return [
      ...steps,
      {
        id: `checkpoint-a-${steps.length}`,
        label: "Your answer",
        detail: cleanAgentLiveCheckpointText(entry.answer),
        state: "done",
      },
    ];
  }

  return steps;
};
