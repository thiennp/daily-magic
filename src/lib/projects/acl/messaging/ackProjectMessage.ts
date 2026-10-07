import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { ackProjectWholeMessageDelivery } from "@/lib/projects/acl/messaging/messenger/ackProjectWholeMessageDelivery";
import { isProjectMessengerWholeAddress } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerWholeAddress";
import { stampProjectMessageAckedAt } from "@/lib/projects/acl/messaging/stampProjectMessageAckedAt";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type AckProjectMessageResult =
  | { readonly ok: true; readonly messageId: string }
  | {
      readonly ok: false;
      readonly code: "forbidden" | "not_found" | "computer_ack_required";
    };

/**
 * Recipient ack: stamp acked_at only (keep-300). Whole-project acks still
 * move only this bot's delivery. Never hard-deletes the message row.
 */
export const ackProjectMessage = async (input: {
  readonly messageId: string;
  readonly actorUserId: string;
}): Promise<AckProjectMessageResult> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM project_messages WHERE id = ${input.messageId} LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "not_found" };
  }
  const projectId = String(rows[0].project_id);
  const membership = await getActiveProjectMembership(
    projectId,
    input.actorUserId,
  );
  const project = await getUserProjectById(projectId);
  const isOwner = project?.ownerUserId === input.actorUserId;
  if (membership === null && !isOwner) {
    return { ok: false, code: "forbidden" };
  }
  const toUserId = rows[0].to_user_id ? String(rows[0].to_user_id) : null;
  const toTeam = rows[0].to_team_label ? String(rows[0].to_team_label) : null;
  const toMembershipId = rows[0].to_membership_id
    ? String(rows[0].to_membership_id)
    : null;
  if (
    membership !== null &&
    isProjectMessengerWholeAddress({
      toMembershipId,
      toUserId,
      toTeamLabel: toTeam,
    })
  ) {
    const acked = await ackProjectWholeMessageDelivery({
      messageId: input.messageId,
      membershipId: membership.id,
    });
    return acked.ok ? { ok: true, messageId: input.messageId } : acked;
  }
  const addressed =
    toUserId === input.actorUserId ||
    (toTeam !== null && membership !== null && toTeam === membership.teamLabel);
  if (!addressed) {
    return { ok: false, code: "forbidden" };
  }
  return stampProjectMessageAckedAt({
    projectId,
    messageId: input.messageId,
    actorUserId: input.actorUserId,
  });
};
