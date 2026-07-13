import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

interface FilterScopedAgentRunSessionsInput {
  readonly runs: readonly AgentRunRecord[];
  readonly userId: string;
  readonly limit: number;
  readonly scope: AgentRunScopeValue;
  readonly status?: AgentRunStatusValue;
  readonly groupId?: string;
}

const matchesScope = (
  run: AgentRunRecord,
  userId: string,
  scope: AgentRunScopeValue,
  groupId?: string,
): boolean => {
  const participates =
    run.requesterUserId === userId || run.executorUserId === userId;

  if (!participates) {
    return false;
  }

  if (scope === AgentRunScope.MINE) {
    return run.requesterUserId === userId && run.executorUserId === userId;
  }

  if (scope === AgentRunScope.TEAM) {
    return run.requesterUserId !== run.executorUserId;
  }

  if (scope === AgentRunScope.GROUP && groupId !== undefined) {
    return run.groupId === groupId;
  }

  return true;
};

export const filterScopedAgentRunSessions = (
  input: FilterScopedAgentRunSessionsInput,
): readonly AgentRunRecord[] => {
  const filtered = input.runs.filter((run) => {
    if (input.status !== undefined && run.status !== input.status) {
      return false;
    }

    return matchesScope(run, input.userId, input.scope, input.groupId);
  });

  return filtered
    .toSorted((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, input.limit);
};
