import { asRowArray, getSql } from "@/lib/db";
import { ensureTaskSyncSchema } from "@/lib/projects/taskSync/ensureTaskSyncSchema";
import type {
  TaskExternalLink,
  TaskSyncProviderId,
} from "@/lib/projects/taskSync/taskSync.types";

const mapRow = (row: Record<string, unknown>): TaskExternalLink => ({
  taskId: String(row.task_id),
  externalId: String(row.external_id),
  identifier:
    typeof row.external_identifier === "string" ? row.external_identifier : "",
  url: typeof row.external_url === "string" ? row.external_url : "",
  lastSyncedHash:
    typeof row.last_synced_hash === "string" ? row.last_synced_hash : null,
});

export const loadLinkByTask = async (
  taskId: string,
  provider: TaskSyncProviderId,
): Promise<TaskExternalLink | null> => {
  await ensureTaskSyncSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT * FROM project_task_external_links
      WHERE task_id = ${taskId} AND provider = ${provider} LIMIT 1
    `,
  );
  return rows[0] === undefined ? null : mapRow(rows[0]);
};

export const loadLinkByExternalId = async (input: {
  readonly projectId: string;
  readonly provider: TaskSyncProviderId;
  readonly externalId: string;
}): Promise<TaskExternalLink | null> => {
  await ensureTaskSyncSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT * FROM project_task_external_links
      WHERE project_id = ${input.projectId} AND provider = ${input.provider}
        AND external_id = ${input.externalId} LIMIT 1
    `,
  );
  return rows[0] === undefined ? null : mapRow(rows[0]);
};

export const listLinksByProject = async (
  projectId: string,
  provider: TaskSyncProviderId,
): Promise<readonly TaskExternalLink[]> => {
  await ensureTaskSyncSchema();
  return asRowArray(
    await getSql()`
      SELECT * FROM project_task_external_links
      WHERE project_id = ${projectId} AND provider = ${provider}
    `,
  ).map(mapRow);
};

export const upsertTaskLink = async (input: {
  readonly projectId: string;
  readonly provider: TaskSyncProviderId;
  readonly taskId: string;
  readonly externalId: string;
  readonly identifier: string;
  readonly url: string;
  readonly hash: string;
}): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    INSERT INTO project_task_external_links (
      project_id, task_id, provider, external_id, external_identifier,
      external_url, last_synced_hash, last_synced_at
    ) VALUES (
      ${input.projectId}, ${input.taskId}, ${input.provider},
      ${input.externalId}, ${input.identifier}, ${input.url}, ${input.hash}, NOW()
    )
    ON CONFLICT (task_id, provider) DO UPDATE SET
      external_id = EXCLUDED.external_id,
      external_identifier = EXCLUDED.external_identifier,
      external_url = EXCLUDED.external_url,
      last_synced_hash = EXCLUDED.last_synced_hash,
      last_synced_at = NOW()
  `;
};

export const setLinkHash = async (
  taskId: string,
  provider: TaskSyncProviderId,
  hash: string,
): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    UPDATE project_task_external_links
    SET last_synced_hash = ${hash}, last_synced_at = NOW()
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
