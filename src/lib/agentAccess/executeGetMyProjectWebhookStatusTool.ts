import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { readProjectGrokRoutineWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus";

/** get_my_project_webhook_status: caller's own membership only; host + flags, never the key. */
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
  const membership = await getActiveProjectMembership(
    projectId,
    input.actor.id,
  );
  if (membership === null || membership.role !== "member") {
    return agentAccessTextResult(
      { ok: false, error: "forbidden", code: "forbidden" },
      true,
    );
  }
  const status = await readProjectGrokRoutineWebhookStatus({
    membershipId: membership.id,
  });
  return agentAccessTextResult({
    ok: true,
    projectId,
    membershipId: membership.id,
    grokWebhookRegistered: status.grokWebhookRegistered,
    grokWebhookUrlHost: status.grokWebhookUrlHost,
    keySet: status.grokWebhookRegistered,
    lastGrokWakeResult: status.lastGrokWakeResult,
    note: status.grokWebhookRegistered
      ? "Registered. The key is stored and never returned."
      : "Not registered. Ask the user to enter the routine POST URL and key in Project Access → Members → this bot → Grok webhook. Never ask for them in chat.",
  });
};
