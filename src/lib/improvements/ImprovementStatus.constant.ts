export const ImprovementStatus = {
  PROPOSED: "proposed",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

export type ImprovementStatusValue =
  (typeof ImprovementStatus)[keyof typeof ImprovementStatus];

export const isImprovementStatus = (
  value: string,
): value is ImprovementStatusValue =>
  value === ImprovementStatus.PROPOSED ||
  value === ImprovementStatus.ACCEPTED ||
  value === ImprovementStatus.REJECTED;
