import findOwnedProjectForDelete from "@/lib/projects/delete/findOwnedProjectForDelete";
import runProjectDeleteTransaction from "@/lib/projects/delete/runProjectDeleteTransaction";
import type DeleteProjectDbOnlyResult from "@/lib/projects/delete/types/DeleteProjectDbOnlyResult.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/**
 * Owner-only project delete that touches the database only.
 * Never reads or writes files, never runs processes, never calls Agent Witch
 * Local or a wake port. Steps: check owner → delete rows in one transaction.
 */
const orchestrateDeleteProjectDbOnly = async (
  target: ProjectDeleteTarget,
): Promise<DeleteProjectDbOnlyResult> => {
  const owned = await findOwnedProjectForDelete(target);
  if (owned.kind !== "owned") {
    return { ok: false, code: owned.kind };
  }

  const ownedTarget: ProjectDeleteTarget = {
    projectId: owned.project.id,
    ownerUserId: owned.project.ownerUserId,
  };
  const deleted = await runProjectDeleteTransaction(ownedTarget);
  if (!deleted) {
    return { ok: false, code: "not_found" };
  }

  return { ok: true, projectId: owned.project.id };
};

export default orchestrateDeleteProjectDbOnly;
