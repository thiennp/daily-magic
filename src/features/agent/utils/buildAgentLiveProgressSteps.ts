import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_LIVE_PROGRESS_ACTIVITY_PATTERNS } from "@/features/agent/utils/agentLiveProgressPatterns.constant";
import {
  resolveAgentLiveProgressStepStates,
  type AgentLiveProgressStepState,
} from "@/features/agent/utils/resolveAgentLiveProgressStepStates";
import { stripAgentLiveProgressCliChrome } from "@/features/agent/utils/stripAgentLiveProgressCliChrome";

export type { AgentLiveProgressStepState };

export interface AgentLiveProgressStep {
  readonly id: string;
  readonly label: string;
  readonly state: AgentLiveProgressStepState;
}

const resolveActivityLabel = (cleanedOutput: string): string => {
  for (const activity of AGENT_LIVE_PROGRESS_ACTIVITY_PATTERNS) {
    if (activity.pattern.test(cleanedOutput)) {
      return activity.label;
    }
  }
  return "Working on your request";
};

const hasStartedUserTask = (input: {
  readonly cleanedOutput: string;
  readonly pendingCommandLine?: string | null;
  readonly status: AgentLiveTerminalStatus;
}): boolean => {
  if ((input.pendingCommandLine ?? "").trim().length > 0) {
    return true;
  }
  if (
    input.status === "streaming" ||
    input.status === "waiting_approval" ||
    input.status === "finished"
  ) {
    return true;
  }
  return input.cleanedOutput.length > 0;
};

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
  const started = hasStartedUserTask({
    cleanedOutput: cleaned,
    pendingCommandLine: input.pendingCommandLine,
    status: input.status,
  });
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

  const workLabel = needsInput
    ? "Waiting for your answer"
    : input.status === "waiting_approval"
      ? "Waiting for your approval"
      : started && !isFinished
        ? resolveActivityLabel(cleaned)
        : "Working on your request";

  return {
    steps: [
      {
        id: "prepare",
        label: "Preparing agent on your Mac",
        state: states.prepareState,
      },
      {
        id: "start",
        label:
          !started && isReadyBanner
            ? "Ready for your message"
            : "Agent started",
        state: states.startState,
      },
      { id: "work", label: workLabel, state: states.workState },
      {
        id: "finish",
        label: isFinished ? "Finished" : "Finishing up",
        state: states.finishState,
      },
    ],
    replyPreview: cleaned.length > 0 ? cleaned : null,
  };
};
