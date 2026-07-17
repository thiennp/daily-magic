import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { parseAgentLiveProgressUpdates } from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import {
  hasAgentLiveProgressStartedUserTask,
  resolveAgentLiveProgressFallbackWorkLabel,
} from "@/features/agent/utils/resolveAgentLiveProgressWorkLabel";
import { resolveAgentProgressUpdateStates } from "@/features/agent/utils/resolveAgentProgressUpdateStates";
import {
  resolveAgentLiveProgressStepStates,
  type AgentLiveProgressStepState,
} from "@/features/agent/utils/resolveAgentLiveProgressStepStates";
import { stripAgentLiveProgressCliChrome } from "@/features/agent/utils/stripAgentLiveProgressCliChrome";

export type { AgentLiveProgressStepState };

export interface AgentLiveProgressStep {
  readonly id: string;
  readonly label: string;
  readonly detail: string | null;
  readonly state: AgentLiveProgressStepState;
}

export const buildAgentLiveProgressSteps = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly output: string;
  readonly pendingCommandLine?: string | null;
  readonly pendingQuestion?: string | null;
}): {
  readonly steps: readonly AgentLiveProgressStep[];
  readonly replyPreview: string | null;
} => {
  const cleaned = stripAgentLiveProgressCliChrome(input.output);
  const updates = parseAgentLiveProgressUpdates(input.output);
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
  const updateStates = resolveAgentProgressUpdateStates({
    updateCount: updates.length,
    isFinished,
    isWorking,
    needsInput,
  });
  const workSteps: AgentLiveProgressStep[] =
    updates.length > 0
      ? updates.map((update, index) => ({
          id: `progress-${index}`,
          label: update.title,
          detail: update.detail.length > 0 ? update.detail : null,
          state: updateStates[index] ?? "pending",
        }))
      : [
          {
            id: "work",
            label: resolveAgentLiveProgressFallbackWorkLabel({
              needsInput,
              status: input.status,
              started,
              isFinished,
              cleaned,
            }),
            detail: null,
            state: states.workState,
          },
        ];

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
