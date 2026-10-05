import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { executeProjectAclInboxPeerTools } from "@/lib/agentAccess/executeProjectAclInboxPeerTools";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { dispatchProjectMessage } from "@/lib/projects/acl/messaging/dispatchProjectMessage";

export const executeProjectAclMessagingTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "project_dispatch") {
    const projectId =
      input.args !== null &&
      typeof input.args === "object" &&
      typeof (input.args as { projectId?: unknown }).projectId === "string"
        ? (input.args as { projectId: string }).projectId
        : null;
    if (projectId === null) {
      return agentAccessTextResult(
        { ok: false, error: "projectId required.", code: "invalid_arguments" },
        true,
      );
    }
    const result = await dispatchProjectMessage({
      projectId,
      actorUserId: input.actor.id,
      args: input.args,
    });
    if (!result.ok) {
      return agentAccessTextResult(
        {
          ok: false,
          error: result.message ?? result.code,
          code: result.code,
          reason: result.reason,
          detail: result.detail,
          retryAfterSeconds: result.retryAfterSeconds,
          retryAfterAt: result.retryAfterAt,
          message: result.message,
        },
        true,
      );
    }
    return agentAccessTextResult({
      ok: true,
      messageId: result.messageId,
      recipientCount: result.recipientCount,
    });
  }
  return executeProjectAclInboxPeerTools(input);
};
