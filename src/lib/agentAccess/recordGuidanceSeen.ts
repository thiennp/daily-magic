import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import { getSql } from "@/lib/db";

/** The assistant just fetched the current product-updates catalog: remember it on its seats. Never throws. */
export const recordGuidanceSeen = async (userId: string): Promise<void> => {
  try {
    await getSql()`
      UPDATE project_memberships
      SET guidance_seen_version = ${PRODUCT_CONNECT_UPDATES_CATALOG_VERSION},
          guidance_seen_at = NOW()
      WHERE user_id = ${userId} AND status = 'active'
    `;
  } catch (error: unknown) {
    console.error("record guidance seen failed", {
      error: error instanceof Error ? error.message : "record_failed",
    });
  }
};
