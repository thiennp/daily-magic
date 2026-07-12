export const FeedbackStatus = {
  SUBMITTED: "submitted",
  ACKNOWLEDGED: "acknowledged",
  DISMISSED: "dismissed",
} as const;

export type FeedbackStatusValue =
  (typeof FeedbackStatus)[keyof typeof FeedbackStatus];

export const isFeedbackStatus = (value: string): value is FeedbackStatusValue =>
  value === FeedbackStatus.SUBMITTED ||
  value === FeedbackStatus.ACKNOWLEDGED ||
  value === FeedbackStatus.DISMISSED;
