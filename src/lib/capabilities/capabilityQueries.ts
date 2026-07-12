import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { isCapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { isCapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import { parseWorkflowFieldDefinitions } from "@/lib/workflows/parseWorkflowFieldDefinitions";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type { PublishedCapabilitySummary } from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function getPublishedCapabilityById(
  capabilityId: string,
): Promise<PublishedCapabilityRecord | null> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM published_capabilities
      WHERE id = ${capabilityId}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapPublishedCapabilityRow(rows[0]);
}

export async function listPublishedCapabilitiesForOwner(
  ownerUserId: string,
): Promise<readonly PublishedCapabilityRecord[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM published_capabilities
      WHERE owner_user_id = ${ownerUserId}
        AND status <> ${CapabilityStatus.ARCHIVED}
      ORDER BY created_at ASC
    `,
  );

  return rows.map(mapPublishedCapabilityRow);
}

export async function listPublishedSummariesForOwners(
  ownerUserIds: readonly string[],
  groupId: string | null,
): Promise<readonly PublishedCapabilitySummary[]> {
  if (ownerUserIds.length === 0) {
    return [];
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        id,
        owner_user_id,
        type,
        name,
        description,
        example_request,
        visibility,
        workflow_fields
      FROM published_capabilities
      WHERE owner_user_id = ANY(${ownerUserIds})
        AND status = ${CapabilityStatus.PUBLISHED}
        AND visibility <> 'private'
        AND (group_id IS NULL OR group_id = ${groupId})
      ORDER BY name ASC
    `,
  );

  return rows.map((row) => {
    const rawType = String(row.type);
    const rawVisibility = String(row.visibility);
    return {
      id: String(row.id),
      ownerUserId: String(row.owner_user_id),
      type: isCapabilityType(rawType) ? rawType : "agent",
      name: String(row.name),
      description: String(row.description ?? ""),
      exampleRequest: String(row.example_request ?? ""),
      visibility: isCapabilityVisibility(rawVisibility)
        ? rawVisibility
        : "group",
      workflowFields: parseWorkflowFieldDefinitions(row.workflow_fields),
    };
  });
}
