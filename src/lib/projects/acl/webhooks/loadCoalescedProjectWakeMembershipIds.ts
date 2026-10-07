import { asRowArray, getSql } from "@/lib/db";
import { PROJECT_MESSAGE_NO_WAKE_STATUS_KINDS } from "@/lib/projects/acl/messaging/isProjectMessageWakeSkippedByPolicy";
import {
  PROJECT_WAKE_COALESCE_WINDOW_SECONDS,
  PROJECT_WAKE_IN_FLIGHT_SECONDS,
} from "@/lib/projects/acl/webhooks/projectWakeThrottle.constant";

/**
 * Recipients whose bot is already woken for this batch (DF-026): an EARLIER
 * wake-eligible row to the same membership, sent in the coalesce window and
 * still unread/unacked, either got an accepted wake (http_2xx / fetch_failed
 * timeout) or is still in flight (no stored result yet, a few seconds old).
 * That run will list this row too, so this row needs no wake of its own.
 * Earlier = (created_at, id) order, so concurrent inserts elect one leader.
 * Once the bot lists its inbox (read_at set), the next row wakes again.
 */
export const loadCoalescedProjectWakeMembershipIds = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly membershipIds: readonly string[];
}): Promise<ReadonlySet<string>> => {
  if (input.membershipIds.length === 0) {
    return new Set();
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT DISTINCT d.membership_id AS coalesced_membership_id
      FROM project_message_deliveries d
      JOIN project_messages m ON m.id = d.message_id
      JOIN project_messages cur ON cur.id = ${input.messageId}
      LEFT JOIN project_grok_routine_wake_attempts a
        ON a.message_id = d.message_id
       AND a.membership_id = d.membership_id
      WHERE d.membership_id = ANY(${[...input.membershipIds]}::text[])
        AND m.project_id = ${input.projectId}
        AND m.id <> cur.id
        AND m.read_at IS NULL
        AND m.acked_at IS NULL
        AND NOT (m.kind = ANY(${[...PROJECT_MESSAGE_NO_WAKE_STATUS_KINDS]}::text[]))
        AND m.created_at >= NOW() - make_interval(secs => ${PROJECT_WAKE_COALESCE_WINDOW_SECONDS})
        AND (m.created_at, m.id) < (cur.created_at, cur.id)
        AND (
          a.result ~ '^(http_2[0-9]{2}|fetch_failed)$'
          OR (
            a.id IS NULL
            AND m.created_at >= NOW() - make_interval(secs => ${PROJECT_WAKE_IN_FLIGHT_SECONDS})
          )
        )
    `,
  );
  return new Set(
    rows.flatMap((row) =>
      typeof row.coalesced_membership_id === "string"
        ? [row.coalesced_membership_id]
        : [],
    ),
  );
};
