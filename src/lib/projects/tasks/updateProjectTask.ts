import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import { decideProjectTaskStatusUpdate } from "@/lib/projects/tasks/decideProjectTaskStatusUpdate";
import {
  isProjectTaskWriteUnchanged,
  mergeProjectTaskPatch,
} from "@/lib/projects/tasks/mergeProjectTaskPatch";
import {
  parseUpdateProjectTaskArgs,
  type ProjectTaskArgsError,
} from "@/lib/projects/tasks/parseProjectTaskToolArgs";
import { announceProjectTaskBlocked } from "@/lib/projects/tasks/announceProjectTaskBlocked";
import { checkBotTaskReport } from "@/lib/projects/tasks/checkBotTaskReport";
import { syncParentTaskStatus } from "@/lib/projects/tasks/refine/syncParentTaskStatus";
import { notifyProjectTaskChanged } from "@/lib/projects/tasks/notifyProjectTaskChanged";
import { afterProjectTaskWrite } from "@/lib/projects/tasks/afterProjectTaskWrite";
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
        | "result_summary_required"
        | "blocked_reason_required"
        | "invalid_transition"
        | "update_conflict";
    };

/**
 * Orchestrator (DF-024 update_project_task): args → writer gate → record of
 * this project → explicit status FSM (any writer may change any task, incl.
 * stopping work and reopening done) → no-op edit = ok, no write →
 * owner/dependsOn/planItem refs (no self, no cycle) → compare-and-set on the
 * status + updated_at read (concurrent move or edit → update_conflict).
 */
export const updateProjectTask = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
  /** Bots: finishing a task (→ done) must carry the outcome. */
  readonly requireResultSummaryOnDone?: boolean;
  /** Bots: blocking a task needs `blockedReason` and tells the project chat. */
  readonly announceBlockedInChat?: boolean;
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
  const report = checkBotTaskReport({
    current,
    values,
    args: input.args,
    requireResultSummaryOnDone: input.requireResultSummaryOnDone === true,
    requireBlockedReason: input.announceBlockedInChat === true,
  });
  if (!report.ok) return report;
  const { blockedReason } = report;
  // No-op (incl. a done retry): no write, updated_at untouched.
  if (isProjectTaskWriteUnchanged(current, values)) {
    return { ok: true, task: current };
  }
  const refs = await validateProjectTaskRefs({
    projectId,
    taskId,
    ownerMembershipId: fields.ownerMembershipId,
    currentOwnerMembershipId: writer.membership && current.ownerMembershipId,
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
  if (task === null) return { ok: false, code: "update_conflict" };
  await notifyProjectTaskChanged({
    projectId,
    actorUserId: input.actorUserId,
    actorMembershipId: writer.membership?.id ?? null,
    actorLabel: writer.membership?.projectDisplayName ?? "Owner",
    before: current,
    after: task,
  });
  await afterProjectTaskWrite({ task, origin: "local" });
  await syncParentTaskStatus({ projectId, taskId });
  if (input.announceBlockedInChat === true && blockedReason !== null) {
    await announceProjectTaskBlocked({
      actorUserId: input.actorUserId,
      projectId,
      title: task.title,
      reason: blockedReason,
    });
  }
  return { ok: true, task };
};
