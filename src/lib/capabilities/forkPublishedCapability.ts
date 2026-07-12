import { randomUUID } from "node:crypto";

import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { recordCapabilityFork } from "@/lib/capabilities/capabilityForkAudit";
import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import type { ForkPublishedCapabilityResult } from "@/lib/capabilities/types/ForkPublishedCapabilityResult.type";
import { asRowArray, getSql } from "@/lib/db";

const buildForkedCapabilityName = (sourceName: string): string =>
  sourceName.endsWith(" (copy)") ? sourceName : `${sourceName} (copy)`;

export async function forkPublishedCapability(
  sourceCapabilityId: string,
  actorUserId: string,
): Promise<ForkPublishedCapabilityResult> {
  const source = await getPublishedCapabilityById(sourceCapabilityId);

  if (source === null) {
    return { ok: false, reason: "not_found" };
  }

  if (source.ownerUserId === actorUserId) {
    return { ok: false, reason: "own_capability" };
  }

  if (source.status !== CapabilityStatus.PUBLISHED) {
    return { ok: false, reason: "not_published" };
  }

  const canView = await canViewPublishedCapability(
    actorUserId,
    source.ownerUserId,
    source.visibility,
    source.groupId,
  );

  if (!canView) {
    return { ok: false, reason: "forbidden" };
  }

  const sql = getSql();
  const capabilityId = randomUUID();
  const workflowFieldsJson = JSON.stringify(source.workflowFields);
  const rows = asRowArray(
    await sql`
      INSERT INTO published_capabilities (
        id,
        owner_user_id,
        group_id,
        type,
        name,
        description,
        example_request,
        visibility,
        status,
        workflow_fields,
        forked_from_capability_id
      )
      VALUES (
        ${capabilityId},
        ${actorUserId},
        NULL,
        ${source.type},
        ${buildForkedCapabilityName(source.name)},
        ${source.description},
        ${source.exampleRequest},
        ${CapabilityVisibility.PRIVATE},
        ${CapabilityStatus.DRAFT},
        ${workflowFieldsJson}::jsonb,
        ${sourceCapabilityId}
      )
      RETURNING *
    `,
  );

  const capability = mapPublishedCapabilityRow(rows[0]);

  await recordCapabilityFork({
    borrowerUserId: actorUserId,
    sourceCapabilityId,
    forkedCapabilityId: capability.id,
  });

  return { ok: true, capability };
}
