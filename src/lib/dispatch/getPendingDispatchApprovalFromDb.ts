import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { PendingDispatchApproval } from "@/lib/dispatch/dispatchApprovalRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import { DEFAULT_DELEGATED_WRITER_AGENT } from "@/lib/dispatch/resolveDelegatedWriterAgent";
import { asRowArray, getSql } from "@/lib/db";

export async function getPendingDispatchApprovalFromDb(
  runId: string,
  executorUserId: string,
): Promise<PendingDispatchApproval | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE id = ${runId}
        AND executor_user_id = ${executorUserId}
        AND status = ${AgentRunStatus.PENDING_APPROVAL}
        AND (approval_expires_at IS NULL OR approval_expires_at > NOW())
    `,
  );

  if (!result[0]) {
    return null;
  }

  const run = mapAgentRunRow(result[0]);

  return {
    runId: run.id,
    requesterUserId: run.requesterUserId,
    executorUserId: run.executorUserId,
    prompt: run.prompt,
    groupId: run.groupId,
    writerAgent: DEFAULT_DELEGATED_WRITER_AGENT,
  };
}
