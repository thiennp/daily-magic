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
