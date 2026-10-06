import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";

/** Revoke: project owner only. */
export const decideProjectSkillRevokeAccess = (input: {
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly publisherUserId: string;
}): boolean => {
  void input.actorUserId;
  void input.publisherUserId;
  return input.role === "owner";
};
