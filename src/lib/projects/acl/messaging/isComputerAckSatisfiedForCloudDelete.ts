import { PROJECT_MESSAGE_HISTORY_COMPUTER_ACK_MODE } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { asRowArray, getSql } from "@/lib/db";

/**
 * History composition (feature id 551bf17d) at the cloud delete decision:
 * - feature OFF → delete-on-read / ack unchanged (this stub always allows).
 * - feature ready OR degraded → require computerAck(projectId, messageId) in
 *   project_message_computer_acks AND recipient rules (read+terminal/unwatched,
 *   or explicit ack). Table is separate; not a column on project_messages.
 * - un-acked older than 7 days may delete with a thin history-gap marker
 *   (no body); History owns writing that marker — not implemented here.
 */
export const isComputerAckSatisfiedForCloudDelete = async (input: {
  readonly projectId: string;
  readonly messageId: string;
}): Promise<boolean> => {
  if (PROJECT_MESSAGE_HISTORY_COMPUTER_ACK_MODE === "off") {
    return true;
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id FROM project_message_computer_acks
      WHERE project_id = ${input.projectId}
        AND message_id = ${input.messageId}
      LIMIT 1
    `,
  );
  return rows.length > 0;
};
