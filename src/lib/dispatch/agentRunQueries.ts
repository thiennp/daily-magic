import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  getAgentRunSession,
  registerAgentRunSession,
  updateAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import { getAgentRunRowById } from "@/lib/dispatch/agentRunEventQueries";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

const syncAgentRunCache = (run: AgentRunRecord): AgentRunRecord => {
  registerAgentRunSession(run);
  return run;
};

export async function updateAgentRunStatus(
  runId: string,
  status: AgentRunStatusValue,
  fields?: {
    readonly resultOutput?: string | null;
    readonly resultExitCode?: number | null;
    readonly denialReason?: string | null;
    readonly approvalExpiresAt?: string | null;
  },
): Promise<AgentRunRecord | null> {
  const now = new Date().toISOString();
  const startedAt = status === AgentRunStatus.RUNNING ? now : undefined;
  const completedAt =
    status === AgentRunStatus.COMPLETED ||
    status === AgentRunStatus.FAILED ||
    status === AgentRunStatus.DENIED ||
    status === AgentRunStatus.EXPIRED
      ? now
      : undefined;

  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${status},
        result_output = COALESCE(${fields?.resultOutput ?? null}, result_output),
        result_exit_code = COALESCE(${fields?.resultExitCode ?? null}, result_exit_code),
        denial_reason = COALESCE(${fields?.denialReason ?? null}, denial_reason),
        approval_expires_at = COALESCE(${fields?.approvalExpiresAt ?? null}, approval_expires_at),
        started_at = COALESCE(${startedAt ?? null}, started_at),
        completed_at = COALESCE(${completedAt ?? null}, completed_at),
        updated_at = NOW()
      WHERE id = ${runId}
      RETURNING *
    `,
  );

  if (!result[0]) {
    return (
      updateAgentRunSession(runId, {
        status,
        ...(fields?.resultOutput !== undefined
          ? { resultOutput: fields.resultOutput }
          : {}),
        ...(fields?.resultExitCode !== undefined
          ? { resultExitCode: fields.resultExitCode }
          : {}),
        ...(fields?.denialReason !== undefined
          ? { denialReason: fields.denialReason }
          : {}),
        ...(startedAt !== undefined ? { startedAt } : {}),
        ...(completedAt !== undefined ? { completedAt } : {}),
        updatedAt: now,
      }) ?? null
    );
  }

  return syncAgentRunCache(mapAgentRunRow(result[0]));
}

export async function getAgentRunById(
  runId: string,
): Promise<AgentRunRecord | null> {
  const cached = getAgentRunSession(runId);
  if (cached !== undefined) {
    return cached;
  }

  const fromDb = await getAgentRunRowById(runId);
  if (fromDb === null) {
    return null;
  }

  return syncAgentRunCache(fromDb);
}

export async function listAgentRunRowsForUser(
  userId: string,
  limit: number = 50,
): Promise<readonly AgentRunRecord[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE requester_user_id = ${userId}
         OR executor_user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `,
  );

  return rows.map((row) => syncAgentRunCache(mapAgentRunRow(row)));
}
