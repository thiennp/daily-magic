import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { updateAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";

const isExpiredApproval = (expiresAt: string | null | undefined): boolean =>
  expiresAt !== undefined &&
  expiresAt !== null &&
  Date.parse(expiresAt) < Date.now();

export async function expireStaleDispatchApprovals(): Promise<number> {
  const expired = dispatchApprovalRegistry
    .listAll()
    .filter((pending) => isExpiredApproval(pending.approvalExpiresAt));

  for (const pending of expired) {
    updateAgentRunSession(pending.runId, {
      status: AgentRunStatus.EXPIRED,
      denialReason: "Dispatch approval expired.",
      completedAt: new Date().toISOString(),
    });
    dispatchApprovalRegistry.remove(pending.runId);
  }

  return expired.length;
}
