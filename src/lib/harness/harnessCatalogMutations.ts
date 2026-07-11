import mapHarnessCatalogRow from "@/lib/harness/mapHarnessCatalogRow";
import type { HarnessSharingVisibilityValue } from "@/lib/harness/HarnessSharingVisibility.constant";
import type HarnessCatalogEntry from "@/lib/harness/types/HarnessCatalogEntry.type";
import { asRowArray, getSql } from "@/lib/db";

export async function upsertHarnessCatalogSnapshot(input: {
  readonly ownerUserId: string;
  readonly visibility: HarnessSharingVisibilityValue;
  readonly hostname: string;
  readonly manifestJson: Readonly<Record<string, unknown>>;
  readonly reportedAt: string;
}): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO harness_catalog_snapshots (
      owner_user_id,
      visibility,
      hostname,
      manifest_json,
      reported_at
    )
    VALUES (
      ${input.ownerUserId},
      ${input.visibility},
      ${input.hostname},
      ${JSON.stringify(input.manifestJson)},
      ${input.reportedAt}
    )
    ON CONFLICT (owner_user_id)
    DO UPDATE SET
      visibility = EXCLUDED.visibility,
      hostname = EXCLUDED.hostname,
      manifest_json = EXCLUDED.manifest_json,
      reported_at = EXCLUDED.reported_at,
      updated_at = NOW()
  `;
}

export async function deleteHarnessCatalogSnapshot(
  ownerUserId: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    DELETE FROM harness_catalog_snapshots
    WHERE owner_user_id = ${ownerUserId}
  `;
}

export async function getHarnessCatalogSnapshot(
  ownerUserId: string,
): Promise<HarnessCatalogEntry | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT owner_user_id, visibility, hostname, manifest_json, reported_at, updated_at
      FROM harness_catalog_snapshots
      WHERE owner_user_id = ${ownerUserId}
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapHarnessCatalogRow(result[0]);
}
