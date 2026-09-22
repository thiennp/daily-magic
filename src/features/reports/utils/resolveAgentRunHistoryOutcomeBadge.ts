import { resolveAgentRunHonestyOutcomeFromRecord } from "@/lib/dispatch/resolveAgentRunHonestyOutcomeFromRecord";
import { resolveAgentLiveRunOutcomeChipClassName } from "@/features/agent/utils/agentLiveRunOutcomeChip.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { resolveAgentRunStatusBadgeLabel } from "@/lib/dispatch/resolveAgentRunStatusBadgeLabel";

export const resolveAgentRunHistoryOutcomeBadge = (
  run: Pick<AgentRunRecord, "status" | "resultOutput" | "resultOutcomeCode">,
): {
  readonly label: string;
  readonly className: string;
} => {
  const outcome = resolveAgentRunHonestyOutcomeFromRecord({
    status: run.status,
    resultOutput: run.resultOutput,
    resultOutcomeCode: run.resultOutcomeCode,
  });
  return {
    label: resolveAgentRunStatusBadgeLabel(run),
    className: resolveAgentLiveRunOutcomeChipClassName(outcome.kind),
  };
};
