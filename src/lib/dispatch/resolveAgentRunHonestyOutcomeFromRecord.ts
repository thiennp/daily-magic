import { resolveAgentRunHonestyOutcome } from "@/lib/dispatch/resolveAgentRunHonestyOutcome";
import { mapAgentRunStatusToHonestyLiveStatus } from "@/lib/dispatch/mapAgentRunStatusToHonestyLiveStatus";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export const resolveAgentRunHonestyOutcomeFromRecord = (input: {
  readonly status: AgentRunStatusValue;
  readonly resultOutput: string | null;
  readonly resultOutcomeCode?: string | null;
  readonly pendingQuestion?: string | null;
  readonly approvalWaitingLabel?: string | null;
}): AgentRunHonestyOutcome =>
  resolveAgentRunHonestyOutcome({
    status: mapAgentRunStatusToHonestyLiveStatus(input.status),
    output: input.resultOutput ?? "",
    pendingQuestion: input.pendingQuestion,
    approvalWaitingLabel: input.approvalWaitingLabel,
    runStatus: input.status,
    resultOutcomeCode: input.resultOutcomeCode ?? null,
  });
