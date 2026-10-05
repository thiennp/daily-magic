import { ensureProjectUpdatedNotifyPendingSchema } from "@/lib/projects/acl/messaging/ensureProjectUpdatedNotifyPendingSchema";
import { filterProjectUpdatedSummaryFields } from "@/lib/projects/acl/messaging/buildProjectUpdatedSummary";
import { upsertProjectUpdatedNotifyPending } from "@/lib/projects/acl/messaging/upsertProjectUpdatedNotifyPending";
import { PROJECT_UPDATED_DEBOUNCE_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * Schedule a debounced project.updated notify (trailing 5s per projectId).
 * Does not flush — cron is the sole flush owner (multi-instance safe via claim).
 * Never throws: write hooks must not fail the successful mutation.
 */
export const scheduleProjectUpdatedNotify = async (input: {
  readonly projectId: string;
  readonly fields: readonly string[];
  readonly actorUserId?: string;
  readonly now?: Date;
  readonly debounceMs?: number;
}): Promise<{ readonly scheduled: boolean }> => {
  try {
    const fields = filterProjectUpdatedSummaryFields(input.fields);
    if (fields.length === 0) {
      return { scheduled: false };
    }
    const now = input.now ?? new Date();
    const debounceMs = input.debounceMs ?? PROJECT_UPDATED_DEBOUNCE_MS;
    await ensureProjectUpdatedNotifyPendingSchema();
    const scheduled = await upsertProjectUpdatedNotifyPending({
      projectId: input.projectId,
      fields,
      ...(input.actorUserId !== undefined
        ? { actorUserId: input.actorUserId }
        : {}),
      now,
      debounceMs,
    });
    return { scheduled };
  } catch (error: unknown) {
    console.error("project.updated notify schedule failed", {
      error:
        error instanceof Error
          ? error.message
          : "project_updated_schedule_failed",
    });
    return { scheduled: false };
  }
};
