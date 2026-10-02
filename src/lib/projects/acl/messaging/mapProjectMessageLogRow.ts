import type { ProjectMessageLogEntry } from "@/lib/projects/acl/messaging/projectMessageLog.types";

export const mapProjectMessageLogRow = (
  row: Record<string, unknown>,
): ProjectMessageLogEntry => {
  const senderMembershipId = row.sender_membership_id
    ? String(row.sender_membership_id)
    : null;
  const storedToName = row.to_project_display_name
    ? String(row.to_project_display_name)
    : null;
  const liveToName = row.recipient_display_name
    ? String(row.recipient_display_name)
    : null;
  return {
    messageId: String(row.id),
    kind: String(row.kind),
    summary: String(row.summary),
    refs:
      row.refs !== null && typeof row.refs === "object"
        ? (row.refs as Record<string, unknown>)
        : {},
    fromProjectDisplayName:
      senderMembershipId === null
        ? "Owner"
        : row.sender_display_name
          ? String(row.sender_display_name)
          : null,
    fromMembershipId: senderMembershipId,
    toProjectDisplayName: liveToName ?? storedToName,
    toMembershipId: row.to_membership_id ? String(row.to_membership_id) : null,
    toUserId: row.to_user_id ? String(row.to_user_id) : null,
    toTeamLabel: row.to_team_label ? String(row.to_team_label) : null,
    createdAt: String(row.created_at),
    ackedAt: row.acked_at ? String(row.acked_at) : null,
  };
};
