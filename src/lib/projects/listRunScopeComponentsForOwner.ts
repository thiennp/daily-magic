import { asRowArray, getSql } from "@/lib/db";

export type RunScopeComponentOption = {
  readonly componentId: string;
  readonly kind: "harness" | "workflow" | "agent";
  readonly name: string;
  readonly versionLabel: string | null;
};

const listRunScopeComponentsForOwner = async (
  ownerUserId: string,
  projectId: string,
): Promise<readonly RunScopeComponentOption[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        c.id AS component_id,
        c.kind,
        c.name,
        cv.version_label
      FROM components c
      LEFT JOIN LATERAL (
        SELECT version_label
        FROM component_versions
        WHERE component_id = c.id
        ORDER BY version_number DESC
        LIMIT 1
      ) cv ON true
      WHERE c.owner_user_id = ${ownerUserId}
        AND NOT EXISTS (
          SELECT 1
          FROM project_components pc
          WHERE pc.project_id = ${projectId}
            AND pc.component_id = c.id
            AND pc.removed_at IS NULL
            AND pc.enabled = true
        )
      ORDER BY c.kind, c.name
    `,
  );

  return rows.map((row) => {
    const kind = String(row.kind);
    const normalizedKind =
      kind === "workflow" || kind === "agent" ? kind : "harness";

    return {
      componentId: String(row.component_id),
      kind: normalizedKind,
      name: String(row.name),
      versionLabel:
        row.version_label !== null && row.version_label !== undefined
          ? String(row.version_label)
          : null,
    };
  });
};

export default listRunScopeComponentsForOwner;
