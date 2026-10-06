import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectRunsWithoutApprovalSchema } from "@/lib/projects/acl/runsWithoutApproval/ensureProjectRunsWithoutApprovalSchema";

/**
 * S0-2: true only when the owner turned on "Allow runs without approval" for
 * this project. Missing project or any read error → false (fail closed:
 * the run then needs approval).
 */
export const readProjectRunsWithoutApproval = async (
  projectId: string,
): Promise<boolean> => {
  try {
    await ensureProjectRunsWithoutApprovalSchema();
    const rows = asRowArray(
      await getSql()`
        SELECT allow_runs_without_approval
        FROM user_projects
        WHERE id = ${projectId}::text
        LIMIT 1
      `,
    );
    return rows[0]?.allow_runs_without_approval === true;
  } catch {
    return false;
  }
};
