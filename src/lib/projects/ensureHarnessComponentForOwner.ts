import buildHarnessComponentId from "@/lib/components/buildHarnessComponentId";
import { asRowArray, getSql } from "@/lib/db";

const ensureHarnessComponentForOwner = async (input: {
  readonly ownerUserId: string;
  readonly setSlug: string;
  readonly setName?: string;
}): Promise<string> => {
  const sql = getSql();
  const slug = input.setSlug.trim().toLowerCase();
  const componentId = buildHarnessComponentId(input.ownerUserId, slug);
  const name = input.setName?.trim() || slug;

  await sql`
    INSERT INTO components (
      id,
      owner_user_id,
      kind,
      slug,
      name,
      description,
      visibility
    )
    VALUES (
      ${componentId},
      ${input.ownerUserId},
      'harness',
      ${slug},
      ${name},
      '',
      'private'
    )
    ON CONFLICT (id) DO NOTHING
  `;

  const rows = asRowArray(
    await sql`
      SELECT id FROM components WHERE id = ${componentId} LIMIT 1
    `,
  );

  if (rows.length === 0) {
    throw new Error("Could not ensure harness component.");
  }

  return componentId;
};

export default ensureHarnessComponentForOwner;
