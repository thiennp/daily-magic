import { asRowArray, getSql } from "@/lib/db";
import { deleteProjectMessageWithOutcome } from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome";

/**
 * History turned off: today's rules apply again at once, so messages that a
 * recipient already acked (held only for a computerAck) are finalized through
 * deleteProjectMessageWithOutcome (outcome + gate + DELETE). With History off
 * the gate allows; each row still gets an outcome before DELETE.
 */
export const releaseProjectMessagesHeldForComputerAck = async (input: {
  readonly projectId: string;
}): Promise<number> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id FROM project_messages
      WHERE project_id = ${input.projectId}
        AND acked_at IS NOT NULL
    `,
  );
  let deleted = 0;
  for (const row of rows) {
    const result = await deleteProjectMessageWithOutcome({
      messageId: String(row.id),
      deletedReason: "ack",
      finalB2bState: "acked",
    });
    if (result.ok) {
      deleted += 1;
    }
  }
  return deleted;
};
