import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";

/** Revoke = project owner, or the publisher while still an active member. */
export const decideProjectSkillRevokeAccess = (input: {
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly publisherUserId: string;
}): boolean => {
  if (input.role === "owner") {
    return true;
  }
  return input.role === "member" && input.publisherUserId === input.actorUserId;
};
