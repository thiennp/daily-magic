import { buildAgentLiveProgressEstimateStep } from "@/features/agent/utils/buildAgentLiveProgressEstimateStep";
import { buildAgentLiveProgressShellSteps } from "@/features/agent/utils/buildAgentLiveProgressShellSteps";
import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import { resolveAgentLiveProgressStepStates } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";
import { resolveAgentLiveProgressWorkSteps } from "@/features/agent/utils/resolveAgentLiveProgressWorkSteps";
import { resolveAgentProgressUpdateStates } from "@/features/agent/utils/resolveAgentProgressUpdateStates";
import { hasAgentLiveProgressStartedUserTask } from "@/features/agent/utils/resolveAgentLiveProgressWorkLabel";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentLiveProgressUpdate } from "@/features/agent/utils/parseAgentLiveProgressUpdates";

export const assembleAgentLiveProgressBaseSteps = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly output: string;
  readonly progressSource: string;
  readonly cleaned: string;
  readonly updates: readonly AgentLiveProgressUpdate[];
  readonly pendingCommandLine?: string | null;
  readonly pendingQuestion?: string | null;
  readonly estimateSeconds?: number | null;
  readonly stallState?: AgentLiveProgressStallState;
  readonly approvalWaitingLabel?: string | null;
}): {
  readonly baseSteps: readonly AgentLiveProgressStep[];
  readonly isFinished: boolean;
  readonly workState: AgentLiveProgressStepState;
} => {
  const started =
    hasAgentLiveProgressStartedUserTask({
      cleanedOutput: input.cleaned,
      pendingCommandLine: input.pendingCommandLine,
      status: input.status,
    }) || input.updates.length > 0;
  const isWorking =
    input.status === "starting" ||
    input.status === "streaming" ||
    input.status === "waiting_approval";
  const isFinished = input.status === "finished";
  const needsInput = (input.pendingQuestion ?? "").trim().length > 0;
  const isReadyBanner = /is ready on your Mac/i.test(input.output);
  const hasEstimate =
    input.estimateSeconds !== null &&
    input.estimateSeconds !== undefined &&
    input.estimateSeconds > 0;
  const states = resolveAgentLiveProgressStepStates({
    started,
    isFinished,
    isWorking,
    needsInput,
    isReadyBanner,
    status: input.status,
    hasEstimate,
    hasProgressUpdates: input.updates.length > 0,
  });
  const workSteps = resolveAgentLiveProgressWorkSteps({
    source: input.progressSource,
    updates: input.updates,
    updateStates: resolveAgentProgressUpdateStates({
      updateCount: input.updates.length,
      isFinished,
      isWorking,
      needsInput,
    }),
    needsInput,
    pendingQuestion: input.pendingQuestion,
    status: input.status,
    started,
    isFinished,
    cleaned: input.cleaned,
    workState: states.workState,
    stallState: input.stallState,
    approvalWaitingLabel: input.approvalWaitingLabel,
  });
  const shell = buildAgentLiveProgressShellSteps({
    started,
    isReadyBanner,
    prepareState: states.prepareState,
    startState: states.startState,
  });

  return {
    baseSteps: [
      ...shell,
      buildAgentLiveProgressEstimateStep({
        estimateState: states.estimateState,
        estimateSeconds: input.estimateSeconds,
        hasEstimate,
      }),
      ...workSteps,
    ],
    isFinished,
    workState: states.workState,
  };
};
