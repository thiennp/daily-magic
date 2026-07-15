import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function listAgentRunsForGroup(
  groupId: string,
  limit = 25,
): Promise<readonly AgentRunRecord[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE group_id = ${groupId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `,
  );

  return rows.map((row) => mapAgentRunRow(row));
}
