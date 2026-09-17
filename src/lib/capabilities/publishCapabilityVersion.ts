import { randomUUID } from "node:crypto";

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { getPublishedCapabilityById } from "@/lib/capabilities/getPublishedCapabilityById";
import insertComponentVersionForCapabilityPublish from "@/lib/capabilities/insertComponentVersionForCapabilityPublish";
import resolveHarnessSetSlugForCapabilityPublish from "@/lib/capabilities/resolveHarnessSetSlugForCapabilityPublish";
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
  const capabilityName = String(existing[0].name);
  const harnessSetSlug = await resolveHarnessSetSlugForCapabilityPublish(
    capabilityId,
    capabilityName,
  );

  await sql`
    INSERT INTO capability_versions (
      id,
      capability_id,
      version_number,
      changelog
    )
    VALUES (
      ${versionId},
      ${capabilityId},
      ${nextVersion},
      ${changelog}
    )
  `;

  await insertComponentVersionForCapabilityPublish({
    capabilityId,
    versionNumber: nextVersion,
    changelog,
    harnessSetSlug,
  });

  await sql`
    UPDATE published_capabilities
    SET
      status = ${CapabilityStatus.PUBLISHED},
      current_version_id = ${versionId},
      updated_at = NOW()
    WHERE id = ${capabilityId}
  `;

  return getPublishedCapabilityById(capabilityId);
}
