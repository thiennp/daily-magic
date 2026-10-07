import { getSql } from "@/lib/db";

/**
 * Stamp acked_at so the row leaves the inbox. Keep-300 never deletes on ack;
 * Neon prune owns retention after a synced computer ack.
 */
export const holdProjectMessageForComputerAck = async (input: {
  readonly messageId: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_messages
    SET acked_at = COALESCE(acked_at, NOW())
    WHERE id = ${input.messageId}
  `;
};
