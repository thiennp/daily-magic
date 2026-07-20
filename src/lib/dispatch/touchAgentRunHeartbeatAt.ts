import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { updateAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";

export const touchAgentRunHeartbeatAt = async (
  runtime: AgentWitchHubRuntime,
  runId: string,
): Promise<AgentRunRecord | null> => {
  const now = new Date().toISOString();

  if (isAgentWitchDevDashboardEnabled()) {
    const updated =
      updateAgentRunSession(runId, {
        lastRunHeartbeatAt: now,
        updatedAt: now,
      }) ?? null;
    if (updated !== null) {
      broadcastAgentRunRecord(runtime, updated);
    }
    return updated;
  }

  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        last_run_heartbeat_at = NOW(),
        updated_at = NOW()
      WHERE id = ${runId}
        AND status = ${AgentRunStatus.RUNNING}
      RETURNING *
    `,
  );

  if (!result[0]) {
    return null;
  }

  const run = mapAgentRunRow(result[0]);
  return run;
};
