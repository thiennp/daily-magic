import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";

/** Revoke: the owner; an active member unless the owner turned "delete skills" off for members. */
export const decideProjectSkillRevokeAccess = (input: {
  readonly role: ProjectSkillActorRole;
  readonly memberMayDelete: boolean;
}): boolean =>
  input.role === "owner" || (input.role === "member" && input.memberMayDelete);
