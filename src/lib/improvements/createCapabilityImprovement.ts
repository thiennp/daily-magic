import { randomUUID } from "node:crypto";

import mapCapabilityImprovementRow from "@/lib/improvements/mapCapabilityImprovementRow";
import { ImprovementStatus } from "@/lib/improvements/ImprovementStatus.constant";
import type CapabilityImprovementRecord from "@/lib/improvements/types/CapabilityImprovementRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export interface CreateCapabilityImprovementInput {
  readonly feedbackId: string | null;
  readonly capabilityId: string;
  readonly ownerUserId: string;
  readonly suggestion: string;
}

export async function createCapabilityImprovement(
  input: CreateCapabilityImprovementInput,
): Promise<CapabilityImprovementRecord> {
  const sql = getSql();
  const improvementId = randomUUID();
  const rows = asRowArray(
    await sql`
      INSERT INTO capability_improvements (
        id,
        feedback_id,
        capability_id,
        owner_user_id,
        suggestion,
        status
      )
      VALUES (
        ${improvementId},
        ${input.feedbackId},
        ${input.capabilityId},
        ${input.ownerUserId},
        ${input.suggestion},
        ${ImprovementStatus.PROPOSED}
      )
      RETURNING *
    `,
  );

  return mapCapabilityImprovementRow(rows[0]);
}

export async function getCapabilityImprovementById(
  improvementId: string,
): Promise<CapabilityImprovementRecord | null> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM capability_improvements
      WHERE id = ${improvementId}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapCapabilityImprovementRow(rows[0]);
}
