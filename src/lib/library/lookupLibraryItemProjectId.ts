import { asRowArray, getSql } from "@/lib/db";

/**
 * project_id of a library item (published_capabilities, NOT NULL since 069).
 * Returns null when the row is missing or the lookup fails.
 */
export const lookupLibraryItemProjectId = async (
  itemId: string,
): Promise<string | null> => {
  try {
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT project_id
        FROM published_capabilities
        WHERE id = ${itemId}
        LIMIT 1
      `,
    );
    const value: unknown = rows[0]?.project_id;
    return typeof value === "string" && value.length > 0 ? value : null;
  } catch {
    return null;
  }
};
