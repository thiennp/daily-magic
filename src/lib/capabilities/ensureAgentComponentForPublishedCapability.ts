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
      ${input.capabilityId},
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
  `;

  const rows = asRowArray(
    await sql`
      SELECT id FROM components WHERE id = ${input.capabilityId} LIMIT 1
    `,
  );

  if (rows.length === 0) {
    throw new Error("Could not ensure agent component for capability.");
  }
};

export default ensureAgentComponentForPublishedCapability;
