import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getUserById } from "@/lib/auth/userRepository";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";
import { buildComputerRunApprovalPayload } from "@/lib/projects/acl/runApprovals/buildComputerRunApprovalPayload";
import { resolveComputerRunApprovalCardFields } from "@/lib/projects/acl/runApprovals/resolveComputerRunApprovalCardFields";

/**
 * S0-1: computer run that needs approval. Registers pending + sends
 * DISPATCH_APPROVAL_REQUIRED (with tool/computerName/projectFolder) to the
 * owner's dashboards and AgentWitch Local. expireStaleDispatchApprovals
 * records timed_out and pushes DISPATCH_APPROVAL_RESULT on the same channel.
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
    projectId: input.projectId,
  });

  const label = input.requesterLabel?.trim() ?? "";
  const requesterEmail =
    label.length > 0
      ? label
      : ((await getUserById(input.requesterUserId))?.email ??
        input.requesterUserId);
  const fields = await resolveComputerRunApprovalCardFields({
    writerAgent: "claude-cli",
    deviceId: input.deviceId,
    projectId: input.projectId,
  });
  const card = buildComputerRunApprovalPayload({
    runId: input.runId,
    projectId: input.projectId,
    requesterUserId: input.requesterUserId,
    requesterLabel: requesterEmail,
    prompt: input.prompt,
    approvalExpiresAt: input.approvalExpiresAt,
    fields,
  });

  const message: AgentWitchMessage = {
    type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED,
    payload: {
      runId: card.runId,
      requesterUserId: card.requesterUserId,
      requesterEmail,
      prompt: card.prompt,
      groupId: null,
      projectId: card.projectId,
      approvalExpiresAt: card.approvalExpiresAt,
      tool: card.tool,
      computerName: card.computerName,
      projectFolder: card.projectFolder,
      state: card.state,
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
