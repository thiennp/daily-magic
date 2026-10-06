import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import {
  AWC_GROK_WEBHOOK_OWNER_ENTRY,
  AWC_GROK_WEBHOOK_STATUS_FORBIDDEN,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { readProjectGrokRoutineWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus";
import { readProjectMembershipHmacWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectMembershipHmacWebhookStatus";
import { toGrokWebhookStatusView } from "@/lib/projects/acl/webhooks/toGrokWebhookStatusView";
import { toHmacWebhookStatusView } from "@/lib/projects/acl/webhooks/toHmacWebhookStatusView";

/** get_my_project_webhook_status: caller's own active membership only; host + flags, never secrets. */
export const executeGetMyProjectWebhookStatusTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult> => {
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
  const target = {
    projectId,
    by: "own_membership" as const,
    userId: input.actor.id,
  };
  const status = await readProjectGrokRoutineWebhookStatus(target);
  if (status === null) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "forbidden",
        code: "forbidden",
        note: AWC_GROK_WEBHOOK_STATUS_FORBIDDEN,
      },
      true,
    );
  }
  const hmac =
    (await readProjectMembershipHmacWebhookStatus(target)) ?? {
      hmacWebhookUrl: null,
      secretSet: false,
    };
  const grokView = toGrokWebhookStatusView(status.grokWebhookUrl);
  const hmacView = toHmacWebhookStatusView(hmac);
  const noteParts: string[] = [];
  if (grokView.grokWebhookRegistered) {
    noteParts.push("Grok registered. The key is stored and never returned.");
  } else {
    noteParts.push(
      `Grok not registered. ${AWC_GROK_WEBHOOK_OWNER_ENTRY}`,
    );
  }
  if (hmacView.hmacWebhookRegistered) {
    noteParts.push(
      "HMAC registered. The signing secret is stored and never returned.",
    );
  } else {
    noteParts.push(
      "HMAC not registered. Call register_project_webhook with webhookUrl to receive a one-time secret.",
    );
  }
  return agentAccessTextResult({
    ok: true,
    projectId,
    ...grokView,
    ...hmacView,
    lastGrokWakeResult: status.lastGrokWakeResult,
    note: noteParts.join(" "),
  });
};
