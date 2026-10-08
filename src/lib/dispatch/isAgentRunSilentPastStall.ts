import { AGENT_RUN_SILENT_STALL_MS } from "@/lib/dispatch/agentRunHeartbeat.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** Last sign of life: run heartbeat, else start, else creation (ms, or null). */
export const resolveAgentRunLastAliveMs = (
  run: Pick<AgentRunRecord, "lastRunHeartbeatAt" | "startedAt" | "createdAt">,
): number | null => {
  const ms = Date.parse(
    run.lastRunHeartbeatAt ?? run.startedAt ?? run.createdAt,
  );
  return Number.isFinite(ms) ? ms : null;
};

/**
 * 6253aa7e: a RUNNING run with no sign of life past the stall window is not
 * "In progress" anymore, whatever an old browser cache still says.
 */
export const isAgentRunSilentPastStall = (
  run: Pick<
    AgentRunRecord,
    "status" | "lastRunHeartbeatAt" | "startedAt" | "createdAt"
  >,
  nowMs: number,
): boolean => {
  if (run.status !== AgentRunStatus.RUNNING) {
    return false;
  }
  const lastAliveMs = resolveAgentRunLastAliveMs(run);
  return (
    lastAliveMs !== null && nowMs - lastAliveMs > AGENT_RUN_SILENT_STALL_MS
  );
};
