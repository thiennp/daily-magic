import {
  dedupeSubtasks,
  PARENT_MAX_CHILDREN,
  subtaskDedupeKey,
} from "@agent-witch/shared/taskRefinement";

import { matchProjectSkillForTask } from "@/features/project-skill-share/public-api/infrastructure";
import {
  insertSplitChildren,
  type CreatedSubtask,
} from "@/features/task-refinement/internal/infrastructure/insertSplitChildren";
import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import { loadProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import { loadProjectTaskOwnerIsBot } from "@/lib/projects/tasks/refine/loadProjectTaskOwnerIsBot";
import { parseSplitArgs } from "@/lib/projects/tasks/refine/parseRefineArgs";
import { planSubtasks } from "@/lib/projects/tasks/refine/planSubtasks";
import {
  listProjectTaskChildren,
  loadProjectTaskRefinement,
} from "@/lib/projects/tasks/refine/projectTaskRefinementQueries";
import { syncParentTaskStatus } from "@/lib/projects/tasks/refine/syncParentTaskStatus";

export type SplitProjectTaskResult =
  | {
      readonly ok: true;
      readonly created: readonly CreatedSubtask[];
      readonly duplicates: readonly string[];
    }
  | {
      readonly ok: false;
      readonly code:
        | ProjectTaskWriterDenyCode
        | "invalid_arguments"
        | "task_not_found"
        | "nested_not_allowed"
        | "too_many_subtasks";
    };

/**
 * split_project_task: turn one request (parent) into single-purpose children.
 * Repeats are dropped, each child gets the closest published skill and the
 * cheapest tier, and goes to the parent's owner. A bot owner whose child needs
 * a skill that does not exist yet is blocked on that skill.
 */
export const splitProjectTask = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<SplitProjectTaskResult> => {
  const parsed = parseSplitArgs(input.args);
  if (!parsed.ok) return parsed;
  const { projectId, taskId, subtasks } = parsed;
  const writer = await authorizeProjectTaskWriter({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!writer.ok) return writer;
  const parent = await loadProjectTaskRecord({ projectId, taskId });
  if (parent === null) return { ok: false, code: "task_not_found" };
  if ((await loadProjectTaskRefinement(taskId))?.parentTaskId) {
    return { ok: false, code: "nested_not_allowed" };
  }
  const existing = await listProjectTaskChildren(taskId);
  const { kept, dropped } = dedupeSubtasks(
    subtasks,
    new Set(
      existing.map((c) =>
        subtaskDedupeKey({
          title: c.title,
          skillId: c.skillId ?? undefined,
          skillParams: c.skillParams,
        }),
      ),
    ),
  );
  if (existing.length + kept.length > PARENT_MAX_CHILDREN) {
    return { ok: false, code: "too_many_subtasks" };
  }
  const plan = await planSubtasks({
    subtasks: kept,
    ownerIsBot: await loadProjectTaskOwnerIsBot(parent.ownerMembershipId),
    matchSkill: async (title) =>
      (
        await matchProjectSkillForTask({
          actorUserId: input.actorUserId,
          projectId,
          text: title,
        })
      )?.skillId ?? null,
  });
  const created = await insertSplitChildren({
    actorUserId: input.actorUserId,
    actorMembershipId: writer.membership?.id ?? null,
    parent,
    plan,
  });
  if (created[0] !== undefined) {
    await syncParentTaskStatus({ projectId, taskId: created[0].id });
  }
  return { ok: true, created, duplicates: dropped.map((d) => d.title) };
};
