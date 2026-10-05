import { asRowArray, getSql } from "@/lib/db";
import { PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";

export type ProjectComputerHistoryUnsavedOverdue = {
  readonly count: number;
  readonly oldestCreatedAt: string;
};

/**
 * Un-acked project messages older than the unsaved-flag threshold.
 * Computed on read (no extra table). null when none are overdue.
 */
export const readProjectComputerHistoryUnsavedOverdue = async (input: {
  readonly projectId: string;
}): Promise<ProjectComputerHistoryUnsavedOverdue | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS count, MIN(m.created_at) AS oldest_created_at
      FROM project_messages m
      WHERE m.project_id = ${input.projectId}
        AND m.created_at < NOW() - make_interval(
          days => ${PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS}
        )
        AND NOT EXISTS (
          SELECT 1 FROM project_message_computer_acks a
          WHERE a.project_id = m.project_id AND a.message_id = m.id
        )
    `,
  );
  const count = Number(rows[0]?.count ?? 0);
  if (count <= 0 || rows[0]?.oldest_created_at == null) {
    return null;
  }
  const oldest = rows[0].oldest_created_at;
  const oldestCreatedAt =
    oldest instanceof Date ? oldest.toISOString() : String(oldest);
  return { count, oldestCreatedAt };
};
