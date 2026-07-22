import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { approveDispatchApproval } from "@/lib/dispatch/approveDispatchApproval";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { listPendingDispatchApprovalsForExecutor } from "@/lib/dispatch/resolvePendingDispatchApproval";
import { getUserById } from "@/lib/auth/userRepository";

export async function replayPendingDispatchApprovalsForUser(
  hub: AgentWitchHub,
  executorUserId: string,
): Promise<void> {
  const pendingApprovals =
    await listPendingDispatchApprovalsForExecutor(executorUserId);

  for (const pending of pendingApprovals) {
    if (pending.requesterUserId === pending.executorUserId) {
      dispatchApprovalRegistry.register(pending);
      await approveDispatchApproval(
        hub,
        pending,
        pending.runId,
        pending.requestId,
      );
      dispatchApprovalRegistry.remove(pending.runId);
      continue;
    }

    dispatchApprovalRegistry.register(pending);

    const requester = await getUserById(pending.requesterUserId);
    const approvalMessage = {
      type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED,
      payload: {
        runId: pending.runId,
        requesterUserId: pending.requesterUserId,
        requesterEmail: requester?.email ?? pending.requesterUserId,
        prompt: pending.prompt,
        groupId: pending.groupId,
      },
    };

    notifyDashboardUser(hub, executorUserId, approvalMessage);

    const agentClient = hub.findAgentClientForUser(
      executorUserId,
      pending.deviceId ?? undefined,
    );
    if (agentClient !== undefined) {
      agentClient.send(approvalMessage);
    }
  }
}
