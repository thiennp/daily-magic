import { matchProjectSkillForTask } from "@/features/project-skill-share/public-api/infrastructure";
import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriter,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import { notifyProjectTaskChanged } from "@/lib/projects/tasks/notifyProjectTaskChanged";
import { loadProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import {
  clearSkillBlock,
  listSkillBlockedTasks,
  type SkillBlockedTask,
} from "@/lib/projects/tasks/refine/projectTaskBlockQueries";
import { setProjectTaskStatusDerived } from "@/lib/projects/tasks/refine/projectTaskStatusSyncQueries";
import { syncParentTaskStatus } from "@/lib/projects/tasks/refine/syncParentTaskStatus";

const unblockOne = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly writer: Extract<ProjectTaskWriter, { ok: true }>;
  readonly blocked: SkillBlockedTask;
}): Promise<boolean> => {
  const { projectId, blocked, writer } = input;
  const match = await matchProjectSkillForTask({
    actorUserId: input.actorUserId,
    projectId,
    text: blocked.title,
  });
  if (match === null) return false;
  const ref = { projectId, taskId: blocked.taskId };
  const before = await loadProjectTaskRecord(ref);
  await clearSkillBlock({ taskId: blocked.taskId, skillId: match.skillId });
  await setProjectTaskStatusDerived({ ...ref, status: "queued" });
  const after = await loadProjectTaskRecord(ref);
  if (before !== null && after !== null) {
    await notifyProjectTaskChanged({
      projectId,
      actorUserId: input.actorUserId,
      actorMembershipId: writer.membership?.id ?? null,
      actorLabel: writer.membership?.projectDisplayName ?? "Owner",
      before,
      after,
    });
  }
  await syncParentTaskStatus(ref);
  return true;
};

/**
 * After a skill is published: every task blocked on a skill that now has a
 * matching published skill gets it attached and goes back to the queue. Each
 * unblock tells the project (task.updated). Best effort; returns the count.
 */
export const retryBlockedSkillTasks = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
}): Promise<number> => {
  const writer = await authorizeProjectTaskWriter(input);
  if (!writer.ok) return 0;
  const results: boolean[] = [];
  for (const blocked of await listSkillBlockedTasks(input.projectId)) {
    results.push(await unblockOne({ ...input, writer, blocked }));
  }
  return results.filter(Boolean).length;
};
