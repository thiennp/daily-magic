import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { syncLinearWebhook } from "@/lib/projects/taskSync/syncLinearWebhook";
import {
  loadTaskSyncSettings,
  recordTaskSyncResult,
  saveTaskSyncSettings,
} from "@/lib/projects/taskSync/taskSyncSettingsQueries";

export type TaskSyncSettingsPatch = {
  readonly enabled?: boolean;
  readonly externalTeamId?: string | null;
  readonly importNew?: boolean;
};

export type UpdateTaskSyncSettingsResult =
  | { readonly ok: true; readonly webhookActive: boolean }
  | {
      readonly ok: false;
      readonly code: "not_connected" | "team_required" | "unavailable";
    };

/**
 * Owner PUT: merge the patch, keep the Linear webhook in step (enable ->
 * register with a fresh secret, disable / team change -> remove). A failed
 * registration keeps push sync on and records last_error.
 */
export const updateTaskSyncSettings = async (input: {
  readonly projectId: string;
  readonly patch: TaskSyncSettingsPatch;
}): Promise<UpdateTaskSyncSettingsResult> => {
  const { projectId, patch } = input;
  const authSecret = resolveProjectConnectionsAuthSecret();
  if (authSecret === null) return { ok: false, code: "unavailable" };
  const prev = await loadTaskSyncSettings(projectId, "linear");
  const enabled = patch.enabled ?? prev?.enabled ?? false;
  const teamId =
    patch.externalTeamId === undefined
      ? (prev?.externalTeamId ?? null)
      : patch.externalTeamId;
  if (enabled && teamId === null) return { ok: false, code: "team_required" };

  const webhook = await syncLinearWebhook({
    projectId,
    authSecret,
    prev,
    teamId,
    enabled,
  });
  if (webhook === null) return { ok: false, code: "not_connected" };

  await saveTaskSyncSettings({
    projectId,
    provider: "linear",
    enabled,
    externalTeamId: teamId,
    importNew: patch.importNew ?? prev?.importNew ?? false,
    webhookId: webhook.webhookId,
    webhookSecret: webhook.webhookSecret,
  });
  await recordTaskSyncResult({
    projectId,
    provider: "linear",
    error: webhook.error,
  });
  return { ok: true, webhookActive: webhook.webhookId !== null };
};
