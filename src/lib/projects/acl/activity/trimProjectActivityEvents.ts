import { PROJECT_ACTIVITY_RETENTION } from "@/lib/projects/acl/activity/projectActivityEvent.constant";
import { getSql } from "@/lib/db";

/**
 * Retention on write (no cron): keep the newest maxEvents per project and
 * drop anything older than maxAgeDays. Uses (project_id, created_at, id).
 */
export const trimProjectActivityEvents = async (
  projectId: string,
  retention: { readonly maxEvents: number; readonly maxAgeDays: number } =
    PROJECT_ACTIVITY_RETENTION,
): Promise<void> => {
  await getSql()`
    DELETE FROM project_activity_events
    WHERE project_id = ${projectId}::text
      AND (
        created_at < NOW() - make_interval(days => ${retention.maxAgeDays}::int)
        OR id IN (
          SELECT id FROM project_activity_events
          WHERE project_id = ${projectId}::text
          ORDER BY created_at DESC, id DESC
          OFFSET ${retention.maxEvents}::int
        )
      )
  `;
};
