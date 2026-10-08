import { asRowArray, getSql } from "@/lib/db";
import { hashTaskSyncFields } from "@/lib/projects/taskSync/hashTaskSyncFields";
import {
  pushTaskToLinear,
  type PushTaskOutcome,
  taskSyncFieldsOf,
} from "@/lib/projects/taskSync/pushTaskToLinear";
import { listLinksByProject } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import { ensureProjectTaskRecordsSchema } from "@/lib/projects/tasks/ensureProjectTaskRecordsSchema";
import { mapProjectTaskRecordRow } from "@/lib/projects/tasks/mapProjectTaskRecordRow";
import { PROJECT_TASK_PROJECT_ROW_CAP } from "@/lib/projects/tasks/projectTaskTools.constant";

/** Tasks pushed per "Sync now" call (each push is several Linear requests). */
export const TASK_SYNC_BATCH_SIZE = 40;

export type SyncAllResult = {
  readonly pushed: number;
  readonly failed: number;
  readonly unchanged: number;
  /** Still pending after this batch; call again until 0. */
  readonly remaining: number;
};

export const syncAllTasksToLinear = async (
  projectId: string,
): Promise<SyncAllResult> => {
  await ensureProjectTaskRecordsSchema();
  const [rows, links] = await Promise.all([
    getSql()`
      SELECT * FROM project_task_records WHERE project_id = ${projectId}
      ORDER BY created_at ASC, id ASC LIMIT ${PROJECT_TASK_PROJECT_ROW_CAP}
    `,
    listLinksByProject(projectId, "linear"),
  ]);
  const hashByTask = new Map(links.map((l) => [l.taskId, l.lastSyncedHash]));
  const tasks = asRowArray(rows).map(mapProjectTaskRecordRow);
  const pending = tasks.filter(
    (t) => hashByTask.get(t.id) !== hashTaskSyncFields(taskSyncFieldsOf(t)),
  );
  const batch = pending.slice(0, TASK_SYNC_BATCH_SIZE);
  const outcomes: PushTaskOutcome[] = [];
  for (const task of batch) outcomes.push(await pushTaskToLinear(task));
  const count = (o: string): number => outcomes.filter((x) => x === o).length;
  return {
    pushed: count("pushed"),
    failed: count("failed"),
    unchanged: tasks.length - pending.length + count("unchanged"),
    remaining: pending.length - batch.length,
  };
};
