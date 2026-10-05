import type { getSql } from "@/lib/db";
import buildDeleteOwnedProjectRowQuery from "@/lib/projects/delete/buildDeleteOwnedProjectRowQuery";
import buildDeleteProjectMembershipChildQueries from "@/lib/projects/delete/buildDeleteProjectMembershipChildQueries";
import buildDeleteProjectMessageChildQueries from "@/lib/projects/delete/buildDeleteProjectMessageChildQueries";
import buildDeleteProjectScopedQueries from "@/lib/projects/delete/buildDeleteProjectScopedQueries";
import type ProjectDeleteQuery from "@/lib/projects/delete/types/ProjectDeleteQuery.type";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/**
 * All statements in PROJECT_DELETE_TABLES_IN_ORDER order. The project row
 * delete is always last so its RETURNING tells whether anything was deleted.
 */
const buildProjectDeleteTransactionQueries = (
  sql: ReturnType<typeof getSql>,
  target: ProjectDeleteTarget,
): readonly ProjectDeleteQuery[] => [
  ...buildDeleteProjectMessageChildQueries(sql, target),
  ...buildDeleteProjectMembershipChildQueries(sql, target),
  ...buildDeleteProjectScopedQueries(sql, target),
  buildDeleteOwnedProjectRowQuery(sql, target),
];

export default buildProjectDeleteTransactionQueries;
