import { asRowArray, getSql } from "@/lib/db";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/**
 * One guarded DELETE of the project row. Child rows (memberships, invites,
 * webhooks, messages, deliveries, wake attempts, access requests, API keys,
 * …) are removed by existing ON DELETE CASCADE FKs. Returns true only when
 * this owner’s project row was deleted.
 */
const runProjectDeleteTransaction = async (
  target: ProjectDeleteTarget,
): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM user_projects
      WHERE id = ${target.projectId}
        AND owner_user_id = ${target.ownerUserId}
      RETURNING id
    `,
  );

  return rows.length > 0;
};

export default runProjectDeleteTransaction;
