import { asRowArray, getSql } from "@/lib/db";

const resolveLatestComponentVersionId = async (
  componentId: string,
): Promise<string | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id
      FROM component_versions
      WHERE component_id = ${componentId}
      ORDER BY version_number DESC
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return String(rows[0].id);
};

export default resolveLatestComponentVersionId;
