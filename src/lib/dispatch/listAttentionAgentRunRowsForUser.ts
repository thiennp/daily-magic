import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const AGENT_RUN_ATTENTION_WINDOW_DAYS = 7;
export const AGENT_RUN_ATTENTION_LIMIT = 50;

/**
 * a13083ee (e48cd107 follow-up): Home read failed runs out of the newest 50
 * runs of any status, so older failures and swept (Stalled) runs fell off.
 * This asks the database for the user's failed and awaiting runs of the last
 * 7 days directly, across every project, newest first.
 */
export async function listAttentionAgentRunRowsForUser(
  userId: string,
  nowMs: number = Date.now(),
): Promise<readonly AgentRunRecord[]> {
  const sinceIso = new Date(
    nowMs - AGENT_RUN_ATTENTION_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE (requester_user_id = ${userId} OR executor_user_id = ${userId})
        AND status IN (${AgentRunStatus.FAILED}, ${AgentRunStatus.PENDING_APPROVAL})
        AND updated_at >= ${sinceIso}
      ORDER BY updated_at DESC
      LIMIT ${AGENT_RUN_ATTENTION_LIMIT}
    `,
  );
  return rows.map((row) => mapAgentRunRow(row));
}
