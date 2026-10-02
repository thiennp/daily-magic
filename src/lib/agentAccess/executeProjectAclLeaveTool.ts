import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { parseLeaveProjectArgs } from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { leaveProjectMembership } from "@/lib/projects/acl/leaveProjectMembership";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export const executeProjectAclLeaveTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "leave_project") {
    return null;
  }

  const parsed = parseLeaveProjectArgs(input.args);
  if (parsed === null) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "projectId required.",
        code: "invalid_arguments",
      },
      true,
    );
  }
  if (!parsed.confirm) {
    return agentAccessTextResult(
      {
        ok: false,
        error: mapProjectAccessError("confirm_required"),
        code: "confirm_required",
      },
      true,
    );
  }

  const result = await leaveProjectMembership({
    projectId: parsed.projectId,
    actorUserId: input.actor.id,
  });

  if (!result.ok) {
    const code =
      result.code === "owner" ? "owner_cannot_leave" : result.code;
    return agentAccessTextResult(
      {
        ok: false,
        error: mapProjectAccessError(code),
        code: result.code,
      },
      true,
    );
  }

  return agentAccessTextResult({
    ok: true,
    confirm: true,
    status: "revoked",
    projectId: parsed.projectId,
    membershipId: result.membership.id,
    ...(result.alreadyLeft ? { alreadyLeft: true } : {}),
  });
};
