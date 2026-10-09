import type {
  ProjectSkillActorRole,
  ProjectSkillState,
} from "@/features/project-skill-share/internal/core/projectSkill.type";

/** Revoke: the owner; an active member for any draft, or for a skill they published. */
export const decideProjectSkillRevokeAccess = (input: {
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly publisherUserId: string;
  readonly state?: ProjectSkillState;
}): boolean =>
  input.role === "owner" ||
  (input.role === "member" &&
    (input.state === "draft" || input.actorUserId === input.publisherUserId));
