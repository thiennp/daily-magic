import { STORYBOOK_WAVE_REVIEW_ROLES } from "./storybookWavePageCatalog";

export interface WaveQaProgressCursor {
  readonly currentRole: string;
  readonly currentPageIndex: number;
}

/** Point coordinator state at the first page/role that is not fully passed. */
export const syncWaveQaProgressCursor = (progress: {
  readonly pages: ReadonlyArray<{
    readonly roles: Readonly<Record<string, { readonly passed: boolean }>>;
  }>;
}): WaveQaProgressCursor => {
  for (let pageIndex = 0; pageIndex < progress.pages.length; pageIndex += 1) {
    const page = progress.pages[pageIndex];
    for (const role of STORYBOOK_WAVE_REVIEW_ROLES) {
      const entry = page.roles[role];
      if (entry === undefined || entry.passed !== true) {
        return { currentPageIndex: pageIndex, currentRole: role };
      }
    }
  }

  const lastIndex = Math.max(0, progress.pages.length - 1);
  return { currentPageIndex: lastIndex, currentRole: "dx" };
};
