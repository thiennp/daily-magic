import { randomUUID } from "node:crypto";

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function publishCapabilityVersion(
  capabilityId: string,
  ownerUserId: string,
  changelog = "Published",
): Promise<PublishedCapabilityRecord | null> {
  const sql = getSql();
  const existing = asRowArray(
    await sql`
      SELECT *
      FROM published_capabilities
      WHERE id = ${capabilityId}
        AND owner_user_id = ${ownerUserId}
      LIMIT 1
    `,
  );

  if (existing.length === 0) {
    return null;
  }

  const versionRows = asRowArray(
    await sql`
      SELECT COALESCE(MAX(version_number), 0) AS max_version
      FROM capability_versions
      WHERE capability_id = ${capabilityId}
    `,
  );
  const nextVersion =
    typeof versionRows[0]?.max_version === "number"
      ? versionRows[0].max_version + 1
      : 1;
  const versionId = randomUUID();
  const harnessSetSlug = existing[0].harness_set_slug
    ? String(existing[0].harness_set_slug)
    : null;

  await sql`
    INSERT INTO capability_versions (
      id,
      capability_id,
      version_number,
      changelog,
      harness_set_slug
    )
    VALUES (
      ${versionId},
      ${capabilityId},
      ${nextVersion},
      ${changelog},
      ${harnessSetSlug}
    )
  `;

  const updated = asRowArray(
    await sql`
      UPDATE published_capabilities
      SET
        status = ${CapabilityStatus.PUBLISHED},
        current_version_id = ${versionId},
        updated_at = NOW()
      WHERE id = ${capabilityId}
      RETURNING *
    `,
  );

  return mapPublishedCapabilityRow(updated[0]);
}
