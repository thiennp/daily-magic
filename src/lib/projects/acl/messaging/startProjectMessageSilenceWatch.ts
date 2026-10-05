import { asRowArray, getSql } from "@/lib/db";
import { nextProjectB2bState } from "@/lib/projects/acl/messaging/nextProjectB2bState";
import type { ProjectGrokRoutineWakeResult } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

/**
 * dispatched --wake_accepted--> awaiting_first_activity, starting the silence
 * clock, on each delivery whose wake was accepted (HTTP 200).
 * Only touches unwatched rows, so a stored message is never watched twice.
 */
export const startProjectMessageSilenceWatch = async (input: {
  readonly messageId: string;
  readonly senderMembershipId: string;
  readonly wakeResults: readonly ProjectGrokRoutineWakeResult[];
  readonly now: Date;
}): Promise<number> => {
  const next = nextProjectB2bState("dispatched", "wake_accepted");
  const membershipIds = [
    ...new Set(
      input.wakeResults.flatMap((wake) =>
        wake.result === "http_200" &&
        wake.membershipId !== input.senderMembershipId
          ? [wake.membershipId]
          : [],
      ),
    ),
  ];
  if (!next.ok || membershipIds.length === 0) {
    return 0;
  }
  const at = input.now.toISOString();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_message_deliveries
      SET b2b_state = ${next.state},
        last_activity_at = ${at}::timestamptz,
        b2b_state_at = ${at}::timestamptz,
        updated_at = NOW()
      WHERE message_id = ${input.messageId}
        AND membership_id = ANY(${membershipIds}::text[])
        AND b2b_state IS NULL
      RETURNING id
    `,
  );
  return rows.length;
};
