import { getUserById } from "@/lib/auth/userRepository";
import { asRowArray, getSql } from "@/lib/db";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { expireStaleDispatchApprovals } from "@/lib/dispatch/expireStaleDispatchApprovals";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import { buildComputerRunApprovalPayload } from "@/lib/projects/acl/runApprovals/buildComputerRunApprovalPayload";
import type { ComputerRunApprovalPayload } from "@/lib/projects/acl/runApprovals/computerRunApprovalPayload.type";
import { resolveComputerRunApprovalCardFields } from "@/lib/projects/acl/runApprovals/resolveComputerRunApprovalCardFields";

/**
 * Owner reopen list: PENDING computer-run approvals for one project.
 * Expires stale rows first (check-on-read) so timed-out runs leave the list.
 */
export const listProjectPendingRunApprovals = async (input: {
  readonly projectId: string;
  /** Only runs this person's computer will execute: nobody else can answer them. */
  readonly executorUserId?: string;
}): Promise<readonly ComputerRunApprovalPayload[]> => {
  await expireStaleDispatchApprovals();
  const rows = asRowArray(
    await getSql()`
      SELECT *
      FROM agent_runs
      WHERE project_id = ${input.projectId}
        AND (${input.executorUserId ?? null}::text IS NULL
          OR executor_user_id = ${input.executorUserId ?? null})
        AND status = ${AgentRunStatus.PENDING_APPROVAL}
        AND (approval_expires_at IS NULL OR approval_expires_at > NOW())
      ORDER BY created_at ASC
    `,
  );
  const out: ComputerRunApprovalPayload[] = [];
  for (const row of rows) {
    const run = mapAgentRunRow(row);
    if (run.projectId === null) continue;
    const fields = await resolveComputerRunApprovalCardFields({
      writerAgent: run.writerAgent,
      deviceId: run.deviceId,
      projectId: run.projectId,
    });
    const requester = await getUserById(run.requesterUserId);
    out.push(
      buildComputerRunApprovalPayload({
        runId: run.id,
        projectId: run.projectId,
        requesterUserId: run.requesterUserId,
        requesterLabel: requester?.email ?? null,
        prompt: run.prompt,
        approvalExpiresAt: run.approvalExpiresAt,
        fields,
      }),
    );
  }
  return out;
};
