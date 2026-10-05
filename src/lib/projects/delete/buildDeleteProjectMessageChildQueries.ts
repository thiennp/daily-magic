import type { getSql } from "@/lib/db";
import type ProjectDeleteQuery from "@/lib/projects/delete/types/ProjectDeleteQuery.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/**
 * Per-message, per-recipient rows. Each statement re-checks ownership through
 * user_projects, so a wrong owner deletes nothing even inside the transaction.
 */
const buildDeleteProjectMessageChildQueries = (
  sql: ReturnType<typeof getSql>,
  { projectId, ownerUserId }: ProjectDeleteTarget,
): readonly ProjectDeleteQuery[] => [
  sql`
    DELETE FROM project_message_deliveries
    WHERE message_id IN (
      SELECT m.id FROM project_messages AS m
      INNER JOIN user_projects AS p ON p.id = m.project_id
      WHERE p.id = ${projectId} AND p.owner_user_id = ${ownerUserId}
    )
    OR membership_id IN (
      SELECT pm.id FROM project_memberships AS pm
      INNER JOIN user_projects AS p ON p.id = pm.project_id
      WHERE p.id = ${projectId} AND p.owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_grok_routine_wake_attempts
    WHERE message_id IN (
      SELECT m.id FROM project_messages AS m
      INNER JOIN user_projects AS p ON p.id = m.project_id
      WHERE p.id = ${projectId} AND p.owner_user_id = ${ownerUserId}
    )
    OR membership_id IN (
      SELECT pm.id FROM project_memberships AS pm
      INNER JOIN user_projects AS p ON p.id = pm.project_id
      WHERE p.id = ${projectId} AND p.owner_user_id = ${ownerUserId}
    )
  `,
];

export default buildDeleteProjectMessageChildQueries;
