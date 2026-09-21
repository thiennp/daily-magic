import { randomUUID } from "node:crypto";

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import { DEFAULT_CAPABILITY_VISIBILITY } from "@/lib/capabilities/CapabilityVisibility.constant";
import ensureAgentComponentForPublishedCapability from "@/lib/capabilities/ensureAgentComponentForPublishedCapability";
import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type WorkflowOutputFieldDefinition from "@/lib/workflows/types/WorkflowOutputFieldDefinition.type";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";
import { asRowArray, getSql } from "@/lib/db";

export interface CreatePublishedCapabilityInput {
  readonly ownerUserId: string;
  readonly name: string;
  readonly description?: string;
  readonly exampleRequest?: string;
  readonly groupId?: string | null;
  readonly type?: CapabilityTypeValue;
  readonly workflowFields?: readonly WorkflowFieldDefinition[];
  readonly workflowOutputFields?: readonly WorkflowOutputFieldDefinition[];
  readonly operatorSteps?: readonly OperatorStepDefinition[];
  readonly harnessSetSlug?: string | null;
}

export async function createPublishedCapability(
  input: CreatePublishedCapabilityInput,
): Promise<PublishedCapabilityRecord> {
  const sql = getSql();
  const capabilityId = randomUUID();
  const capabilityType = input.type ?? CapabilityType.AGENT;
  const workflowFieldsJson = JSON.stringify(input.workflowFields ?? []);
  const workflowOutputFieldsJson = JSON.stringify(
    input.workflowOutputFields ?? [],
  );
  const operatorStepsJson = JSON.stringify(input.operatorSteps ?? []);
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
        workflow_output_fields,
        operator_steps
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
        ${workflowOutputFieldsJson}::jsonb,
        ${operatorStepsJson}::jsonb
      )
      RETURNING *
    `,
  );

  await ensureAgentComponentForPublishedCapability({
    capabilityId,
    ownerUserId: input.ownerUserId,
    name: input.name,
    description: input.description ?? "",
    visibility: DEFAULT_CAPABILITY_VISIBILITY,
    capabilityType,
    harnessSetSlug: input.harnessSetSlug ?? null,
  });

  const capability = mapPublishedCapabilityRow(rows[0]);
  if (input.harnessSetSlug?.trim()) {
    return {
      ...capability,
      harnessSetSlug: input.harnessSetSlug.trim(),
    };
  }
  return capability;
}
