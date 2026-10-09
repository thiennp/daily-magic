import { ensureGroupInvitesSchema } from "@/lib/auth/groupInvites/ensureGroupInvitesSchema";
import { asRowArray, getSql } from "@/lib/db";

export type PendingGroupInvite = {
  readonly id: string;
  readonly groupId: string;
  readonly groupName: string;
  readonly role: string;
  readonly invitedByName: string | null;
  readonly createdAt: string;
};

/** The invitations waiting for this user (their own only). */
export const listPendingGroupInvitesForUser = async (
  userId: string,
): Promise<readonly PendingGroupInvite[]> => {
  await ensureGroupInvitesSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT i.id, i.group_id, g.name AS group_name, i.role, i.created_at,
        COALESCE(NULLIF(btrim(u.name), ''), u.email) AS invited_by_name
      FROM group_invites i
      JOIN groups g ON g.id = i.group_id
      LEFT JOIN users u ON u.id = i.invited_by_user_id
      WHERE i.invitee_user_id = ${userId} AND i.status = 'pending'
      ORDER BY i.created_at DESC
      LIMIT 50
    `,
  );
  return rows.map((row) => ({
    id: String(row.id),
    groupId: String(row.group_id),
    groupName: String(row.group_name),
    role: String(row.role),
    invitedByName: row.invited_by_name ? String(row.invited_by_name) : null,
    createdAt: new Date(String(row.created_at)).toISOString(),
  }));
};
