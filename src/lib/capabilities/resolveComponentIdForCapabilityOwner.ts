import { asRowArray, getSql } from "@/lib/db";

/** Exact component for this owner + capability (id match preferred). */
const resolveComponentIdForCapabilityOwner = async (input: {
  readonly ownerUserId: string;
  readonly capabilityId: string;
  readonly componentId?: string;
}): Promise<string | null> => {
  const trimmed = input.componentId?.trim() ?? "";
  if (trimmed.length > 0) {
    return trimmed;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id
      FROM components
      WHERE owner_user_id = ${input.ownerUserId}
        AND (
          id = ${input.capabilityId}
          OR published_capability_id = ${input.capabilityId}
        )
      LIMIT 1
    `,
  );
  return rows.length === 0 ? null : String(rows[0].id);
};

export default resolveComponentIdForCapabilityOwner;
