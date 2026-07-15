import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunScopeValue } from "@/lib/dispatch/AgentRunScope.constant";
import { filterScopedAgentRunSessions } from "@/lib/dispatch/filterScopedAgentRunSessions";
import { listAgentRunRowsForUser } from "@/lib/dispatch/agentRunQueries";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

interface QueryScopedAgentRunsInput {
  readonly userId: string;
  readonly limit: number;
  readonly scope: AgentRunScopeValue;
  readonly status?: AgentRunStatusValue;
  readonly groupId?: string;
}

export async function queryScopedAgentRuns(
  input: QueryScopedAgentRunsInput,
): Promise<readonly AgentRunRecord[]> {
  const runs = await listAgentRunRowsForUser(input.userId, input.limit);
  return filterScopedAgentRunSessions({ ...input, runs });
}
