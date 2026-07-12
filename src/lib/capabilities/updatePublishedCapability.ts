import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import type { ParsedUpdateCapabilityBody } from "@/lib/capabilities/parseUpdateCapabilityBody";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { asRowArray, getSql } from "@/lib/db";

export async function updatePublishedCapability(
  capabilityId: string,
  ownerUserId: string,
  input: ParsedUpdateCapabilityBody,
): Promise<PublishedCapabilityRecord | null> {
  const existing = await getPublishedCapabilityById(capabilityId);

  if (existing === null || existing.ownerUserId !== ownerUserId) {
    return null;
  }

  const workflowFields = input.workflowFields ?? existing.workflowFields;

  if (
    existing.type === CapabilityType.WORKFLOW &&
    workflowFields.length === 0
  ) {
    return null;
  }

  const sql = getSql();
  const workflowFieldsJson = JSON.stringify(
    existing.type === CapabilityType.WORKFLOW ? workflowFields : [],
  );
  const rows = asRowArray(
    await sql`
      UPDATE published_capabilities
      SET
        name = ${input.name ?? existing.name},
        description = ${input.description ?? existing.description},
        example_request = ${input.exampleRequest ?? existing.exampleRequest},
        workflow_fields = ${workflowFieldsJson}::jsonb,
        updated_at = NOW()
      WHERE id = ${capabilityId}
        AND owner_user_id = ${ownerUserId}
      RETURNING *
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  if (existing.status === CapabilityStatus.PUBLISHED) {
    return (
      (await publishCapabilityVersion(
        capabilityId,
        ownerUserId,
        "Updated playbook",
      )) ?? mapPublishedCapabilityRow(rows[0])
    );
  }

  return mapPublishedCapabilityRow(rows[0]);
}
