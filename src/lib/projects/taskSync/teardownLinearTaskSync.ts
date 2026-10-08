import { deleteLinearWebhook } from "@/lib/projects/taskSync/linearWebhookOperations";
import { loadTaskSyncSettings } from "@/lib/projects/taskSync/taskSyncSettingsQueries";
import { clearTaskSyncWebhook } from "@/lib/projects/taskSync/taskSyncPullStateQueries";
import { withLinearAccessToken } from "@/lib/projects/taskSync/withLinearAccessToken";

/**
 * Linear disconnect: remove the Linear webhook (needs the token, so call this
 * BEFORE revoking it), then switch sync off and forget the webhook + secret.
 * Links and the team id stay so a reconnect resumes. Never throws.
 */
export const teardownLinearTaskSync = async (
  projectId: string,
): Promise<void> => {
  try {
    const settings = await loadTaskSyncSettings(projectId, "linear");
    if (settings === null) return;
    const webhookId = settings.webhookId;
    if (webhookId !== null) {
      await withLinearAccessToken(projectId, (token) =>
        deleteLinearWebhook(token, webhookId),
      ).catch(() => undefined);
    }
    await clearTaskSyncWebhook(projectId, "linear");
  } catch (error: unknown) {
    console.error("linear task sync teardown failed", {
      projectId,
      message: error instanceof Error ? error.message : "teardown_failed",
    });
  }
};
