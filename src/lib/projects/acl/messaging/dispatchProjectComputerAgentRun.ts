import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { buildCommandClaudeRunDispatchMessage } from "@/lib/dispatch/buildCommandClaudeRunDispatchMessage";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import { persistAgentRun } from "@/lib/dispatch/persistAgentRun";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";

export type DispatchProjectComputerAgentRunResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly agentRunId: string;
      readonly delivery: "delivered" | "queued" | "unavailable";
    }
  | { readonly ok: false; readonly code: string };

/**
 * Computer assign bridge: persist project_message (audit/UI) then reuse the
 * existing Mac agent-runs path — COMMAND_CLAUDE_RUN via hub / dispatch outbox.
 * No new AWL wire. History computerAck stays orthogonal.
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

  // Explicit human/bot assign ⇒ run without approval gate (OPEN).
  const run = await persistAgentRun({
    requesterUserId: input.actorUserId,
    executorUserId: input.deviceOwnerUserId,
    deviceId: input.deviceId,
    prompt: input.summary,
    status: AgentRunStatus.RUNNING,
    dispatchPolicy: DispatchPolicy.OPEN,
    writerAgent: "claude-cli",
    projectId: input.projectId,
  });

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
