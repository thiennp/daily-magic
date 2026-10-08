"use client";

import { useEffect, useRef } from "react";

import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";
import { upsertAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * 6253aa7e: Home lists runs from this browser's cache, which kept "running"
 * rows the server had already closed. Re-read each stalled run once so the
 * cache picks up the server's Failed state.
 */
export const useRefreshStalledAgentRuns = (
  stalledRuns: readonly AgentRunRecord[],
): void => {
  const refreshed = useRef(new Set<string>());
  const key = stalledRuns.map((run) => run.id).join("|");

  useEffect(() => {
    for (const run of stalledRuns) {
      if (refreshed.current.has(run.id)) {
        continue;
      }
      refreshed.current.add(run.id);
      void fetchAgentRunDetail(run.id)
        .then((outcome) => {
          if (outcome.status === "ok" && outcome.run.status !== run.status) {
            upsertAgentRunLocalCache(outcome.run);
          }
        })
        .catch(() => undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by run ids
  }, [key]);
};
