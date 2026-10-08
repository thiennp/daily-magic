import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";

export const LOST_HOST_BEFORE_RESULT_DENIAL_REASON =
  AGENT_RUN_LOST_CONNECTION_REASONS.DISCONNECT;

/** Do not fail runs that were actively heartbeating right before disconnect. */
export const AGENT_RUN_DISCONNECT_RECONCILE_GRACE_MS = 45_000;

/**
 * When an agent Mac disconnects, fail RUNNING jobs on that device that are not
 * waiting for operator input so the dashboard never stays In progress forever.
 */
export const reconcileRunningAgentRunsOnDeviceDisconnect = async (
  runtime: AgentWitchHubRuntime,
  input: {
    readonly userId: string;
    readonly deviceId: string;
  },
): Promise<readonly AgentRunRecord[]> => {
  const sql = getSql();
  const awaitingInputRunIds = dispatchAgentRunInputRegistry.listAgentRunIds();
  const heartbeatCutoff = new Date(
    Date.now() - AGENT_RUN_DISCONNECT_RECONCILE_GRACE_MS,
  ).toISOString();
  const startedCutoff = heartbeatCutoff;
  const rows =
    awaitingInputRunIds.length === 0
      ? asRowArray(
          await sql`
            UPDATE agent_runs
            SET
              status = ${AgentRunStatus.FAILED},
              denial_reason = ${LOST_HOST_BEFORE_RESULT_DENIAL_REASON},
              completed_at = NOW(),
              updated_at = NOW()
            WHERE status = ${AgentRunStatus.RUNNING}
              AND executor_user_id = ${input.userId}
              AND device_id = ${input.deviceId}
              AND (
                (last_run_heartbeat_at IS NOT NULL AND last_run_heartbeat_at < ${heartbeatCutoff}::timestamptz)
                OR (
                  last_run_heartbeat_at IS NULL
                  AND COALESCE(started_at, created_at) < ${startedCutoff}::timestamptz
                )
              )
            RETURNING *
          `,
        )
      : asRowArray(
          await sql`
            UPDATE agent_runs
            SET
              status = ${AgentRunStatus.FAILED},
              denial_reason = ${LOST_HOST_BEFORE_RESULT_DENIAL_REASON},
              completed_at = NOW(),
              updated_at = NOW()
            WHERE status = ${AgentRunStatus.RUNNING}
              AND executor_user_id = ${input.userId}
              AND device_id = ${input.deviceId}
              AND NOT (id = ANY(${awaitingInputRunIds}::text[]))
              AND (
                (last_run_heartbeat_at IS NOT NULL AND last_run_heartbeat_at < ${heartbeatCutoff}::timestamptz)
                OR (
                  last_run_heartbeat_at IS NULL
                  AND COALESCE(started_at, created_at) < ${startedCutoff}::timestamptz
                )
              )
            RETURNING *
          `,
        );

  const reconciled = rows.map((row) => mapAgentRunRow(row));
  for (const run of reconciled) {
    broadcastAgentRunRecord(runtime, run);
  }
  return reconciled;
};
