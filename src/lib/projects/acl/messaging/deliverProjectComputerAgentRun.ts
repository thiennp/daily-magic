import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
import { buildCommandClaudeRunDispatchMessage } from "@/lib/dispatch/buildCommandClaudeRunDispatchMessage";

/**
 * Send COMMAND_CLAUDE_RUN for an already-persisted computer run (hub or
 * dispatch outbox). No permission/limit override travels on the wire: the
 * workspace-write profile and limits are applied by AgentWitch Local.
 */
export const deliverProjectComputerAgentRun = async (input: {
  readonly agentRunId: string;
  readonly prompt: string;
  readonly projectId: string;
  readonly messageId: string;
  readonly deviceOwnerUserId: string;
  readonly deviceId: string;
}): Promise<"delivered" | "queued" | "unavailable"> => {
  const command = buildCommandClaudeRunDispatchMessage({
    prompt: input.prompt,
    agentRunId: input.agentRunId,
    writerAgent: "claude-cli",
    projectId: input.projectId,
    requestId: input.messageId,
  });
  const delivery = await deliverOrQueueAgentWitchDispatchMessage({
    userId: input.deviceOwnerUserId,
    deviceId: input.deviceId,
    idempotencyKey: `project-computer-task:${input.messageId}`,
    message: command,
  });
  return delivery.kind === "delivered" || delivery.kind === "queued"
    ? delivery.kind
    : "unavailable";
};
