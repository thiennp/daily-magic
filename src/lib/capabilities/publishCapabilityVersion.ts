import { randomUUID } from "node:crypto";

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { getPublishedCapabilityById } from "@/lib/capabilities/getPublishedCapabilityById";
import insertComponentVersionForCapabilityPublish from "@/lib/capabilities/insertComponentVersionForCapabilityPublish";
import resolveComponentIdForCapabilityOwner from "@/lib/capabilities/resolveComponentIdForCapabilityOwner";
import resolveHarnessSetSlugForCapabilityPublish from "@/lib/capabilities/resolveHarnessSetSlugForCapabilityPublish";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export interface PublishCapabilityVersionResult {
  readonly capability: PublishedCapabilityRecord;
  readonly capabilityVersionId: string;
  readonly componentId: string;
  readonly componentVersionId: string | null;
}

export async function publishCapabilityVersion(
  capabilityId: string,
  ownerUserId: string,
  changelog = "Published",
  componentId?: string,
): Promise<PublishCapabilityVersionResult | null> {
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

  const resolvedComponentId = await resolveComponentIdForCapabilityOwner({
    ownerUserId,
    capabilityId,
    componentId,
  });
  if (resolvedComponentId === null) {
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
  const capabilityVersionId = randomUUID();
  const harnessSetSlug = await resolveHarnessSetSlugForCapabilityPublish(
    capabilityId,
    String(existing[0].name),
  );

  await sql`
    INSERT INTO capability_versions (
      id, capability_id, version_number, changelog
    )
    VALUES (
      ${capabilityVersionId}, ${capabilityId}, ${nextVersion}, ${changelog}
    )
  `;

  const componentVersionId = await insertComponentVersionForCapabilityPublish({
    capabilityId,
    componentId: resolvedComponentId,
    versionNumber: nextVersion,
    changelog,
    harnessSetSlug,
  });

  await sql`
    UPDATE published_capabilities
    SET
      status = ${CapabilityStatus.PUBLISHED},
      current_version_id = ${capabilityVersionId},
      updated_at = NOW()
    WHERE id = ${capabilityId}
      AND owner_user_id = ${ownerUserId}
  `;

  const capability = await getPublishedCapabilityById(capabilityId);
  if (capability === null) {
    return null;
  }

  return {
    capability,
    capabilityVersionId,
    componentId: resolvedComponentId,
    componentVersionId,
  };
}
