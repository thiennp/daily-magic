import { asRowArray, getSql } from "@/lib/db";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";
import { buildOfficialHarnessInstallBundlesForSlugs } from "@/lib/projects/buildOfficialHarnessInstallBundlesForSlugs";

const listBoundHarnessInstallBundlesForProject = async (
  ownerUserId: string,
  projectId: string,
): Promise<readonly HarnessInstallBundle[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT c.slug
      FROM project_components pc
      INNER JOIN user_projects up ON up.id = pc.project_id
      INNER JOIN components c ON c.id = pc.component_id
      WHERE up.owner_user_id = ${ownerUserId}
        AND pc.project_id = ${projectId}
        AND pc.kind = 'harness'
        AND pc.removed_at IS NULL
        AND pc.enabled = true
      ORDER BY c.slug
    `,
  );

  return buildOfficialHarnessInstallBundlesForSlugs(
    rows.map((row) => String(row.slug ?? "")),
  );
};

export default listBoundHarnessInstallBundlesForProject;
