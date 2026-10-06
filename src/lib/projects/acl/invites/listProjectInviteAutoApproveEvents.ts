import { ensureProjectInviteAutoApproveEventsSchema } from "@/lib/projects/acl/invites/ensureProjectInviteAutoApproveEventsSchema";
import type {
  ProjectInviteAutoApproveEvent,
  ProjectInviteAutoApproveEventKind,
} from "@/lib/projects/acl/invites/projectInviteAutoApproveEvent.types";
import { asRowArray, getSql } from "@/lib/db";

const parseEvent = (value: unknown): ProjectInviteAutoApproveEventKind => {
  if (value === "disabled") return "disabled";
  if (value === "member_auto_approved") return "member_auto_approved";
  return "enabled";
};

const mapRow = (row: Record<string, unknown>): ProjectInviteAutoApproveEvent => ({
  id: String(row.id),
  projectId: String(row.project_id),
  inviteId: String(row.invite_id),
  inviteLabel: String(row.invite_label),
  event: parseEvent(row.event),
  actorUserId: row.actor_user_id ? String(row.actor_user_id) : null,
  membershipId: row.membership_id ? String(row.membership_id) : null,
  memberDisplayName: row.member_display_name
    ? String(row.member_display_name)
    : null,
  createdAt: String(row.created_at),
});

/** Newest-first history for a project (future Activity slice). */
export const listProjectInviteAutoApproveEvents = async (
  projectId: string,
): Promise<readonly ProjectInviteAutoApproveEvent[]> => {
  await ensureProjectInviteAutoApproveEventsSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_invite_auto_approve_events
      WHERE project_id = ${projectId}
      ORDER BY created_at DESC, id DESC
    `,
  );
  return rows.map((row) => mapRow(row as Record<string, unknown>));
};
