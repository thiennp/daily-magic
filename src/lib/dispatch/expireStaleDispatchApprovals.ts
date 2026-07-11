import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { asRowArray, getSql } from "@/lib/db";

export async function expireStaleDispatchApprovals(): Promise<number> {
  const sql = getSql();
  const expiredRows = asRowArray(
    await sql`
      UPDATE agent_runs
      SET
        status = ${AgentRunStatus.EXPIRED},
        denial_reason = 'Dispatch approval expired.',
        completed_at = NOW(),
        updated_at = NOW()
      WHERE status = ${AgentRunStatus.PENDING_APPROVAL}
        AND approval_expires_at IS NOT NULL
        AND approval_expires_at < NOW()
      RETURNING id, requester_user_id, executor_user_id, prompt, group_id
    `,
  );

  for (const row of expiredRows) {
    dispatchApprovalRegistry.remove(String(row.id));
  }

  return expiredRows.length;
}
