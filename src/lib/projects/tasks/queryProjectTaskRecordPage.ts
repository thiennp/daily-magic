import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectTaskRecordsSchema } from "@/lib/projects/tasks/ensureProjectTaskRecordsSchema";
import type { ParsedListProjectTasksArgs } from "@/lib/projects/tasks/parseListProjectTasksArgs";
import { queryProjectTaskRecordPageByPriority } from "@/lib/projects/tasks/queryProjectTaskRecordPageByPriority";

/**
 * One list_project_tasks page (limit + 1 rows to detect a next page), newest
 * updated first, scoped to one project. cursor_at keeps microseconds so
 * equal-millisecond rows are not skipped by the (updated_at, id) keyset.
 * sort "priority" is delegated (rank, created_at, id ASC keyset).
 */
export const queryProjectTaskRecordPage = async (
  query: ParsedListProjectTasksArgs,
): Promise<Record<string, unknown>[]> => {
  await ensureProjectTaskRecordsSchema();
  if (query.sort === "priority") {
    return queryProjectTaskRecordPageByPriority(query);
  }
  const { projectId, status, cursor, limit, ownerMembershipId } = query;
  return asRowArray(
    await getSql()`
      SELECT t.*, owner.project_display_name AS owner_display_name,
        to_char(t.updated_at AT TIME ZONE 'UTC',
          'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS cursor_at
      FROM project_task_records t
      LEFT JOIN project_memberships owner ON owner.id = t.owner_membership_id
      WHERE t.project_id = ${projectId}::text
        AND (${status}::text IS NULL OR t.status = ${status}::text)
        AND (${ownerMembershipId}::text IS NULL
          OR t.owner_membership_id = ${ownerMembershipId}::text)
        AND (${cursor?.at ?? null}::timestamptz IS NULL
          OR (t.updated_at, t.id) < (${cursor?.at ?? null}::timestamptz, ${cursor?.id ?? null}::text))
      ORDER BY t.updated_at DESC, t.id DESC
      LIMIT ${limit + 1}::int
    `,
  );
};
