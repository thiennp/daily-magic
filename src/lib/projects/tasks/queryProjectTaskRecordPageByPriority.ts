import { asRowArray, getSql } from "@/lib/db";
import type { ParsedListProjectTasksArgs } from "@/lib/projects/tasks/parseListProjectTasksArgs";

/**
 * Priority order page: rank p0..p3 then none (4), oldest created first, id as
 * tiebreak. Keyset (rank, created_at, id) > cursor; cursor_at keeps µs.
 * Returns limit + 1 rows; priority_rank feeds the next cursor.
 */
export const queryProjectTaskRecordPageByPriority = async (
  query: ParsedListProjectTasksArgs,
): Promise<Record<string, unknown>[]> => {
  const { projectId, status, priorityCursor, limit, ownerMembershipId } = query;
  return asRowArray(
    await getSql()`
      SELECT * FROM (
        SELECT t.*, owner.project_display_name AS owner_display_name,
          to_char(t.created_at AT TIME ZONE 'UTC',
            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS cursor_at,
          CASE t.priority WHEN 'p0' THEN 0 WHEN 'p1' THEN 1
            WHEN 'p2' THEN 2 WHEN 'p3' THEN 3 ELSE 4 END AS priority_rank
        FROM project_task_records t
        LEFT JOIN project_memberships owner ON owner.id = t.owner_membership_id
        WHERE t.project_id = ${projectId}::text
          AND (${status}::text IS NULL OR t.status = ${status}::text)
          AND (${ownerMembershipId}::text IS NULL
            OR t.owner_membership_id = ${ownerMembershipId}::text)
      ) ranked
      WHERE (${priorityCursor?.rank ?? null}::int IS NULL
        OR (ranked.priority_rank, ranked.created_at, ranked.id)
          > (${priorityCursor?.rank ?? null}::int,
             ${priorityCursor?.at ?? null}::timestamptz,
             ${priorityCursor?.id ?? null}::text))
      ORDER BY ranked.priority_rank ASC, ranked.created_at ASC, ranked.id ASC
      LIMIT ${limit + 1}::int
    `,
  );
};
