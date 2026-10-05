import { asRowArray, getSql } from "@/lib/db";
import { applyProjectB2bTransition } from "@/lib/projects/acl/messaging/applyProjectB2bTransition";
import { dueProjectSilenceEvent } from "@/lib/projects/acl/messaging/dueProjectSilenceEvent";
import { notifyProjectSenderOfPeerSilence } from "@/lib/projects/acl/messaging/notifyProjectSenderOfPeerSilence";
import { parseProjectB2bState } from "@/lib/projects/acl/messaging/parseProjectB2bState";
import {
  PROJECT_B2B_STATES,
  PROJECT_B2B_TRANSITIONS,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";
import { PROJECT_B2B_SILENCE_NOTIFY_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

/** States with a timeout edge in the transition table. */
const WATCHED_STATES = PROJECT_B2B_STATES.filter((state) => {
  const row = PROJECT_B2B_TRANSITIONS[state];
  return row.timeout_5m !== undefined || row.timeout_10m !== undefined;
});

const optionalString = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

const toMs = (value: unknown): number =>
  value instanceof Date ? value.getTime() : Date.parse(String(value));

/**
 * Apply due 5 and 10 minute timeouts and notify sender A once per timeout.
 * At most one timeout per delivery per call. `now` comes from the caller;
 * no clock is read and no timer state is kept here. Never throws: callers are
 * the dispatch and inbox paths (and any cron), which must not fail on it.
 */
export const checkProjectMessageSilence = async (input: {
  readonly now: Date;
}): Promise<number> => {
  const { now } = input;
  try {
    const nowIso = now.toISOString();
    const notifyAfterSecs = PROJECT_B2B_SILENCE_NOTIFY_MS / 1_000;
    const watchedStates = [...WATCHED_STATES];
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT d.id, d.message_id, d.b2b_state, d.woken_at,
          m.project_id, m.sender_membership_id, m.sender_user_id,
          a.project_display_name AS sender_display_name,
          b.id AS peer_membership_id, b.user_id AS peer_user_id,
          b.project_display_name AS peer_display_name
        FROM project_message_deliveries d
        JOIN project_messages m ON m.id = d.message_id
        JOIN project_memberships b ON b.id = d.membership_id
        LEFT JOIN project_memberships a ON a.id = m.sender_membership_id
        WHERE d.b2b_state = ANY(${watchedStates}::text[])
          AND d.woken_at <=
            ${nowIso}::timestamptz - make_interval(secs => ${notifyAfterSecs})
          AND m.sender_membership_id IS NOT NULL
      `,
    );
    let notified = 0;
    for (const row of rows) {
      const from = parseProjectB2bState(row.b2b_state);
      const event =
        from === null
          ? null
          : dueProjectSilenceEvent({
              state: from,
              wokenAtMs: toMs(row.woken_at),
              nowMs: now.getTime(),
            });
      if (from === null || event === null) {
        continue;
      }
      const applied = await applyProjectB2bTransition({
        deliveryId: String(row.id),
        from,
        event,
        now,
      });
      if (!applied) {
        continue;
      }
      await notifyProjectSenderOfPeerSilence({
        event,
        projectId: String(row.project_id),
        messageId: String(row.message_id),
        senderMembershipId: String(row.sender_membership_id),
        senderUserId: String(row.sender_user_id),
        senderDisplayName: optionalString(row.sender_display_name),
        peerMembershipId: String(row.peer_membership_id),
        peerUserId: String(row.peer_user_id),
        peerDisplayName: optionalString(row.peer_display_name),
      });
      notified += 1;
    }
    return notified;
  } catch (error: unknown) {
    console.error("project message silence check failed", {
      error: error instanceof Error ? error.message : "silence_check_failed",
    });
    return 0;
  }
};
