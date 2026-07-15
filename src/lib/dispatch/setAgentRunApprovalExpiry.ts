import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function setAgentRunApprovalExpiry(
  runId: string,
  approvalExpiresAt: string,
): Promise<AgentRunRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        approval_expires_at = ${approvalExpiresAt},
        updated_at = NOW()
      WHERE id = ${runId}
      RETURNING *
    `,
  );

  if (!result[0]) {
    return null;
  }

  const run = mapAgentRunRow(result[0]);
  registerAgentRunSession(run);
  return run;
}
