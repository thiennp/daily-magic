import { applyLinearIssueEvent } from "@/lib/projects/taskSync/applyLinearIssueEvent";
import { listLinearIssuesUpdatedSince } from "@/lib/projects/taskSync/linearIssuePullOperations";
import { parseLinearWebhook } from "@/lib/projects/taskSync/parseLinearWebhook";
import {
  loadTaskSyncSettings,
  recordTaskSyncResult,
} from "@/lib/projects/taskSync/taskSyncSettingsQueries";
import { setTaskSyncPulledAt } from "@/lib/projects/taskSync/taskSyncPullStateQueries";
import { withLinearAccessToken } from "@/lib/projects/taskSync/withLinearAccessToken";

const CHANGED = new Set(["applied", "imported"]);

/**
 * "Sync now" pull for setups without a working webhook: team issues updated
 * since the last pull go through the same loop-guarded path as the webhook
 * (linked ones; new ones only with import_new). Best effort; returns how many
 * AW tasks changed. The watermark only advances when every page was read.
 */
export const pullLinearIssues = async (projectId: string): Promise<number> => {
  try {
    const settings = await loadTaskSyncSettings(projectId, "linear");
    if (
      settings === null ||
      !settings.enabled ||
      settings.externalTeamId === null
    ) {
      return 0;
    }
    const teamId = settings.externalTeamId;
    const startedAt = new Date();
    const pull = await withLinearAccessToken(projectId, (token) =>
      listLinearIssuesUpdatedSince({
        token,
        teamId,
        since: settings.lastPulledAt,
      }),
    );
    if (pull === null) return 0;
    const outcomes = await pull.payloads.reduce<Promise<readonly string[]>>(
      async (prev, payload) => {
        const done = await prev;
        const event = parseLinearWebhook(payload);
        if (event.kind !== "upsert") return done;
        const outcome = await applyLinearIssueEvent({
          projectId,
          settings,
          event,
        });
        return [...done, outcome];
      },
      Promise.resolve([]),
    );
    if (pull.complete) {
      await setTaskSyncPulledAt({
        projectId,
        provider: "linear",
        at: startedAt,
      });
    }
    return outcomes.filter((o) => CHANGED.has(o)).length;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "pull_failed";
    console.error("task sync pull failed", { projectId, message });
    await recordTaskSyncResult({
      projectId,
      provider: "linear",
      error: `pull_failed: ${message}`.slice(0, 200),
    }).catch(() => undefined);
    return 0;
  }
};
