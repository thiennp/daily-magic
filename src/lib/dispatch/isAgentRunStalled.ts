import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import { isAgentRunSilentPastStall } from "@/lib/dispatch/isAgentRunSilentPastStall";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * 41888ea3 (6253aa7e follow-up): a run the stale sweep closed (no heartbeat
 * for hours) is Stalled, not Failed, everywhere: Home, Tasks, detail.
 * f5881faa: older runs closed as "lost connection" that never reported any
 * output (e.g. 44bdab8e, "No details were reported") are the same case.
 */
export const isAgentRunSweptStale = (
  run: Pick<AgentRunRecord, "status" | "denialReason"> & {
    readonly resultOutput?: string | null;
  },
): boolean => {
  if (run.status !== AgentRunStatus.FAILED) {
    return false;
  }
  const reason = run.denialReason?.trim();
  if (reason === AGENT_RUN_LOST_CONNECTION_REASONS.STALE) {
    return true;
  }
  return (
    reason === AGENT_RUN_LOST_CONNECTION_REASONS.DISCONNECT &&
    (run.resultOutput ?? "").trim().length === 0
  );
};

/** Still RUNNING but silent past the stall window, or already swept. */
export const isAgentRunStalled = (
  run: Pick<
    AgentRunRecord,
    "status" | "denialReason" | "lastRunHeartbeatAt" | "startedAt" | "createdAt"
  > & { readonly resultOutput?: string | null },
  nowMs: number,
): boolean =>
  isAgentRunSweptStale(run) || isAgentRunSilentPastStall(run, nowMs);
