import { getSql } from "@/lib/db";

/**
 * Upsert the viewer's last read for one thread. lastReadAt null = now.
 * Never moves backwards. Does not stamp project_messages.read_at and does not ack.
 */
export const markProjectMessengerThreadRead = async (input: {
  readonly userId: string;
  readonly projectId: string;
  readonly threadKey: string;
  readonly lastReadMessageId: string | null;
  readonly lastReadAt: string | null;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    INSERT INTO project_messenger_thread_reads (
      user_id, project_id, thread_key, last_read_message_id, last_read_at
    )
    VALUES (
      ${input.userId}, ${input.projectId}, ${input.threadKey},
      ${input.lastReadMessageId},
      COALESCE(${input.lastReadAt}::timestamptz, NOW())
    )
    ON CONFLICT (user_id, project_id, thread_key) DO UPDATE
    SET last_read_message_id = CASE
        WHEN EXCLUDED.last_read_at >= project_messenger_thread_reads.last_read_at
        THEN EXCLUDED.last_read_message_id
        ELSE project_messenger_thread_reads.last_read_message_id
      END,
      last_read_at = GREATEST(
        project_messenger_thread_reads.last_read_at, EXCLUDED.last_read_at
      ),
      updated_at = NOW()
  `;
};
