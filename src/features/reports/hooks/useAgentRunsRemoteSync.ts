"use client";

import { useEffect, useState } from "react";

import { upsertAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import { buildAgentRunsQueryString } from "@/features/reports/buildAgentRunsQueryString";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export function useAgentRunsRemoteSync(input: {
  readonly enabled: boolean;
  readonly statusFilter: AgentRunStatusValue | "all";
  readonly scopeFilter: AgentRunScopeValue;
  readonly groupFilter: string;
  readonly onCacheUpdated: () => void;
}): {
  readonly apiRuns: readonly EnrichedAgentRunRecord[];
  readonly isLoading: boolean;
} {
  const { enabled, statusFilter, scopeFilter, groupFilter, onCacheUpdated } =
    input;
  const [apiRuns, setApiRuns] = useState<readonly EnrichedAgentRunRecord[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const loadRuns = async (): Promise<void> => {
      const query = buildAgentRunsQueryString({
        status: statusFilter === "all" ? undefined : statusFilter,
        scope: scopeFilter,
        groupId: scopeFilter === AgentRunScope.GROUP ? groupFilter : undefined,
      });
      const response = await fetch(`/api/agent-runs${query}`);

      if (!response.ok) {
        onCacheUpdated();
        setIsLoading(false);
        return;
      }

      const data: unknown = await response.json();
      const nextApiRuns =
        typeof data === "object" &&
        data !== null &&
        "runs" in data &&
        Array.isArray((data as { runs: unknown }).runs)
          ? (data as { runs: EnrichedAgentRunRecord[] }).runs
          : [];

      for (const run of nextApiRuns) {
        upsertAgentRunLocalCache(run);
      }

      setApiRuns(nextApiRuns);
      onCacheUpdated();
      setIsLoading(false);
    };

    void loadRuns();
    const timer = setInterval(() => {
      void loadRuns();
    }, POLL_INTERVAL_MS * 6);

    return () => {
      clearInterval(timer);
    };
  }, [enabled, groupFilter, onCacheUpdated, scopeFilter, statusFilter]);

  return { apiRuns, isLoading };
}
