import type ProjectCompositionItem from "@/lib/projects/types/ProjectCompositionItem.type";
import { asRowArray, getSql } from "@/lib/db";

const listProjectCompositionItemsForProject = async (
  ownerUserId: string,
  projectId: string,
): Promise<readonly ProjectCompositionItem[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        pc.id,
        pc.kind,
        c.name,
        cv.version_label
      FROM project_components pc
      INNER JOIN user_projects up ON up.id = pc.project_id
      INNER JOIN components c ON c.id = pc.component_id
      LEFT JOIN component_versions cv ON cv.id = pc.pinned_version_id
      WHERE up.owner_user_id = ${ownerUserId}
        AND pc.project_id = ${projectId}
        AND pc.removed_at IS NULL
        AND pc.enabled = true
      ORDER BY pc.kind, c.name
    `,
  );

  return rows.map((row) => {
    const kind = String(row.kind);
    const normalizedKind =
      kind === "workflow" || kind === "agent" || kind === "harness"
        ? kind
        : "harness";

    return {
      id: String(row.id),
      kind: normalizedKind,
      name: String(row.name),
      versionLabel:
        row.version_label !== null && row.version_label !== undefined
          ? String(row.version_label)
          : null,
    };
  });
};

export default listProjectCompositionItemsForProject;
