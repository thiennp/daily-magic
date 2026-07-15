import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  approveDispatchApproval,
  denyDispatchApproval,
} from "@/lib/dispatch/approveDispatchApproval";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";
import { expireStaleDispatchApprovals } from "@/lib/dispatch/expireStaleDispatchApprovals";
import { ensureDispatchApprovalsHydrated } from "@/lib/dispatch/restoreDispatchApprovalRegistry";
import { resolvePendingDispatchApproval } from "@/lib/dispatch/resolvePendingDispatchApproval";

const isApprovalDecision = (value: unknown): value is "approve" | "deny" =>
  value === "approve" || value === "deny";

export const handleDispatchApprovalRespondAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  await ensureDispatchApprovalsHydrated();
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

  const pending = await resolvePendingDispatchApproval(runId, sender.userId);

  if (pending === null) {
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

    return denyDispatchApproval(
      runtime,
      pending,
      runId,
      denialReason,
      message.requestId,
    );
  }

  return approveDispatchApproval(runtime, pending, runId, message.requestId);
};
