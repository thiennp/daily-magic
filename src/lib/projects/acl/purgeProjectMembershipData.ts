import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getSql } from "@/lib/db";

/** Remove all project inbox and webhook state so a revoked member can reconnect cleanly. */
export const purgeProjectMembershipData = async (input: {
  readonly projectId: string;
  readonly membership: Pick<ProjectMembershipRecord, "id" | "userId">;
}): Promise<void> => {
  const sql = getSql();

  // Delete direct deliveries first; deleting a message also cascades its deliveries.
  await sql`
    DELETE FROM project_message_deliveries
    WHERE membership_id = ${input.membership.id}
  `;
  await sql`
    DELETE FROM project_messages
    WHERE project_id = ${input.projectId}
      AND (
        sender_membership_id = ${input.membership.id}
        OR to_membership_id = ${input.membership.id}
        OR to_user_id = ${input.membership.userId}
      )
  `;
  await sql`
    DELETE FROM project_membership_webhooks
    WHERE project_id = ${input.projectId}
      AND membership_id = ${input.membership.id}
  `;
};
