import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  getAgentRunSession,
  registerAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import { getAgentRunRowById } from "@/lib/dispatch/agentRunEventQueries";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import {
  AGENT_RUN_NEON_META_MAX_CHARS,
  toAgentRunNeonMetaText,
} from "@/lib/dispatch/toAgentRunNeonMetaText";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { updateAgentRunSessionStatus } from "@/lib/dispatch/updateAgentRunSessionStatus";
import { asRowArray, getSql } from "@/lib/db";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";

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
    readonly resultOutcomeCode?: string | null;
    readonly denialReason?: string | null;
    readonly approvalExpiresAt?: string | null;
    readonly estimateSeconds?: number | null;
    readonly actualSeconds?: number | null;
  },
): Promise<AgentRunRecord | null> {
  // Cap body-capable fields before any Neon/session write (meta-only HARD).
  const cappedFields =
    fields === undefined
      ? undefined
      : {
          ...fields,
          ...(typeof fields.resultOutput === "string"
            ? { resultOutput: toAgentRunNeonMetaText(fields.resultOutput) }
            : {}),
          ...(typeof fields.denialReason === "string"
            ? { denialReason: toAgentRunNeonMetaText(fields.denialReason) }
            : {}),
        };

  if (isAgentWitchDevDashboardEnabled()) {
    return updateAgentRunSessionStatus(runId, status, cappedFields);
  }

  const now = new Date().toISOString();
  const startedAt = status === AgentRunStatus.RUNNING ? now : undefined;
  const isTerminal =
    status === AgentRunStatus.COMPLETED ||
    status === AgentRunStatus.FAILED ||
    status === AgentRunStatus.DENIED ||
    status === AgentRunStatus.EXPIRED;
  const completedAt = isTerminal ? now : undefined;

  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${status},
        result_output = COALESCE(${cappedFields?.resultOutput ?? null}, result_output),
        result_exit_code = COALESCE(${cappedFields?.resultExitCode ?? null}, result_exit_code),
        result_outcome_code = COALESCE(${cappedFields?.resultOutcomeCode ?? null}, result_outcome_code),
        denial_reason = COALESCE(${cappedFields?.denialReason ?? null}, denial_reason),
        approval_expires_at = COALESCE(${cappedFields?.approvalExpiresAt ?? null}, approval_expires_at),
        started_at = COALESCE(${startedAt ?? null}, started_at),
        completed_at = COALESCE(${completedAt ?? null}, completed_at),
        estimate_seconds = COALESCE(${cappedFields?.estimateSeconds ?? null}, estimate_seconds),
        actual_seconds = COALESCE(${cappedFields?.actualSeconds ?? null}, actual_seconds),
        prompt = CASE
          WHEN ${isTerminal} THEN LEFT(prompt, ${AGENT_RUN_NEON_META_MAX_CHARS}::int)
          ELSE prompt
        END,
        updated_at = NOW()
      WHERE id = ${runId}
      RETURNING *
    `,
  );

  if (!result[0]) {
    return updateAgentRunSessionStatus(runId, status, cappedFields);
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
