import { getSql } from "@/lib/db";

/**
 * The recipient acked but the delete gate denied (no computerAck yet).
 * Mark the row acked so it leaves the inbox; it is deleted once the project
 * computer acks, or the owner turns history off (never deleted for age alone).
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
