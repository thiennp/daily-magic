import { asRowArray, getSql } from "@/lib/db";
import { GROK_WAKE_RESULT_SKIPPED_BY_POLICY } from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";

/**
 * Latest stored Grok wake result per recipient membership (live messages only).
 * skipped_by_policy rows are not wakes, so they never mask bot health.
 */
export const loadProjectMessengerLatestWakes = async (
  projectId: string,
): Promise<ReadonlyMap<string, string>> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT DISTINCT ON (a.membership_id) a.membership_id, a.result
      FROM project_grok_routine_wake_attempts a
      JOIN project_messages m ON m.id = a.message_id
      WHERE m.project_id = ${projectId}
        AND a.result <> ${GROK_WAKE_RESULT_SKIPPED_BY_POLICY}
      ORDER BY a.membership_id, a.created_at DESC
    `,
  );
  return new Map(
    rows.map((row) => [String(row.membership_id), String(row.result)]),
  );
};
