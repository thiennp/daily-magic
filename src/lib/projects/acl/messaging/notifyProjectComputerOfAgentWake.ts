import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { resolveProjectMessageWakeRecipients } from "@/lib/projects/acl/messaging/applyProjectMessageWakePolicy";
import { buildAgentWakePayload } from "@/lib/projects/acl/messaging/buildAgentWakePayload";
import { loadProjectAgentSeatMembershipIds } from "@/lib/projects/acl/messaging/loadProjectAgentSeatMembershipIds";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/**
 * Wake local CLI agent seats through their terminal: for every recipient that
 * is an agent seat and passes the normal wake policy (status/ack never wake;
 * done/blocked only the assigner), push a thin `agent.wake` to the project
 * computer. The Mac types one line into the agent's PTY. Best effort: never
 * throws into the message insert. Returns how many wakes were sent/queued.
 */
export const notifyProjectComputerOfAgentWake = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: Readonly<Record<string, unknown>>;
  readonly recipients: readonly { readonly id: string }[];
}): Promise<number> => {
  try {
    const recipientMembershipIds = input.recipients.map((r) => r.id);
    const agents = await loadProjectAgentSeatMembershipIds({
      projectId: input.projectId,
      membershipIds: recipientMembershipIds,
    });
    if (agents.length === 0) {
      return 0;
    }
    const split = await resolveProjectMessageWakeRecipients({
      projectId: input.projectId,
      messageId: input.messageId,
      kind: input.kind,
      summary: input.summary,
      recipientMembershipIds: agents,
    });
    if (split.wakeMembershipIds.length === 0) {
      return 0;
    }
    const project = await getUserProjectById(input.projectId);
    if (project === null || project.deviceId === null) {
      return 0;
    }
    const deviceId = project.deviceId;
    const results = await Promise.all(
      [...new Set(split.wakeMembershipIds)].map((membershipId) =>
        deliverOrQueueAgentWitchDispatchMessage({
          userId: project.ownerUserId,
          deviceId,
          idempotencyKey: `agent-wake:${input.messageId}:${membershipId}`,
          message: {
            type: AGENT_WITCH_MESSAGE_TYPES.AGENT_WAKE,
            payload: buildAgentWakePayload({ ...input, membershipId }),
          },
        }),
      ),
    );
    return results.filter(
      (result) => result.kind === "delivered" || result.kind === "queued",
    ).length;
  } catch (error: unknown) {
    console.error("agent wake notify failed", {
      messageId: input.messageId,
      error: error instanceof Error ? error.message : "notify_failed",
    });
    return 0;
  }
};
