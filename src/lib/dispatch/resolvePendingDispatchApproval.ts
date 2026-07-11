import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { PendingDispatchApproval } from "@/lib/dispatch/dispatchApprovalRegistry";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { getPendingDispatchApprovalFromDb } from "@/lib/dispatch/getPendingDispatchApprovalFromDb";
import { asRowArray, getSql } from "@/lib/db";

export async function resolvePendingDispatchApproval(
  runId: string,
  executorUserId: string,
): Promise<PendingDispatchApproval | null> {
  const cached = dispatchApprovalRegistry.get(runId);

  if (cached !== undefined && cached.executorUserId === executorUserId) {
    return cached;
  }

  const fromDb = await getPendingDispatchApprovalFromDb(runId, executorUserId);

  if (fromDb !== null) {
    dispatchApprovalRegistry.register(fromDb);
  }

  return fromDb;
}

export async function listPendingDispatchApprovalsForExecutor(
  executorUserId: string,
): Promise<readonly PendingDispatchApproval[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id, requester_user_id, executor_user_id, prompt, group_id
      FROM agent_runs
      WHERE executor_user_id = ${executorUserId}
        AND status = ${AgentRunStatus.PENDING_APPROVAL}
        AND (approval_expires_at IS NULL OR approval_expires_at > NOW())
      ORDER BY created_at ASC
    `,
  );

  return rows.map((row) => ({
    runId: String(row.id),
    requesterUserId: String(row.requester_user_id),
    executorUserId: String(row.executor_user_id),
    prompt: String(row.prompt),
    groupId: row.group_id ? String(row.group_id) : null,
  }));
}
