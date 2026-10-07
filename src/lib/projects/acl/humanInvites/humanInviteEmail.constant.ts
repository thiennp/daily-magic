/** DF-025 email invites (migration 108). Expiry reuses HUMAN_INVITE_DEFAULT_EXPIRES_DAYS. */
export const HUMAN_INVITE_STATUSES = [
  "pending",
  "accepted",
  "approved",
  "revoked",
  "expired",
] as const;
export type HumanInviteStatus = (typeof HUMAN_INVITE_STATUSES)[number];

export const HUMAN_INVITE_DELIVERIES = ["link", "email"] as const;
export type HumanInviteDelivery = (typeof HUMAN_INVITE_DELIVERIES)[number];

/** Max email invites a project can send per rolling window. */
export const HUMAN_INVITE_EMAIL_RATE_LIMIT_COUNT = 20;
export const HUMAN_INVITE_EMAIL_RATE_LIMIT_WINDOW_MINUTES = 60;

/** Plain RFC-ish shape check; Resend does the real validation. */
export const HUMAN_INVITE_EMAIL_PATTERN =
  /^[^\s@,;<>"]+@[^\s@,;<>"]+\.[^\s@,;<>"]+$/;
export const HUMAN_INVITE_EMAIL_MAX_LENGTH = 320;

/** Unique index names from 108 (classify insert errors). */
export const HUMAN_INVITE_OPEN_EMAIL_UNIQUE_IDX =
  "project_human_invites_open_email_unique_idx";
export const HUMAN_INVITE_ACCEPTED_USER_UNIQUE_IDX =
  "project_human_invites_accepted_user_unique_idx";
