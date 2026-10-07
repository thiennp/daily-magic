import { asRowArray, getSql } from "@/lib/db";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";

const optionalString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

/**
 * Delete-on-ack removes the message row, so a second ack (e.g. a sibling
 * concurrent wake, DF-020/021) finds nothing. The thin outcome row written
 * before every hard delete (ack / delete-on-read / computerAck) still names
 * the recipient: true only when that recipient is the caller (user id, or the
 * caller's active membership in the outcome's project). Unknown ids and
 * someone else's message stay false (→ not_found).
 * Caller runs ensureProjectAclSchema first (creates project_message_outcomes).
 */
export const isProjectMessageAlreadyAckedByActor = async (input: {
  readonly messageId: string;
  readonly actorUserId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT project_id, recipient_user_id, recipient_membership_id
      FROM project_message_outcomes
      WHERE message_id = ${input.messageId}
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined) {
    return false;
  }
  if (optionalString(row.recipient_user_id) === input.actorUserId) {
    return true;
  }
  const recipientMembershipId = optionalString(row.recipient_membership_id);
  const projectId = optionalString(row.project_id);
  if (recipientMembershipId === null || projectId === null) {
    return false;
  }
  const membership = await getActiveProjectMembership(
    projectId,
    input.actorUserId,
  );
  return membership?.id === recipientMembershipId;
};
