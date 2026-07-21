import {
  AGENT_RUN_NEVER_HEARTBEAT_STALE_MS,
  AGENT_RUN_STALE_HEARTBEAT_MS,
} from "@/lib/dispatch/agentRunHeartbeat.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { asRowArray, getSql } from "@/lib/db";

export const STALE_RUN_DENIAL_REASON =
  "No run heartbeat from your Mac — the job was marked stale.";

export const updateStaleHeartbeatAgentRuns = async (
  awaitingInputRunIds: readonly string[],
): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  const staleThreshold = new Date(
    Date.now() - AGENT_RUN_STALE_HEARTBEAT_MS,
  ).toISOString();

  if (awaitingInputRunIds.length === 0) {
    return asRowArray(
      await sql`
        UPDATE agent_runs
        SET
          status = ${AgentRunStatus.FAILED},
          denial_reason = ${STALE_RUN_DENIAL_REASON},
          completed_at = NOW(),
          updated_at = NOW()
        WHERE status = ${AgentRunStatus.RUNNING}
          AND last_run_heartbeat_at IS NOT NULL
          AND last_run_heartbeat_at < ${staleThreshold}::timestamptz
        RETURNING *
      `,
    );
  }

  return asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${AgentRunStatus.FAILED},
        denial_reason = ${STALE_RUN_DENIAL_REASON},
        completed_at = NOW(),
        updated_at = NOW()
      WHERE status = ${AgentRunStatus.RUNNING}
        AND last_run_heartbeat_at IS NOT NULL
        AND last_run_heartbeat_at < ${staleThreshold}::timestamptz
        AND NOT (id = ANY(${awaitingInputRunIds}::text[]))
      RETURNING *
    `,
  );
};

export const updateNeverHeartbeatOrphanAgentRuns = async (
  awaitingInputRunIds: readonly string[],
): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  const orphanThreshold = new Date(
    Date.now() - AGENT_RUN_NEVER_HEARTBEAT_STALE_MS,
  ).toISOString();

  if (awaitingInputRunIds.length === 0) {
    return asRowArray(
      await sql`
        UPDATE agent_runs
        SET
          status = ${AgentRunStatus.FAILED},
          denial_reason = ${STALE_RUN_DENIAL_REASON},
          completed_at = NOW(),
          updated_at = NOW()
        WHERE status = ${AgentRunStatus.RUNNING}
          AND last_run_heartbeat_at IS NULL
          AND COALESCE(started_at, created_at) < ${orphanThreshold}::timestamptz
        RETURNING *
      `,
    );
  }

  return asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${AgentRunStatus.FAILED},
        denial_reason = ${STALE_RUN_DENIAL_REASON},
        completed_at = NOW(),
        updated_at = NOW()
      WHERE status = ${AgentRunStatus.RUNNING}
        AND last_run_heartbeat_at IS NULL
        AND COALESCE(started_at, created_at) < ${orphanThreshold}::timestamptz
        AND NOT (id = ANY(${awaitingInputRunIds}::text[]))
      RETURNING *
    `,
  );
};
