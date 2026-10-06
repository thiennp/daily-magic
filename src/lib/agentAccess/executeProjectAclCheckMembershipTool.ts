import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { auditProjectAclActivityEvent } from "@/lib/agentAccess/auditProjectAclActivityEvent";
import { parseCheckMembershipArgs } from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { resolveProjectAclAccess } from "@/lib/projects/acl/resolveProjectAclAccess";

export const executeProjectAclCheckMembershipTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "check_membership") {
    return null;
  }
  const parsed = parseCheckMembershipArgs(input.args);
  if (parsed === null) {
    return agentAccessTextResult(
      { ok: false, error: "projectId required.", code: "invalid_arguments" },
      true,
    );
  }
  const subjectUserId = parsed.userId ?? input.actor.id;
  if (subjectUserId !== input.actor.id) {
    const selfAccess = await resolveProjectAclAccess({
      projectId: parsed.projectId,
      actorUserId: input.actor.id,
      requiredScopes: ["project:meta"],
    });
    if (!selfAccess.ok || !selfAccess.isOwner) {
      await auditProjectAclActivityEvent({
        projectId: parsed.projectId,
        actorUserId: input.actor.id,
        action: "membership_check_deny",
        targetUserId: subjectUserId,
        detail: { subjectUserId, outcome: "deny", status: "forbidden" },
      });
      return agentAccessTextResult(
        {
          ok: false,
          error: "Only the project owner can check another user.",
          code: "forbidden",
        },
        true,
      );
    }
  }
  const status = await checkProjectMembershipStatus(
    parsed.projectId,
    subjectUserId,
  );
  const allowed = status === "active" || status === "owner";
  await auditProjectAclActivityEvent({
    projectId: parsed.projectId,
    actorUserId: input.actor.id,
    action: allowed ? "membership_check_ok" : "membership_check_deny",
    targetUserId: subjectUserId,
    detail: { subjectUserId, outcome: allowed ? "ok" : "deny", status },
  });
  return agentAccessTextResult({
    ok: true,
    projectId: parsed.projectId,
    userId: subjectUserId,
    status,
    allowed,
  });
};
