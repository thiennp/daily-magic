import { decideProjectSkillRevokeAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillRevokeAccess";
import { PROJECT_SKILL_ACL_MESSAGES } from "@/features/project-skill-share/internal/core/projectSkillAclMessages.constant";
import { isProjectSkillRefArgs } from "@/features/project-skill-share/internal/core/isProjectSkillRefArgs.guardz";
import type { RevokeProjectSkillResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { toProjectSkillView } from "@/features/project-skill-share/internal/core/toProjectSkillView";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { updateProjectSkillRevoked } from "@/features/project-skill-share/internal/infrastructure/db/updateProjectSkillRevoked";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole";

/** Orchestrator: revoke_project_skill (owner; a member unless the owner turned "delete skills" off). Idempotent on revoked. */
export const revokeProjectSkill = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<RevokeProjectSkillResult> => {
  if (!isProjectSkillRefArgs(input.args)) {
    return { ok: false, code: "invalid_arguments" };
  }
  const { projectId, skillId } = input.args;
  const access = await resolveProjectSkillMemberRole({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) return access;
  const record = await selectProjectSkillRow({ projectId, skillId });
  if (record === null) {
    return { ok: false, code: "not_found" };
  }
  const viewer = {
    role: access.role,
    actorUserId: input.actorUserId,
    rights: access.rights,
  };
  if (
    !decideProjectSkillRevokeAccess({
      role: access.role,
      memberMayDelete: access.rights.delete,
    })
  ) {
    return {
      ok: false,
      code: "forbidden",
      message: PROJECT_SKILL_ACL_MESSAGES.ownerOnlyRevoke,
    };
  }
  const revoked =
    record.state === "revoked"
      ? record
      : await updateProjectSkillRevoked({
          skillRowId: record.rowId,
          actorUserId: input.actorUserId,
        });
  if (revoked === null) {
    return { ok: false, code: "not_found" };
  }
  return {
    ok: true,
    skill: toProjectSkillView({ ...viewer, record: revoked }),
  };
};
