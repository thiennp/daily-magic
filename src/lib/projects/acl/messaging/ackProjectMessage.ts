import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { deleteProjectMessageWithOutcome } from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome";
import { ackProjectWholeMessageDelivery } from "@/lib/projects/acl/messaging/messenger/ackProjectWholeMessageDelivery";
import { isProjectMessengerWholeAddress } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerWholeAddress";
import { gateProjectMessageDelete } from "@/lib/projects/acl/messaging/gateProjectMessageDelete";
import { holdAckedProjectMessage } from "@/lib/projects/acl/messaging/holdAckedProjectMessage";
import {
  ackedProjectMessageOk,
  alreadyAckedProjectMessageOrNotFound,
  type AckProjectMessageResult,
} from "@/lib/projects/acl/messaging/ackProjectMessageResult";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { asRowArray, getSql } from "@/lib/db";

export type { AckProjectMessageResult };

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
    return alreadyAckedProjectMessageOrNotFound(input);
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
    // Whole project: ack moves only this bot's delivery; the shared row stays.
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
  // Held for computerAck after an earlier ack: acked_at is already set.
  const wasAcked = rows[0].acked_at !== null && rows[0].acked_at !== undefined;
  // History delete gate: hold when computerAck is still required.
  const gate = await gateProjectMessageDelete({
    projectId,
    messageId: input.messageId,
    createdAt: rows[0].created_at as Date | string,
    existingRuleAllows: true,
  });
  if (gate === "deny") {
    return holdAckedProjectMessage({ ...input, projectId, wasAcked });
  }
  // Main delete-on-ack: thin outcome first, then gated hard DELETE.
  const deleted = await deleteProjectMessageWithOutcome({
    messageId: input.messageId,
    deletedReason: "ack",
    finalB2bState: "acked",
  });
  if (!deleted.ok) {
    if (deleted.code === "computer_ack_required") {
      return holdAckedProjectMessage({ ...input, projectId, wasAcked });
    }
    // A sibling ack deleted the row between our SELECT and DELETE.
    return alreadyAckedProjectMessageOrNotFound(input);
  }
  await writeProjectAccessAudit({
    projectId,
    actorUserId: input.actorUserId,
    action: "msg.ack",
    detail: { messageId: input.messageId, deleted: true },
  });
  return ackedProjectMessageOk(input.messageId, wasAcked);
};
