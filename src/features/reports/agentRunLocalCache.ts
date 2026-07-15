import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const STORAGE_KEY = "daily-magic.agent-runs.v1";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readCache = (): Record<string, AgentRunRecord> => {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, AgentRunRecord] =>
          isRecord(entry[1]) &&
          typeof entry[1].id === "string" &&
          typeof entry[1].prompt === "string",
      ),
    );
  } catch {
    return {};
  }
};

const writeCache = (cache: Record<string, AgentRunRecord>): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
};

export const upsertAgentRunLocalCache = (run: AgentRunRecord): void => {
  const cache = readCache();
  cache[run.id] = run;
  writeCache(cache);
  notifyAgentRunsLocalCacheUpdated();
};

export const getAgentRunLocalCache = (runId: string): AgentRunRecord | null =>
  readCache()[runId] ?? null;

export const listAgentRunsLocalCache = (): readonly AgentRunRecord[] =>
  Object.values(readCache()).toSorted((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );

export const AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT =
  "daily-magic:agent-runs-cache-updated";

const notifyAgentRunsLocalCacheUpdated = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT));
};
