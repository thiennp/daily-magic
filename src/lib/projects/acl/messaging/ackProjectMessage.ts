import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { deleteProjectMessageWithOutcome } from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome";
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
  const addressed =
    toUserId === input.actorUserId ||
    (toTeam !== null && membership !== null && toTeam === membership.teamLabel);
  if (!addressed) {
    return { ok: false, code: "forbidden" };
  }
  // Explicit ack stays an immediate delete (with thin outcome first).
  const deleted = await deleteProjectMessageWithOutcome({
    messageId: input.messageId,
    deletedReason: "ack",
    finalB2bState: "acked",
  });
  if (!deleted.ok) {
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
