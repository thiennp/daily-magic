export const CapabilityStatus = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export type CapabilityStatusValue =
  (typeof CapabilityStatus)[keyof typeof CapabilityStatus];

export const isCapabilityStatus = (
  value: string,
): value is CapabilityStatusValue =>
  value === CapabilityStatus.DRAFT ||
  value === CapabilityStatus.PUBLISHED ||
  value === CapabilityStatus.ARCHIVED;
