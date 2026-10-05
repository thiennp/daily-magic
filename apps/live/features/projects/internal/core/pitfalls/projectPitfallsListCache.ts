import type {
  AgentWitchProjectPitfallsStore,
  ListAgentWitchPitfallsResult,
} from "./agentWitchProjectPitfallsStore.type";

const DEFAULT_TTL_MS = 30_000;

type CacheEntry = {
  readonly result: ListAgentWitchPitfallsResult;
  readonly includeRetired: boolean;
  readonly fetchedAtMs: number;
};

const cache = new Map<string, CacheEntry>();

/**
 * Lazy list helper for the AWL project editor: callers should only invoke this
 * when the pitfalls tab is active. Successful lists are cached briefly so a
 * retired-toggle / edit reload in the same window does not re-hit the store
 * every time; upserts must call `invalidateProjectPitfallsListCache`.
 */
export const listProjectPitfallsCached = async (input: {
  readonly store: AgentWitchProjectPitfallsStore;
  readonly projectId: string;
  readonly includeRetired: boolean;
  readonly nowMs?: number;
  readonly ttlMs?: number;
}): Promise<ListAgentWitchPitfallsResult> => {
  const nowMs = input.nowMs ?? Date.now();
  const ttlMs = input.ttlMs ?? DEFAULT_TTL_MS;
  const hit = cache.get(input.projectId);
  if (
    hit !== undefined &&
    hit.includeRetired === input.includeRetired &&
    nowMs - hit.fetchedAtMs < ttlMs
  ) {
    return hit.result;
  }

  const result = await input.store.listPitfalls(input.projectId, {
    includeRetired: input.includeRetired,
  });
  if (result.ok) {
    cache.set(input.projectId, {
      result,
      includeRetired: input.includeRetired,
      fetchedAtMs: nowMs,
    });
  }
  return result;
};

export const invalidateProjectPitfallsListCache = (
  projectId?: string,
): void => {
  if (projectId === undefined) {
    cache.clear();
    return;
  }
  cache.delete(projectId);
};
