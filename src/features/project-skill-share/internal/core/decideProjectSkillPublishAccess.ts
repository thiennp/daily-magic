import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";

/**
 * New skill: owner or active member (not viewer). Existing skill: owner or its
 * publisher (members cannot overwrite each other's skills).
 */
export const decideProjectSkillPublishAccess = (input: {
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly existingPublisherUserId: string | null;
}): boolean => {
  if (input.role === "none" || input.role === "viewer") {
    return false;
  }
  if (input.existingPublisherUserId === null || input.role === "owner") {
    return true;
  }
  return input.existingPublisherUserId === input.actorUserId;
};
