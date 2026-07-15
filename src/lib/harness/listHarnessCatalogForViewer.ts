import { getUserById } from "@/lib/auth/userRepository";
import { filterVisibleSetSlugs } from "@/lib/harness/filterBorrowableManifest";
import mapHarnessCatalogRow from "@/lib/harness/mapHarnessCatalogRow";
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
  readonly setNamesBySlug: Readonly<Record<string, string>>;
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

  const setNamesBySlug: Record<string, string> = {};
  for (const [slug, set] of Object.entries(sets)) {
    if (typeof set.name === "string") {
      setNamesBySlug[slug] = set.name;
    }
  }

  return { activeSetSlugs, setNamesBySlug };
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
      ORDER BY reported_at DESC
    `,
  );

  const items: HarnessCatalogListItem[] = [];

  for (const row of rows) {
    const entry = mapHarnessCatalogRow(row);

    if (entry.ownerUserId === viewerUserId) {
      continue;
    }

    const owner = await getUserById(entry.ownerUserId);
    const summary = extractManifestSummary(entry.manifestJson);
    const visibleSlugs = await filterVisibleSetSlugs(
      summary.activeSetSlugs,
      viewerUserId,
      entry.ownerUserId,
    );

    if (visibleSlugs.length === 0) {
      continue;
    }

    const visibleSetNames = visibleSlugs
      .map((slug) => summary.setNamesBySlug[slug])
      .filter((name): name is string => typeof name === "string");

    items.push({
      ownerUserId: entry.ownerUserId,
      ownerEmail: owner?.email ?? entry.ownerUserId,
      ownerName: owner?.name ?? null,
      visibility: entry.visibility,
      hostname: entry.hostname,
      reportedAt: entry.reportedAt,
      isOnline: onlineOwnerIds.has(entry.ownerUserId),
      activeSetSlugs: visibleSlugs,
      setNames: visibleSetNames,
    });
  }

  return items;
}
