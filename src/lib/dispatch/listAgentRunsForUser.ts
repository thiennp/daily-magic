import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
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

export async function listAgentRunsForUser(
  userId: string,
  options?: {
    readonly limit?: number;
    readonly status?: AgentRunStatusValue;
  },
): Promise<readonly AgentRunRecord[]> {
  const sql = getSql();
  const limit = options?.limit ?? 50;
  const status = options?.status;

  const result =
    status === undefined
      ? asRowArray(
          await sql`
            SELECT *
            FROM agent_runs
            WHERE requester_user_id = ${userId}
               OR executor_user_id = ${userId}
            ORDER BY created_at DESC
            LIMIT ${limit}
          `,
        )
      : asRowArray(
          await sql`
            SELECT *
            FROM agent_runs
            WHERE (requester_user_id = ${userId} OR executor_user_id = ${userId})
              AND status = ${status}
            ORDER BY created_at DESC
            LIMIT ${limit}
          `,
        );

  return result.map((row) => mapAgentRunRow(row));
}
