import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const ACTIVE_STATUSES = new Set<string>([
  AgentRunStatus.RUNNING,
  AgentRunStatus.PENDING_APPROVAL,
]);

export const listActiveAgentRunIds = (
  runs: readonly Pick<EnrichedAgentRunRecord, "id" | "status">[],
): readonly string[] =>
  runs
    .filter((run) => ACTIVE_STATUSES.has(run.status))
    .map((run) => run.id)
    .toSorted();

/** Stable dependency key for SSE subscriptions (avoids reconnect on cache bumps). */
export const resolveActiveAgentRunIdsKey = (
  runs: readonly Pick<EnrichedAgentRunRecord, "id" | "status">[],
): string => listActiveAgentRunIds(runs).join(",");
