import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import { asRowArray, getSql } from "@/lib/db";

export const queryPublishedCapabilitiesWithHarnessForMarketplace = async (
  viewerUserId: string,
): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  return asRowArray(
    await sql`
      SELECT
        published_capabilities.*,
        (
          SELECT cv.harness_set_slug
          FROM components c
          INNER JOIN component_versions cv ON cv.component_id = c.id
          WHERE c.published_capability_id = published_capabilities.id
            AND cv.harness_set_slug IS NOT NULL
          ORDER BY cv.version_number DESC
          LIMIT 1
        ) AS harness_set_slug_from_component
      FROM published_capabilities
      WHERE status = ${CapabilityStatus.PUBLISHED}
        AND visibility <> ${CapabilityVisibility.PRIVATE}
        AND owner_user_id <> ${viewerUserId}
        AND EXISTS (
          SELECT 1
          FROM components c
          INNER JOIN component_versions cv ON cv.component_id = c.id
          WHERE c.published_capability_id = published_capabilities.id
            AND cv.harness_set_slug IS NOT NULL
        )
      ORDER BY name ASC
    `,
  );
};
