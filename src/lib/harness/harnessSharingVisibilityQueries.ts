import {
  DEFAULT_HARNESS_SHARING_VISIBILITY,
  isHarnessSharingVisibility,
  type HarnessSharingVisibilityValue,
} from "@/lib/harness/HarnessSharingVisibility.constant";
import { asRowArray, getSql } from "@/lib/db";

export async function getUserHarnessSharingVisibility(
  userId: string,
): Promise<HarnessSharingVisibilityValue> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT harness_sharing_visibility
      FROM users
      WHERE id = ${userId}
    `,
  );

  const visibility = result[0]?.harness_sharing_visibility;
  if (
    typeof visibility === "string" &&
    isHarnessSharingVisibility(visibility)
  ) {
    return visibility;
  }

  return DEFAULT_HARNESS_SHARING_VISIBILITY;
}

export async function updateUserHarnessSharingVisibility(
  userId: string,
  visibility: HarnessSharingVisibilityValue,
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE users
    SET harness_sharing_visibility = ${visibility}
    WHERE id = ${userId}
  `;
}
