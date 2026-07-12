import mapCapabilityFeedbackRow from "@/lib/feedback/mapCapabilityFeedbackRow";
import { FeedbackStatus } from "@/lib/feedback/FeedbackStatus.constant";
import type { CapabilityFeedbackInboxItem } from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function listCapabilityFeedbackInboxForOwner(
  ownerUserId: string,
): Promise<readonly CapabilityFeedbackInboxItem[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        f.*,
        c.name AS capability_name,
        u.email AS reviewer_email,
        r.prompt AS run_prompt
      FROM capability_feedback f
      INNER JOIN agent_runs r ON r.id = f.agent_run_id
      LEFT JOIN published_capabilities c ON c.id = f.capability_id
      INNER JOIN users u ON u.id = f.reviewer_user_id
      WHERE f.status = ${FeedbackStatus.SUBMITTED}
        AND (
          c.owner_user_id = ${ownerUserId}
          OR (
            f.capability_id IS NULL
            AND r.executor_user_id = ${ownerUserId}
          )
        )
      ORDER BY f.created_at DESC
      LIMIT 50
    `,
  );

  return rows.map((row) => {
    const feedback = mapCapabilityFeedbackRow(row);
    return {
      ...feedback,
      capabilityName: row.capability_name ? String(row.capability_name) : null,
      reviewerEmail: String(row.reviewer_email),
      runPrompt: String(row.run_prompt),
    };
  });
}

export async function updateCapabilityFeedbackStatus(
  feedbackId: string,
  ownerUserId: string,
  status: typeof FeedbackStatus.ACKNOWLEDGED | typeof FeedbackStatus.DISMISSED,
): Promise<CapabilityFeedbackRecord | null> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE capability_feedback f
      SET status = ${status}, updated_at = NOW()
      FROM published_capabilities c
      WHERE f.id = ${feedbackId}
        AND f.capability_id = c.id
        AND c.owner_user_id = ${ownerUserId}
      RETURNING f.*
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapCapabilityFeedbackRow(rows[0]);
}
