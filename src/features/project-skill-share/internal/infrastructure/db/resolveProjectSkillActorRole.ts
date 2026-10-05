import type { ProjectSkillActorRole } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/**
 * Owner from user_projects. Active human viewer → "viewer" (read published only).
 * Active human member (and bot seats) → "member". No seat → "none".
 */
export const resolveProjectSkillActorRole = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectSkillActorRole | "project_not_found"> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return "project_not_found";
  }
  if (project.ownerUserId === input.actorUserId) {
    return "owner";
  }
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return "none";
  }
  if (membership.memberKind === "human" && membership.role === "viewer") {
    return "viewer";
  }
  return "member";
};
