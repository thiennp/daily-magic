import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { AGENT_RUN_LOST_CONNECTION_REASONS } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

/** A live local run heartbeats every 15s; 3 minutes of silence means it is gone. */
export const AGENT_RUN_INTERRUPTED_GRACE_MS = 180_000;

const RECONCILE_MIN_INTERVAL_MS = 60_000;

const lastReconcileMsByDevice = new Map<string, number>();

/** Returns true at most once per interval per device (throttles heartbeat-driven work). */
export const shouldReconcileInterruptedRunsNow = (
  deviceId: string,
  nowMs: number,
): boolean => {
  const last = lastReconcileMsByDevice.get(deviceId) ?? 0;
  if (nowMs - last < RECONCILE_MIN_INTERVAL_MS) {
    return false;
  }
  lastReconcileMsByDevice.set(deviceId, nowMs);
  return true;
};

/**
 * The device is heartbeating (so it is online) yet a RUNNING run of it has no
 * run heartbeat: the local runtime restarted and lost the child process.
 * Close those runs so they never stay "running" forever.
 */
export const reconcileInterruptedAgentRunsForDevice = async (
  runtime: AgentWitchHubRuntime,
  input: { readonly userId: string; readonly deviceId: string },
): Promise<readonly AgentRunRecord[]> => {
  const sql = getSql();
  const awaitingInputRunIds = dispatchAgentRunInputRegistry.listAgentRunIds();
  const cutoff = new Date(
    Date.now() - AGENT_RUN_INTERRUPTED_GRACE_MS,
  ).toISOString();
  const rows = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${AgentRunStatus.FAILED},
        denial_reason = ${AGENT_RUN_LOST_CONNECTION_REASONS.INTERRUPTED},
        completed_at = NOW(),
        updated_at = NOW()
      WHERE status = ${AgentRunStatus.RUNNING}
        AND executor_user_id = ${input.userId}
        AND device_id = ${input.deviceId}
        AND NOT (id = ANY(${awaitingInputRunIds}::text[]))
        AND COALESCE(last_run_heartbeat_at, started_at, created_at) < ${cutoff}::timestamptz
      RETURNING *
    `,
  );
  const reconciled = rows.map((row) => mapAgentRunRow(row));
  for (const run of reconciled) {
    broadcastAgentRunRecord(runtime, run);
  }
  return reconciled;
};
