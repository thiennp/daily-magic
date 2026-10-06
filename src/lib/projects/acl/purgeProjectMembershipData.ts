import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getSql } from "@/lib/db";

/**
 * Remove all project inbox and webhook state so a revoked member can reconnect
 * cleanly. Archived messages (and their deliveries) stay: the owner can still
 * read a revoked member's messages under Archived (Lead lock Q5).
 */
export const purgeProjectMembershipData = async (input: {
  readonly projectId: string;
  readonly membership: Pick<ProjectMembershipRecord, "id" | "userId">;
}): Promise<void> => {
  const sql = getSql();

  // Delete direct deliveries first; deleting a message also cascades its deliveries.
  await sql`
    DELETE FROM project_message_deliveries d
    WHERE d.membership_id = ${input.membership.id}
      AND NOT EXISTS (
        SELECT 1 FROM project_messages a
        WHERE a.id = d.message_id AND a.archived_at IS NOT NULL
      )
  `;
  await sql`
    DELETE FROM project_grok_routine_wake_attempts
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
      AND archived_at IS NULL
  `;
  await sql`
    DELETE FROM project_membership_webhooks
    WHERE project_id = ${input.projectId}
      AND membership_id = ${input.membership.id}
  `;
  await sql`
    DELETE FROM project_membership_grok_routine_webhooks
    WHERE project_id = ${input.projectId}
      AND membership_id = ${input.membership.id}
  `;
};
