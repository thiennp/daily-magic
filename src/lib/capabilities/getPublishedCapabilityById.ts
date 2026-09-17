import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function getPublishedCapabilityById(
  capabilityId: string,
): Promise<PublishedCapabilityRecord | null> {
  const sql = getSql();
  const rows = asRowArray(
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
      WHERE id = ${capabilityId}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapPublishedCapabilityRow(rows[0]);
}
