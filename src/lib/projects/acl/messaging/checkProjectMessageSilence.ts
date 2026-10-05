import { asRowArray, getSql } from "@/lib/db";
import { applyProjectB2bTransition } from "@/lib/projects/acl/messaging/applyProjectB2bTransition";
import { dueProjectSilenceEvent } from "@/lib/projects/acl/messaging/dueProjectSilenceEvent";
import { notifyProjectSenderOfPeerSilence } from "@/lib/projects/acl/messaging/notifyProjectSenderOfPeerSilence";
import { parseProjectB2bState } from "@/lib/projects/acl/messaging/parseProjectB2bState";
import { PROJECT_B2B_SILENCE_CHECK_STATES } from "@/lib/projects/acl/messaging/projectB2bStateMachine";
import { PROJECT_B2B_SILENCE_NOTIFY_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

const optionalString = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

const toMs = (value: unknown): number =>
  value instanceof Date ? value.getTime() : Date.parse(String(value));

/**
 * Apply due 5 and 10 minute timeouts and notify sender A once per timeout.
 * Idempotent: the notice only goes out when the conditional claim lands.
 * At most one timeout per delivery per call. `now` comes from the caller;
 * no clock is read and no timer state is kept here. Never throws: callers are
 * the dispatch and inbox paths (and any cron), which must not fail on it.
 * Owner sends (no sender membership) time out the same way; the owner sees
 * the state on the message, so no inbox notice is stored for them.
 */
export const checkProjectMessageSilence = async (input: {
  readonly now: Date;
}): Promise<number> => {
  const { now } = input;
  try {
    const nowIso = now.toISOString();
    const notifyAfterSecs = PROJECT_B2B_SILENCE_NOTIFY_MS / 1_000;
    const watchedStates = [...PROJECT_B2B_SILENCE_CHECK_STATES];
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT d.id, d.message_id, d.b2b_state, d.last_activity_at,
          m.project_id, m.sender_membership_id, m.sender_user_id,
          a.project_display_name AS sender_display_name,
          b.project_display_name AS peer_display_name
        FROM project_message_deliveries d
        JOIN project_messages m ON m.id = d.message_id
        JOIN project_memberships b ON b.id = d.membership_id
        LEFT JOIN project_memberships a ON a.id = m.sender_membership_id
        WHERE d.b2b_state = ANY(${watchedStates}::text[])
          AND d.last_activity_at <=
            ${nowIso}::timestamptz - make_interval(secs => ${notifyAfterSecs})
      `,
    );
    const moved: string[] = [];
    for (const row of rows) {
      const from = parseProjectB2bState(row.b2b_state);
      const event =
        from === null
          ? null
          : dueProjectSilenceEvent({
              state: from,
              lastActivityAtMs: toMs(row.last_activity_at),
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
      moved.push(String(row.id));
      if (
        row.sender_membership_id === null ||
        row.sender_membership_id === undefined
      ) {
        continue;
      }
      await notifyProjectSenderOfPeerSilence({
        event,
        projectId: String(row.project_id),
        messageId: String(row.message_id),
        senderMembershipId: String(row.sender_membership_id),
        senderUserId: String(row.sender_user_id),
        senderDisplayName: optionalString(row.sender_display_name),
        peerDisplayName: optionalString(row.peer_display_name),
      });
    }
    return moved.length;
  } catch (error: unknown) {
    console.error("project message silence check failed", {
      error: error instanceof Error ? error.message : "silence_check_failed",
    });
    return 0;
  }
};
