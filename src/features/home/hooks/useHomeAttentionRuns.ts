"use client";

import { useSyncExternalStore } from "react";

import { selectHomeAttentionRuns } from "@/features/home/utils/public-api/presentation";
import {
  AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
  listAgentRunsLocalCache,
} from "@/features/reports/public-api/presentation";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const EMPTY: readonly AgentRunRecord[] = [];
const cache: { rows: readonly AgentRunRecord[]; key: string } = {
  rows: EMPTY,
  key: "",
};

const subscribe = (onChange: () => void): (() => void) => {
  window.addEventListener(AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

const getSnapshot = (): readonly AgentRunRecord[] => {
  const rows = selectHomeAttentionRuns(listAgentRunsLocalCache(), Date.now());
  const key = rows
    .map((run) => `${run.id}:${run.status}:${run.updatedAt}`)
    .join("|");
  if (key !== cache.key) {
    cache.rows = rows;
    cache.key = key;
  }
  return cache.rows;
};

/** Runs needing the owner (approval / recent failure) from the run cache. */
export default function useHomeAttentionRuns(): readonly AgentRunRecord[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}
