import { findProjectTaskStatusPath } from "@/lib/projects/tasks/findProjectTaskStatusPath";
import { mergeProjectTaskPatch } from "@/lib/projects/tasks/mergeProjectTaskPatch";
import { notifyProjectTaskChanged } from "@/lib/projects/tasks/notifyProjectTaskChanged";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { loadProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import { updateProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";
import type {
  ProjectTaskPriority,
  ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export type ExternalProjectTaskChange = {
  readonly title: string;
  readonly description: string | null;
  readonly priority: ProjectTaskPriority | null;
  readonly status: ProjectTaskStatus;
};

export type ApplyExternalProjectTaskChangeResult =
  | { readonly ok: true; readonly task: ProjectTaskRecord }
  | {
      readonly ok: false;
      readonly code:
        "task_not_found" | "invalid_transition" | "update_conflict";
    };

/**
 * Internal (no seat check) update for changes arriving from an external
 * tracker. Status moves walk the explicit FSM step by step so started_at /
 * blocked_at / done_at stay right; an unreachable status → invalid_transition.
 * Notifies seats once with the given actorLabel. actorUserId = project owner.
 */
export const applyExternalProjectTaskChange = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly actorUserId: string;
  readonly actorLabel: string;
  readonly change: ExternalProjectTaskChange;
}): Promise<ApplyExternalProjectTaskChangeResult> => {
  const { projectId, taskId, change } = input;
  const before = await loadProjectTaskRecord({ projectId, taskId });
  if (before === null) return { ok: false, code: "task_not_found" };
  const path = findProjectTaskStatusPath(before.status, change.status);
  if (path === null) return { ok: false, code: "invalid_transition" };

  const fields = {
    title: change.title,
    description: change.description,
    priority: change.priority,
  };
  const steps = path.length === 0 ? [before.status] : path;
  const after = await steps.reduce<Promise<ProjectTaskRecord | null>>(
    async (prev, status) => {
      const current = await prev;
      if (current === null) return null;
      return updateProjectTaskRecord({
        projectId,
        taskId,
        expectedStatus: current.status,
        expectedUpdatedAt: current.updatedAt,
        values: mergeProjectTaskPatch({ current, fields, status }),
      });
    },
    Promise.resolve(before),
  );
  if (after === null) return { ok: false, code: "update_conflict" };
  await notifyProjectTaskChanged({
    projectId,
    actorUserId: input.actorUserId,
    actorMembershipId: null,
    actorLabel: input.actorLabel,
    before,
    after,
  });
  return { ok: true, task: after };
};
