import type { ProjectTaskFieldPatch } from "@/lib/projects/tasks/parseProjectTaskFields";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import type { ProjectTaskRecordWrite } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

const pick = <T>(patch: T | undefined, current: T): T =>
  patch === undefined ? current : patch;

/** Current record + patch (undefined keeps, null clears) → full write snapshot. */
export const mergeProjectTaskPatch = (input: {
  readonly current: ProjectTaskRecord;
  readonly fields: ProjectTaskFieldPatch;
  readonly status: ProjectTaskStatus;
}): ProjectTaskRecordWrite => {
  const { current: c, fields: f } = input;
  return {
    title: pick(f.title, c.title),
    description: pick(f.description, c.description),
    status: input.status,
    priority: pick(f.priority, c.priority),
    stage: pick(f.stage, c.stage),
    tipSha: pick(f.tipSha, c.tipSha),
    ownerMembershipId: pick(f.ownerMembershipId, c.ownerMembershipId),
    dependsOn: pick(f.dependsOn, c.dependsOn),
    planItemId: pick(f.planItemId, c.planItemId),
  };
};
