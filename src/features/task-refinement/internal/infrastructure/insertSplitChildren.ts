import { announceRefinedTaskBlocked } from "@/lib/projects/tasks/refine/announceRefinedTaskBlocked";
import type { PlannedSubtask } from "@/lib/projects/tasks/refine/planSubtasks";
import { insertProjectTaskRefinement } from "@/lib/projects/tasks/refine/projectTaskRefinementQueries";
import { setProjectTaskStatusDerived } from "@/lib/projects/tasks/refine/projectTaskStatusSyncQueries";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { insertProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";

export type CreatedSubtask = {
  readonly id: string;
  readonly title: string;
  readonly skillId: string | null;
  readonly effortTier: string;
  readonly status: "queued" | "blocked";
};

/** Insert each planned child under `parent` (same owner), blocking those that wait for a skill. */
export const insertSplitChildren = async (input: {
  readonly actorUserId: string;
  readonly actorMembershipId: string | null;
  readonly parent: ProjectTaskRecord;
  readonly plan: readonly PlannedSubtask[];
}): Promise<readonly CreatedSubtask[]> => {
  const { parent } = input;
  const created: CreatedSubtask[] = [];
  for (const item of input.plan) {
    const child = await insertProjectTaskRecord({
      projectId: parent.projectId,
      createdByUserId: input.actorUserId,
      createdByMembershipId: input.actorMembershipId,
      values: {
        title: item.title,
        description: null,
        resultSummary: null,
        priority: parent.priority,
        stage: null,
        tipSha: null,
        ownerMembershipId: parent.ownerMembershipId,
        dependsOn: [],
        planItemId: null,
        status: "queued",
      },
    });
    await insertProjectTaskRefinement({
      taskId: child.id,
      projectId: parent.projectId,
      parentTaskId: parent.id,
      skillId: item.skillId,
      skillParams: item.skillParams,
      effortTier: item.effortTier,
      blockedOn: item.blockedOnSkill ? "skill" : null,
    });
    if (item.blockedOnSkill) {
      await setProjectTaskStatusDerived({
        projectId: parent.projectId,
        taskId: child.id,
        status: "blocked",
      });
    }
    created.push({
      id: child.id,
      title: item.title,
      skillId: item.skillId,
      effortTier: item.effortTier,
      status: item.blockedOnSkill ? "blocked" : "queued",
    });
  }
  const blocked = created.filter((c) => c.status === "blocked");
  if (blocked.length > 0) {
    await announceRefinedTaskBlocked({
      actorUserId: input.actorUserId,
      projectId: parent.projectId,
      title: parent.title,
      reason: `${blocked.length} subtask(s) need a skill: ${blocked.map((b) => b.title).join("; ")}`,
      blockCount: 1,
    });
  }
  return created;
};
