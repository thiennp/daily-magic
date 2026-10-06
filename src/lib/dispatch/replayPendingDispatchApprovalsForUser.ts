import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getUserById } from "@/lib/auth/userRepository";
import { approveDispatchApproval } from "@/lib/dispatch/approveDispatchApproval";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";
import { listPendingDispatchApprovalsForExecutor } from "@/lib/dispatch/resolvePendingDispatchApproval";
import { buildComputerRunApprovalPayload } from "@/lib/projects/acl/runApprovals/buildComputerRunApprovalPayload";
import { resolveComputerRunApprovalCardFields } from "@/lib/projects/acl/runApprovals/resolveComputerRunApprovalCardFields";

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
    const requesterEmail = requester?.email ?? pending.requesterUserId;
    const projectId = pending.projectId ?? null;
    const cardFields =
      projectId !== null && projectId.length > 0
        ? await resolveComputerRunApprovalCardFields({
            writerAgent: pending.writerAgent,
            deviceId: pending.deviceId ?? null,
            projectId,
          })
        : null;
    const card =
      cardFields !== null && projectId !== null
        ? buildComputerRunApprovalPayload({
            runId: pending.runId,
            projectId,
            requesterUserId: pending.requesterUserId,
            requesterLabel: requesterEmail,
            prompt: pending.prompt,
            approvalExpiresAt: pending.approvalExpiresAt ?? null,
            fields: cardFields,
          })
        : null;

    const approvalMessage = {
      type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED,
      payload: {
        runId: pending.runId,
        requesterUserId: pending.requesterUserId,
        requesterEmail,
        prompt: pending.prompt,
        groupId: pending.groupId,
        ...(card !== null
          ? {
              projectId: card.projectId,
              approvalExpiresAt: card.approvalExpiresAt,
              tool: card.tool,
              computerName: card.computerName,
              projectFolder: card.projectFolder,
              state: card.state,
            }
          : {}),
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
