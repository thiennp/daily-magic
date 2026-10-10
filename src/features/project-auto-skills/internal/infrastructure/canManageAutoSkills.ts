import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/public-api/infrastructure";
import { authorizeProjectMemberPermission } from "@/lib/projects/acl/memberPermissions/authorizeProjectMemberPermission";

/**
 * The owner, or a member while the owner left "auto skills" on. Viewers and
 * strangers never; this is the one gate for the overview, settings, scan and
 * answering questions.
 */
export const canManageAutoSkills = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<boolean> => {
  const role = await resolveProjectSkillMemberRole(input);
  return role.ok
    ? authorizeProjectMemberPermission({
        projectId: input.projectId,
        role: role.role,
        key: "autoSkill.manage",
      })
    : false;
};
