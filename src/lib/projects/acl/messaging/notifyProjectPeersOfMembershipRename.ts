import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { asRowArray, getSql } from "@/lib/db";

/** Notify active peers + owner when a member display name is renamed (peer.renamed). */
export const notifyProjectPeersOfMembershipRename = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly userId: string;
  readonly previousDisplayName: string | null;
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
  const from = input.previousDisplayName ?? "member";
  const to = input.projectDisplayName ?? "member";
  const summary = `Peer renamed: ${from} → ${to}`;
  for (const row of peerRows) {
    const recipient = { id: String(row.id), user_id: String(row.user_id) };
    await insertProjectMessageWithDeliveries({
      projectId: input.projectId,
      senderMembershipId: input.membershipId,
      senderProjectDisplayName: input.projectDisplayName,
      senderUserId: input.userId,
      toMembershipId: recipient.id,
      toUserId: recipient.user_id,
      toTeamLabel: null,
      toProjectDisplayName:
        typeof row.project_display_name === "string"
          ? row.project_display_name
          : null,
      kind: "peer.renamed",
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
      senderProjectDisplayName: input.projectDisplayName,
      senderUserId: input.userId,
      toMembershipId: null,
      toUserId: project.ownerUserId,
      toTeamLabel: null,
      toProjectDisplayName: null,
      kind: "peer.renamed",
      summary,
      refsJson: "{}",
      recipients: [],
    });
  }
  return { notifiedPeerCount: peerRows.length };
};
