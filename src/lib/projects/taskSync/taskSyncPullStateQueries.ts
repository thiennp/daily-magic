import { getSql } from "@/lib/db";
import { ensureTaskSyncSchema } from "@/lib/projects/taskSync/ensureTaskSyncSchema";
import type { TaskSyncProviderId } from "@/lib/projects/taskSync/taskSync.types";

export const setTaskSyncPulledAt = async (input: {
  readonly projectId: string;
  readonly provider: TaskSyncProviderId;
  readonly at: Date;
}): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    UPDATE project_task_sync_settings
    SET last_pulled_at = ${input.at.toISOString()}
    WHERE project_id = ${input.projectId} AND provider = ${input.provider}
  `;
};

/** Disconnect: stop sync and forget the webhook; links and team id stay. */
export const clearTaskSyncWebhook = async (
  projectId: string,
  provider: TaskSyncProviderId,
): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    UPDATE project_task_sync_settings SET
      enabled = FALSE, webhook_id = NULL,
      webhook_secret_ciphertext = NULL, webhook_secret_iv = NULL,
      updated_at = NOW()
    WHERE project_id = ${projectId} AND provider = ${provider}
  `;
};
