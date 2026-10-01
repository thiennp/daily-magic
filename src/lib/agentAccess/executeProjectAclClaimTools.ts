import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import {
  parseCheckMembershipArgs,
  parseProjectIdArgs,
} from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { getProjectAclPayload } from "@/lib/projects/acl/getProjectAclPayload";
import { mintProjectAllowClaim } from "@/lib/projects/acl/mintProjectAllowClaim";
import { resolveProjectAclAccess } from "@/lib/projects/acl/resolveProjectAclAccess";

export const executeProjectAclClaimTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "get_project_acl") {
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
    });
  }

  if (input.name === "check_membership") {
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
    return agentAccessTextResult({
      ok: true,
      projectId: parsed.projectId,
      userId: subjectUserId,
      status,
      allowed: status === "active" || status === "owner",
    });
  }

  if (input.name === "mint_allow_claim") {
    const parsed = parseProjectIdArgs(input.args);
    if (parsed === null) {
      return agentAccessTextResult(
        { ok: false, error: "projectId required.", code: "invalid_arguments" },
        true,
      );
    }
    const minted = await mintProjectAllowClaim({
      projectId: parsed.projectId,
      actorUserId: input.actor.id,
    });
    if (!minted.ok) {
      return agentAccessTextResult(
        { ok: false, error: minted.code, code: minted.code },
        true,
      );
    }
    return agentAccessTextResult({
      ok: true,
      allowClaim: minted.allowClaim,
      expiresAt: minted.expiresAt,
      projectId: minted.projectId,
      note: "Validate with AWC before peer sync; revoke invalidates immediately.",
    });
  }

  return null;
};
