import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { persistAgentRun } from "@/lib/dispatch/persistAgentRun";
import { deliverProjectComputerAgentRun } from "@/lib/projects/acl/messaging/deliverProjectComputerAgentRun";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { requestComputerRunApproval } from "@/lib/projects/acl/messaging/requestComputerRunApproval";
import { resolveComputerRunApprovalGate } from "@/lib/projects/acl/messaging/resolveComputerRunApprovalGate";

export type DispatchProjectComputerAgentRunResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly agentRunId: string;
      readonly delivery:
        "delivered" | "queued" | "unavailable" | "pending_approval";
    }
  | { readonly ok: false; readonly code: string };

/**
 * Computer assign bridge: persist project_message, then reuse the Mac
 * agent-runs path (COMMAND_CLAUDE_RUN via hub / dispatch outbox).
 * S0-1: the computer owner's own assigns run; anyone else needs approval
 * (15 min) unless the project allows runs without it (S0-2).
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
  readonly writerAgent?: HarnessWriterAgent;
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
    recipients: [{ id: input.membershipId, user_id: input.deviceOwnerUserId }],
  });

  const { dispatchPolicy, approvalExpiresAt } =
    await resolveComputerRunApprovalGate({
      projectId: input.projectId,
      requesterUserId: input.actorUserId,
      executorUserId: input.deviceOwnerUserId,
    });

  const run = await persistAgentRun({
    requesterUserId: input.actorUserId,
    executorUserId: input.deviceOwnerUserId,
    deviceId: input.deviceId,
    prompt: input.summary,
    status:
      approvalExpiresAt !== null
        ? AgentRunStatus.PENDING_APPROVAL
        : AgentRunStatus.RUNNING,
    dispatchPolicy,
    writerAgent: input.writerAgent ?? "claude-cli",
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
      writerAgent: input.writerAgent,
    });
    return {
      ok: true,
      messageId: stored.messageId,
      agentRunId: run.id,
      delivery: "pending_approval",
    };
  }

  const delivery = await deliverProjectComputerAgentRun({
    agentRunId: run.id,
    prompt: input.summary,
    projectId: input.projectId,
    messageId: stored.messageId,
    deviceOwnerUserId: input.deviceOwnerUserId,
    deviceId: input.deviceId,
    writerAgent: input.writerAgent,
  });
  return {
    ok: true,
    messageId: stored.messageId,
    agentRunId: run.id,
    delivery,
  };
};
