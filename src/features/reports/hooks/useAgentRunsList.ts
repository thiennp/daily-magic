"use client";

import { useEffect, useState } from "react";

import { listAgentRunsLocalCache } from "@/features/reports/agentRunLocalCache";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import { buildAgentRunsQueryString } from "@/features/reports/buildAgentRunsQueryString";
import { useAgentRunRecordSync } from "@/features/reports/hooks/useAgentRunRecordSync";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

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

export function useAgentRunsList(input: {
  readonly statusFilter: AgentRunStatusValue | "all";
  readonly scopeFilter: AgentRunScopeValue;
  readonly groupFilter: string;
}): {
  readonly runs: readonly EnrichedAgentRunRecord[];
  readonly isLoading: boolean;
} {
  const [runs, setRuns] = useState<readonly EnrichedAgentRunRecord[]>(() =>
    listAgentRunsLocalCache().map(toEnrichedRun),
  );
  const [isLoading, setIsLoading] = useState(true);

  useAgentRunRecordSync((run) => {
    setRuns((current) => mergeRuns(current, [run]));
  });

  useEffect(() => {
    const loadRuns = async (): Promise<void> => {
      const query = buildAgentRunsQueryString({
        status: input.statusFilter === "all" ? undefined : input.statusFilter,
        scope: input.scopeFilter,
        groupId:
          input.scopeFilter === AgentRunScope.GROUP
            ? input.groupFilter
            : undefined,
      });
      const response = await fetch(`/api/agent-runs${query}`);
      const cached = listAgentRunsLocalCache();

      if (!response.ok) {
        setRuns(cached.map(toEnrichedRun));
        setIsLoading(false);
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "runs" in data &&
        Array.isArray((data as { runs: unknown }).runs)
      ) {
        const apiRuns = (data as { runs: EnrichedAgentRunRecord[] }).runs;
        setRuns(mergeRuns(apiRuns, cached));
      }
      setIsLoading(false);
    };

    void loadRuns();
    const timer = setInterval(() => {
      void loadRuns();
    }, POLL_INTERVAL_MS * 6);

    return () => {
      clearInterval(timer);
    };
  }, [input.statusFilter, input.scopeFilter, input.groupFilter]);

  return { runs, isLoading };
}
