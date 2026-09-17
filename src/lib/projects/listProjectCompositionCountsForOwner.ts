import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import { asRowArray, getSql } from "@/lib/db";

const emptyCounts = (): ProjectCompositionCounts => ({
  harness: 0,
  workflow: 0,
  agent: 0,
});

const listProjectCompositionCountsForOwner = async (
  ownerUserId: string,
): Promise<ReadonlyMap<string, ProjectCompositionCounts>> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        pc.project_id,
        pc.kind,
        COUNT(*)::int AS count
      FROM project_components pc
      INNER JOIN user_projects up ON up.id = pc.project_id
      WHERE up.owner_user_id = ${ownerUserId}
        AND pc.removed_at IS NULL
        AND pc.enabled = true
      GROUP BY pc.project_id, pc.kind
    `,
  );

  const byProject = new Map<string, ProjectCompositionCounts>();

  for (const row of rows) {
    const projectId = String(row.project_id);
    const kind = String(row.kind);
    const count = Number(row.count);
    const existing = byProject.get(projectId) ?? emptyCounts();

    if (kind === "harness") {
      byProject.set(projectId, { ...existing, harness: count });
    } else if (kind === "workflow") {
      byProject.set(projectId, { ...existing, workflow: count });
    } else if (kind === "agent") {
      byProject.set(projectId, { ...existing, agent: count });
    }
  }

  return byProject;
};

export default listProjectCompositionCountsForOwner;
