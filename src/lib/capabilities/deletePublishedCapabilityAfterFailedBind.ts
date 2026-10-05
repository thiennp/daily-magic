import { getSql } from "@/lib/db";

/** Undo only the rows this create/publish produced (exact ids + owner). */
const deletePublishedCapabilityAfterFailedBind = async (input: {
  readonly ownerUserId: string;
  readonly capabilityId: string;
  readonly componentId: string;
  readonly capabilityVersionId: string | null;
  readonly componentVersionId: string | null;
}): Promise<void> => {
  const sql = getSql();

  if (input.componentVersionId !== null && input.componentVersionId.length > 0) {
    await sql`
      DELETE FROM component_versions
      WHERE id = ${input.componentVersionId}
        AND component_id = ${input.componentId}
    `;
  }

  if (
    input.capabilityVersionId !== null &&
    input.capabilityVersionId.length > 0
  ) {
    await sql`
      DELETE FROM capability_versions
      WHERE id = ${input.capabilityVersionId}
        AND capability_id = ${input.capabilityId}
    `;
  }

  await sql`
    DELETE FROM project_components
    WHERE component_id = ${input.componentId}
  `;

  await sql`
    DELETE FROM components
    WHERE id = ${input.componentId}
      AND owner_user_id = ${input.ownerUserId}
  `;

  await sql`
    DELETE FROM published_capabilities
    WHERE id = ${input.capabilityId}
      AND owner_user_id = ${input.ownerUserId}
  `;
};

export default deletePublishedCapabilityAfterFailedBind;
