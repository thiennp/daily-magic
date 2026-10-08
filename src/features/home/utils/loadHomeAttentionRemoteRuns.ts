import { upsertAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** a13083ee: failed, Stalled and awaiting runs of the last 7 days (max 50). */
export const HOME_ATTENTION_REMOTE_URL = "/api/agent-runs/attention";

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
 * elsewhere show up too. a13083ee: one server query across all projects,
 * not a status filter over the newest 50 runs. Returns how many were merged.
 */
export const loadHomeAttentionRemoteRuns = async (
  fetchImpl: typeof fetch = fetch,
): Promise<number> => {
  const runs = await fetchImpl(HOME_ATTENTION_REMOTE_URL)
    .then(async (response) =>
      response.ok ? readRuns(await response.json()) : [],
    )
    .catch(() => []);
  for (const run of runs) {
    upsertAgentRunLocalCache(run);
  }
  return runs.length;
};
