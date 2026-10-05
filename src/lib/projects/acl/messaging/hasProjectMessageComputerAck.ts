import { asRowArray, getSql } from "@/lib/db";

/** True when the project computer already acked (saved) this message. */
export const hasProjectMessageComputerAck = async (input: {
  readonly projectId: string;
  readonly messageId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT 1 AS found FROM project_message_computer_acks
      WHERE project_id = ${input.projectId}
        AND message_id = ${input.messageId}
      LIMIT 1
    `,
  );
  return rows.length > 0;
};
