import type { getSql } from "@/lib/db";
import type ProjectDeleteQuery from "@/lib/projects/delete/types/ProjectDeleteQuery.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/**
 * Credentials and hooks hanging off a membership: API keys, HMAC webhooks,
 * Grok routine webhooks, display-name aliases. Ownership checked per statement.
 */
const buildDeleteProjectMembershipChildQueries = (
  sql: ReturnType<typeof getSql>,
  { projectId, ownerUserId }: ProjectDeleteTarget,
): readonly ProjectDeleteQuery[] => [
  sql`
    DELETE FROM project_api_keys
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_membership_webhooks
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_membership_grok_routine_webhooks
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_membership_display_name_aliases
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
];

export default buildDeleteProjectMembershipChildQueries;
