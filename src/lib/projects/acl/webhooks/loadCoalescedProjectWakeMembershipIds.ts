import { asRowArray, getSql } from "@/lib/db";
import {
  PROJECT_MESSAGE_ACK_EVENT_KIND_PATTERN,
  PROJECT_MESSAGE_ASSIGNER_ONLY_WAKE_KINDS,
  PROJECT_MESSAGE_NO_WAKE_STATUS_KINDS,
} from "@/lib/projects/acl/messaging/isProjectMessageWakeSkippedByPolicy";
import {
  PROJECT_WAKE_COALESCE_WINDOW_SECONDS,
  PROJECT_WAKE_IN_FLIGHT_SECONDS,
  PROJECT_WAKE_MAX_RETRY_AFTER_SECONDS,
} from "@/lib/projects/acl/webhooks/projectWakeThrottle.constant";

/** Kinds that never lead a batch: no-wake status, assigner-only terminal (plus ack events by pattern). */
const NON_LEADER_KINDS: readonly string[] = [
  ...PROJECT_MESSAGE_NO_WAKE_STATUS_KINDS,
  ...PROJECT_MESSAGE_ASSIGNER_ONLY_WAKE_KINDS,
];

/**
 * Recipients whose bot is already woken for this batch (DF-026): an EARLIER
 * leader row to the same membership, sent in the coalesce window and still
 * unread/unacked, either has a stored POST result of http_2xx / fetch_failed
 * (fetch_failed = timeout, DNS, refused or other non-HTTP failure: a dead
 * endpoint would fail this POST too) or is still in flight.
 * Leader rows exclude status, done/blocked and ack-event kinds (worst case one
 * extra wake, never a dropped one).
 * Gated rows (coalesced / deferred_429) store no result, so "no stored result"
 * counts as in flight only for a few seconds, only for the FIRST unread leader
 * row of its batch, and never under a recent stored http_429. A gated row
 * always has an earlier leader (or a 429), so it can never pass as in flight. That stops a chain of
 * unstored rows from coalescing each other forever.
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
        AND NOT (m.kind = ANY(${[...NON_LEADER_KINDS]}::text[]))
        AND m.kind !~* ${PROJECT_MESSAGE_ACK_EVENT_KIND_PATTERN}
        AND m.created_at >= NOW() - make_interval(secs => ${PROJECT_WAKE_COALESCE_WINDOW_SECONDS})
        AND (m.created_at, m.id) < (cur.created_at, cur.id)
        AND (
          a.result ~ '^(http_2[0-9]{2}|fetch_failed)$'
          OR (
            a.id IS NULL
            AND m.created_at >= NOW() - make_interval(secs => ${PROJECT_WAKE_IN_FLIGHT_SECONDS})
            AND NOT EXISTS (
              SELECT 1
              FROM project_grok_routine_wake_attempts r
              WHERE r.membership_id = d.membership_id
                AND r.result = 'http_429'
                AND r.created_at BETWEEN
                  m.created_at - make_interval(secs => ${PROJECT_WAKE_MAX_RETRY_AFTER_SECONDS})
                  AND m.created_at
            )
            AND NOT EXISTS (
              SELECT 1
              FROM project_message_deliveries d0
              JOIN project_messages m0 ON m0.id = d0.message_id
              WHERE d0.membership_id = d.membership_id
                AND m0.project_id = m.project_id
                AND m0.read_at IS NULL
                AND m0.acked_at IS NULL
                AND NOT (m0.kind = ANY(${[...NON_LEADER_KINDS]}::text[]))
                AND m0.kind !~* ${PROJECT_MESSAGE_ACK_EVENT_KIND_PATTERN}
                AND (m0.created_at, m0.id) < (m.created_at, m.id)
                AND m0.created_at >= m.created_at - make_interval(secs => ${PROJECT_WAKE_COALESCE_WINDOW_SECONDS})
            )
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
