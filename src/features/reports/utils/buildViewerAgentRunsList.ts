import { filterAgentRunsNotDeletedLocally } from "@/features/reports/agentRunLocalCacheTombstones";
import type { AgentRunScopeValue } from "@/lib/dispatch/AgentRunScope.constant";
import { AgentRunScope } from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { filterScopedAgentRunSessions } from "@/lib/dispatch/filterScopedAgentRunSessions";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const toEnrichedRun = (run: AgentRunRecord): EnrichedAgentRunRecord => ({
  ...run,
  requesterEmail: run.requesterUserId,
  executorEmail: run.executorUserId,
  requesterName: null,
  executorName: null,
});

const mergeRuns = (
  apiRuns: readonly EnrichedAgentRunRecord[],
  cachedRuns: readonly AgentRunRecord[],
): readonly EnrichedAgentRunRecord[] => {
  const merged = new Map<string, EnrichedAgentRunRecord>();

  for (const run of cachedRuns.map(toEnrichedRun)) {
    merged.set(run.id, run);
  }
  for (const run of apiRuns) {
    merged.set(run.id, run);
  }

  return [...merged.values()].toSorted((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
};

export const buildViewerAgentRunsList = (input: {
  readonly userId: string | undefined;
  readonly apiRuns: readonly EnrichedAgentRunRecord[];
  readonly cachedRuns: readonly AgentRunRecord[];
  readonly statusFilter: AgentRunStatusValue | "all";
  readonly scopeFilter: AgentRunScopeValue;
  readonly groupFilter: string;
  readonly limit?: number;
}): readonly EnrichedAgentRunRecord[] => {
  const merged = filterAgentRunsNotDeletedLocally(
    mergeRuns(input.apiRuns, input.cachedRuns),
  );
  const status = input.statusFilter === "all" ? undefined : input.statusFilter;
  const groupId =
    input.scopeFilter === AgentRunScope.GROUP &&
    input.groupFilter.trim().length > 0
      ? input.groupFilter
      : undefined;

  if (input.userId === undefined) {
    const filtered = status
      ? merged.filter((run) => run.status === status)
      : merged;

    return filtered.slice(0, input.limit ?? 50);
  }

  const filtered = filterScopedAgentRunSessions({
    runs: merged,
    userId: input.userId,
    limit: input.limit ?? 50,
    scope: input.scopeFilter,
    status,
    groupId,
  });

  const enrichedById = new Map(merged.map((run) => [run.id, run]));

  return filtered.map((run) => enrichedById.get(run.id) ?? toEnrichedRun(run));
};
