import { projectTaskDependsOnReaches } from "@/lib/projects/tasks/projectTaskDependsOnReaches";
import {
  countProjectTaskRecordsIn,
  isActiveProjectTaskOwnerSeat,
} from "@/lib/projects/tasks/projectTaskRecordReadQueries";

export type ProjectTaskRefError =
  | "owner_not_member"
  | "self_dependency"
  | "depends_on_not_found"
  | "depends_on_cycle"
  | "plan_item_not_found";

/**
 * Cross-row checks: ownerBot is an active non-viewer seat of this project;
 * every dependsOn id / planItemId is a task of the SAME project; never the
 * task itself; no dependsOn cycle (A → B → A) once the task exists.
 */
export const validateProjectTaskRefs = async (input: {
  readonly projectId: string;
  readonly taskId: string | null;
  readonly ownerMembershipId?: string | null;
  readonly dependsOn?: readonly string[];
  readonly planItemId?: string | null;
}): Promise<
  | { readonly ok: true }
  | { readonly ok: false; readonly code: ProjectTaskRefError }
> => {
  const owner = input.ownerMembershipId;
  if (
    typeof owner === "string" &&
    !(await isActiveProjectTaskOwnerSeat({
      projectId: input.projectId,
      membershipId: owner,
    }))
  ) {
    return { ok: false, code: "owner_not_member" };
  }
  const deps = input.dependsOn ?? [];
  if (input.taskId !== null && deps.includes(input.taskId)) {
    return { ok: false, code: "self_dependency" };
  }
  if (deps.length > 0) {
    const found = await countProjectTaskRecordsIn({
      projectId: input.projectId,
      ids: deps,
    });
    if (found !== deps.length)
      return { ok: false, code: "depends_on_not_found" };
    if (
      input.taskId !== null &&
      (await projectTaskDependsOnReaches({
        projectId: input.projectId,
        fromIds: deps,
        targetId: input.taskId,
      }))
    ) {
      return { ok: false, code: "depends_on_cycle" };
    }
  }
  const plan = input.planItemId;
  if (typeof plan === "string") {
    if (plan === input.taskId) return { ok: false, code: "self_dependency" };
    const found = await countProjectTaskRecordsIn({
      projectId: input.projectId,
      ids: [plan],
    });
    if (found !== 1) return { ok: false, code: "plan_item_not_found" };
  }
  return { ok: true };
};
