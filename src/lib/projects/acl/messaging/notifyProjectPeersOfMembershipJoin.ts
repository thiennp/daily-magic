import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { asRowArray, getSql } from "@/lib/db";

/** Notify active peers and the project owner when a member is approved. */
export const notifyProjectPeersOfMembershipJoin = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly userId: string;
  readonly projectDisplayName: string | null;
}): Promise<{ readonly notifiedPeerCount: number }> => {
  const sql = getSql();
  const peerRows = asRowArray(
    await sql`
      SELECT id, user_id, project_display_name
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND status = 'active'
        AND id <> ${input.membershipId}
    `,
  );
  const summary = `Peer joined: ${input.projectDisplayName ?? "new member"}`;
  for (const row of peerRows) {
    const recipient = { id: String(row.id), user_id: String(row.user_id) };
    await insertProjectMessageWithDeliveries({
      projectId: input.projectId,
      senderMembershipId: input.membershipId,
      senderUserId: input.userId,
      toMembershipId: recipient.id,
      toUserId: recipient.user_id,
      toTeamLabel: null,
      toProjectDisplayName:
        typeof row.project_display_name === "string"
          ? row.project_display_name
          : null,
      kind: "peer.joined",
      summary,
      refsJson: "{}",
      recipients: [recipient],
    });
  }

  const project = await getUserProjectById(input.projectId);
  if (project !== null && project.ownerUserId !== input.userId) {
    await insertProjectMessageWithDeliveries({
      projectId: input.projectId,
      senderMembershipId: input.membershipId,
      senderUserId: input.userId,
      toMembershipId: null,
      toUserId: project.ownerUserId,
      toTeamLabel: null,
      toProjectDisplayName: null,
      kind: "peer.joined",
      summary,
      refsJson: "{}",
      recipients: [],
    });
  }
  return { notifiedPeerCount: peerRows.length };
};
