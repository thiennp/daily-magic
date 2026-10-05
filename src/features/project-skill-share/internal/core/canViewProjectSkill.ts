import type {
  ProjectSkillActorRole,
  ProjectSkillState,
} from "@/features/project-skill-share/internal/core/projectSkill.type";

/** Published: every active member or the owner. Draft / revoked: publisher or owner only. */
export const canViewProjectSkill = (input: {
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly state: ProjectSkillState;
  readonly publisherUserId: string;
}): boolean => {
  if (input.role === "none") {
    return false;
  }
  if (input.state === "published") {
    return true;
  }
  return input.role === "owner" || input.publisherUserId === input.actorUserId;
};
