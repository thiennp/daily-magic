import buildComponentSlugFromCapability from "@/lib/components/buildComponentSlugFromCapability";
import { asRowArray, getSql } from "@/lib/db";

const resolveHarnessSetSlugForCapabilityPublish = async (
  capabilityId: string,
  capabilityName: string,
): Promise<string | null> => {
  const sql = getSql();
  const versionRows = asRowArray(
    await sql`
      SELECT cv.harness_set_slug
      FROM components c
      INNER JOIN component_versions cv ON cv.component_id = c.id
      WHERE c.published_capability_id = ${capabilityId}
        AND cv.harness_set_slug IS NOT NULL
      ORDER BY cv.version_number DESC
      LIMIT 1
    `,
  );

  if (versionRows.length > 0 && versionRows[0].harness_set_slug) {
    return String(versionRows[0].harness_set_slug);
  }

  const componentRows = asRowArray(
    await sql`
      SELECT slug
      FROM components
      WHERE published_capability_id = ${capabilityId}
      LIMIT 1
    `,
  );

  if (componentRows.length === 0) {
    return null;
  }

  const componentSlug = String(componentRows[0].slug);
  const nameOnlySlug = buildComponentSlugFromCapability({
    name: capabilityName,
    harnessSetSlug: null,
  });

  return componentSlug !== nameOnlySlug ? componentSlug : null;
};

export default resolveHarnessSetSlugForCapabilityPublish;
