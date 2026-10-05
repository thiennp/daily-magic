import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { buildProjectUpdatedSummary } from "@/lib/projects/acl/messaging/buildProjectUpdatedSummary";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { PROJECT_MESSAGE_KIND_PROJECT_UPDATED } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Fan out project.updated to every active membership + the project owner.
 * Wake owns debounce / write-hook callers; this inserts deliveries now (same
 * pattern as peer.joined via insertProjectMessageWithDeliveries).
 */
export const notifyProjectMembersOfProjectUpdated = async (input: {
  readonly projectId: string;
  readonly fields: readonly string[];
  readonly actorUserId?: string;
}): Promise<{ readonly notifiedPeerCount: number }> => {
  const summary = buildProjectUpdatedSummary(input.fields);
  if (summary === null) {
    return { notifiedPeerCount: 0 };
  }

  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { notifiedPeerCount: 0 };
  }

  const senderUserId = input.actorUserId ?? project.ownerUserId;
  const sql = getSql();
  const memberRows = asRowArray(
    await sql`
      SELECT id, user_id, project_display_name
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND status = 'active'
    `,
  );

  for (const row of memberRows) {
    const recipient = { id: String(row.id), user_id: String(row.user_id) };
    await insertProjectMessageWithDeliveries({
      projectId: input.projectId,
      senderMembershipId: null,
      senderProjectDisplayName: null,
      senderUserId,
      toMembershipId: recipient.id,
      toUserId: recipient.user_id,
      toTeamLabel: null,
      toProjectDisplayName:
        typeof row.project_display_name === "string"
          ? row.project_display_name
          : null,
      kind: PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
      summary,
      refsJson: "{}",
      recipients: [recipient],
    });
  }

  const ownerAlreadyMember = memberRows.some(
    (row) => String(row.user_id) === project.ownerUserId,
  );
  if (!ownerAlreadyMember) {
    await insertProjectMessageWithDeliveries({
      projectId: input.projectId,
      senderMembershipId: null,
      senderProjectDisplayName: null,
      senderUserId,
      toMembershipId: null,
      toUserId: project.ownerUserId,
      toTeamLabel: null,
      toProjectDisplayName: null,
      kind: PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
      summary,
      refsJson: "{}",
      recipients: [],
    });
  }

  return { notifiedPeerCount: memberRows.length };
};
