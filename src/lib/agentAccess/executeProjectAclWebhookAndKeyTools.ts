import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { rotateOwnProjectApiKey } from "@/lib/projects/acl/projectApiKeys/rotateOwnProjectApiKey";
import { registerProjectWebhook } from "@/lib/projects/acl/webhooks/registerProjectWebhook";

const readProjectId = (args: unknown): string | null => {
  if (
    args !== null &&
    typeof args === "object" &&
    typeof (args as { projectId?: unknown }).projectId === "string"
  ) {
    return (args as { projectId: string }).projectId;
  }
  return null;
};

export const executeProjectAclWebhookAndKeyTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "register_project_webhook") {
    const projectId = readProjectId(input.args);
    const webhookUrl =
      input.args !== null &&
      typeof input.args === "object" &&
      typeof (input.args as { webhookUrl?: unknown }).webhookUrl === "string"
        ? (input.args as { webhookUrl: string }).webhookUrl
        : null;
    if (projectId === null || webhookUrl === null) {
      return agentAccessTextResult(
        {
          ok: false,
          error: "projectId and webhookUrl required.",
          code: "invalid_arguments",
        },
        true,
      );
    }
    const result = await registerProjectWebhook({
      projectId,
      actorUserId: input.actor.id,
      webhookUrl,
    });
    if (!result.ok) {
      return agentAccessTextResult(
        { ok: false, error: result.code, code: result.code },
        true,
      );
    }
    return agentAccessTextResult({
      ok: true,
      webhookId: result.webhookId,
      webhookUrl: result.webhookUrl,
      secret: result.secret,
      note: "Store secret once. AWC signs X-AWC-Signature over timestamp.messageId.body.",
    });
  }

  if (input.name === "rotate_project_api_key") {
    const projectId = readProjectId(input.args);
    if (projectId === null) {
      return agentAccessTextResult(
        { ok: false, error: "projectId required.", code: "invalid_arguments" },
        true,
      );
    }
    const result = await rotateOwnProjectApiKey({
      projectId,
      actorUserId: input.actor.id,
    });
    if (!result.ok) {
      return agentAccessTextResult(
        { ok: false, error: result.code, code: result.code },
        true,
      );
    }
    return agentAccessTextResult({
      ok: true,
      projectApiKey: result.projectApiKey,
      prefix: result.prefix,
      last4: result.last4,
      scopes: result.scopes,
      note: "Plaintext shown once. Same scopes as membership — no elevation.",
    });
  }

  return null;
};
