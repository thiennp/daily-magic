import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

const DEFAULT_LIMIT = 50;

/** Runs whose project_id is this project (newest first). */
export async function listAgentRunsForProject(
  projectId: string,
  limit: number = DEFAULT_LIMIT,
): Promise<readonly AgentRunRecord[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE project_id = ${projectId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `,
  );
  return rows.map((row) => {
    const run = mapAgentRunRow(row);
    registerAgentRunSession(run);
    return run;
  });
}
