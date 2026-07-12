"use client";

import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import { buildAgentRunsQueryString } from "@/features/reports/buildAgentRunsQueryString";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export function useAgentRunsList(input: {
  readonly statusFilter: AgentRunStatusValue | "all";
  readonly scopeFilter: AgentRunScopeValue;
  readonly groupFilter: string;
}): {
  readonly runs: readonly EnrichedAgentRunRecord[];
  readonly isLoading: boolean;
} {
  const demoPreview = useDemoPreview();
  const [runs, setRuns] = useState<readonly EnrichedAgentRunRecord[]>(
    () => demoPreview?.agentRuns ?? [],
  );
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

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
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "runs" in data &&
        Array.isArray((data as { runs: unknown }).runs)
      ) {
        setRuns((data as { runs: EnrichedAgentRunRecord[] }).runs);
      }
      setIsLoading(false);
    };

    void loadRuns();
    const timer = setInterval(() => {
      void loadRuns();
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [demoPreview, input.statusFilter, input.scopeFilter, input.groupFilter]);

  return { runs, isLoading };
}
