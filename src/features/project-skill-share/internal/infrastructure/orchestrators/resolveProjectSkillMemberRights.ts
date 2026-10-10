import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";
import {
  PROJECT_SKILL_ALL_RIGHTS,
  PROJECT_SKILL_NO_RIGHTS,
  type ProjectSkillMemberRights,
} from "@/features/project-skill-share/internal/core/projectSkillMemberRights.type";
import { readProjectMemberPermissions } from "@/lib/projects/acl/memberPermissions/readProjectMemberPermissions";

/** Owner: everything. Member: what the owner left on. Anyone else: nothing. */
export const resolveProjectSkillMemberRights = async (input: {
  readonly projectId: string;
  readonly role: ProjectSkillActorRole;
}): Promise<ProjectSkillMemberRights> => {
  if (input.role === "owner") return PROJECT_SKILL_ALL_RIGHTS;
  if (input.role !== "member") return PROJECT_SKILL_NO_RIGHTS;
  const permissions = await readProjectMemberPermissions(input.projectId);
  return {
    publish: permissions["skill.publish"],
    delete: permissions["skill.delete"],
  };
};
