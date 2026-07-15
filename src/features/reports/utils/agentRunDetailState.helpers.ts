import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const toEnrichedAgentRun = (
  run: AgentRunRecord,
): EnrichedAgentRunRecord => ({
  ...run,
  requesterEmail: run.requesterUserId,
  executorEmail: run.executorUserId,
  requesterName: null,
  executorName: null,
});
