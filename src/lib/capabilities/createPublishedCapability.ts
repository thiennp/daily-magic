import { randomUUID } from "node:crypto";

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import { DEFAULT_CAPABILITY_VISIBILITY } from "@/lib/capabilities/CapabilityVisibility.constant";
import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import { asRowArray, getSql } from "@/lib/db";

export interface CreatePublishedCapabilityInput {
  readonly ownerUserId: string;
  readonly name: string;
  readonly description?: string;
  readonly exampleRequest?: string;
  readonly groupId?: string | null;
  readonly type?: CapabilityTypeValue;
  readonly workflowFields?: readonly WorkflowFieldDefinition[];
  readonly harnessSetSlug?: string | null;
}

export async function createPublishedCapability(
  input: CreatePublishedCapabilityInput,
): Promise<PublishedCapabilityRecord> {
  const sql = getSql();
  const capabilityId = randomUUID();
  const capabilityType = input.type ?? CapabilityType.AGENT;
  const workflowFieldsJson = JSON.stringify(input.workflowFields ?? []);
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
        harness_set_slug
      )
      VALUES (
        ${capabilityId},
        ${input.ownerUserId},
        ${input.groupId ?? null},
        ${capabilityType},
        ${input.name},
        ${input.description ?? ""},
        ${input.exampleRequest ?? ""},
        ${DEFAULT_CAPABILITY_VISIBILITY},
        ${CapabilityStatus.DRAFT},
        ${workflowFieldsJson}::jsonb,
        ${input.harnessSetSlug ?? null}
      )
      RETURNING *
    `,
  );

  return mapPublishedCapabilityRow(rows[0]);
}
