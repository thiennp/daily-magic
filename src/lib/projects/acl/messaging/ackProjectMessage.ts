import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { deleteProjectMessageWithOutcome } from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome";
import { ackProjectWholeMessageDelivery } from "@/lib/projects/acl/messaging/messenger/ackProjectWholeMessageDelivery";
import { isProjectMessengerWholeAddress } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerWholeAddress";
import { gateProjectMessageDelete } from "@/lib/projects/acl/messaging/gateProjectMessageDelete";
import { holdProjectMessageForComputerAck } from "@/lib/projects/acl/messaging/holdProjectMessageForComputerAck";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { asRowArray, getSql } from "@/lib/db";

export type AckProjectMessageResult =
  | { readonly ok: true; readonly messageId: string }
  | {
      readonly ok: false;
      readonly code: "forbidden" | "not_found" | "computer_ack_required";
    };

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
  // History delete gate: hold when computerAck is still required.
  const gate = await gateProjectMessageDelete({
    projectId,
    messageId: input.messageId,
    createdAt: rows[0].created_at as Date | string,
    existingRuleAllows: true,
  });
  if (gate === "deny") {
    await holdProjectMessageForComputerAck({ messageId: input.messageId });
    await writeProjectAccessAudit({
      projectId,
      actorUserId: input.actorUserId,
      action: "msg.ack",
      detail: { messageId: input.messageId, deleted: false },
    });
    return { ok: true, messageId: input.messageId };
  }
  // Main delete-on-ack: thin outcome first, then gated hard DELETE.
  const deleted = await deleteProjectMessageWithOutcome({
    messageId: input.messageId,
    deletedReason: "ack",
    finalB2bState: "acked",
  });
  if (!deleted.ok) {
    if (deleted.code === "computer_ack_required") {
      await holdProjectMessageForComputerAck({ messageId: input.messageId });
      await writeProjectAccessAudit({
        projectId,
        actorUserId: input.actorUserId,
        action: "msg.ack",
        detail: { messageId: input.messageId, deleted: false },
      });
      return { ok: true, messageId: input.messageId };
    }
    return { ok: false, code: deleted.code };
  }
  await writeProjectAccessAudit({
    projectId,
    actorUserId: input.actorUserId,
    action: "msg.ack",
    detail: { messageId: input.messageId, deleted: true },
  });
  return { ok: true, messageId: input.messageId };
};
