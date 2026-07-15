import {
  DEFAULT_HARNESS_SHARING_VISIBILITY,
  HarnessSharingVisibility,
} from "@/lib/harness/HarnessSharingVisibility.constant";
import type { HarnessSharingVisibilityValue } from "@/lib/harness/HarnessSharingVisibility.constant";
import { canViewHarnessCatalog } from "@/lib/harness/canViewHarnessCatalog";
import { asRowArray, getSql } from "@/lib/db";

export type HarnessSetSharingVisibilityValue = HarnessSharingVisibilityValue;

export interface HarnessSetSharingEntry {
  readonly setSlug: string;
  readonly visibility: HarnessSetSharingVisibilityValue;
}

export async function listHarnessSetSharing(
  ownerUserId: string,
): Promise<readonly HarnessSetSharingEntry[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT set_slug, visibility
      FROM harness_set_sharing
      WHERE owner_user_id = ${ownerUserId}
      ORDER BY set_slug ASC
    `,
  );

  return rows.map((row) => ({
    setSlug: String(row.set_slug),
    visibility: String(row.visibility) as HarnessSetSharingVisibilityValue,
  }));
}

export async function upsertHarnessSetSharing(input: {
  readonly ownerUserId: string;
  readonly setSlug: string;
  readonly visibility: HarnessSetSharingVisibilityValue;
}): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO harness_set_sharing (owner_user_id, set_slug, visibility)
    VALUES (${input.ownerUserId}, ${input.setSlug}, ${input.visibility})
    ON CONFLICT (owner_user_id, set_slug)
    DO UPDATE SET visibility = EXCLUDED.visibility, updated_at = NOW()
  `;
}

export async function getEffectiveSetVisibility(
  ownerUserId: string,
  setSlug: string,
): Promise<HarnessSharingVisibilityValue> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT visibility
      FROM harness_set_sharing
      WHERE owner_user_id = ${ownerUserId}
        AND set_slug = ${setSlug}
      LIMIT 1
    `,
  );

  const override = rows[0]?.visibility;
  if (override === HarnessSharingVisibility.PRIVATE) {
    return HarnessSharingVisibility.PRIVATE;
  }
  if (override === HarnessSharingVisibility.GROUP) {
    return HarnessSharingVisibility.GROUP;
  }
  if (override === HarnessSharingVisibility.PUBLIC) {
    return HarnessSharingVisibility.PUBLIC;
  }

  return DEFAULT_HARNESS_SHARING_VISIBILITY;
}

export async function canViewHarnessSet(
  viewerUserId: string,
  ownerUserId: string,
  setSlug: string,
): Promise<boolean> {
  const effectiveVisibility = await getEffectiveSetVisibility(
    ownerUserId,
    setSlug,
  );

  return canViewHarnessCatalog(viewerUserId, ownerUserId, effectiveVisibility);
}
