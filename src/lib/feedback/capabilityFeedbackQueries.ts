import { randomUUID } from "node:crypto";

import mapCapabilityFeedbackRow from "@/lib/feedback/mapCapabilityFeedbackRow";
import { FeedbackStatus } from "@/lib/feedback/FeedbackStatus.constant";
import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export interface CreateCapabilityFeedbackInput {
  readonly agentRunId: string;
  readonly capabilityId: string | null;
  readonly reviewerUserId: string;
  readonly rating?: number | null;
  readonly comment: string;
}

export async function createCapabilityFeedback(
  input: CreateCapabilityFeedbackInput,
): Promise<CapabilityFeedbackRecord> {
  const sql = getSql();
  const feedbackId = randomUUID();
  const rows = asRowArray(
    await sql`
      INSERT INTO capability_feedback (
        id,
        agent_run_id,
        capability_id,
        reviewer_user_id,
        rating,
        comment,
        status
      )
      VALUES (
        ${feedbackId},
        ${input.agentRunId},
        ${input.capabilityId},
        ${input.reviewerUserId},
        ${input.rating ?? null},
        ${input.comment},
        ${FeedbackStatus.SUBMITTED}
      )
      RETURNING *
    `,
  );

  return mapCapabilityFeedbackRow(rows[0]);
}

export async function getFeedbackForRunByReviewer(
  agentRunId: string,
  reviewerUserId: string,
): Promise<CapabilityFeedbackRecord | null> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM capability_feedback
      WHERE agent_run_id = ${agentRunId}
        AND reviewer_user_id = ${reviewerUserId}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapCapabilityFeedbackRow(rows[0]);
}
