import { asRowArray, getSql } from "@/lib/db";

const resolveComponentIdForPublishedCapability = async (
  publishedCapabilityId: string,
): Promise<string | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id
      FROM components
      WHERE published_capability_id = ${publishedCapabilityId}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return String(rows[0].id);
};

export default resolveComponentIdForPublishedCapability;
