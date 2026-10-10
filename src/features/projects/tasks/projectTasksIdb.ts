import {
  keyOfProjectTask,
  toIdbProjectTask,
} from "@/features/projects/sync/public-api/presentation";
import type {
  ProjectTaskIdbRecord,
  ProjectTaskLocalRecord,
  ProjectTaskNeonMeta,
} from "@/features/projects/sync/public-api/types";
import { PROJECT_SYNC_TABLE_PROJECT_TASKS } from "@/features/projects/sync/public-api/types";
import {
  listProjectSyncByProject,
  listProjectSyncByProjectOrThrowSoft,
  readProjectSyncRow,
  writeProjectSyncRow,
} from "@/features/projects/sync/public-api/presentation";

export type ProjectTaskIdbRow = ProjectTaskIdbRecord & {
  readonly taskKey: string;
};

export const projectTaskIdbKey = (input: {
  readonly projectId: string;
  readonly id: string;
}): string => `${input.projectId}:${input.id}`;

export const readProjectTaskIdb = (
  taskKey: string,
): Promise<ProjectTaskIdbRow | null> =>
  readProjectSyncRow<ProjectTaskIdbRow>(
    PROJECT_SYNC_TABLE_PROJECT_TASKS,
    taskKey,
  );

export const writeProjectTaskIdb = (
  record: ProjectTaskIdbRow,
): Promise<boolean> =>
  writeProjectSyncRow(PROJECT_SYNC_TABLE_PROJECT_TASKS, record);

export const writeThroughProjectTaskMeta = async (
  record: ProjectTaskLocalRecord | ProjectTaskNeonMeta,
): Promise<ProjectTaskIdbRow> => {
  const idb = toIdbProjectTask(record);
  const row: ProjectTaskIdbRow = {
    ...idb,
    taskKey: projectTaskIdbKey({ projectId: idb.projectId, id: idb.id }),
  };
  await writeProjectTaskIdb(row);
  return row;
};

export const listProjectTasksIdb = (
  projectId: string,
): Promise<readonly ProjectTaskIdbRow[]> =>
  listProjectSyncByProject<ProjectTaskIdbRow>(
    PROJECT_SYNC_TABLE_PROJECT_TASKS,
    projectId,
  );

export const listProjectTasksIdbOrThrowSoft = (
  projectId: string,
): Promise<readonly ProjectTaskIdbRow[]> =>
  listProjectSyncByProjectOrThrowSoft<ProjectTaskIdbRow>(
    PROJECT_SYNC_TABLE_PROJECT_TASKS,
    projectId,
  );

export { keyOfProjectTask };
