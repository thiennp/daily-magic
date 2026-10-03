import { getSql } from "@/lib/db";

export const markProjectMessageDeliveryStatus = async (input: {
  readonly messageId: string;
  readonly membershipId: string;
  readonly status: "delivered" | "failed" | "skipped";
  readonly lastError: string | null;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_message_deliveries
    SET
      status = ${input.status},
      last_error = ${input.lastError},
      attempt = attempt + 1,
      updated_at = NOW()
    WHERE message_id = ${input.messageId}
      AND membership_id = ${input.membershipId}
  `;
};
