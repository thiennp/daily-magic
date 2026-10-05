import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import type FindOwnedProjectForDeleteResult from "@/lib/projects/delete/types/FindOwnedProjectForDeleteResult.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/**
 * Ownership gate: unknown ids and projects owned by someone else both read as
 * not_found so a non-owner cannot probe which project ids exist.
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
  if (project === null || project.ownerUserId !== ownerUserId) {
    return { kind: "not_found" };
  }
  if (isDefaultUserProject(project)) {
    return { kind: "default_project" };
  }

  return { kind: "owned", project };
};

export default findOwnedProjectForDelete;
