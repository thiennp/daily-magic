import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { executeProjectAclMessagingTools } from "@/lib/agentAccess/executeProjectAclMessagingTools";
import { executeProjectAclWebhookAndKeyTools } from "@/lib/agentAccess/executeProjectAclWebhookAndKeyTools";

export const executeProjectAclInviteHooksTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  const webhookKey = await executeProjectAclWebhookAndKeyTools(input);
  if (webhookKey !== null) {
    return webhookKey;
  }
  return executeProjectAclMessagingTools(input);
};
