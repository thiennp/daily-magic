import type {
  ProjectSkillActorRole,
  ProjectSkillFailure,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";

/** Owner, active member, or viewer; else not_found / forbidden. */
export const resolveProjectSkillMemberRole = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<
  | { readonly ok: true; readonly role: Exclude<ProjectSkillActorRole, "none"> }
  | ProjectSkillFailure
> => {
  const role = await resolveProjectSkillActorRole(input);
  if (role === "project_not_found") {
    return { ok: false, code: "not_found" };
  }
  if (role === "none") {
    return { ok: false, code: "forbidden" };
  }
  return { ok: true, role };
};
