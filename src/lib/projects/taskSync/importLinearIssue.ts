import { asRowArray, getSql } from "@/lib/db";
import { hashTaskSyncFields } from "@/lib/projects/taskSync/hashTaskSyncFields";
import { upsertTaskLink } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import type {
  ExternalTaskRef,
  TaskSyncFields,
} from "@/lib/projects/taskSync/taskSync.types";
import { applyExternalProjectTaskChange } from "@/lib/projects/tasks/applyExternalProjectTaskChange";
import { ensureProjectTaskRecordsSchema } from "@/lib/projects/tasks/ensureProjectTaskRecordsSchema";
import { countProjectTaskRecords } from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import { insertProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";
import {
  PROJECT_TASK_PROJECT_ROW_CAP,
  PROJECT_TASK_TITLE_MAX_CHARS,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/**
 * A task we pushed ourselves whose issueCreate webhook beat the link upsert:
 * same title, no link yet, touched in the last 2 minutes.
 */
const findJustPushedTaskId = async (
  projectId: string,
  title: string,
): Promise<string | null> => {
  await ensureProjectTaskRecordsSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT t.id FROM project_task_records t
      WHERE t.project_id = ${projectId} AND t.title = ${title}
        AND t.updated_at > NOW() - INTERVAL '2 minutes'
        AND NOT EXISTS (
          SELECT 1 FROM project_task_external_links l
          WHERE l.task_id = t.id AND l.provider = 'linear')
      ORDER BY t.updated_at DESC LIMIT 1
    `,
  );
  return typeof rows[0]?.id === "string" ? rows[0].id : null;
};

/** import_new: a Linear issue we do not know yet becomes an AW task + link. */
export const importLinearIssue = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly ref: ExternalTaskRef;
  readonly fields: TaskSyncFields;
}): Promise<"imported" | "linked" | "capped" | "failed"> => {
  const { projectId, fields } = input;
  const title = fields.title.slice(0, PROJECT_TASK_TITLE_MAX_CHARS);
  const link = (taskId: string, hash: string) =>
    upsertTaskLink({
      projectId,
      provider: "linear",
      taskId,
      externalId: input.ref.externalId,
      identifier: input.ref.identifier,
      url: input.ref.url,
      hash,
    });
  const pushedId = await findJustPushedTaskId(projectId, title);
  if (pushedId !== null) {
    await link(pushedId, hashTaskSyncFields(fields));
    return "linked";
  }
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
  await link(task.id, hashTaskSyncFields({ ...fields, title }));
  return applied.ok ? "imported" : "failed";
};
