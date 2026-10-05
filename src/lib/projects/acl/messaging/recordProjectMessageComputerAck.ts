import { asRowArray, getSql } from "@/lib/db";

export type RecordProjectMessageComputerAckResult =
  | { readonly ok: true; readonly alreadyAcked: boolean }
  | { readonly ok: false; readonly code: "not_found" };

/**
 * Idempotent computerAck write. A first ack needs the message to still exist
 * in this project; a repeat ack is a no-op success even after the message
 * row is gone. Stores ids only.
 */
export const recordProjectMessageComputerAck = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly deviceId: string;
}): Promise<RecordProjectMessageComputerAckResult> => {
  const sql = getSql();
  const inserted = asRowArray(
    await sql`
      INSERT INTO project_message_computer_acks (project_id, message_id, device_id)
      SELECT m.project_id, m.id, ${input.deviceId}
      FROM project_messages m
      WHERE m.id = ${input.messageId}
        AND m.project_id = ${input.projectId}
      ON CONFLICT (project_id, message_id) DO NOTHING
      RETURNING message_id
    `,
  );
  if (inserted.length > 0) {
    return { ok: true, alreadyAcked: false };
  }
  const existing = asRowArray(
    await sql`
      SELECT message_id FROM project_message_computer_acks
      WHERE project_id = ${input.projectId}
        AND message_id = ${input.messageId}
      LIMIT 1
    `,
  );
  return existing.length > 0
    ? { ok: true, alreadyAcked: true }
    : { ok: false, code: "not_found" };
};
