import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { changeProjectMembershipDeliveryMode } from "@/lib/projects/acl/changeProjectMembershipDeliveryMode";

/** set_my_project_delivery_mode: caller's own active membership only. */
export const executeSetMyProjectDeliveryModeTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult> => {
  const args =
    input.args !== null && typeof input.args === "object"
      ? (input.args as Record<string, unknown>)
      : {};
  if (typeof args.projectId !== "string") {
    return agentAccessTextResult(
      { ok: false, error: "projectId required.", code: "invalid_arguments" },
      true,
    );
  }
  const result = await changeProjectMembershipDeliveryMode({
    projectId: args.projectId,
    actorUserId: input.actor.id,
    target: { by: "own_membership" },
    deliveryMode: args.deliveryMode,
  });
  if (!result.ok) {
    const code = result.code === "not_found" ? "forbidden" : result.code;
    return agentAccessTextResult({ ok: false, error: code, code }, true);
  }
  return agentAccessTextResult({
    ok: true,
    projectId: args.projectId,
    deliveryMode: result.deliveryMode,
    changed: result.changed,
  });
};
