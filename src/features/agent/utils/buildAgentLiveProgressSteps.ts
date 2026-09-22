import type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
import { buildAgentLiveProgressStepsCore } from "@/features/agent/utils/buildAgentLiveProgressStepsCore";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export type { AgentLiveProgressStallState };
export type { AgentLiveProgressStepState };
export type { AgentLiveProgressStep } from "@/features/agent/utils/agentLiveProgressStep.type";
export type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";

export const buildAgentLiveProgressSteps = (input: {
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
} => buildAgentLiveProgressStepsCore(input);
