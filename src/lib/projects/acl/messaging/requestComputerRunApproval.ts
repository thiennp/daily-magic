import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getUserById } from "@/lib/auth/userRepository";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";

/**
 * S0-1: a computer run that needs approval. Same wire as the dashboard path
 * (sendPendingApprovalDispatch): register the pending approval and send
 * DISPATCH_APPROVAL_REQUIRED to the computer owner's dashboards (approval
 * card) and, when connected, to their AgentWitch Local. The run row is
 * already PENDING_APPROVAL with approval_expires_at (DISPATCH_APPROVAL_TTL_MS);
 * expireStaleDispatchApprovals expires it. Approve → approveDispatchApproval
 * delivers COMMAND_CLAUDE_RUN (live socket or dispatch outbox).
 */
export const requestComputerRunApproval = async (input: {
  readonly runId: string;
  readonly requesterUserId: string;
  readonly requesterLabel: string | null;
  readonly executorUserId: string;
  readonly deviceId: string;
  readonly prompt: string;
  readonly projectId: string;
  readonly requestId: string;
  readonly approvalExpiresAt: string;
}): Promise<void> => {
  dispatchApprovalRegistry.register({
    runId: input.runId,
    requesterUserId: input.requesterUserId,
    executorUserId: input.executorUserId,
    prompt: input.prompt,
    groupId: null,
    writerAgent: "claude-cli",
    deviceId: input.deviceId,
    requestId: input.requestId,
    approvalExpiresAt: input.approvalExpiresAt,
  });

  const label = input.requesterLabel?.trim() ?? "";
  const requesterEmail =
    label.length > 0
      ? label
      : ((await getUserById(input.requesterUserId))?.email ??
        input.requesterUserId);

  const message: AgentWitchMessage = {
    type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED,
    payload: {
      runId: input.runId,
      requesterUserId: input.requesterUserId,
      requesterEmail,
      prompt: input.prompt,
      groupId: null,
      projectId: input.projectId,
      approvalExpiresAt: input.approvalExpiresAt,
    },
    requestId: input.requestId,
  };

  const hub = getAgentWitchHub();
  notifyDashboardUser(hub, input.executorUserId, message);
  const resolved = await resolveDispatchTargetAgentClient({
    runtime: hub,
    userId: input.executorUserId,
    deviceId: input.deviceId,
  });
  resolved?.agentClient.send(message);
};
