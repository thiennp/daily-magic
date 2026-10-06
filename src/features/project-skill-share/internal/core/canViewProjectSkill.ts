import type {
  ProjectSkillActorRole,
  ProjectSkillState,
} from "@/features/project-skill-share/internal/core/projectSkill.type";

/** Published: owner | member | viewer. Draft / revoked: owner only. */
export const canViewProjectSkill = (input: {
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly state: ProjectSkillState;
  readonly publisherUserId: string;
}): boolean => {
  void input.actorUserId;
  void input.publisherUserId;
  if (input.role === "none") {
    return false;
  }
  if (input.state === "published") {
    return (
      input.role === "owner" ||
      input.role === "member" ||
      input.role === "viewer"
    );
  }
  return input.role === "owner";
};
