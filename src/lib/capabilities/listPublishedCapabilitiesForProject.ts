import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Library items bound to one project (non-archived). Caller filters drafts
 * for non-owners (published-only).
 */
export async function listPublishedCapabilitiesForProject(
  projectId: string,
): Promise<readonly PublishedCapabilityRecord[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM published_capabilities
      WHERE project_id = ${projectId}
        AND status <> ${CapabilityStatus.ARCHIVED}
      ORDER BY updated_at DESC
    `,
  );
  return rows.map(mapPublishedCapabilityRow);
}
