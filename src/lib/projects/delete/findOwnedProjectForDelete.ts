import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import type FindOwnedProjectForDeleteResult from "@/lib/projects/delete/types/FindOwnedProjectForDeleteResult.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/**
 * Ownership gate: unknown id → not_found; exists but other owner → not_owner
 * (403); Default project → default_project.
 */
const findOwnedProjectForDelete = async (
  target: ProjectDeleteTarget,
): Promise<FindOwnedProjectForDeleteResult> => {
  const projectId = target.projectId.trim();
  const ownerUserId = target.ownerUserId.trim();
  if (projectId.length === 0 || ownerUserId.length === 0) {
    return { kind: "not_found" };
  }

  const project = await getUserProjectById(projectId);
  if (project === null) {
    return { kind: "not_found" };
  }
  if (project.ownerUserId !== ownerUserId) {
    return { kind: "not_owner" };
  }
  if (isDefaultUserProject(project)) {
    return { kind: "default_project" };
  }

  return { kind: "owned", project };
};

export default findOwnedProjectForDelete;
