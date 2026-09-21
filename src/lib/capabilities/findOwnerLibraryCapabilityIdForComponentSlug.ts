import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { asRowArray, getSql } from "@/lib/db";

export const findOwnerLibraryCapabilityIdForComponentSlug = async (input: {
  readonly ownerUserId: string;
  readonly kind: "agent" | "workflow";
  readonly slug: string;
}): Promise<string | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT c.published_capability_id
      FROM components c
      INNER JOIN published_capabilities pc
        ON pc.id = c.published_capability_id
      WHERE c.owner_user_id = ${input.ownerUserId}
        AND c.kind = ${input.kind}
        AND c.slug = ${input.slug}
        AND pc.owner_user_id = ${input.ownerUserId}
        AND pc.status <> ${CapabilityStatus.ARCHIVED}
      LIMIT 1
    `,
  );

  const capabilityId = rows[0]?.published_capability_id;
  return typeof capabilityId === "string" && capabilityId.trim().length > 0
    ? capabilityId.trim()
    : null;
};
