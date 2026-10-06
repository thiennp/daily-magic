import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";

/** Create / publish / save draft: project owner only. */
export const decideProjectSkillPublishAccess = (input: {
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly existingPublisherUserId: string | null;
}): boolean => {
  void input.actorUserId;
  void input.existingPublisherUserId;
  return input.role === "owner";
};
