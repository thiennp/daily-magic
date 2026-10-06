import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  approveDispatchApproval,
  denyDispatchApproval,
} from "@/lib/dispatch/approveDispatchApproval";
import {
  claimPendingDispatchApprovalDecision,
  releaseDispatchApprovalClaim,
} from "@/lib/dispatch/claimPendingDispatchApprovalDecision";
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

  const denialReason =
    typeof message.payload?.denialReason === "string"
      ? message.payload.denialReason
      : "Dispatch denied by target user.";

  // S0-3: compare-and-set out of pending_approval. Two instances (or a double
  // click) can both find the pending row; only one wins the UPDATE.
  const claimed = await claimPendingDispatchApprovalDecision({
    runId,
    executorUserId: sender.userId,
    decision,
    denialReason: decision === "deny" ? denialReason : null,
  });
  dispatchApprovalRegistry.remove(runId);

  if (!claimed) {
    return buildDispatchApprovalAlreadyDecidedError(runId, message.requestId);
  }

  if (decision === "deny") {
    return denyDispatchApproval(
      runtime,
      pending,
      runId,
      denialReason,
      message.requestId,
    );
  }

  const result = await approveDispatchApproval(
    runtime,
    pending,
    runId,
    message.requestId,
  );
  if (result.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR) {
    // Nothing was dispatched (no computer): keep it approvable until it expires.
    await releaseDispatchApprovalClaim(runId);
  }
  return result;
};

export const DISPATCH_APPROVAL_ALREADY_DECIDED_CODE = "approval_already_decided";

/** 409: someone (or another server) already approved/denied it, or it expired. */
export const buildDispatchApprovalAlreadyDecidedError = (
  runId: string,
  requestId?: string,
): AgentWitchMessage => ({
  type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
  payload: {
    errorMessage: "This request was already approved, denied, or expired.",
    code: DISPATCH_APPROVAL_ALREADY_DECIDED_CODE,
    status: 409,
    runId,
  },
  requestId,
});
