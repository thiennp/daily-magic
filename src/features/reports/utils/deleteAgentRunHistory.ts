import {
  clearAgentRunsLocalCache,
  listAgentRunsLocalCache,
  removeAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { addAgentRunLocalCacheTombstone } from "@/features/reports/agentRunLocalCacheTombstones";

const deleteRemoteAgentRun = async (runId: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `/api/agent-runs/${encodeURIComponent(runId)}`,
      { method: "DELETE" },
    );
    return response.ok || response.status === 404;
  } catch {
    return false;
  }
};

const readRemoteAgentRunIds = async (): Promise<readonly string[]> => {
  try {
    const response = await fetch("/api/agent-runs");
    if (!response.ok) {
      return [];
    }
    const data: unknown = await response.json();
    if (
      typeof data !== "object" ||
      data === null ||
      !("runs" in data) ||
      !Array.isArray((data as { runs: unknown }).runs)
    ) {
      return [];
    }
    return (data as { runs: { id?: unknown }[] }).runs
      .map((run) => run.id)
      .filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
};

/** Removes one job from history (local immediately; server best-effort). */
export const deleteAgentRunHistory = async (
  runId: string,
): Promise<boolean> => {
  removeAgentRunLocalCache(runId);
  return deleteRemoteAgentRun(runId);
};

/**
 * Clears Continue-from-history and Job history for this browser:
 * deletes every local + server run id, then empties the local cache.
 */
export const clearAgentRunHistory = async (): Promise<void> => {
  const localIds = listAgentRunsLocalCache().map((run) => run.id);
  const remoteIds = await readRemoteAgentRunIds();
  const ids = [...new Set([...localIds, ...remoteIds])];

  await Promise.all(ids.map((id) => deleteRemoteAgentRun(id)));

  for (const id of ids) {
    addAgentRunLocalCacheTombstone(id);
  }
  clearAgentRunsLocalCache();
};
