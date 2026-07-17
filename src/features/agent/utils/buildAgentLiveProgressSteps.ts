import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import { hasAgentLiveProgressStartedUserTask } from "@/features/agent/utils/resolveAgentLiveProgressWorkLabel";
import {
  resolveAgentLiveProgressCleanedSource,
  resolveAgentLiveProgressUpdatesFromSources,
} from "@/features/agent/utils/resolveAgentLiveProgressUpdatesFromSources";
import { resolveAgentLiveProgressWorkSteps } from "@/features/agent/utils/resolveAgentLiveProgressWorkSteps";
import { resolveAgentProgressUpdateStates } from "@/features/agent/utils/resolveAgentProgressUpdateStates";
import {
  resolveAgentLiveProgressStepStates,
  type AgentLiveProgressStepState,
} from "@/features/agent/utils/resolveAgentLiveProgressStepStates";
import { stripAgentLiveProgressCliChrome } from "@/features/agent/utils/stripAgentLiveProgressCliChrome";

export type { AgentLiveProgressStepState };
export type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";

export const buildAgentLiveProgressSteps = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly output: string;
  readonly pendingCommandLine?: string | null;
  readonly pendingQuestion?: string | null;
  readonly partialOutput?: string | null;
}): {
  readonly steps: readonly AgentLiveProgressStep[];
  readonly replyPreview: string | null;
} => {
  const progressSource = resolveAgentLiveProgressCleanedSource(
    input.output,
    input.partialOutput,
  );
  const cleaned = stripAgentLiveProgressCliChrome(progressSource);
  const updates = resolveAgentLiveProgressUpdatesFromSources(
    input.output,
    input.partialOutput,
  );
  const started =
    hasAgentLiveProgressStartedUserTask({
      cleanedOutput: cleaned,
      pendingCommandLine: input.pendingCommandLine,
      status: input.status,
    }) || updates.length > 0;
  const isWorking =
    input.status === "starting" ||
    input.status === "streaming" ||
    input.status === "waiting_approval";
  const isFinished = input.status === "finished";
  const needsInput = (input.pendingQuestion ?? "").trim().length > 0;
  const isReadyBanner = /is ready on your Mac/i.test(input.output);
  const states = resolveAgentLiveProgressStepStates({
    started,
    isFinished,
    isWorking,
    needsInput,
    isReadyBanner,
    status: input.status,
  });
  const workSteps = resolveAgentLiveProgressWorkSteps({
    updates,
    updateStates: resolveAgentProgressUpdateStates({
      updateCount: updates.length,
      isFinished,
      isWorking,
      needsInput,
    }),
    needsInput,
    pendingQuestion: input.pendingQuestion,
    status: input.status,
    started,
    isFinished,
    cleaned,
    workState: states.workState,
  });

  return {
    steps: [
      {
        id: "prepare",
        label: "Preparing agent on your Mac",
        detail: null,
        state: states.prepareState,
      },
      {
        id: "start",
        label:
          !started && isReadyBanner
            ? "Ready for your message"
            : "Agent started",
        detail: null,
        state: states.startState,
      },
      ...workSteps,
      {
        id: "finish",
        label: isFinished ? "Finished" : "Finishing up",
        detail: null,
        state: states.finishState,
      },
    ],
    replyPreview: cleaned.length > 0 ? cleaned : null,
  };
};
