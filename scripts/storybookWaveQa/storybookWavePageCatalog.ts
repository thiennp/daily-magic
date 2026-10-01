import { AWC_STORYBOOK_PAGE_MANIFEST } from "../../src/utils/storybook/awc/awcStorybookPageManifest.constant";
import { AWL_STORYBOOK_PAGE_MANIFEST } from "../../src/utils/storybook/awl/awlStorybookPageManifest.constant";
import type { StorybookPageStatus } from "../../src/utils/storybook/storybookPageStatus.constant";

export type StorybookWaveDeployable = "AWC" | "AWL";

export type StorybookWaveReviewRole =
  "ux" | "copy" | "ui" | "product" | "tester" | "dx";

export interface StorybookWavePageDefinition {
  readonly deployable: StorybookWaveDeployable;
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly statuses: readonly StorybookPageStatus[];
}

export const STORYBOOK_WAVE_REVIEW_ROLES: readonly StorybookWaveReviewRole[] = [
  "ux",
  "copy",
  "ui",
  "product",
  "tester",
  "dx",
];

export const STORYBOOK_WAVE_PASS_THRESHOLD = 95;

export const STORYBOOK_WAVE_PAGES: readonly StorybookWavePageDefinition[] = [
  ...AWC_STORYBOOK_PAGE_MANIFEST.map((entry) => ({
    deployable: "AWC" as const,
    id: entry.id,
    title: entry.title,
    path: entry.path,
    statuses: entry.statuses,
  })),
  ...AWL_STORYBOOK_PAGE_MANIFEST.map((entry) => ({
    deployable: "AWL" as const,
    id: entry.id,
    title: entry.title,
    path: entry.path,
    statuses: entry.statuses,
  })),
];

/** Storybook 10 story id: `{title-segment}--{export-kebab}` */
export const buildStorybookStoryId = (
  deployable: StorybookWaveDeployable,
  pageId: string,
  status: StorybookPageStatus,
): string => {
  const titleSegment = deployable === "AWC" ? "awc-pages" : "awl-pages";
  const exportKey = `${pageId.replaceAll("-", "_")}_${status}`;
  const storySlug = exportKey.replaceAll("_", "-");
  return `${titleSegment}--${storySlug}`;
};

export const storybookStoryUrl = (baseUrl: string, storyId: string): string => {
  const normalized = baseUrl.replace(/\/$/, "");
  return `${normalized}/iframe.html?id=${storyId}&viewMode=story`;
};
