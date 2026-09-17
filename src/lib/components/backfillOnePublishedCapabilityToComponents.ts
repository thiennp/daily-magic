import buildComponentSlugFromCapability from "@/lib/components/buildComponentSlugFromCapability";
import { asRowArray, getSql } from "@/lib/db";

export type BackfillOneCapabilityCounts = {
  readonly componentsInserted: number;
  readonly versionsInserted: number;
};

const backfillOnePublishedCapabilityToComponents = async (
  row: Record<string, unknown>,
): Promise<BackfillOneCapabilityCounts> => {
  const sql = getSql();
  const capabilityId = String(row.id);
  const ownerUserId = String(row.owner_user_id);
  const capabilityType = String(row.type).toLowerCase();
  const kind = capabilityType === "workflow" ? "workflow" : "agent";
  const slug = buildComponentSlugFromCapability({
    name: String(row.name),
    harnessSetSlug: row.harness_set_slug ? String(row.harness_set_slug) : null,
  });

  const insertedComponents = asRowArray(
    await sql`
      INSERT INTO components (
        id,
        owner_user_id,
        kind,
        slug,
        name,
        description,
        visibility,
        published_capability_id
      )
      VALUES (
        ${capabilityId},
        ${ownerUserId},
        ${kind},
        ${slug},
        ${String(row.name)},
        ${String(row.description ?? "")},
        ${String(row.visibility)},
        ${capabilityId}
      )
      ON CONFLICT (id) DO NOTHING
      RETURNING id
    `,
  );

  const versionRows = asRowArray(
    await sql`
      SELECT id, version_number, changelog, harness_set_slug, published_at
      FROM capability_versions
      WHERE capability_id = ${capabilityId}
    `,
  );

  const versionInsertCounts = await Promise.all(
    versionRows.map(async (versionRow) => {
      const versionId = String(versionRow.id);
      const versionNumber = Number(versionRow.version_number);
      const insertedVersions = asRowArray(
        await sql`
          INSERT INTO component_versions (
            id,
            component_id,
            version_number,
            version_label,
            changelog,
            harness_set_slug,
            published_at
          )
          VALUES (
            ${versionId},
            ${capabilityId},
            ${versionNumber},
            ${String(versionNumber)},
            ${String(versionRow.changelog ?? "")},
            ${
              versionRow.harness_set_slug
                ? String(versionRow.harness_set_slug)
                : null
            },
            ${versionRow.published_at ?? new Date().toISOString()}
          )
          ON CONFLICT (component_id, version_number) DO NOTHING
          RETURNING id
        `,
      );
      return insertedVersions.length;
    }),
  );

  return {
    componentsInserted: insertedComponents.length,
    versionsInserted: versionInsertCounts.reduce(
      (sum, count) => sum + count,
      0,
    ),
  };
};

export default backfillOnePublishedCapabilityToComponents;
