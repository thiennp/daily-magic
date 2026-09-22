import { resolveAgentRunHonestyOutcome } from "@/features/agent/utils/resolveAgentRunHonestyOutcome";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const resolveAgentLiveRunOutcome = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly output: string;
  readonly pendingQuestion?: string | null;
  readonly approvalWaitingLabel?: string | null;
}): AgentLiveRunOutcome =>
  resolveAgentRunHonestyOutcome({
    status: input.status,
    output: input.output,
    pendingQuestion: input.pendingQuestion,
    approvalWaitingLabel: input.approvalWaitingLabel,
  });
