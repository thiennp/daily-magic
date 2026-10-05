import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { readProjectGrokRoutineWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus";
import { toGrokWebhookStatusView } from "@/lib/projects/acl/webhooks/toGrokWebhookStatusView";

/** get_my_project_webhook_status: caller's own active membership only; host + flags, never the key. */
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
  const status = await readProjectGrokRoutineWebhookStatus({
    projectId,
    by: "own_membership",
    userId: input.actor.id,
  });
  if (status === null) {
    return agentAccessTextResult(
      { ok: false, error: "forbidden", code: "forbidden" },
      true,
    );
  }
  const view = toGrokWebhookStatusView(status.grokWebhookUrl);
  return agentAccessTextResult({
    ok: true,
    projectId,
    ...view,
    lastGrokWakeResult: status.lastGrokWakeResult,
    note: view.grokWebhookRegistered
      ? "Registered. The key is stored and never returned."
      : "Not registered. Ask the user to enter the routine POST URL and key in Project Access → Members → this bot → Grok webhook. Never ask for them in chat.",
  });
};
