"use client";

import { useEffect, useState } from "react";

import {
  AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
  listAgentRunsLocalCache,
} from "@/features/reports/agentRunLocalCache";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const DEFAULT_HISTORY_LIMIT = 5;

const readRecentRuns = (limit: number): readonly AgentRunRecord[] =>
  listAgentRunsLocalCache().slice(0, limit);

/** Recent job-history runs for the Send-a-task picker (local cache). */
export const useSendTaskComposerHistoryRuns = (
  limit: number = DEFAULT_HISTORY_LIMIT,
): readonly AgentRunRecord[] => {
  const [runs, setRuns] = useState<readonly AgentRunRecord[]>(() =>
    readRecentRuns(limit),
  );

  useEffect(() => {
    const refresh = (): void => {
      setRuns(readRecentRuns(limit));
    };

    refresh();
    window.addEventListener(AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT, refresh);
    return () => {
      window.removeEventListener(AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT, refresh);
    };
  }, [limit]);

  return runs;
};
