import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { orchestrateProjectMessengerBotReply } from "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerBotReply";

/** project_messenger_reply → bot reply orchestrator. Null for any other tool. */
export const executeProjectMessengerTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "project_messenger_reply") {
    return null;
  }
  const result = await orchestrateProjectMessengerBotReply({
    actorUserId: input.actor.id,
    args: input.args,
  });
  if (!result.ok) {
    const failure: { readonly code: string; readonly message?: string } =
      result;
    return agentAccessTextResult(
      { ...result, error: failure.message ?? failure.code },
      true,
    );
  }
  return agentAccessTextResult({
    ok: true,
    messageId: result.messageId,
    recipientCount: result.recipientCount,
  });
};
