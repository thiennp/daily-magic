import { resolveAgentRunHonestyOutcomeFromRecord } from "@/lib/dispatch/resolveAgentRunHonestyOutcomeFromRecord";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const resolveAgentRunStatusBadgeLabel = (
  run: Pick<AgentRunRecord, "status" | "resultOutput" | "resultOutcomeCode">,
): string =>
  resolveAgentRunHonestyOutcomeFromRecord({
    status: run.status,
    resultOutput: run.resultOutput,
    resultOutcomeCode: run.resultOutcomeCode,
  }).chipLabel;
