import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { expireStaleDispatchApprovals } from "@/lib/dispatch/expireStaleDispatchApprovals";
import { ensureDispatchApprovalsHydrated } from "@/lib/dispatch/restoreDispatchApprovalRegistry";
import {
  dispatchClaudeRunToAgent,
  markAgentRunRunning,
  notifyDashboardUser,
} from "@/lib/dispatch/dispatchClaudeRunToAgent";

const isApprovalDecision = (value: unknown): value is "approve" | "deny" =>
  value === "approve" || value === "deny";

export const handleDispatchApprovalRespondAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  ensureDispatchApprovalsHydrated();
  await expireStaleDispatchApprovals();

  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only authenticated dashboard clients can approve dispatch.",
      },
      requestId: message.requestId,
    };
  }

  const runId =
    typeof message.payload?.runId === "string" ? message.payload.runId : "";
  const decision = message.payload?.decision;

  if (runId.length === 0 || !isApprovalDecision(decision)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "dispatch.approval.respond requires payload.runId and decision.",
      },
      requestId: message.requestId,
    };
  }

  const pending = dispatchApprovalRegistry.get(runId);

  if (pending === undefined || pending.executorUserId !== sender.userId) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Dispatch approval request was not found or expired.",
      },
      requestId: message.requestId,
    };
  }

  dispatchApprovalRegistry.remove(runId);

  if (decision === "deny") {
    const denialReason =
      typeof message.payload?.denialReason === "string"
        ? message.payload.denialReason
        : "Dispatch denied by target user.";

    await updateAgentRunStatus(runId, AgentRunStatus.DENIED, {
      denialReason,
    });

    notifyDashboardUser(runtime, pending.requesterUserId, {
      type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESULT,
      payload: {
        runId,
        status: AgentRunStatus.DENIED,
        denialReason,
      },
      requestId: message.requestId,
    });

    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { runId, status: AgentRunStatus.DENIED },
      requestId: message.requestId,
    };
  }

  const agentClient = runtime.findAgentClientForUser(pending.executorUserId);

  if (agentClient === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "No paired local agent is connected to run this task.",
      },
      requestId: message.requestId,
    };
  }

  dispatchClaudeRunToAgent(
    runtime,
    agentClient,
    pending.prompt,
    runId,
    pending.requestId,
  );
  await markAgentRunRunning(runId);

  notifyDashboardUser(runtime, pending.requesterUserId, {
    type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESULT,
    payload: {
      runId,
      status: AgentRunStatus.RUNNING,
    },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { runId, status: AgentRunStatus.RUNNING },
    requestId: message.requestId,
  };
};
