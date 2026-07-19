import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import {
  appendProgressStepsUntilIndex,
  appendTimelineEntry,
} from "@/features/agent/utils/appendAgentLiveProgressTimelineSteps";
import { buildAgentLiveProgressTimelineEntries } from "@/features/agent/utils/buildAgentLiveProgressTimelineEntries";
import type { AgentLiveProgressUpdate } from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export const buildAgentLiveProgressTimelineSteps = (input: {
  readonly source: string;
  readonly updates: readonly AgentLiveProgressUpdate[];
  readonly updateStates: readonly AgentLiveProgressStepState[];
  readonly needsInput: boolean;
  readonly pendingQuestion?: string | null;
}): readonly AgentLiveProgressStep[] => {
  const timeline = buildAgentLiveProgressTimelineEntries(
    input.source,
    input.updates,
  );

  const steppedTimeline = timeline.reduce<{
    readonly steps: readonly AgentLiveProgressStep[];
    readonly progressCursor: number;
  }>(
    (accumulator, entry) => {
      if (entry.kind === "progress" && entry.progressIndex !== undefined) {
        return {
          progressCursor: entry.progressIndex + 1,
          steps: appendProgressStepsUntilIndex({
            updates: input.updates,
            updateStates: input.updateStates,
            needsInput: input.needsInput,
            progressIndex: entry.progressIndex,
            progressCursor: accumulator.progressCursor,
            steps: accumulator.steps,
          }),
        };
      }

      return {
        ...accumulator,
        steps: appendTimelineEntry(accumulator.steps, entry),
      };
    },
    { steps: [], progressCursor: 0 },
  );

  const withTrailingProgress = appendProgressStepsUntilIndex({
    updates: input.updates,
    updateStates: input.updateStates,
    needsInput: input.needsInput,
    progressIndex: input.updates.length - 1,
    progressCursor: steppedTimeline.progressCursor,
    steps: steppedTimeline.steps,
  });

  if (!input.needsInput) {
    return withTrailingProgress;
  }

  const question = (input.pendingQuestion ?? "").trim();
  return [
    ...withTrailingProgress,
    {
      id: "await-input",
      label: "Waiting for your answer",
      detail: question.length > 0 ? question : null,
      state: "active",
    },
  ];
};
