import { randomUUID } from "node:crypto";

import buildComponentSlugFromCapability from "@/lib/components/buildComponentSlugFromCapability";
import { asRowArray, getSql } from "@/lib/db";

const ensureAgentComponentForPublishedCapability = async (input: {
  readonly capabilityId: string;
  readonly ownerUserId: string;
  readonly name: string;
  readonly description: string;
  readonly visibility: string;
  readonly capabilityType: string;
  readonly harnessSetSlug?: string | null;
}): Promise<void> => {
  const sql = getSql();
  const capabilityType = input.capabilityType.toLowerCase();
  const kind = capabilityType === "workflow" ? "workflow" : "agent";
  const slug = buildComponentSlugFromCapability({
    name: input.name,
    harnessSetSlug: input.harnessSetSlug ?? null,
  });
  const componentId = randomUUID();

  await sql`
    UPDATE components
    SET published_capability_id = NULL, updated_at = NOW()
    WHERE published_capability_id = ${input.capabilityId}
  `;

  const rows = asRowArray(
    await sql`
      INSERT INTO components (
        id,
        owner_user_id,
        kind,
        slug,
        name,
        description,
        visibility,
        published_capability_id
      )
      VALUES (
        ${componentId},
        ${input.ownerUserId},
        ${kind},
        ${slug},
        ${input.name},
        ${input.description},
        ${input.visibility},
        ${input.capabilityId}
      )
      ON CONFLICT (owner_user_id, kind, slug) DO UPDATE SET
        published_capability_id = EXCLUDED.published_capability_id,
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        visibility = EXCLUDED.visibility,
        updated_at = NOW()
      RETURNING id
    `,
  );

  if (rows.length === 0) {
    throw new Error("Could not ensure agent component for capability.");
  }
};

export default ensureAgentComponentForPublishedCapability;
