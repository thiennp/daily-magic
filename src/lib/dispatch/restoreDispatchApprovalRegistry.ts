import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import { DEFAULT_DELEGATED_WRITER_AGENT } from "@/lib/dispatch/resolveDelegatedWriterAgent";
import { asRowArray, getSql } from "@/lib/db";

export const ensureDispatchApprovalsHydrated = async (): Promise<void> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE status = ${AgentRunStatus.PENDING_APPROVAL}
        AND (approval_expires_at IS NULL OR approval_expires_at > NOW())
    `,
  );

  for (const row of rows) {
    const run = mapAgentRunRow(row);
    dispatchApprovalRegistry.register({
      runId: run.id,
      requesterUserId: run.requesterUserId,
      executorUserId: run.executorUserId,
      prompt: run.prompt,
      groupId: run.groupId,
      writerAgent: isHarnessWriterAgent(run.writerAgent)
        ? run.writerAgent
        : DEFAULT_DELEGATED_WRITER_AGENT,
      approvalExpiresAt: run.approvalExpiresAt,
    });
  }
};
