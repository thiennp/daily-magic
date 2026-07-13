import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunScopeValue } from "@/lib/dispatch/AgentRunScope.constant";
import { listAgentRunSessionsForUser } from "@/lib/dispatch/agentRunSessionRegistry";
import { filterScopedAgentRunSessions } from "@/lib/dispatch/filterScopedAgentRunSessions";
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
  const runs = listAgentRunSessionsForUser(input.userId);
  return filterScopedAgentRunSessions({ ...input, runs });
}
