import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
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
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  approvalStateFromAgentRunStatus,
  ComputerRunApprovalState,
} from "@/lib/projects/acl/runApprovals/computerRunApprovalState.constant";
import { transitionComputerRunApprovalState } from "@/lib/projects/acl/runApprovals/transitionComputerRunApprovalState";

export type RespondComputerRunApprovalResult =
  | {
      readonly ok: true;
      readonly state:
        | typeof ComputerRunApprovalState.APPROVED
        | typeof ComputerRunApprovalState.DECLINED;
      readonly runId: string;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        | "invalid_transition"
        | "invalid_arguments";
    };

/**
 * HTTP approve/decline: same claim + approve/deny path as the live
 * DISPATCH_APPROVAL_RESPOND channel (handleDispatchApprovalRespond).
 */
export const respondComputerRunApproval = async (input: {
  readonly projectId: string;
  readonly runId: string;
  readonly actorUserId: string;
  readonly decision: "approve" | "decline";
}): Promise<RespondComputerRunApprovalResult> => {
  if (input.runId.trim().length === 0) {
    return { ok: false, code: "invalid_arguments" };
  }
  await ensureDispatchApprovalsHydrated();
  await expireStaleDispatchApprovals();

  const run = await getAgentRunById(input.runId);
  if (run === null || run.projectId !== input.projectId) {
    return { ok: false, code: "not_found" };
  }
  if (run.executorUserId !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }

  const from =
    approvalStateFromAgentRunStatus(run.status) ??
    ComputerRunApprovalState.PENDING;
  const to =
    input.decision === "approve"
      ? ComputerRunApprovalState.APPROVED
      : ComputerRunApprovalState.DECLINED;
  const gate = transitionComputerRunApprovalState({ from, to });
  if (!gate.ok) {
    return { ok: false, code: "invalid_transition" };
  }

  const pending = await resolvePendingDispatchApproval(
    input.runId,
    input.actorUserId,
  );
  if (pending === null) {
    return { ok: false, code: "invalid_transition" };
  }

  const claimDecision = input.decision === "approve" ? "approve" : "deny";
  const denialReason =
    input.decision === "decline" ? "Dispatch declined by project owner." : null;
  const claimed = await claimPendingDispatchApprovalDecision({
    runId: input.runId,
    executorUserId: input.actorUserId,
    decision: claimDecision,
    denialReason,
  });
  dispatchApprovalRegistry.remove(input.runId);
  if (!claimed) {
    return { ok: false, code: "invalid_transition" };
  }

  const hub = getAgentWitchHub();
  if (input.decision === "decline") {
    await denyDispatchApproval(
      hub,
      pending,
      input.runId,
      denialReason ?? "Dispatch declined by project owner.",
    );
    return { ok: true, state: ComputerRunApprovalState.DECLINED, runId: input.runId };
  }

  const result = await approveDispatchApproval(hub, pending, input.runId);
  if (result.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR) {
    await releaseDispatchApprovalClaim(input.runId);
    return { ok: false, code: "not_found" };
  }
  return { ok: true, state: ComputerRunApprovalState.APPROVED, runId: input.runId };
};
