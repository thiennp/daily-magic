import {
  DEFAULT_HARNESS_SHARING_VISIBILITY,
  isHarnessSharingVisibility,
} from "@/lib/harness/HarnessSharingVisibility.constant";
import type HarnessCatalogEntry from "@/lib/harness/types/HarnessCatalogEntry.type";

export default function mapHarnessCatalogRow(
  row: Record<string, unknown>,
): HarnessCatalogEntry {
  const visibility = String(
    row.visibility ?? DEFAULT_HARNESS_SHARING_VISIBILITY,
  );
  const manifestJson =
    typeof row.manifest_json === "object" &&
    row.manifest_json !== null &&
    !Array.isArray(row.manifest_json)
      ? (row.manifest_json as Record<string, unknown>)
      : {};

  return {
    ownerUserId: String(row.owner_user_id),
    visibility: isHarnessSharingVisibility(visibility)
      ? visibility
      : DEFAULT_HARNESS_SHARING_VISIBILITY,
    hostname: String(row.hostname ?? ""),
    manifestJson,
    reportedAt: String(row.reported_at),
    updatedAt: String(row.updated_at),
  };
}
