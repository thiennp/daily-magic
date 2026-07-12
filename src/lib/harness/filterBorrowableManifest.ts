import { canViewHarnessSet } from "@/lib/harness/harnessSetSharingQueries";
import type { HarnessSharingVisibilityValue } from "@/lib/harness/HarnessSharingVisibility.constant";

export const filterBorrowableManifest = async (
  manifestJson: Readonly<Record<string, unknown>>,
  viewerUserId: string,
  ownerUserId: string,
  accountVisibility: HarnessSharingVisibilityValue,
): Promise<Record<string, unknown>> => {
  const activeSetSlugs = Array.isArray(manifestJson.activeSetSlugs)
    ? manifestJson.activeSetSlugs.filter(
        (slug): slug is string => typeof slug === "string",
      )
    : [];
  const sets =
    typeof manifestJson.sets === "object" &&
    manifestJson.sets !== null &&
    !Array.isArray(manifestJson.sets)
      ? (manifestJson.sets as Record<string, unknown>)
      : {};

  const visibleActiveSlugs: string[] = [];
  const visibleSets: Record<string, unknown> = {};

  for (const slug of activeSetSlugs) {
    const canView = await canViewHarnessSet(
      viewerUserId,
      ownerUserId,
      slug,
      accountVisibility,
    );
    if (canView && sets[slug] !== undefined) {
      visibleActiveSlugs.push(slug);
      visibleSets[slug] = sets[slug];
    }
  }

  return {
    ...manifestJson,
    activeSetSlugs: visibleActiveSlugs,
    sets: visibleSets,
  };
};

export const filterVisibleSetSlugs = async (
  setSlugs: readonly string[],
  viewerUserId: string,
  ownerUserId: string,
  accountVisibility: HarnessSharingVisibilityValue,
): Promise<readonly string[]> => {
  const visibleSlugs: string[] = [];

  for (const slug of setSlugs) {
    const canView = await canViewHarnessSet(
      viewerUserId,
      ownerUserId,
      slug,
      accountVisibility,
    );
    if (canView) {
      visibleSlugs.push(slug);
    }
  }

  return visibleSlugs;
};

export const filterBorrowableManifestToSetSlugs = async (
  manifestJson: Readonly<Record<string, unknown>>,
  viewerUserId: string,
  ownerUserId: string,
  accountVisibility: HarnessSharingVisibilityValue,
  requestedSetSlugs: readonly string[],
): Promise<Record<string, unknown>> => {
  const filtered = await filterBorrowableManifest(
    manifestJson,
    viewerUserId,
    ownerUserId,
    accountVisibility,
  );
  const allowedSlugs = new Set(requestedSetSlugs);
  const activeSetSlugs = Array.isArray(filtered.activeSetSlugs)
    ? filtered.activeSetSlugs.filter((slug) => allowedSlugs.has(slug))
    : [];
  const sets =
    typeof filtered.sets === "object" &&
    filtered.sets !== null &&
    !Array.isArray(filtered.sets)
      ? (filtered.sets as Record<string, unknown>)
      : {};
  const visibleSets: Record<string, unknown> = {};

  for (const slug of activeSetSlugs) {
    if (sets[slug] !== undefined) {
      visibleSets[slug] = sets[slug];
    }
  }

  return {
    ...filtered,
    activeSetSlugs,
    sets: visibleSets,
  };
};
