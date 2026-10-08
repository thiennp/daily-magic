import { asRowArray, getSql } from "@/lib/db";

/**
 * True when walking depends_on from `fromIds` (same project) reaches
 * `targetId`, i.e. saving `targetId.dependsOn = fromIds` would close a
 * cycle. The recursive UNION drops visited ids, so the walk ends on any graph.
 */
export const projectTaskDependsOnReaches = async (input: {
  readonly projectId: string;
  readonly fromIds: readonly string[];
  readonly targetId: string;
}): Promise<boolean> => {
  if (input.fromIds.length === 0) return false;
  const rows = asRowArray(
    await getSql()`
      WITH RECURSIVE walk(id) AS (
        SELECT unnest(${[...input.fromIds]}::text[])
        UNION
        SELECT dep FROM walk w
        JOIN project_task_records t
          ON t.id = w.id AND t.project_id = ${input.projectId}
        CROSS JOIN LATERAL unnest(t.depends_on) AS dep
      )
      SELECT 1 AS hit FROM walk WHERE id = ${input.targetId} LIMIT 1
    `,
  );
  return rows.length > 0;
};
