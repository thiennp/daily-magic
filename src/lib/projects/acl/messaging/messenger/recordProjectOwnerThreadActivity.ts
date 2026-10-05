import { asRowArray, getSql } from "@/lib/db";
import { applyProjectB2bActivityTransition } from "@/lib/projects/acl/messaging/applyProjectB2bActivityTransition";
import { nextProjectB2bState } from "@/lib/projects/acl/messaging/nextProjectB2bState";
import { parseProjectB2bState } from "@/lib/projects/acl/messaging/parseProjectB2bState";
import { projectPeerActivityEventForKind } from "@/lib/projects/acl/messaging/projectPeerActivityEventForKind";
import type { ProjectPeerActivityResult } from "@/lib/projects/acl/messaging/recordProjectPeerActivity";

/**
 * Owner twin of recordProjectPeerActivity. The owner has no membership row,
 * so a bot's message to "Owner" is activity on the bot's watched deliveries of
 * owner-sent messages (sender_membership_id NULL, sender_user_id = owner).
 * Same event mapping and the same table; illegal moves (e.g. out of
 * blocked_silent_10m) change nothing.
 */
export const recordProjectOwnerThreadActivity = async (input: {
  readonly projectId: string;
  readonly fromMembershipId: string;
  readonly ownerUserIds: readonly string[];
  readonly kind: string;
  readonly now: Date;
}): Promise<ProjectPeerActivityResult> => {
  if (input.ownerUserIds.length === 0) {
    return { matched: 0, moved: 0 };
  }
  const event = projectPeerActivityEventForKind(input.kind) ?? "status";
  const ownerUserIds = [...input.ownerUserIds];
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT d.id, d.b2b_state
      FROM project_message_deliveries d
      JOIN project_messages m ON m.id = d.message_id
      WHERE d.membership_id = ${input.fromMembershipId}
        AND m.project_id = ${input.projectId}
        AND m.sender_membership_id IS NULL
        AND m.sender_user_id = ANY(${ownerUserIds}::text[])
        AND d.b2b_state IS NOT NULL
    `,
  );
  const applied: boolean[] = [];
  for (const row of rows) {
    const from = parseProjectB2bState(row.b2b_state);
    if (from === null || !nextProjectB2bState(from, event).ok) {
      continue;
    }
    applied.push(
      await applyProjectB2bActivityTransition({
        deliveryId: String(row.id),
        from,
        event,
        now: input.now,
      }),
    );
  }
  return { matched: rows.length, moved: applied.filter(Boolean).length };
};
