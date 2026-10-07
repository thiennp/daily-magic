import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import { canEditProjectTask } from "@/lib/projects/tasks/canEditProjectTask";
import { decideProjectTaskStatusUpdate } from "@/lib/projects/tasks/decideProjectTaskStatusUpdate";
import { mergeProjectTaskPatch } from "@/lib/projects/tasks/mergeProjectTaskPatch";
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
 * this project (done = final) → edit right (owner: every task; others: tasks
 * they created or own) → explicit status FSM → owner/dependsOn/planItem refs (no self) →
 * compare-and-set on the status read (concurrent move → update_conflict).
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
  if (current.status === "done") return { ok: false, code: "task_done" };
  if (
    !canEditProjectTask({
      task: current,
      actorUserId: input.actorUserId,
      seatId: writer.membership?.id ?? null,
    })
  ) {
    return { ok: false, code: "not_task_owner" };
  }

  const decision = decideProjectTaskStatusUpdate({
    currentStatus: current.status,
    nextStatus: status ?? current.status,
  });
  if (!decision.ok) return decision;

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
    values: mergeProjectTaskPatch({ current, fields, status: decision.status }),
  });
  return task === null
    ? { ok: false, code: "update_conflict" }
    : { ok: true, task };
};
