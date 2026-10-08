import { asRowArray, getSql } from "@/lib/db";
import { ensureTaskSyncSchema } from "@/lib/projects/taskSync/ensureTaskSyncSchema";
import type { TaskSyncProviderId } from "@/lib/projects/taskSync/taskSync.types";

/**
 * Reserve the link (external_id = the client-generated issue id, empty
 * identifier) BEFORE issueCreate, so a webhook for the new issue always finds
 * its link. False = the task already has a link row.
 */
export const reserveTaskLink = async (input: {
  readonly projectId: string;
  readonly provider: TaskSyncProviderId;
  readonly taskId: string;
  readonly externalId: string;
}): Promise<boolean> => {
  await ensureTaskSyncSchema();
  const rows = asRowArray(
    await getSql()`
      INSERT INTO project_task_external_links (
        project_id, task_id, provider, external_id, external_identifier
      ) VALUES (
        ${input.projectId}, ${input.taskId}, ${input.provider},
        ${input.externalId}, ''
      )
      ON CONFLICT (task_id, provider) DO NOTHING
      RETURNING id
    `,
  );
  return rows.length > 0;
};

/** Undo a reservation whose issueCreate failed (only a still-reserved row). */
export const deleteReservedLink = async (
  taskId: string,
  provider: TaskSyncProviderId,
  externalId: string,
): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    DELETE FROM project_task_external_links
    WHERE task_id = ${taskId} AND provider = ${provider}
      AND external_id = ${externalId} AND external_identifier = ''
  `;
};

export const setLinkClippedDescriptionHash = async (
  taskId: string,
  provider: TaskSyncProviderId,
  hash: string | null,
): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    UPDATE project_task_external_links SET clipped_description_hash = ${hash}
    WHERE task_id = ${taskId} AND provider = ${provider}
  `;
};

export const deleteLinkByExternalId = async (input: {
  readonly projectId: string;
  readonly provider: TaskSyncProviderId;
  readonly externalId: string;
}): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    DELETE FROM project_task_external_links
    WHERE project_id = ${input.projectId} AND provider = ${input.provider}
      AND external_id = ${input.externalId}
  `;
};
