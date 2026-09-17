import { randomUUID } from "node:crypto";

import { asRowArray, getSql } from "@/lib/db";

const insertComponentVersionForCapabilityPublish = async (input: {
  readonly capabilityId: string;
  readonly versionNumber: number;
  readonly changelog: string;
  readonly harnessSetSlug: string | null;
}): Promise<void> => {
  const sql = getSql();
  const componentRows = asRowArray(
    await sql`
      SELECT id
      FROM components
      WHERE published_capability_id = ${input.capabilityId}
      LIMIT 1
    `,
  );

  if (componentRows.length === 0) {
    return;
  }

  const componentId = String(componentRows[0].id);
  const versionId = randomUUID();

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
      ${componentId},
      ${input.versionNumber},
      ${String(input.versionNumber)},
      ${input.changelog},
      ${input.harnessSetSlug},
      NOW()
    )
    ON CONFLICT (component_id, version_number) DO NOTHING
  `;
};

export default insertComponentVersionForCapabilityPublish;
