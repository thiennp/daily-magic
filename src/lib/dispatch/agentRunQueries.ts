import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function updateAgentRunStatus(
  runId: string,
  status: AgentRunStatusValue,
  fields?: {
    readonly resultOutput?: string | null;
    readonly resultExitCode?: number | null;
    readonly denialReason?: string | null;
  },
): Promise<AgentRunRecord | null> {
  const sql = getSql();
  const startedAt =
    status === AgentRunStatus.RUNNING ? new Date().toISOString() : null;
  const completedAt =
    status === AgentRunStatus.COMPLETED ||
    status === AgentRunStatus.FAILED ||
    status === AgentRunStatus.DENIED
      ? new Date().toISOString()
      : null;

  const result = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${status},
        result_output = COALESCE(${fields?.resultOutput ?? null}, result_output),
        result_exit_code = COALESCE(${fields?.resultExitCode ?? null}, result_exit_code),
        denial_reason = COALESCE(${fields?.denialReason ?? null}, denial_reason),
        started_at = COALESCE(${startedAt}, started_at),
        completed_at = COALESCE(${completedAt}, completed_at),
        updated_at = NOW()
      WHERE id = ${runId}
      RETURNING *
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentRunRow(result[0]);
}

export async function getAgentRunById(
  runId: string,
): Promise<AgentRunRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE id = ${runId}
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentRunRow(result[0]);
}

export async function listAgentRunsForUser(
  userId: string,
  limit = 50,
): Promise<readonly AgentRunRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE requester_user_id = ${userId}
         OR executor_user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `,
  );

  return result.map((row) => mapAgentRunRow(row));
}
