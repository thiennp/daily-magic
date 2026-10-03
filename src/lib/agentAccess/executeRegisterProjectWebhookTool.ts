import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { registerProjectWebhook } from "@/lib/projects/acl/webhooks/registerProjectWebhook";
import { upsertProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/upsertProjectGrokRoutineWebhook";

const readStringArg = (args: unknown, key: string): string | null => {
  if (args === null || typeof args !== "object") {
    return null;
  }
  const value = (args as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
};

const GROK_ONLY_NOTE =
  "Bearer stored once and is not returned. AWC POSTs Authorization: Bearer once when a project message is stored. The message stays pending until ack_project_message.";

const HMAC_NOTE =
  "Store secret once. AWC signs X-AWC-Signature over timestamp.messageId.body.";

export const buildRegisterProjectWebhookToolBody = (input: {
  readonly hmac: {
    readonly webhookId: string;
    readonly webhookUrl: string;
    readonly secret: string;
  } | null;
  readonly grokWebhookUrl: string | null;
}): Record<string, unknown> => {
  const grok =
    input.grokWebhookUrl === null
      ? {}
      : {
          grokWebhookRegistered: true,
          grokWebhookUrl: input.grokWebhookUrl,
        };
  if (input.hmac === null) {
    return { ok: true, ...grok, note: GROK_ONLY_NOTE };
  }
  return {
    ok: true,
    webhookId: input.hmac.webhookId,
    webhookUrl: input.hmac.webhookUrl,
    secret: input.hmac.secret,
    note: HMAC_NOTE,
    ...grok,
  };
};

const invalid = (error: string, code: string): AgentAccessToolCallResult =>
  agentAccessTextResult({ ok: false, error, code }, true);

export const executeRegisterProjectWebhookTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult> => {
  const projectId = readStringArg(input.args, "projectId");
  const webhookUrl = readStringArg(input.args, "webhookUrl");
  const grokWebhookUrl = readStringArg(input.args, "grokWebhookUrl");
  const grokWebhookBearer = readStringArg(input.args, "grokWebhookBearer");
  const wantsGrok = grokWebhookUrl !== null || grokWebhookBearer !== null;
  if (projectId === null || (webhookUrl === null && !wantsGrok)) {
    return invalid(
      "projectId and webhookUrl or grokWebhookUrl + grokWebhookBearer required.",
      "invalid_arguments",
    );
  }
  if (wantsGrok && (grokWebhookUrl === null || grokWebhookBearer === null)) {
    return invalid(
      "grokWebhookUrl and grokWebhookBearer are required together.",
      "invalid_arguments",
    );
  }
  const grok =
    !wantsGrok || grokWebhookUrl === null || grokWebhookBearer === null
      ? null
      : await upsertProjectGrokRoutineWebhook({
          projectId,
          actorUserId: input.actor.id,
          grokWebhookUrl,
          grokWebhookBearer,
        });
  if (grok !== null && !grok.ok) {
    return invalid(grok.code, grok.code);
  }
  const hmac =
    webhookUrl === null
      ? null
      : await registerProjectWebhook({
          projectId,
          actorUserId: input.actor.id,
          webhookUrl,
        });
  if (hmac !== null && !hmac.ok) {
    return invalid(hmac.code, hmac.code);
  }
  return agentAccessTextResult(
    buildRegisterProjectWebhookToolBody({
      hmac:
        hmac !== null && hmac.ok
          ? {
              webhookId: hmac.webhookId,
              webhookUrl: hmac.webhookUrl,
              secret: hmac.secret,
            }
          : null,
      grokWebhookUrl: grok !== null && grok.ok ? grok.grokWebhookUrl : null,
    }),
  );
};
