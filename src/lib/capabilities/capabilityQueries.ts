import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { isCapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { isCapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import { parseWorkflowFieldDefinitions } from "@/lib/workflows/parseWorkflowFieldDefinitions";
import { parseWorkflowOutputFieldDefinitions } from "@/lib/workflows/parseWorkflowOutputFieldDefinitions";
import { parseOperatorStepDefinitions } from "@/lib/workflows/parseOperatorStepDefinitions";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type { PublishedCapabilitySummary } from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export { getPublishedCapabilityById } from "@/lib/capabilities/getPublishedCapabilityById";

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

export async function ownerHasArchivedCapabilityNamed(
  ownerUserId: string,
  name: string,
  type: string,
): Promise<boolean> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id
      FROM published_capabilities
      WHERE owner_user_id = ${ownerUserId}
        AND name = ${name}
        AND type = ${type}
        AND status = ${CapabilityStatus.ARCHIVED}
      LIMIT 1
    `,
  );

  return rows.length > 0;
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
        workflow_fields,
        workflow_output_fields,
        operator_steps
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
      workflowOutputFields: parseWorkflowOutputFieldDefinitions(
        row.workflow_output_fields,
      ),
      operatorSteps: parseOperatorStepDefinitions(row.operator_steps),
    };
  });
}
