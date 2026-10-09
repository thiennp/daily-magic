import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";

/** Revoke: the project owner, or an active member revoking a skill they published. */
export const decideProjectSkillRevokeAccess = (input: {
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly publisherUserId: string;
}): boolean =>
  input.role === "owner" ||
  (input.role === "member" && input.actorUserId === input.publisherUserId);
