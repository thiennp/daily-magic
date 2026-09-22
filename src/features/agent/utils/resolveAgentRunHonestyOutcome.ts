import {
  resolveAgentRunHonestyOutcome as resolveAgentRunHonestyOutcomeCore,
  resolveAgentRunHonestyOutcomeFromRecord as resolveAgentRunHonestyOutcomeFromRecordCore,
} from "@/lib/dispatch/resolveAgentRunHonestyOutcome";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export const resolveAgentRunHonestyOutcome = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly output: string;
  readonly pendingQuestion?: string | null;
  readonly approvalWaitingLabel?: string | null;
  readonly runStatus?: AgentRunStatusValue | null;
  readonly resultOutcomeCode?: string | null;
}): AgentLiveRunOutcome =>
  resolveAgentRunHonestyOutcomeCore({
    status: input.status,
    output: input.output,
    pendingQuestion: input.pendingQuestion,
    approvalWaitingLabel: input.approvalWaitingLabel,
    runStatus: input.runStatus,
    resultOutcomeCode: input.resultOutcomeCode,
  });

export const resolveAgentRunHonestyOutcomeFromRecord = (input: {
  readonly status: AgentRunStatusValue;
  readonly resultOutput: string | null;
  readonly resultOutcomeCode?: string | null;
  readonly pendingQuestion?: string | null;
  readonly approvalWaitingLabel?: string | null;
}): AgentLiveRunOutcome => resolveAgentRunHonestyOutcomeFromRecordCore(input);
