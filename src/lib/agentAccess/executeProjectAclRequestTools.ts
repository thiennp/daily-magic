import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import {
  parseProjectIdArgs,
  parseRequestProjectAccessArgs,
} from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
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
    });
    if (!result.ok) {
      return agentAccessTextResult(
        { ok: false, error: result.code, code: result.code },
        true,
      );
    }
    return agentAccessTextResult({
      ok: true,
      status: "pending",
      requestId: result.request.id,
      projectId: result.request.projectId,
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
    const status = await checkProjectMembershipStatus(
      parsed.projectId,
      input.actor.id,
    );
    return agentAccessTextResult({
      ok: true,
      projectId: parsed.projectId,
      status,
    });
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
