import type { getSql } from "@/lib/db";
import type ProjectDeleteQuery from "@/lib/projects/delete/types/ProjectDeleteQuery.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/** Final statement: the project row itself, only when the owner matches. */
const buildDeleteOwnedProjectRowQuery = (
  sql: ReturnType<typeof getSql>,
  { projectId, ownerUserId }: ProjectDeleteTarget,
): ProjectDeleteQuery => sql`
  DELETE FROM user_projects
  WHERE id = ${projectId}
    AND owner_user_id = ${ownerUserId}
  RETURNING id
`;

export default buildDeleteOwnedProjectRowQuery;
