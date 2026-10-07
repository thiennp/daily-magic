import { asRowArray, getSql } from "@/lib/db";
import { readProjectMessengerInReplyTo } from "@/lib/projects/acl/messaging/messenger/readProjectMessengerInReplyTo";

/**
 * Assigner of the task a done / blocked reply answers (DF-026): the sender
 * membership of the message whose id the reply summary carries (inReplyTo /
 * "processing <id>" convention; refs cannot carry ids). Null when the summary
 * has no id, the parent row is gone (acked / TTL) or the parent was sent by
 * the owner (no bot to wake).
 */
export const loadProjectMessageAssignerMembershipId = async (input: {
  readonly projectId: string;
  readonly summary: string;
}): Promise<string | null> => {
  const { inReplyTo } = readProjectMessengerInReplyTo(input.summary);
  if (inReplyTo === null) {
    return null;
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT sender_membership_id
      FROM project_messages
      WHERE id = ${inReplyTo}
        AND project_id = ${input.projectId}
      LIMIT 1
    `,
  );
  const sender = rows[0]?.sender_membership_id;
  return sender ? String(sender) : null;
};
