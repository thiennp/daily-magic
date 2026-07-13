import { updateAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export async function setAgentRunApprovalExpiry(
  runId: string,
  approvalExpiresAt: string,
): Promise<AgentRunRecord | null> {
  return (
    updateAgentRunSession(runId, {
      approvalExpiresAt,
      updatedAt: new Date().toISOString(),
    }) ?? null
  );
}
