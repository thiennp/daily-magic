import type { ProjectActivityQuery } from "@/lib/projects/acl/activity/parseProjectActivityQuery";
import { projectActivityTypesForCategory } from "@/lib/projects/acl/activity/projectActivityEvent.constant";
import { asRowArray, getSql } from "@/lib/db";

/**
 * One page (limit + 1 rows to detect a next page), newest first.
 * cursor_at keeps microseconds so equal-millisecond rows are not skipped.
 * Live names are only a fallback for the write-time snapshots.
 */
export const queryProjectActivityEventRows = async (input: {
  readonly projectId: string;
  readonly query: ProjectActivityQuery;
}): Promise<Record<string, unknown>[]> => {
  const { cursor, category, since, limit } = input.query;
  const types =
    category === null ? null : [...projectActivityTypesForCategory(category)];
  return asRowArray(
    await getSql()`
      SELECT
        e.id, e.event_type, e.actor_kind, e.actor_user_id, e.actor_label,
        e.target_membership_id, e.target_user_id, e.target_label, e.detail,
        e.created_at,
        to_char(e.created_at AT TIME ZONE 'UTC',
          'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS cursor_at,
        tm.project_display_name AS target_live_label,
        am.project_display_name AS actor_live_label
      FROM project_activity_events e
      JOIN user_projects p ON p.id = e.project_id
      LEFT JOIN project_memberships tm
        ON tm.id = e.target_membership_id AND tm.project_id = e.project_id
      LEFT JOIN LATERAL (
        SELECT m.project_display_name FROM project_memberships m
        WHERE m.project_id = e.project_id AND m.user_id = e.actor_user_id
          AND m.user_id <> p.owner_user_id
        ORDER BY m.created_at DESC LIMIT 1
      ) am ON TRUE
      WHERE e.project_id = ${input.projectId}::text
        AND (${cursor?.at ?? null}::timestamptz IS NULL
          OR (e.created_at, e.id) < (${cursor?.at ?? null}::timestamptz, ${cursor?.id ?? null}::text))
        AND (${since}::timestamptz IS NULL OR e.created_at >= ${since}::timestamptz)
        AND (${types}::text[] IS NULL OR e.event_type = ANY(${types}::text[]))
      ORDER BY e.created_at DESC, e.id DESC
      LIMIT ${limit + 1}::int
    `,
  );
};
