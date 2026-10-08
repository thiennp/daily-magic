import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import { canActorEditProjectTask } from "@/lib/projects/tasks/canActorEditProjectTask";
import { decideProjectTaskStatusUpdate } from "@/lib/projects/tasks/decideProjectTaskStatusUpdate";
import {
  isProjectTaskWriteUnchanged,
  mergeProjectTaskPatch,
} from "@/lib/projects/tasks/mergeProjectTaskPatch";
import {
  parseUpdateProjectTaskArgs,
  type ProjectTaskArgsError,
} from "@/lib/projects/tasks/parseProjectTaskToolArgs";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { loadProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import { updateProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";
import {
  validateProjectTaskRefs,
  type ProjectTaskRefError,
} from "@/lib/projects/tasks/validateProjectTaskRefs";

export type UpdateProjectTaskResult =
  | { readonly ok: true; readonly task: ProjectTaskRecord }
  | {
      readonly ok: false;
      readonly code:
        | ProjectTaskWriterDenyCode
        | ProjectTaskArgsError
        | ProjectTaskRefError
        | "task_not_found"
        | "not_task_owner"
        | "task_done"
        | "invalid_transition"
        | "update_conflict";
    };

/**
 * Orchestrator (DF-024 update_project_task): args → writer gate → record of
 * this project → edit right (owner and owner-claimed bots: every task; others:
 * tasks they created or own) → explicit status FSM → no-op edit (incl. retrying
 * done on a done task) = ok, no write; any other change to a done task →
 * task_done → owner/dependsOn/planItem refs (no self, no cycle) →
 * compare-and-set on the status + updated_at read (concurrent move or edit →
 * update_conflict).
 */
export const updateProjectTask = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<UpdateProjectTaskResult> => {
  const parsed = parseUpdateProjectTaskArgs(input.args);
  if (!parsed.ok) return parsed;
  const { projectId, taskId, status, fields } = parsed.value;

  const writer = await authorizeProjectTaskWriter({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!writer.ok) return writer;

  const current = await loadProjectTaskRecord({ projectId, taskId });
  if (current === null) return { ok: false, code: "task_not_found" };
  if (
    !(await canActorEditProjectTask({
      task: current,
      actorUserId: input.actorUserId,
      ownerUserId: writer.ownerUserId,
      membership: writer.membership,
    }))
  ) {
    return { ok: false, code: "not_task_owner" };
  }

  const decision = decideProjectTaskStatusUpdate({
    currentStatus: current.status,
    nextStatus: status ?? current.status,
  });
  if (!decision.ok) return decision;
  const values = mergeProjectTaskPatch({
    current,
    fields,
    status: decision.status,
  });
  // No-op (incl. a done retry): no write, updated_at untouched.
  if (isProjectTaskWriteUnchanged(current, values)) {
    return { ok: true, task: current };
  }
  if (current.status === "done") return { ok: false, code: "task_done" };

  const refs = await validateProjectTaskRefs({
    projectId,
    taskId,
    ownerMembershipId: fields.ownerMembershipId,
    dependsOn: fields.dependsOn,
    planItemId: fields.planItemId,
  });
  if (!refs.ok) return refs;

  const task = await updateProjectTaskRecord({
    projectId,
    taskId,
    expectedStatus: current.status,
    expectedUpdatedAt: current.updatedAt,
    values,
  });
  return task === null
    ? { ok: false, code: "update_conflict" }
    : { ok: true, task };
};
