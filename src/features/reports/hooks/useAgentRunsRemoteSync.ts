"use client";

import { useEffect, useRef, useState } from "react";

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
  readonly loadFailed: boolean;
  readonly refresh: () => void;
} {
  const { enabled, statusFilter, scopeFilter, groupFilter, onCacheUpdated } =
    input;
  const [apiRuns, setApiRuns] = useState<readonly EnrichedAgentRunRecord[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [loadFailed, setLoadFailed] = useState(false);
  const refreshRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const loadRuns = async (options: {
      readonly showLoading: boolean;
    }): Promise<void> => {
      if (options.showLoading) {
        setIsLoading(true);
      }
      setLoadFailed(false);

      try {
        const query = buildAgentRunsQueryString({
          status: statusFilter === "all" ? undefined : statusFilter,
          scope: scopeFilter,
          groupId:
            scopeFilter === AgentRunScope.GROUP ? groupFilter : undefined,
        });
        const response = await fetch(`/api/agent-runs${query}`);

        if (!response.ok) {
          setLoadFailed(true);
          onCacheUpdated();
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
      } catch {
        setLoadFailed(true);
        onCacheUpdated();
      } finally {
        setIsLoading(false);
      }
    };

    refreshRef.current = () => {
      void loadRuns({ showLoading: true });
    };

    void loadRuns({ showLoading: true });
    const timer = setInterval(() => {
      void loadRuns({ showLoading: false });
    }, POLL_INTERVAL_MS * 12);

    return () => {
      clearInterval(timer);
    };
  }, [enabled, groupFilter, onCacheUpdated, scopeFilter, statusFilter]);

  return {
    apiRuns,
    isLoading,
    loadFailed: enabled && loadFailed,
    refresh: () => {
      refreshRef.current();
    },
  };
}
