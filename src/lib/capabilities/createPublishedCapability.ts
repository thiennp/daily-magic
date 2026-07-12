import { randomUUID } from "node:crypto";

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { DEFAULT_CAPABILITY_VISIBILITY } from "@/lib/capabilities/CapabilityVisibility.constant";
import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export interface CreatePublishedCapabilityInput {
  readonly ownerUserId: string;
  readonly name: string;
  readonly description?: string;
  readonly exampleRequest?: string;
  readonly groupId?: string | null;
  readonly type?: typeof CapabilityType.AGENT;
}

export async function createPublishedCapability(
  input: CreatePublishedCapabilityInput,
): Promise<PublishedCapabilityRecord> {
  const sql = getSql();
  const capabilityId = randomUUID();
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
        status
      )
      VALUES (
        ${capabilityId},
        ${input.ownerUserId},
        ${input.groupId ?? null},
        ${input.type ?? CapabilityType.AGENT},
        ${input.name},
        ${input.description ?? ""},
        ${input.exampleRequest ?? ""},
        ${DEFAULT_CAPABILITY_VISIBILITY},
        ${CapabilityStatus.DRAFT}
      )
      RETURNING *
    `,
  );

  return mapPublishedCapabilityRow(rows[0]);
}
