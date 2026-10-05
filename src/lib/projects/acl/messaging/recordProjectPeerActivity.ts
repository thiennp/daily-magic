import { asRowArray, getSql } from "@/lib/db";
import { applyProjectB2bTransition } from "@/lib/projects/acl/messaging/applyProjectB2bTransition";
import { nextProjectB2bState } from "@/lib/projects/acl/messaging/nextProjectB2bState";
import { parseProjectB2bState } from "@/lib/projects/acl/messaging/parseProjectB2bState";
import { PROJECT_B2B_TIMER_RESET_STATES } from "@/lib/projects/acl/messaging/projectB2bStateMachine";
import { projectPeerActivityEventForKind } from "@/lib/projects/acl/messaging/projectPeerActivityEventForKind";
import { resetProjectB2bSilenceTimer } from "@/lib/projects/acl/messaging/resetProjectB2bSilenceTimer";

export type ProjectPeerActivityResult = {
  /** Watched deliveries from these recipients to this peer. */
  readonly matched: number;
  /** Deliveries that took a legal transition. */
  readonly moved: number;
};

/**
 * A message from peer B to A is activity on every watched delivery of A's
 * messages to B. Reply kinds map to their own event; any other kind is status.
 * When the legal target is processing or status_reporting, the silence clock
 * is reset first (so a concurrent check never sees the new state with the old
 * time), then the state moves. Illegal ones (e.g. from blocked_silent_10m or
 * acked) change nothing.
 */
export const recordProjectPeerActivity = async (input: {
  readonly fromMembershipId: string;
  readonly toMembershipIds: readonly string[];
  readonly kind: string;
  readonly now: Date;
}): Promise<ProjectPeerActivityResult> => {
  if (input.toMembershipIds.length === 0) {
    return { matched: 0, moved: 0 };
  }
  const event = projectPeerActivityEventForKind(input.kind) ?? "status";
  const toMembershipIds = [...input.toMembershipIds];
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT d.id, d.b2b_state
      FROM project_message_deliveries d
      JOIN project_messages m ON m.id = d.message_id
      WHERE d.membership_id = ${input.fromMembershipId}
        AND m.sender_membership_id = ANY(${toMembershipIds}::text[])
        AND d.b2b_state IS NOT NULL
    `,
  );
  let moved = 0;
  for (const row of rows) {
    const from = parseProjectB2bState(row.b2b_state);
    const next = from === null ? null : nextProjectB2bState(from, event);
    if (from === null || next === null || !next.ok) {
      continue;
    }
    const deliveryId = String(row.id);
    if (PROJECT_B2B_TIMER_RESET_STATES.includes(next.state)) {
      await resetProjectB2bSilenceTimer({ deliveryId, from, now: input.now });
    }
    const applied = await applyProjectB2bTransition({
      deliveryId,
      from,
      event,
      now: input.now,
    });
    moved += applied ? 1 : 0;
  }
  return { matched: rows.length, moved };
};
