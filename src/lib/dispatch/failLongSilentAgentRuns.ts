import { AGENT_RUN_SILENT_STALL_MS } from "@/lib/dispatch/agentRunHeartbeat.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import { asRowArray, getSql } from "@/lib/db";

/**
 * 6253aa7e: runs that were "Waiting on you" (in the input registry) or never
 * heartbeated stayed RUNNING for 10–12 h. Fail every RUNNING run that has
 * been silent past AGENT_RUN_SILENT_STALL_MS, awaiting input or not.
 */
export const failLongSilentAgentRuns = async (): Promise<
  readonly Record<string, unknown>[]
> => {
  const sql = getSql();
  const cutoff = new Date(Date.now() - AGENT_RUN_SILENT_STALL_MS).toISOString();
  return asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${AgentRunStatus.FAILED},
        denial_reason = ${AGENT_RUN_LOST_CONNECTION_REASONS.STALE},
        completed_at = NOW(),
        updated_at = NOW()
      WHERE status = ${AgentRunStatus.RUNNING}
        AND COALESCE(last_run_heartbeat_at, started_at, created_at) < ${cutoff}::timestamptz
      RETURNING *
    `,
  );
};
