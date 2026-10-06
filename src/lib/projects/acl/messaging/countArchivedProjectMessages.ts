import { asRowArray, getSql } from "@/lib/db";

/** Archived ({n}) filter count — project-wide, same for every reader. */
export const countArchivedProjectMessages = async (
  projectId: string,
): Promise<number> => {
  const rows = asRowArray(
    await getSql()`
      SELECT COUNT(*)::int AS c
      FROM project_messages
      WHERE project_id = ${projectId}
        AND archived_at IS NOT NULL
    `,
  );
  return Number(rows[0]?.c ?? 0);
};
