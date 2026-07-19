import {
  clearAgentRunsLocalCache,
  listAgentRunsLocalCache,
  removeAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";

const deleteRemoteAgentRun = async (runId: string): Promise<boolean> => {
  const response = await fetch(`/api/agent-runs/${encodeURIComponent(runId)}`, {
    method: "DELETE",
  });
  return response.ok || response.status === 404;
};

/** Removes one job from history (server when present, always local cache). */
export const deleteAgentRunHistory = async (
  runId: string,
): Promise<boolean> => {
  const deletedRemote = await deleteRemoteAgentRun(runId);
  if (!deletedRemote) {
    return false;
  }

  removeAgentRunLocalCache(runId);
  return true;
};

/** Clears local job history and deletes each cached run on the server. */
export const clearAgentRunHistory = async (): Promise<void> => {
  const runs = listAgentRunsLocalCache();
  await Promise.all(runs.map((run) => deleteRemoteAgentRun(run.id)));
  clearAgentRunsLocalCache();
};
