import { asRowArray, getSql } from "@/lib/db";

/** Bound harness/playbook slugs for a project (metadata only). Caller must ACL-gate. */
export const listBoundHarnessSlugsForProject = async (
  projectId: string,
): Promise<readonly string[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT c.slug
      FROM project_components pc
      INNER JOIN components c ON c.id = pc.component_id
      WHERE pc.project_id = ${projectId}
        AND pc.kind = 'harness'
        AND pc.removed_at IS NULL
        AND pc.enabled = true
      ORDER BY c.slug
    `,
  );
  return rows
    .map((row) => String(row.slug ?? "").trim())
    .filter((slug) => slug.length > 0);
};
