import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import {
  getAgentRunSession,
  registerAgentRunSession,
  updateAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";

export const setAgentRunEstimateComparison = async (
  runtime: AgentWitchHubRuntime,
  runId: string,
  comparison: {
    readonly estimateSeconds?: number | null;
    readonly actualSeconds?: number | null;
  },
): Promise<AgentRunRecord | null> => {
  const estimateSeconds =
    typeof comparison.estimateSeconds === "number"
      ? comparison.estimateSeconds
      : null;
  const actualSeconds =
    typeof comparison.actualSeconds === "number"
      ? comparison.actualSeconds
      : null;
  if (estimateSeconds === null && actualSeconds === null) {
    return getAgentRunById(runId);
  }

  if (isAgentWitchDevDashboardEnabled()) {
    const updated = updateAgentRunSession(runId, {
      ...(estimateSeconds !== null ? { estimateSeconds } : {}),
      ...(actualSeconds !== null ? { actualSeconds } : {}),
    });
    if (updated !== undefined) {
      broadcastAgentRunRecord(runtime, updated);
    }
    return updated ?? null;
  }

  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        estimate_seconds = COALESCE(${estimateSeconds}, estimate_seconds),
        actual_seconds = COALESCE(${actualSeconds}, actual_seconds),
        updated_at = NOW()
      WHERE id = ${runId}
      RETURNING *
    `,
  );
  const row = result[0];
  if (!row) {
    const existing = getAgentRunSession(runId);
    return existing ?? null;
  }

  const run = mapAgentRunRow(row);
  registerAgentRunSession(run);
  broadcastAgentRunRecord(runtime, run);
  return run;
};
