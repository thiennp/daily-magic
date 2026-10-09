import {
  hashDescription,
  hashTaskSyncFields,
} from "@/lib/projects/taskSync/hashTaskSyncFields";
import { upsertTaskLink } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import type {
  ExternalTaskRef,
  TaskSyncFields,
} from "@/lib/projects/taskSync/taskSync.types";
import { applyExternalProjectTaskChange } from "@/lib/projects/tasks/applyExternalProjectTaskChange";
import { countProjectTaskRecords } from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import { insertProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";
import {
  PROJECT_TASK_PROJECT_ROW_CAP,
  PROJECT_TASK_TITLE_MAX_CHARS,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/**
 * import_new: a Linear issue with no link becomes an AW task + link. Issues we
 * created ourselves always have a (reserved) link before Linear can send their
 * webhook, so no dedupe heuristic is needed here.
 */
export const importLinearIssue = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly ref: ExternalTaskRef;
  readonly fields: TaskSyncFields;
  readonly descriptionClipped: boolean;
}): Promise<"imported" | "capped" | "failed"> => {
  const { projectId, fields } = input;
  const title = fields.title.slice(0, PROJECT_TASK_TITLE_MAX_CHARS);
  if (
    (await countProjectTaskRecords(projectId)) >= PROJECT_TASK_PROJECT_ROW_CAP
  ) {
    return "capped";
  }
  const task = await insertProjectTaskRecord({
    projectId,
    createdByUserId: input.ownerUserId,
    createdByMembershipId: null,
    values: {
      title,
      description: fields.description,
      resultSummary: null,
      status: fields.status === "planned" ? "planned" : "queued",
      priority: fields.priority,
      stage: null,
      tipSha: null,
      ownerMembershipId: null,
      dependsOn: [],
      planItemId: null,
    },
  });
  const applied = await applyExternalProjectTaskChange({
    projectId,
    taskId: task.id,
    actorUserId: input.ownerUserId,
    actorLabel: "Linear",
    change: { ...fields, title },
  });
  await upsertTaskLink({
    projectId,
    provider: "linear",
    taskId: task.id,
    externalId: input.ref.externalId,
    identifier: input.ref.identifier,
    url: input.ref.url,
    hash: hashTaskSyncFields({ ...fields, title }),
    clippedDescriptionHash: input.descriptionClipped
      ? hashDescription(fields.description)
      : null,
  });
  return applied.ok ? "imported" : "failed";
};
