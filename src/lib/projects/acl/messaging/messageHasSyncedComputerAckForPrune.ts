import {
  PROJECT_MESSAGE_ACK_STALE_DAYS,
} from "@/lib/projects/acl/messaging/projectMessagePrune.constants";
import { asRowArray, getSql } from "@/lib/db";

/**
 * LOCKED ceiling: ≥1 non-stale computer ack, or a stale ack only when another
 * computer has also acked. Zero acks → not prunable.
 */
export const messageHasSyncedComputerAckForPrune = async (input: {
  readonly projectId: string;
  readonly messageId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const staleDays = PROJECT_MESSAGE_ACK_STALE_DAYS;
  const fresh = asRowArray(
    await sql`
      SELECT 1 AS found FROM project_message_computer_acks
      WHERE project_id = ${input.projectId}
        AND message_id = ${input.messageId}
        AND acked_at > NOW() - make_interval(days => ${staleDays}::int)
      LIMIT 1
    `,
  );
  if (fresh.length > 0) {
    return true;
  }
  const any = asRowArray(
    await sql`
      SELECT COUNT(DISTINCT device_id)::int AS c
      FROM project_message_computer_acks
      WHERE project_id = ${input.projectId}
        AND message_id = ${input.messageId}
    `,
  );
  return Number(any[0]?.c ?? 0) >= 2;
};
