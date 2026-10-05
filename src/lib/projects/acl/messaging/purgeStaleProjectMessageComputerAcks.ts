import { getSql } from "@/lib/db";
import { PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";

/**
 * computerAck rows outlive their message on purpose (repeat acks stay
 * idempotent). Drop them once the message is gone and the unsaved-flag age passed.
 */
export const purgeStaleProjectMessageComputerAcks =
  async (): Promise<number> => {
    const sql = getSql();
    const result = await sql`
    DELETE FROM project_message_computer_acks a
    WHERE a.acked_at < NOW() - make_interval(days => ${PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS})
      AND NOT EXISTS (SELECT 1 FROM project_messages pm WHERE pm.id = a.message_id)
    RETURNING a.message_id
  `;
    return Array.isArray(result) ? result.length : 0;
  };
