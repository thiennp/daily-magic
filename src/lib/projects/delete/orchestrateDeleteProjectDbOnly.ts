import findOwnedProjectForDelete from "@/lib/projects/delete/findOwnedProjectForDelete";
import runProjectDeleteTransaction from "@/lib/projects/delete/runProjectDeleteTransaction";
import type DeleteProjectDbOnlyResult from "@/lib/projects/delete/types/DeleteProjectDbOnlyResult.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/**
 * Owner-only project delete that touches the database only.
 * Never reads or writes files, never runs processes, never calls AgentWitch
 * Local or a wake port. Steps: check owner → one guarded DELETE (cascades).
 */
const orchestrateDeleteProjectDbOnly = async (
  target: ProjectDeleteTarget,
): Promise<DeleteProjectDbOnlyResult> => {
  const owned = await findOwnedProjectForDelete(target);
  if (owned.kind !== "owned") {
    return { ok: false, code: owned.kind };
  }

  const deleted = await runProjectDeleteTransaction({
    projectId: owned.project.id,
    ownerUserId: owned.project.ownerUserId,
  });
  if (!deleted) {
    return { ok: false, code: "not_found" };
  }

  return { ok: true, projectId: owned.project.id };
};

export default orchestrateDeleteProjectDbOnly;
