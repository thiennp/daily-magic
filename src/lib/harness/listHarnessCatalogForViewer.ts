import { getUserById } from "@/lib/auth/userRepository";
import { canViewHarnessCatalog } from "@/lib/harness/canViewHarnessCatalog";
import mapHarnessCatalogRow from "@/lib/harness/mapHarnessCatalogRow";
import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import { asRowArray, getSql } from "@/lib/db";

export interface HarnessCatalogListItem {
  readonly ownerUserId: string;
  readonly ownerEmail: string;
  readonly ownerName: string | null;
  readonly visibility: string;
  readonly hostname: string;
  readonly reportedAt: string;
  readonly isOnline: boolean;
  readonly activeSetSlugs: readonly string[];
  readonly setNames: readonly string[];
}

const extractManifestSummary = (
  manifestJson: Readonly<Record<string, unknown>>,
): {
  readonly activeSetSlugs: readonly string[];
  readonly setNames: readonly string[];
} => {
  const activeSetSlugs = Array.isArray(manifestJson.activeSetSlugs)
    ? manifestJson.activeSetSlugs.filter(
        (slug): slug is string => typeof slug === "string",
      )
    : [];
  const sets =
    typeof manifestJson.sets === "object" &&
    manifestJson.sets !== null &&
    !Array.isArray(manifestJson.sets)
      ? (manifestJson.sets as Record<string, { readonly name?: string }>)
      : {};

  const setNames = Object.values(sets)
    .map((set) => set.name)
    .filter((name): name is string => typeof name === "string");

  return { activeSetSlugs, setNames };
};

export async function listHarnessCatalogForViewer(
  viewerUserId: string,
  onlineOwnerIds: ReadonlySet<string>,
): Promise<readonly HarnessCatalogListItem[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT owner_user_id, visibility, hostname, manifest_json, reported_at, updated_at
      FROM harness_catalog_snapshots
      WHERE visibility != ${HarnessSharingVisibility.PRIVATE}
      ORDER BY reported_at DESC
    `,
  );

  const items: HarnessCatalogListItem[] = [];

  for (const row of rows) {
    const entry = mapHarnessCatalogRow(row);
    const canView = await canViewHarnessCatalog(
      viewerUserId,
      entry.ownerUserId,
      entry.visibility,
    );

    if (!canView || entry.ownerUserId === viewerUserId) {
      continue;
    }

    const owner = await getUserById(entry.ownerUserId);
    const summary = extractManifestSummary(entry.manifestJson);

    items.push({
      ownerUserId: entry.ownerUserId,
      ownerEmail: owner?.email ?? entry.ownerUserId,
      ownerName: owner?.name ?? null,
      visibility: entry.visibility,
      hostname: entry.hostname,
      reportedAt: entry.reportedAt,
      isOnline: onlineOwnerIds.has(entry.ownerUserId),
      activeSetSlugs: summary.activeSetSlugs,
      setNames: summary.setNames,
    });
  }

  return items;
}
