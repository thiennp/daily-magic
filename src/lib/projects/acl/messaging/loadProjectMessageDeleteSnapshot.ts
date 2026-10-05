import { ensureProjectMessageDeleteOnReadSchema } from "@/lib/projects/acl/messaging/ensureProjectMessageDeleteOnReadSchema";
import { toPostgresTimestamptz } from "@/lib/projects/acl/messaging/toPostgresTimestamptz";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectMessageDeleteSnapshot = {
  readonly messageId: string;
  readonly projectId: string;
  readonly recipientUserId: string | null;
  readonly recipientMembershipId: string | null;
  readonly messageCreatedAt: string | null;
  readonly readAt: string | null;
  readonly deliveryStates: readonly (string | null)[];
  readonly grokWakeResult: string | null;
};

const optionalString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

/**
 * Load message + delivery states + latest wake result before a hard delete.
 */
export const loadProjectMessageDeleteSnapshot = async (input: {
  readonly messageId: string;
}): Promise<ProjectMessageDeleteSnapshot | null> => {
  await ensureProjectMessageDeleteOnReadSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.id, m.project_id, m.to_user_id, m.to_membership_id,
        m.created_at, m.read_at,
        (
          SELECT a.result
          FROM project_grok_routine_wake_attempts a
          WHERE a.message_id = m.id
          ORDER BY a.created_at DESC
          LIMIT 1
        ) AS grok_wake_result
      FROM project_messages m
      WHERE m.id = ${input.messageId}
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return null;
  }
  const row = rows[0]!;
  const deliveryRows = asRowArray(
    await sql`
      SELECT b2b_state FROM project_message_deliveries
      WHERE message_id = ${input.messageId}
    `,
  );
  return {
    messageId: String(row.id),
    projectId: String(row.project_id),
    recipientUserId: optionalString(row.to_user_id),
    recipientMembershipId: optionalString(row.to_membership_id),
    messageCreatedAt: toPostgresTimestamptz(row.created_at),
    readAt: toPostgresTimestamptz(row.read_at),
    deliveryStates: deliveryRows.map((d) => optionalString(d.b2b_state)),
    grokWakeResult: optionalString(row.grok_wake_result),
  };
};
