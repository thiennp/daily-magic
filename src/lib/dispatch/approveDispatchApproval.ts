import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import type { PendingDispatchApproval } from "@/lib/dispatch/dispatchApprovalRegistry";
import {
  dispatchClaudeRunToAgent,
  markAgentRunRunning,
  notifyDashboardUser,
} from "@/lib/dispatch/dispatchClaudeRunToAgent";
import { isLocalMacAgentRunDispatch } from "@/lib/dispatch/isLocalMacAgentRunDispatch";
import { DEFAULT_DELEGATED_WRITER_AGENT } from "@/lib/dispatch/resolveDelegatedWriterAgent";

export const denyDispatchApproval = async (
  runtime: AgentWitchHubRuntime,
  pending: PendingDispatchApproval,
  runId: string,
  denialReason: string,
  requestId?: string,
): Promise<AgentWitchMessage> => {
  const deniedRun = await updateAgentRunStatus(runId, AgentRunStatus.DENIED, {
    denialReason,
  });
  if (deniedRun !== null) {
    broadcastAgentRunRecord(runtime, deniedRun, requestId);
  }

  notifyDashboardUser(runtime, pending.requesterUserId, {
    type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESULT,
    payload: {
      runId,
      status: AgentRunStatus.DENIED,
      denialReason,
    },
    requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { runId, status: AgentRunStatus.DENIED },
    requestId,
  };
};

export const approveDispatchApproval = async (
  runtime: AgentWitchHubRuntime,
  pending: PendingDispatchApproval,
  runId: string,
  requestId?: string,
): Promise<AgentWitchMessage> => {
  const agentClient = runtime.findAgentClientForUser(
    pending.executorUserId,
    pending.deviceId ?? undefined,
  );
  const writerAgent = isHarnessWriterAgent(pending.writerAgent)
    ? pending.writerAgent
    : DEFAULT_DELEGATED_WRITER_AGENT;

  const includeNextActions = isLocalMacAgentRunDispatch({
    requesterUserId: pending.requesterUserId,
    executorUserId: pending.executorUserId,
    groupId: pending.groupId,
  });

  if (agentClient !== undefined) {
    dispatchClaudeRunToAgent(
      runtime,
      agentClient,
      pending.prompt,
      runId,
      writerAgent,
      pending.requestId,
      includeNextActions,
    );
  } else {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "The selected Mac is not online right now.",
        runId,
      },
      requestId,
    };
  }

  await markAgentRunRunning(runtime, runId);

  notifyDashboardUser(runtime, pending.requesterUserId, {
    type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESULT,
    payload: {
      runId,
      status: AgentRunStatus.RUNNING,
    },
    requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      runId,
      status: AgentRunStatus.RUNNING,
    },
    requestId,
  };
};
