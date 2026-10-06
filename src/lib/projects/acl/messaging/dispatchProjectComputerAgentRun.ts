import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { buildCommandClaudeRunDispatchMessage } from "@/lib/dispatch/buildCommandClaudeRunDispatchMessage";
import { buildDispatchApprovalExpiresAt } from "@/lib/dispatch/dispatchApprovalTtl.constant";
import { persistAgentRun } from "@/lib/dispatch/persistAgentRun";
import { resolveDispatchPolicyForExecutor } from "@/lib/dispatch/resolveDispatchPolicyForExecutor";
import { decideComputerRunApproval } from "@/lib/projects/acl/messaging/decideComputerRunApproval";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { requestComputerRunApproval } from "@/lib/projects/acl/messaging/requestComputerRunApproval";
import { readProjectRunsWithoutApproval } from "@/lib/projects/acl/runsWithoutApproval/readProjectRunsWithoutApproval";

export type DispatchProjectComputerAgentRunResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly agentRunId: string;
      readonly delivery:
        | "delivered"
        | "queued"
        | "unavailable"
        | "pending_approval";
    }
  | { readonly ok: false; readonly code: string };

/**
 * Computer assign bridge: persist project_message (audit/UI) then reuse the
 * existing Mac agent-runs path — COMMAND_CLAUDE_RUN via hub / dispatch outbox.
 * No new AWL wire. History computerAck stays orthogonal.
 *
 * S0-1: no more OPEN. The computer owner's own assigns run; anyone else
 * (members, bots) needs the owner's approval (15 min) unless the project
 * allows runs without approval (S0-2). Sandbox + limits apply either way.
 */
export const dispatchProjectComputerAgentRun = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly senderMembershipId: string | null;
  readonly senderProjectDisplayName?: string | null;
  readonly membershipId: string;
  readonly deviceId: string;
  readonly deviceOwnerUserId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refsJson: string;
  readonly toProjectDisplayName: string | null;
}): Promise<DispatchProjectComputerAgentRunResult> => {
  const stored = await insertProjectMessageWithDeliveries({
    projectId: input.projectId,
    senderMembershipId: input.senderMembershipId,
    senderProjectDisplayName: input.senderProjectDisplayName,
    senderUserId: input.actorUserId,
    toMembershipId: input.membershipId,
    toUserId: input.deviceOwnerUserId,
    toTeamLabel: null,
    toProjectDisplayName: input.toProjectDisplayName,
    kind: input.kind,
    summary: input.summary,
    refsJson: input.refsJson,
    recipients: [
      { id: input.membershipId, user_id: input.deviceOwnerUserId },
    ],
  });

  const isComputerOwner = input.actorUserId === input.deviceOwnerUserId;
  const decision = decideComputerRunApproval({
    requesterUserId: input.actorUserId,
    executorUserId: input.deviceOwnerUserId,
    executorDispatchPolicy: await resolveDispatchPolicyForExecutor({
      executorUserId: input.deviceOwnerUserId,
    }),
    projectAllowsRunsWithoutApproval: isComputerOwner
      ? false
      : await readProjectRunsWithoutApproval(input.projectId),
  });
  const approvalExpiresAt = decision.requiresApproval
    ? buildDispatchApprovalExpiresAt()
    : null;

  const run = await persistAgentRun({
    requesterUserId: input.actorUserId,
    executorUserId: input.deviceOwnerUserId,
    deviceId: input.deviceId,
    prompt: input.summary,
    status: decision.requiresApproval
      ? AgentRunStatus.PENDING_APPROVAL
      : AgentRunStatus.RUNNING,
    dispatchPolicy: decision.dispatchPolicy,
    writerAgent: "claude-cli",
    projectId: input.projectId,
    approvalExpiresAt,
  });

  if (approvalExpiresAt !== null) {
    await requestComputerRunApproval({
      runId: run.id,
      requesterUserId: input.actorUserId,
      requesterLabel: input.senderProjectDisplayName ?? null,
      executorUserId: input.deviceOwnerUserId,
      deviceId: input.deviceId,
      prompt: input.summary,
      projectId: input.projectId,
      requestId: stored.messageId,
      approvalExpiresAt,
    });
    return {
      ok: true,
      messageId: stored.messageId,
      agentRunId: run.id,
      delivery: "pending_approval",
    };
  }

  const command = buildCommandClaudeRunDispatchMessage({
    prompt: input.summary,
    agentRunId: run.id,
    writerAgent: "claude-cli",
    projectId: input.projectId,
    requestId: stored.messageId,
  });

  const delivery = await deliverOrQueueAgentWitchDispatchMessage({
    userId: input.deviceOwnerUserId,
    deviceId: input.deviceId,
    idempotencyKey: `project-computer-task:${stored.messageId}`,
    message: command,
  });

  const deliveryKind =
    delivery.kind === "delivered" || delivery.kind === "queued"
      ? delivery.kind
      : "unavailable";

  return {
    ok: true,
    messageId: stored.messageId,
    agentRunId: run.id,
    delivery: deliveryKind,
  };
};
