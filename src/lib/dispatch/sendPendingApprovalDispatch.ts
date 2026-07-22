import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { buildDispatchApprovalExpiresAt } from "@/lib/dispatch/dispatchApprovalTtl.constant";
import { setAgentRunApprovalExpiry } from "@/lib/dispatch/setAgentRunApprovalExpiry";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const sendPendingApprovalDispatch = (
  runtime: AgentWitchHubRuntime,
  agentClient: AgentWitchHubClient,
  sender: AgentWitchHubClient,
  run: AgentRunRecord,
  prompt: string,
  groupId: string | null,
  dispatchPolicy: DispatchPolicyValue,
  writerAgent: HarnessWriterAgent,
  requestId?: string,
): AgentWitchMessage => {
  const approvalExpiresAt = buildDispatchApprovalExpiresAt();

  void setAgentRunApprovalExpiry(run.id, approvalExpiresAt);

  dispatchApprovalRegistry.register({
    runId: run.id,
    requesterUserId: sender.userId ?? "",
    executorUserId: run.executorUserId,
    prompt,
    groupId,
    writerAgent,
    deviceId: run.deviceId,
    requestId,
    approvalExpiresAt,
  });

  const approvalMessage: AgentWitchMessage = {
    type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED,
    payload: {
      runId: run.id,
      requesterUserId: sender.userId,
      requesterEmail: sender.email,
      prompt,
      groupId,
    },
    requestId,
  };

  notifyDashboardUser(runtime, run.executorUserId, approvalMessage);
  agentClient.send(approvalMessage);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      dispatched: false,
      pendingApproval: true,
      agentRunId: run.id,
      dispatchPolicy,
      approvalExpiresAt,
    },
    requestId,
  };
};
