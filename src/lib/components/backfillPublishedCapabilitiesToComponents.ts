import backfillOnePublishedCapabilityToComponents from "@/lib/components/backfillOnePublishedCapabilityToComponents";
import { asRowArray, getSql } from "@/lib/db";

export type BackfillPublishedCapabilitiesResult = {
  readonly componentsInserted: number;
  readonly versionsInserted: number;
};

const backfillPublishedCapabilitiesToComponents =
  async (): Promise<BackfillPublishedCapabilitiesResult> => {
    const sql = getSql();
    const capabilityRows = asRowArray(
      await sql`
        SELECT
          id,
          owner_user_id,
          type,
          name,
          description,
          visibility,
          (
            SELECT cv.harness_set_slug
            FROM components c
            INNER JOIN component_versions cv ON cv.component_id = c.id
            WHERE c.published_capability_id = published_capabilities.id
              AND cv.harness_set_slug IS NOT NULL
            ORDER BY cv.version_number DESC
            LIMIT 1
          ) AS harness_set_slug
        FROM published_capabilities
      `,
    );

    const counts = await Promise.all(
      capabilityRows.map((row) =>
        backfillOnePublishedCapabilityToComponents(row),
      ),
    );

    return counts.reduce<BackfillPublishedCapabilitiesResult>(
      (totals, rowCounts) => ({
        componentsInserted:
          totals.componentsInserted + rowCounts.componentsInserted,
        versionsInserted: totals.versionsInserted + rowCounts.versionsInserted,
      }),
      { componentsInserted: 0, versionsInserted: 0 },
    );
  };

export default backfillPublishedCapabilitiesToComponents;
