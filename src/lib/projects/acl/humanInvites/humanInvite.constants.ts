export const HUMAN_INVITE_TOKEN_BYTES = 16;
export const HUMAN_INVITE_DEFAULT_EXPIRES_DAYS = 7;
export const HUMAN_INVITE_HARD_MAX_EXPIRES_DAYS = 30;
export const HUMAN_INVITE_URL_PATH_PREFIX = "/invite/h/";
export const HUMAN_INVITE_ROLES = ["member", "viewer"] as const;
export type HumanInviteRole = (typeof HUMAN_INVITE_ROLES)[number];
