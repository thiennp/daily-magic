import { AGENT_RUN_STALE_HEARTBEAT_MS } from "@/lib/dispatch/agentRunHeartbeat.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";

const STALE_RUN_DENIAL_REASON =
  "No run heartbeat from your Mac — the job was marked stale.";

export const reconcileStaleAgentRuns = async (
  runtime: AgentWitchHubRuntime,
): Promise<readonly AgentRunRecord[]> => {
  if (isAgentWitchDevDashboardEnabled()) {
    return [];
  }

  const sql = getSql();
  const staleThresholdMs = Date.now() - AGENT_RUN_STALE_HEARTBEAT_MS;
  const staleThreshold = new Date(staleThresholdMs).toISOString();
  const awaitingInputRunIds = dispatchAgentRunInputRegistry.listAgentRunIds();

  const rows = asRowArray(
    awaitingInputRunIds.length === 0
      ? await sql`
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
        `
      : await sql`
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

  const reconciled = rows.map((row) => mapAgentRunRow(row));
  for (const run of reconciled) {
    broadcastAgentRunRecord(runtime, run);
  }

  return reconciled;
};
