import { upsertAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { buildAgentRunsQueryString } from "@/features/reports/buildAgentRunsQueryString";
import { AgentRunScope } from "@/lib/dispatch/AgentRunScope.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** Failed (incl. swept Stalled) and awaiting-approval runs feed the panel. */
export const HOME_ATTENTION_REMOTE_STATUSES = [
  AgentRunStatus.FAILED,
  AgentRunStatus.PENDING_APPROVAL,
] as const;

const readRuns = (data: unknown): readonly AgentRunRecord[] =>
  typeof data === "object" &&
  data !== null &&
  "runs" in data &&
  Array.isArray(data.runs)
    ? (data.runs as AgentRunRecord[])
    : [];

/**
 * e48cd107: "Needs your attention" reads the browser run cache, which only
 * knows runs this browser saw. Pull the owner's recent failed, stalled and
 * awaiting runs from the server into that cache so runs started (or swept)
 * elsewhere show up too. Returns how many runs were merged.
 */
export const loadHomeAttentionRemoteRuns = async (
  fetchImpl: typeof fetch = fetch,
): Promise<number> => {
  const results = await Promise.all(
    HOME_ATTENTION_REMOTE_STATUSES.map(async (status) => {
      try {
        const query = buildAgentRunsQueryString({
          status,
          scope: AgentRunScope.MINE,
        });
        const response = await fetchImpl(`/api/agent-runs${query}`);
        return response.ok ? readRuns(await response.json()) : [];
      } catch {
        return [];
      }
    }),
  );
  const runs = results.flat();
  for (const run of runs) {
    upsertAgentRunLocalCache(run);
  }
  return runs.length;
};
