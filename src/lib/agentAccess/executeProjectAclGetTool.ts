import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { parseProjectIdArgs } from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { getProjectAclPayload } from "@/lib/projects/acl/getProjectAclPayload";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";

export const executeProjectAclGetTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "get_project_acl") {
    return null;
  }
  const parsed = parseProjectIdArgs(input.args);
  if (parsed === null) {
    return agentAccessTextResult(
      { ok: false, error: "projectId required.", code: "invalid_arguments" },
      true,
    );
  }
  const payload = await getProjectAclPayload({
    projectId: parsed.projectId,
    actorUserId: input.actor.id,
  });
  if (!payload.ok) {
    return agentAccessTextResult(
      { ok: false, error: payload.code, code: payload.code },
      true,
    );
  }
  return agentAccessTextResult({
    ok: true,
    name: payload.name,
    folderRefs: payload.folderRefs,
    scopes: payload.scopes,
    relation: payload.relation,
    firstConnect: {
      role: PROJECT_ACL_FIRST_CONNECT.role,
      scopes: PROJECT_ACL_FIRST_CONNECT.scopes,
      note: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
    },
  });
};
