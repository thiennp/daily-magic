import { asRowArray, getSql } from "@/lib/db";
import { deleteProjectMessageWithOutcome } from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome";

/**
 * A computerAck just landed. If the recipient already acked (row held with
 * acked_at), finalize through deleteProjectMessageWithOutcome (outcome + gate
 * + DELETE). The outcome helper re-checks the History gate (folder ack must
 * exist); this path only gates on the existing recipient-ack rule first.
 */
export const deleteHeldProjectMessageAfterComputerAck = async (input: {
  readonly projectId: string;
  readonly messageId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT acked_at FROM project_messages
      WHERE id = ${input.messageId}
        AND project_id = ${input.projectId}
      LIMIT 1
    `,
  );
  if (
    rows.length === 0 ||
    rows[0].acked_at === null ||
    rows[0].acked_at === undefined
  ) {
    return false;
  }
  const deleted = await deleteProjectMessageWithOutcome({
    messageId: input.messageId,
    deletedReason: "computer_ack",
    finalB2bState: "acked",
  });
  return deleted.ok;
};
