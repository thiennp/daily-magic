import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { markDispatchApprovalsHydrationStarted } from "@/lib/dispatch/dispatchApprovalHydrationState";
import { asRowArray, getSql } from "@/lib/db";

export const ensureDispatchApprovalsHydrated = (): void => {
  if (!markDispatchApprovalsHydrationStarted()) {
    return;
  }

  void (async () => {
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT id, requester_user_id, executor_user_id, prompt, group_id
        FROM agent_runs
        WHERE status = ${AgentRunStatus.PENDING_APPROVAL}
          AND (approval_expires_at IS NULL OR approval_expires_at > NOW())
      `,
    );

    for (const row of rows) {
      dispatchApprovalRegistry.register({
        runId: String(row.id),
        requesterUserId: String(row.requester_user_id),
        executorUserId: String(row.executor_user_id),
        prompt: String(row.prompt),
        groupId: row.group_id ? String(row.group_id) : null,
      });
    }
  })();
};
