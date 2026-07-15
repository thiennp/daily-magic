import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

const AGENT_RUN_LEASE_MS = 5 * 60 * 1000;

export const claimAgentRunForDevice = async (
  deviceId: string,
): Promise<AgentRunRecord | null> => {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        lease_expires_at = NOW() + (${AGENT_RUN_LEASE_MS}::text || ' milliseconds')::interval,
        claimed_at = COALESCE(claimed_at, NOW()),
        started_at = COALESCE(started_at, NOW()),
        updated_at = NOW()
      WHERE id = (
        SELECT id
        FROM agent_runs
        WHERE device_id = ${deviceId}
          AND status = ${AgentRunStatus.RUNNING}
          AND (lease_expires_at IS NULL OR lease_expires_at < NOW())
        ORDER BY created_at ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      )
      RETURNING *
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentRunRow(result[0]);
};
