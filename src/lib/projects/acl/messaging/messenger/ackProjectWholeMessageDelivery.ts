import { asRowArray, getSql } from "@/lib/db";
import { nextProjectB2bState } from "@/lib/projects/acl/messaging/nextProjectB2bState";
import { PROJECT_B2B_STATES } from "@/lib/projects/acl/messaging/projectB2bStateMachine";

/** States with an ack edge in the existing machine (terminal states excluded). */
const ACKABLE_FROM: readonly string[] = PROJECT_B2B_STATES.filter(
  (state) => nextProjectB2bState(state, "ack").ok,
);

/**
 * Ack of a Whole project message by one bot: only that bot's delivery moves
 * to acked (unwatched rows too). The shared message row stays for the other
 * bots' chips; ack/TTL/delete-on-read remove it later. blocked_silent_10m
 * stays final. Idempotent: an already-final delivery is still ok.
 */
export const ackProjectWholeMessageDelivery = async (input: {
  readonly messageId: string;
  readonly membershipId: string;
}): Promise<
  { readonly ok: true } | { readonly ok: false; readonly code: "forbidden" }
> => {
  const sql = getSql();
  const ackable = [...ACKABLE_FROM];
  const rows = asRowArray(
    await sql`
      WITH mine AS (
        SELECT id FROM project_message_deliveries
        WHERE message_id = ${input.messageId}
          AND membership_id = ${input.membershipId}
      ), moved AS (
        UPDATE project_message_deliveries
        SET b2b_state = 'acked', b2b_state_at = NOW(), updated_at = NOW()
        WHERE id IN (SELECT id FROM mine)
          AND (b2b_state IS NULL OR b2b_state = ANY(${ackable}::text[]))
        RETURNING id
      )
      SELECT (SELECT COUNT(*) FROM mine) AS mine_count
    `,
  );
  return Number(rows[0]?.mine_count ?? 0) > 0
    ? { ok: true }
    : { ok: false, code: "forbidden" };
};
