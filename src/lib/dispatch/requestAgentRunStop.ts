import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  getAgentRunSession,
  registerAgentRunSession,
  updateAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const AGENT_RUN_STOPPED_BEFORE_APPROVAL_REASON =
  "Stopped before it was approved.";

export type RequestAgentRunStopResult =
  | {
      readonly ok: true;
      /** pending_approval → denied in the same statement (nothing to kill). */
      readonly endedBeforeStart: boolean;
      readonly run: AgentRunRecord;
    }
  | { readonly ok: false };

const applyInMemory = (
  runId: string,
  nowIso: string,
): RequestAgentRunStopResult => {
  const existing = getAgentRunSession(runId);
  if (
    existing === undefined ||
    (existing.status !== AgentRunStatus.RUNNING &&
      existing.status !== AgentRunStatus.PENDING_APPROVAL)
  ) {
    return { ok: false };
  }
  const endedBeforeStart = existing.status === AgentRunStatus.PENDING_APPROVAL;
  const updated = updateAgentRunSession(runId, {
    stopRequestedAt: existing.stopRequestedAt ?? nowIso,
    ...(endedBeforeStart
      ? {
          status: AgentRunStatus.DENIED,
          denialReason: AGENT_RUN_STOPPED_BEFORE_APPROVAL_REASON,
          completedAt: nowIso,
        }
      : {}),
  });
  return updated === undefined
    ? { ok: false }
    : { ok: true, endedBeforeStart, run: updated };
};

/**
 * S0-7 — record a stop request with compare-and-set on the active statuses,
 * so a stop can't resurrect a finished run and two instances agree on one
 * outcome. A run still waiting for approval ends as denied right here.
 */
export const requestAgentRunStop = async (input: {
  readonly runId: string;
  readonly requestedByUserId: string;
}): Promise<RequestAgentRunStopResult> => {
  const nowIso = new Date().toISOString();
  if (isAgentWitchDevDashboardEnabled()) {
    return applyInMemory(input.runId, nowIso);
  }

  const rows = asRowArray(
    await getSql()`
      UPDATE agent_runs
      SET
        stop_requested_at = COALESCE(stop_requested_at, NOW()),
        stop_requested_by_user_id = COALESCE(
          stop_requested_by_user_id,
          ${input.requestedByUserId}
        ),
        status = CASE
          WHEN status = ${AgentRunStatus.PENDING_APPROVAL}
            THEN ${AgentRunStatus.DENIED}
          ELSE status
        END,
        denial_reason = CASE
          WHEN status = ${AgentRunStatus.PENDING_APPROVAL}
            THEN ${AGENT_RUN_STOPPED_BEFORE_APPROVAL_REASON}
          ELSE denial_reason
        END,
        completed_at = CASE
          WHEN status = ${AgentRunStatus.PENDING_APPROVAL} THEN NOW()
          ELSE completed_at
        END,
        updated_at = NOW()
      WHERE id = ${input.runId}
        AND status IN (
          ${AgentRunStatus.RUNNING},
          ${AgentRunStatus.PENDING_APPROVAL}
        )
      RETURNING *, (status = ${AgentRunStatus.DENIED}) AS ended_before_start
    `,
  );

  const row = rows[0];
  if (row === undefined) {
    return { ok: false };
  }
  const run = mapAgentRunRow(row);
  registerAgentRunSession(run);
  return { ok: true, endedBeforeStart: row.ended_before_start === true, run };
};
