import { randomUUID } from "node:crypto";

import { asRowArray, getSql } from "@/lib/db";

const insertComponentVersionForCapabilityPublish = async (input: {
  readonly capabilityId: string;
  readonly componentId: string;
  readonly versionNumber: number;
  readonly changelog: string;
  readonly harnessSetSlug: string | null;
}): Promise<string | null> => {
  const sql = getSql();
  const versionId = randomUUID();

  const rows = asRowArray(
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
        ${input.componentId},
        ${input.versionNumber},
        ${String(input.versionNumber)},
        ${input.changelog},
        ${input.harnessSetSlug},
        NOW()
      )
      ON CONFLICT (component_id, version_number) DO NOTHING
      RETURNING id
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return String(rows[0].id);
};

export default insertComponentVersionForCapabilityPublish;
