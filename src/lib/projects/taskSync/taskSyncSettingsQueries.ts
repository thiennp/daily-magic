import { asRowArray, getSql } from "@/lib/db";
import { ensureTaskSyncSchema } from "@/lib/projects/taskSync/ensureTaskSyncSchema";
import type {
  TaskSyncProviderId,
  TaskSyncSettings,
} from "@/lib/projects/taskSync/taskSync.types";

const str = (v: unknown): string | null =>
  typeof v === "string" && v.length > 0 ? v : null;

const iso = (v: unknown): string | null =>
  v instanceof Date ? v.toISOString() : str(v);

const mapRow = (row: Record<string, unknown>): TaskSyncSettings => ({
  projectId: String(row.project_id),
  provider: row.provider as TaskSyncProviderId,
  enabled: row.enabled === true,
  externalTeamId: str(row.external_team_id),
  importNew: row.import_new === true,
  webhookId: str(row.webhook_id),
  webhookSecretCiphertext: str(row.webhook_secret_ciphertext),
  webhookSecretIv: str(row.webhook_secret_iv),
  lastError: str(row.last_error),
  lastSyncedAt: iso(row.last_synced_at),
  lastPulledAt: iso(row.last_pulled_at),
});

export const loadTaskSyncSettings = async (
  projectId: string,
  provider: TaskSyncProviderId,
): Promise<TaskSyncSettings | null> => {
  await ensureTaskSyncSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT * FROM project_task_sync_settings
      WHERE project_id = ${projectId} AND provider = ${provider}
      LIMIT 1
    `,
  );
  return rows[0] === undefined ? null : mapRow(rows[0]);
};

export const saveTaskSyncSettings = async (input: {
  readonly projectId: string;
  readonly provider: TaskSyncProviderId;
  readonly enabled: boolean;
  readonly externalTeamId: string | null;
  readonly importNew: boolean;
  readonly webhookId: string | null;
  readonly webhookSecret: {
    readonly ciphertext: string;
    readonly iv: string;
  } | null;
}): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    INSERT INTO project_task_sync_settings (
      project_id, provider, enabled, external_team_id, import_new,
      webhook_id, webhook_secret_ciphertext, webhook_secret_iv, updated_at
    ) VALUES (
      ${input.projectId}, ${input.provider}, ${input.enabled},
      ${input.externalTeamId}, ${input.importNew}, ${input.webhookId},
      ${input.webhookSecret?.ciphertext ?? null},
      ${input.webhookSecret?.iv ?? null}, NOW()
    )
    ON CONFLICT (project_id, provider) DO UPDATE SET
      enabled = EXCLUDED.enabled,
      external_team_id = EXCLUDED.external_team_id,
      import_new = EXCLUDED.import_new,
      webhook_id = EXCLUDED.webhook_id,
      webhook_secret_ciphertext = EXCLUDED.webhook_secret_ciphertext,
      webhook_secret_iv = EXCLUDED.webhook_secret_iv,
      updated_at = NOW()
  `;
};

/** Never stores tokens: callers pass a short code/message only. */
export const recordTaskSyncResult = async (input: {
  readonly projectId: string;
  readonly provider: TaskSyncProviderId;
  readonly error: string | null;
}): Promise<void> => {
  await ensureTaskSyncSchema();
  await getSql()`
    UPDATE project_task_sync_settings SET
      last_error = ${input.error},
      last_synced_at = CASE WHEN ${input.error}::text IS NULL
        THEN NOW() ELSE last_synced_at END,
      updated_at = NOW()
    WHERE project_id = ${input.projectId} AND provider = ${input.provider}
  `;
};
