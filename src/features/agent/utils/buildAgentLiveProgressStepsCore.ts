import { assembleAgentLiveProgressBaseSteps } from "@/features/agent/utils/assembleAgentLiveProgressBaseSteps";
import { buildAgentLiveProgressHonestyLayer } from "@/features/agent/utils/buildAgentLiveProgressHonestyLayer";
import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import {
  resolveAgentLiveProgressCleanedSource,
  resolveAgentLiveProgressUpdatesFromSources,
} from "@/features/agent/utils/resolveAgentLiveProgressUpdatesFromSources";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import { stripAgentLiveProgressCliChrome } from "@/features/agent/utils/stripAgentLiveProgressCliChrome";

export const buildAgentLiveProgressStepsCore = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly output: string;
  readonly pendingCommandLine?: string | null;
  readonly pendingQuestion?: string | null;
  readonly partialOutput?: string | null;
  readonly stallState?: AgentLiveProgressStallState;
  readonly estimateSeconds?: number | null;
  readonly approvalWaitingLabel?: string | null;
}): {
  readonly steps: readonly AgentLiveProgressStep[];
  readonly replyPreview: string | null;
  readonly humanSummary: string | null;
  readonly outcome: AgentLiveRunOutcome;
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
  const assembled = assembleAgentLiveProgressBaseSteps({
    status: input.status,
    output: input.output,
    progressSource,
    cleaned,
    updates,
    pendingCommandLine: input.pendingCommandLine,
    pendingQuestion: input.pendingQuestion,
    estimateSeconds: input.estimateSeconds,
    stallState: input.stallState,
    approvalWaitingLabel: input.approvalWaitingLabel,
  });
  const honesty = buildAgentLiveProgressHonestyLayer({
    status: input.status,
    output: progressSource,
    pendingQuestion: input.pendingQuestion,
    approvalWaitingLabel: input.approvalWaitingLabel,
    isFinished: assembled.isFinished,
    cleanedLength: cleaned.length,
    hasProgressUpdates: updates.length > 0,
    workState: assembled.workState,
    steps: assembled.baseSteps,
  });

  return {
    steps: honesty.steps,
    replyPreview: null,
    humanSummary: honesty.humanSummary,
    outcome: honesty.outcome,
  };
};
