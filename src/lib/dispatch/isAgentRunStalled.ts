import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import { isAgentRunSilentPastStall } from "@/lib/dispatch/isAgentRunSilentPastStall";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * 41888ea3 (6253aa7e follow-up): a run the stale sweep closed (no heartbeat
 * for hours) is Stalled, not Failed, everywhere: Home, Tasks, detail.
 */
export const isAgentRunSweptStale = (
  run: Pick<AgentRunRecord, "status" | "denialReason">,
): boolean =>
  run.status === AgentRunStatus.FAILED &&
  run.denialReason?.trim() === AGENT_RUN_LOST_CONNECTION_REASONS.STALE;

/** Still RUNNING but silent past the stall window, or already swept. */
export const isAgentRunStalled = (
  run: Pick<
    AgentRunRecord,
    "status" | "denialReason" | "lastRunHeartbeatAt" | "startedAt" | "createdAt"
  >,
  nowMs: number,
): boolean =>
  isAgentRunSweptStale(run) || isAgentRunSilentPastStall(run, nowMs);
