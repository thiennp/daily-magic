import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import {
  parseProjectIdArgs,
  parseRequestProjectAccessArgs,
} from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { buildMyProjectAccessPayload } from "@/lib/projects/acl/buildMyProjectAccessPayload";
import { createProjectAccessRequest } from "@/lib/projects/acl/createProjectAccessRequest";
import { listProjectsForAclActor } from "@/lib/projects/acl/listProjectsForAclActor";

export const executeProjectAclRequestTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "request_project_access") {
    const parsed = parseRequestProjectAccessArgs(input.args);
    if (parsed === null) {
      return agentAccessTextResult(
        { ok: false, error: "projectId required.", code: "invalid_arguments" },
        true,
      );
    }
    const result = await createProjectAccessRequest({
      projectId: parsed.projectId,
      requesterUserId: input.actor.id,
      reason: parsed.reason,
      teamLabel: parsed.teamLabel,
      suggestedProjectDisplayName: parsed.suggestedProjectDisplayName,
    });
    if (!result.ok) {
      return agentAccessTextResult(
        { ok: false, error: result.code, code: result.code },
        true,
      );
    }
    if (result.status === "active") {
      return agentAccessTextResult({
        ok: true,
        status: "active",
        requestId: result.request.id,
        projectId: result.request.projectId,
        membershipId: result.membership.id,
        projectDisplayName: result.membership.projectDisplayName,
        projectApiKey: result.projectApiKey,
        message:
          "Access granted (same-owner auto-approve). Call get_my_project_access; skip wait for Approve.",
      });
    }
    return agentAccessTextResult({
      ok: true,
      status: "pending",
      requestId: result.request.id,
      projectId: result.request.projectId,
      message:
        "Access request pending. Call get_my_project_access; wait for owner Approve unless status becomes active.",
    });
  }

  if (input.name === "get_my_project_access") {
    const parsed = parseProjectIdArgs(input.args);
    if (parsed === null) {
      return agentAccessTextResult(
        { ok: false, error: "projectId required.", code: "invalid_arguments" },
        true,
      );
    }
    const payload = await buildMyProjectAccessPayload({
      projectId: parsed.projectId,
      actorUserId: input.actor.id,
    });
    return agentAccessTextResult(payload);
  }

  if (input.name === "list_projects") {
    const projects = await listProjectsForAclActor(input.actor.id);
    return agentAccessTextResult({
      ok: true,
      projects: projects.map((p) => ({ id: p.id, name: p.name })),
    });
  }

  return null;
};
