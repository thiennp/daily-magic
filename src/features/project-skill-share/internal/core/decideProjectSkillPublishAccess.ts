import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { PROJECT_SKILL_ACL_MESSAGES } from "@/features/project-skill-share/internal/core/projectSkillAclMessages.constant";

export type ProjectSkillPublishAccess =
  | {
      readonly allowed: true;
      /** Member draft: add a draft version only; never touch the live row. */
      readonly draftOnly: boolean;
    }
  | { readonly allowed: false; readonly message: string };

/**
 * The one publish ACL (server fn, HTTP POST, MCP publish_project_skill):
 * owner publishes, promotes and saves drafts; an active member publishes and
 * promotes their own skills (new, or one they published) but on someone
 * else's skill may only save drafts (asDraft: true with a body);
 * viewer / none never write.
 */
export const decideProjectSkillPublishAccess = (input: {
  readonly role: ProjectSkillActorRole;
  readonly asDraft: boolean;
  readonly hasBody: boolean;
  /** No row yet, or the actor published it. */
  readonly isOwnSkill: boolean;
}): ProjectSkillPublishAccess => {
  if (input.role === "owner") return { allowed: true, draftOnly: false };
  if (input.role !== "member") {
    return { allowed: false, message: PROJECT_SKILL_ACL_MESSAGES.viewerWrite };
  }
  if (input.isOwnSkill) return { allowed: true, draftOnly: false };
  return input.asDraft && input.hasBody
    ? { allowed: true, draftOnly: true }
    : { allowed: false, message: PROJECT_SKILL_ACL_MESSAGES.ownerOnlyPublish };
};
