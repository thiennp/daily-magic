import type { getSql } from "@/lib/db";
import type ProjectDeleteQuery from "@/lib/projects/delete/types/ProjectDeleteQuery.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/**
 * Rows keyed directly by project_id: inbox messages, access requests, invites,
 * folder refs (path strings only), knowledge, composition, device bindings,
 * then memberships last. Ownership checked per statement.
 */
const buildDeleteProjectScopedQueries = (
  sql: ReturnType<typeof getSql>,
  { projectId, ownerUserId }: ProjectDeleteTarget,
): readonly ProjectDeleteQuery[] => [
  sql`
    DELETE FROM project_messages
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_access_requests
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_invites
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_folder_refs
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_knowledge_items
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_composition_snapshots
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_components
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_device_bindings
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
  sql`
    DELETE FROM project_memberships
    WHERE project_id IN (
      SELECT id FROM user_projects
      WHERE id = ${projectId} AND owner_user_id = ${ownerUserId}
    )
  `,
];

export default buildDeleteProjectScopedQueries;
