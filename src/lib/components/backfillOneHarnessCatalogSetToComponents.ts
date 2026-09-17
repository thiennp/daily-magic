import buildHarnessComponentId from "@/lib/components/buildHarnessComponentId";
import type { HarnessCatalogSetSummary } from "@/lib/components/extractHarnessSetsFromCatalogManifest";
import { asRowArray, getSql } from "@/lib/db";

export type BackfillOneHarnessSetCounts = {
  readonly componentsInserted: number;
  readonly versionsInserted: number;
};

const backfillOneHarnessCatalogSetToComponents = async (input: {
  readonly ownerUserId: string;
  readonly visibility: string;
  readonly set: HarnessCatalogSetSummary;
}): Promise<BackfillOneHarnessSetCounts> => {
  const sql = getSql();
  const componentId = buildHarnessComponentId(
    input.ownerUserId,
    input.set.slug,
  );

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
        ${componentId},
        ${input.ownerUserId},
        'harness',
        ${input.set.slug},
        ${input.set.name},
        '',
        ${input.visibility},
        NULL
      )
      ON CONFLICT (id) DO NOTHING
      RETURNING id
    `,
  );

  const insertedVersions = asRowArray(
    await sql`
      INSERT INTO component_versions (
        component_id,
        version_number,
        version_label,
        changelog,
        harness_set_slug,
        published_at
      )
      VALUES (
        ${componentId},
        ${input.set.version},
        ${String(input.set.version)},
        '',
        ${input.set.slug},
        NOW()
      )
      ON CONFLICT (component_id, version_number) DO NOTHING
      RETURNING id
    `,
  );

  return {
    componentsInserted: insertedComponents.length,
    versionsInserted: insertedVersions.length,
  };
};

export default backfillOneHarnessCatalogSetToComponents;
