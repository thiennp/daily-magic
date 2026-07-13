import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { asRowArray, getSql } from "@/lib/db";

const archivePublishedCapability = async (
  capabilityId: string,
  ownerUserId: string,
): Promise<boolean> => {
  const existing = await getPublishedCapabilityById(capabilityId);

  if (existing === null || existing.ownerUserId !== ownerUserId) {
    return false;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE published_capabilities
      SET
        status = ${CapabilityStatus.ARCHIVED},
        updated_at = NOW()
      WHERE id = ${capabilityId}
        AND owner_user_id = ${ownerUserId}
      RETURNING id
    `,
  );

  return rows.length > 0;
};

export default archivePublishedCapability;
