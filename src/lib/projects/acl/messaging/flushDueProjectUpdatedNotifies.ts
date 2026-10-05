import { claimDueProjectUpdatedNotifyPending } from "@/lib/projects/acl/messaging/claimDueProjectUpdatedNotifyPending";
import { deleteFlushedProjectUpdatedNotifyPending } from "@/lib/projects/acl/messaging/deleteFlushedProjectUpdatedNotifyPending";
import { ensureProjectUpdatedNotifyPendingSchema } from "@/lib/projects/acl/messaging/ensureProjectUpdatedNotifyPendingSchema";
import { notifyProjectMembersOfProjectUpdated } from "@/lib/projects/acl/messaging/notifyProjectMembersOfProjectUpdated";
import { reclaimStaleFlushedProjectUpdatedNotifyPending } from "@/lib/projects/acl/messaging/reclaimStaleFlushedProjectUpdatedNotifyPending";

/**
 * Shared flush path (in-process ticker = sole live owner; cron = optional
 * backup): reclaim stale flushed rows, claim due pending, fan out via
 * Dispatch notify per row (try/catch), delete on success. On notify failure
 * the row stays flushed for ~60s reclaim. Never throws.
 */
export const flushDueProjectUpdatedNotifies = async (input: {
  readonly now: Date;
}): Promise<number> => {
  try {
    await ensureProjectUpdatedNotifyPendingSchema();
    await reclaimStaleFlushedProjectUpdatedNotifyPending({ now: input.now });
    const claimed = await claimDueProjectUpdatedNotifyPending({
      now: input.now,
    });
    return claimed.reduce<Promise<number>>(async (prior, row) => {
      const flushed = await prior;
      try {
        await notifyProjectMembersOfProjectUpdated({
          projectId: row.projectId,
          fields: row.fields,
          ...(row.actorUserId !== null
            ? { actorUserId: row.actorUserId }
            : {}),
        });
        await deleteFlushedProjectUpdatedNotifyPending({
          projectId: row.projectId,
        });
        return flushed + 1;
      } catch (error: unknown) {
        console.error("project.updated notify row failed; left flushed", {
          projectId: row.projectId,
          error:
            error instanceof Error
              ? error.message
              : "project_updated_notify_row_failed",
        });
        return flushed;
      }
    }, Promise.resolve(0));
  } catch (error: unknown) {
    console.error("project.updated notify flush failed", {
      error:
        error instanceof Error ? error.message : "project_updated_flush_failed",
    });
    return 0;
  }
};
