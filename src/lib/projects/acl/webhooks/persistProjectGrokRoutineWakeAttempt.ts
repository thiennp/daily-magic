import { randomUUID } from "node:crypto";

import { getSql } from "@/lib/db";

const STORED_GROK_WAKE_RESULT = /^(?:http_\d{3}|fetch_failed|not_postable)$/;

/** Store only the short wake result. Never a webhook URL or bearer. */
export const persistProjectGrokRoutineWakeAttempt = async (input: {
  readonly messageId: string;
  readonly membershipId: string;
  readonly result: string;
}): Promise<void> => {
  const result = STORED_GROK_WAKE_RESULT.test(input.result)
    ? input.result
    : "fetch_failed";
  const sql = getSql();
  await sql`
    INSERT INTO project_grok_routine_wake_attempts (
      id, message_id, membership_id, result
    )
    VALUES (
      ${randomUUID()},
      ${input.messageId},
      ${input.membershipId},
      ${result}
    )
  `;
};
