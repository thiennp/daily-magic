import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import { queryScopedAgentRuns } from "@/lib/dispatch/queryScopedAgentRuns";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

interface ListAgentRunsOptions {
  readonly limit?: number;
  readonly status?: AgentRunStatusValue;
  readonly scope?: AgentRunScopeValue;
  readonly groupId?: string;
}

export async function listAgentRunsForUser(
  userId: string,
  options?: ListAgentRunsOptions,
): Promise<readonly AgentRunRecord[]> {
  return queryScopedAgentRuns({
    userId,
    limit: options?.limit ?? 50,
    scope: options?.scope ?? AgentRunScope.ALL,
    status: options?.status,
    groupId: options?.groupId,
  });
}
