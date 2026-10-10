import { recordSkillUsesOnTaskStatus } from "@/lib/knowledge/skillUses/recordSkillUsesOnTaskStatus";
import { announceProjectTaskBlocked } from "@/lib/projects/tasks/announceProjectTaskBlocked";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

/**
 * Side effects of a saved task update: note the skills of a run that started
 * or ended, and tell the project chat when a bot blocked a task.
 * `announceBlocked` is set for bots, whose blocked tasks the chat hears about.
 */
export const afterProjectTaskUpdated = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly before: ProjectTaskStatus;
  readonly task: ProjectTaskRecord;
  readonly blockedReason: string | null;
  readonly announceBlocked: boolean;
}): Promise<void> => {
  await recordSkillUsesOnTaskStatus({
    projectId: input.projectId,
    taskId: input.task.id,
    actorUserId: input.actorUserId,
    before: input.before,
    after: input.task.status,
    blockedReason: input.blockedReason,
  });
  if (input.announceBlocked && input.blockedReason !== null) {
    await announceProjectTaskBlocked({
      actorUserId: input.actorUserId,
      projectId: input.projectId,
      title: input.task.title,
      reason: input.blockedReason,
    });
  }
};
