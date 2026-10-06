import { asRowArray, getSql } from "@/lib/db";
import {
  parseProjectMembershipDeliveryMode,
  type ProjectMembershipDeliveryMode,
} from "@/lib/projects/acl/membershipDeliveryMode.constant";

export type ProjectMessengerBotSeat = {
  readonly membershipId: string;
  readonly userId: string;
  readonly displayName: string | null;
  readonly deliveryMode: ProjectMembershipDeliveryMode;
};

/** Active bot seats of the project (member_kind bot), by nickname. */
export const loadProjectMessengerBots = async (
  projectId: string,
): Promise<readonly ProjectMessengerBotSeat[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id, user_id, project_display_name, delivery_mode
      FROM project_memberships
      WHERE project_id = ${projectId}
        AND status = 'active'
        AND member_kind = 'bot'
      ORDER BY project_display_name ASC NULLS LAST, created_at ASC
    `,
  );
  return rows.map((row) => ({
    membershipId: String(row.id),
    userId: String(row.user_id),
    displayName: row.project_display_name
      ? String(row.project_display_name)
      : null,
    deliveryMode: parseProjectMembershipDeliveryMode(row.delivery_mode),
  }));
};
