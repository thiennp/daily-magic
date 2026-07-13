import { listAllAgentRunSessions } from "@/lib/dispatch/agentRunSessionRegistry";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export async function listAgentRunsForGroup(
  groupId: string,
  limit = 25,
): Promise<readonly AgentRunRecord[]> {
  return listAllAgentRunSessions()
    .filter((run) => run.groupId === groupId)
    .toSorted((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, limit);
}
