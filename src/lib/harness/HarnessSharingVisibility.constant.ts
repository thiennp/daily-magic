export const HarnessSharingVisibility = {
  PRIVATE: "private",
  GROUP: "group",
  PUBLIC: "public",
} as const;

export type HarnessSharingVisibilityValue =
  (typeof HarnessSharingVisibility)[keyof typeof HarnessSharingVisibility];

export const DEFAULT_HARNESS_SHARING_VISIBILITY =
  HarnessSharingVisibility.GROUP;

export const isHarnessSharingVisibility = (
  value: string,
): value is HarnessSharingVisibilityValue =>
  value === HarnessSharingVisibility.PRIVATE ||
  value === HarnessSharingVisibility.GROUP ||
  value === HarnessSharingVisibility.PUBLIC;
