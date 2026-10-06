import { asRowArray, getSql } from "@/lib/db";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { notifyComputerRunApprovalTimedOut } from "@/lib/projects/acl/runApprovals/notifyComputerRunApprovalTimedOut";

const isExpiredApproval = (expiresAt: string | null | undefined): boolean =>
  expiresAt !== undefined &&
  expiresAt !== null &&
  Date.parse(expiresAt) < Date.now();

/** Terminal timed_out on the run + live DISPATCH_APPROVAL_RESULT push. */
const expireRun = async (runId: string): Promise<void> => {
  const run = await updateAgentRunStatus(runId, AgentRunStatus.EXPIRED, {
    denialReason: "Dispatch approval expired.",
  });
  dispatchApprovalRegistry.remove(runId);
  if (run !== null) {
    notifyComputerRunApprovalTimedOut(run);
  }
};

export async function expireStaleDispatchApprovals(): Promise<number> {
  const sql = getSql();
  const expiredRows = asRowArray(
    await sql`
      SELECT id, approval_expires_at
      FROM agent_runs
      WHERE status = ${AgentRunStatus.PENDING_APPROVAL}
        AND approval_expires_at IS NOT NULL
        AND approval_expires_at <= NOW()
    `,
  );

  const dbExpiredIds = expiredRows
    .map((row) => ({
      id: String(row.id),
      expiresAt:
        row.approval_expires_at === null ||
        row.approval_expires_at === undefined
          ? null
          : String(row.approval_expires_at),
    }))
    .filter((row) => isExpiredApproval(row.expiresAt))
    .map((row) => row.id);

  await Promise.all(dbExpiredIds.map((runId) => expireRun(runId)));

  const registryExpiredIds = dispatchApprovalRegistry
    .listAll()
    .filter((entry) => isExpiredApproval(entry.approvalExpiresAt))
    .map((entry) => entry.runId)
    .filter((runId) => !dbExpiredIds.includes(runId));

  await Promise.all(registryExpiredIds.map((runId) => expireRun(runId)));

  return dbExpiredIds.length + registryExpiredIds.length;
}
