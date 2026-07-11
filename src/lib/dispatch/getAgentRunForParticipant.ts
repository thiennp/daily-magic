import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function getAgentRunForParticipant(
  runId: string,
  userId: string,
): Promise<AgentRunRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE id = ${runId}
        AND (requester_user_id = ${userId} OR executor_user_id = ${userId})
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentRunRow(result[0]);
}
