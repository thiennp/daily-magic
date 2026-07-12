export const CapabilityVisibility = {
  PRIVATE: "private",
  GROUP: "group",
  PUBLIC: "public",
} as const;

export type CapabilityVisibilityValue =
  (typeof CapabilityVisibility)[keyof typeof CapabilityVisibility];

export const DEFAULT_CAPABILITY_VISIBILITY = CapabilityVisibility.GROUP;

export const isCapabilityVisibility = (
  value: string,
): value is CapabilityVisibilityValue =>
  value === CapabilityVisibility.PRIVATE ||
  value === CapabilityVisibility.GROUP ||
  value === CapabilityVisibility.PUBLIC;
