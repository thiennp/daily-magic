import mapCapabilityImprovementRow from "@/lib/improvements/mapCapabilityImprovementRow";
import { ImprovementStatus } from "@/lib/improvements/ImprovementStatus.constant";
import type { CapabilityImprovementInboxItem } from "@/lib/improvements/types/CapabilityImprovementRecord.type";
import type CapabilityImprovementRecord from "@/lib/improvements/types/CapabilityImprovementRecord.type";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import { asRowArray, getSql } from "@/lib/db";

export async function listProposedImprovementsForOwner(
  ownerUserId: string,
): Promise<readonly CapabilityImprovementInboxItem[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        i.*,
        c.name AS capability_name,
        f.comment AS feedback_comment
      FROM capability_improvements i
      INNER JOIN published_capabilities c ON c.id = i.capability_id
      LEFT JOIN capability_feedback f ON f.id = i.feedback_id
      WHERE i.owner_user_id = ${ownerUserId}
        AND i.status = ${ImprovementStatus.PROPOSED}
      ORDER BY i.created_at DESC
      LIMIT 50
    `,
  );

  return rows.map((row) => {
    const improvement = mapCapabilityImprovementRow(row);
    return {
      ...improvement,
      capabilityName: String(row.capability_name),
      feedbackComment: row.feedback_comment
        ? String(row.feedback_comment)
        : null,
    };
  });
}

export async function acceptCapabilityImprovement(
  improvementId: string,
  ownerUserId: string,
): Promise<CapabilityImprovementRecord | null> {
  const sql = getSql();
  const existing = asRowArray(
    await sql`
      SELECT *
      FROM capability_improvements
      WHERE id = ${improvementId}
        AND owner_user_id = ${ownerUserId}
        AND status = ${ImprovementStatus.PROPOSED}
      LIMIT 1
    `,
  );

  if (existing.length === 0) {
    return null;
  }

  const suggestion = String(existing[0].suggestion);
  const capabilityId = String(existing[0].capability_id);
  const published = await publishCapabilityVersion(
    capabilityId,
    ownerUserId,
    `Accepted improvement: ${suggestion}`,
  );

  if (published === null) {
    return null;
  }

  const rows = asRowArray(
    await sql`
      UPDATE capability_improvements
      SET
        status = ${ImprovementStatus.ACCEPTED},
        resulting_version_id = ${published.currentVersionId},
        updated_at = NOW()
      WHERE id = ${improvementId}
      RETURNING *
    `,
  );

  return mapCapabilityImprovementRow(rows[0]);
}

export async function rejectCapabilityImprovement(
  improvementId: string,
  ownerUserId: string,
): Promise<CapabilityImprovementRecord | null> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE capability_improvements
      SET status = ${ImprovementStatus.REJECTED}, updated_at = NOW()
      WHERE id = ${improvementId}
        AND owner_user_id = ${ownerUserId}
        AND status = ${ImprovementStatus.PROPOSED}
      RETURNING *
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapCapabilityImprovementRow(rows[0]);
}
