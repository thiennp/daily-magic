import { asRowArray, getSql } from "@/lib/db";
import buildProjectDeleteTransactionQueries from "@/lib/projects/delete/buildProjectDeleteTransactionQueries";
import type ProjectDeleteTarget from "@/lib/projects/delete/types/ProjectDeleteTarget.type";

/**
 * Sends every delete as one Postgres transaction (all or nothing).
 * Returns true only when the owned project row itself was deleted.
 */
const runProjectDeleteTransaction = async (
  target: ProjectDeleteTarget,
): Promise<boolean> => {
  const sql = getSql();
  const queries = buildProjectDeleteTransactionQueries(sql, target);
  const results = await sql.transaction([...queries]);
  const projectRows = asRowArray(results[results.length - 1]);

  return projectRows.length > 0;
};

export default runProjectDeleteTransaction;
