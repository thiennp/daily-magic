import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { auditProjectAclActivityEvent } from "@/lib/agentAccess/auditProjectAclActivityEvent";
import { parseProjectIdArgs } from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { mintProjectAllowClaim } from "@/lib/projects/acl/mintProjectAllowClaim";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

export const executeProjectAclClaimTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "mint_allow_claim") {
    return null;
  }
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
    await auditProjectAclActivityEvent({
      projectId: parsed.projectId,
      actorUserId: input.actor.id,
      action: "allow_claim_deny",
      targetUserId: input.actor.id,
      detail: { outcome: "deny", status: minted.code },
    });
    return agentAccessTextResult(
      { ok: false, error: minted.code, code: minted.code },
      true,
    );
  }
  await writeProjectAccessAudit({
    projectId: minted.projectId,
    actorUserId: input.actor.id,
    action: "allow_claim_ok",
    targetUserId: input.actor.id,
    detail: { outcome: "ok" },
  });
  return agentAccessTextResult({
    ok: true,
    allowClaim: minted.allowClaim,
    expiresAt: minted.expiresAt,
    projectId: minted.projectId,
    note: "Validate with AWC before peer sync; revoke invalidates immediately.",
  });
};
