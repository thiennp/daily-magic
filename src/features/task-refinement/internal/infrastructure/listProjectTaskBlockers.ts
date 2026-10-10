import { SKILL_BLOCK_STALE_HOURS } from "@agent-witch/shared/taskRefinement";

import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import { announceProjectTaskBlocked } from "@/lib/projects/tasks/announceProjectTaskBlocked";
import {
  handOffStaleSkillBlocks,
  listSkillBlockedTasks,
  type SkillBlockedTask,
} from "@/lib/projects/tasks/refine/projectTaskBlockQueries";

export type ListProjectTaskBlockersResult =
  | {
      readonly ok: true;
      readonly blockers: readonly SkillBlockedTask[];
      readonly handedToUser: number;
    }
  | {
      readonly ok: false;
      readonly code: ProjectTaskWriterDenyCode | "invalid_arguments";
    };

/**
 * list_project_task_blockers: tasks waiting for a skill to be made. A CLI
 * calls this first when it wakes, makes the skills (publish_project_skill
 * unblocks them), and the ones waiting too long go to a person.
 */
export const listProjectTaskBlockers = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<ListProjectTaskBlockersResult> => {
  const projectId = (input.args as { projectId?: unknown } | null)?.projectId;
  if (typeof projectId !== "string" || projectId.length === 0) {
    return { ok: false, code: "invalid_arguments" };
  }
  const writer = await authorizeProjectTaskWriter({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!writer.ok) return writer;
  const stale = await handOffStaleSkillBlocks({
    projectId,
    hours: SKILL_BLOCK_STALE_HOURS,
  });
  if (stale.length > 0) {
    await announceProjectTaskBlocked({
      actorUserId: input.actorUserId,
      projectId,
      title: `${stale.length} task(s)`,
      reason: `waited over ${SKILL_BLOCK_STALE_HOURS}h for a skill; needs a person`,
    });
  }
  return {
    ok: true,
    blockers: await listSkillBlockedTasks(projectId),
    handedToUser: stale.length,
  };
};
