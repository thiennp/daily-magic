import { claimDueProjectUpdatedNotifyPending } from "@/lib/projects/acl/messaging/claimDueProjectUpdatedNotifyPending";
import { deleteFlushedProjectUpdatedNotifyPending } from "@/lib/projects/acl/messaging/deleteFlushedProjectUpdatedNotifyPending";
import { ensureProjectUpdatedNotifyPendingSchema } from "@/lib/projects/acl/messaging/ensureProjectUpdatedNotifyPendingSchema";
import { notifyProjectMembersOfProjectUpdated } from "@/lib/projects/acl/messaging/notifyProjectMembersOfProjectUpdated";

/**
 * Claim due pending rows, fan out via Dispatch notify, then delete (→ idle).
 * Idempotent under concurrency: claim is conditional on state=pending.
 * Never throws: tickers and write-path opportunistic flush must stay safe.
 */
export const flushDueProjectUpdatedNotifies = async (input: {
  readonly now: Date;
}): Promise<number> => {
  try {
    await ensureProjectUpdatedNotifyPendingSchema();
    const claimed = await claimDueProjectUpdatedNotifyPending({
      now: input.now,
    });
    const results = await claimed.reduce<Promise<readonly boolean[]>>(
      async (prior, row) => {
        const done = await prior;
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
        return [...done, true];
      },
      Promise.resolve([]),
    );
    return results.length;
  } catch (error: unknown) {
    console.error("project.updated notify flush failed", {
      error:
        error instanceof Error ? error.message : "project_updated_flush_failed",
    });
    return 0;
  }
};
