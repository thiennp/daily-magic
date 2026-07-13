import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { listAllAgentRunSessions } from "@/lib/dispatch/agentRunSessionRegistry";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { markDispatchApprovalsHydrationStarted } from "@/lib/dispatch/dispatchApprovalHydrationState";

export const ensureDispatchApprovalsHydrated = (): void => {
  if (!markDispatchApprovalsHydrationStarted()) {
    return;
  }

  for (const run of listAllAgentRunSessions()) {
    if (run.status !== AgentRunStatus.PENDING_APPROVAL) {
      continue;
    }

    const expiresAt = run.approvalExpiresAt;
    if (expiresAt !== null && Date.parse(expiresAt) <= Date.now()) {
      continue;
    }

    dispatchApprovalRegistry.register({
      runId: run.id,
      requesterUserId: run.requesterUserId,
      executorUserId: run.executorUserId,
      prompt: run.prompt,
      groupId: run.groupId,
      approvalExpiresAt: run.approvalExpiresAt,
    });
  }
};
