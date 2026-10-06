import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  getAgentRunSession,
  registerAgentRunSession,
  updateAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";

export type DispatchApprovalDecision = "approve" | "deny";

const nextStatusFor = (decision: DispatchApprovalDecision) =>
  decision === "approve" ? AgentRunStatus.RUNNING : AgentRunStatus.DENIED;

const claimInSessionRegistry = (input: {
  readonly runId: string;
  readonly executorUserId: string;
  readonly decision: DispatchApprovalDecision;
}): boolean => {
  const run = getAgentRunSession(input.runId);
  if (
    run === undefined ||
    run.executorUserId !== input.executorUserId ||
    run.status !== AgentRunStatus.PENDING_APPROVAL ||
    (run.approvalExpiresAt !== null &&
      run.approvalExpiresAt !== undefined &&
      Date.parse(run.approvalExpiresAt) <= Date.now())
  ) {
    return false;
  }
  updateAgentRunSession(input.runId, { status: nextStatusFor(input.decision) });
  return true;
};

/**
 * S0-3 compare-and-set: move a run out of pending_approval exactly once.
 * Only the caller whose UPDATE matched `status = 'pending_approval'` (and not
 * yet expired) may go on to dispatch or deny; every other instance or a
 * double click gets false → "already decided or expired" (409).
 * Runs that only live in the in-memory session registry (dev dashboard,
 * ephemeral runs with no DB row) are claimed there instead.
 */
export const claimPendingDispatchApprovalDecision = async (input: {
  readonly runId: string;
  readonly executorUserId: string;
  readonly decision: DispatchApprovalDecision;
  readonly denialReason?: string | null;
}): Promise<boolean> => {
  if (isAgentWitchDevDashboardEnabled()) {
    return claimInSessionRegistry(input);
  }
  const sql = getSql();
  const nextStatus = nextStatusFor(input.decision);
  const isDeny = input.decision === "deny";
  const rows = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${nextStatus},
        denial_reason = CASE WHEN ${isDeny}::boolean
          THEN COALESCE(${input.denialReason ?? null}, denial_reason)
          ELSE denial_reason END,
        completed_at = CASE WHEN ${isDeny}::boolean THEN NOW() ELSE completed_at END,
        updated_at = NOW()
      WHERE id = ${input.runId}
        AND executor_user_id = ${input.executorUserId}
        AND status = ${AgentRunStatus.PENDING_APPROVAL}
        AND (approval_expires_at IS NULL OR approval_expires_at > NOW())
      RETURNING *
    `,
  );
  if (rows[0] !== undefined) {
    registerAgentRunSession(mapAgentRunRow(rows[0]));
    return true;
  }
  const exists = asRowArray(
    await sql`SELECT 1 FROM agent_runs WHERE id = ${input.runId} LIMIT 1`,
  );
  return exists.length === 0 ? claimInSessionRegistry(input) : false;
};

/** Undo an approve claim when nothing could be dispatched (no computer). */
export const releaseDispatchApprovalClaim = async (
  runId: string,
): Promise<void> => {
  if (isAgentWitchDevDashboardEnabled()) {
    updateAgentRunSession(runId, { status: AgentRunStatus.PENDING_APPROVAL });
    return;
  }
  const rows = asRowArray(
    await getSql()`
      UPDATE agent_runs
      SET status = ${AgentRunStatus.PENDING_APPROVAL}, updated_at = NOW()
      WHERE id = ${runId} AND status = ${AgentRunStatus.RUNNING}
      RETURNING *
    `,
  );
  if (rows[0] !== undefined) {
    registerAgentRunSession(mapAgentRunRow(rows[0]));
    return;
  }
  updateAgentRunSession(runId, { status: AgentRunStatus.PENDING_APPROVAL });
};
