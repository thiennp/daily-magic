"use client";

import { useSyncExternalStore } from "react";

import { listRunningAgentRunsLocalCache } from "@/features/agent/utils/listRunningAgentRunsLocalCache";
import { AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT } from "@/features/reports/agentRunLocalCache";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const runningJobsCache: {
  jobs: readonly AgentRunRecord[];
  key: string;
} = {
  jobs: [],
  key: "",
};

const runningJobsCacheKey = (jobs: readonly AgentRunRecord[]): string =>
  jobs
    .map(
      (run) =>
        `${run.id}:${run.status}:${run.updatedAt}:${run.lastRunHeartbeatAt ?? ""}`,
    )
    .join("|");

const subscribe = (onStoreChange: () => void): (() => void) => {
  window.addEventListener(AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(
      AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
      onStoreChange,
    );
    window.removeEventListener("storage", onStoreChange);
  };
};

const getSnapshot = (): readonly AgentRunRecord[] => {
  const next = listRunningAgentRunsLocalCache();
  const nextKey = runningJobsCacheKey(next);
  if (nextKey === runningJobsCache.key) {
    return runningJobsCache.jobs;
  }

  runningJobsCache.jobs = next;
  runningJobsCache.key = nextKey;
  return runningJobsCache.jobs;
};

const getServerSnapshot = (): readonly AgentRunRecord[] => [];

export const useHomeRunningAgentJobs = (): readonly AgentRunRecord[] =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
