import { getSql } from "@/lib/db";

/**
 * Stamp read_at on fetched inbox rows. Does not delete.
 */
export const stampProjectInboxReadAt = async (input: {
  readonly messageIds: readonly string[];
}): Promise<number> => {
  if (input.messageIds.length === 0) {
    return 0;
  }
  const sql = getSql();
  const ids = [...input.messageIds];
  const result = await sql`
    UPDATE project_messages
    SET read_at = NOW()
    WHERE id = ANY(${ids}::text[])
      AND read_at IS NULL
    RETURNING id
  `;
  return Array.isArray(result) ? result.length : 0;
};
