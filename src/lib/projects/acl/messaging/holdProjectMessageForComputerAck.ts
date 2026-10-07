import { asRowArray, getSql } from "@/lib/db";

/**
 * The recipient acked but the delete gate denied (no computerAck yet).
 * Mark the row acked so it leaves the inbox; it is deleted once the project
 * computer acks, or the owner turns history off (never deleted for age alone).
 * Atomic first-ack check (Arch FIX 3b): true only for the one call that moved
 * acked_at from NULL. A repeat, a concurrent sibling ack, or a row deleted in
 * between all get false.
 */
export const holdProjectMessageForComputerAck = async (input: {
  readonly messageId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_messages
      SET acked_at = NOW()
      WHERE id = ${input.messageId}
        AND acked_at IS NULL
      RETURNING id
    `,
  );
  return rows.length > 0;
};
