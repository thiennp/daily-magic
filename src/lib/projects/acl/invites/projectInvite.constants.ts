export const PROJECT_INVITE_TOKEN_BYTES = 16; // 128 bits
export const PROJECT_INVITE_DEFAULT_MAX_USES = 1;
export const PROJECT_INVITE_HARD_MAX_USES = 10;
export const PROJECT_INVITE_DEFAULT_EXPIRES_DAYS = 7;
export const PROJECT_INVITE_HARD_MAX_EXPIRES_DAYS = 30;
export const PROJECT_INVITE_URL_PATH_PREFIX = "/invite/p/";
/** scrypt salt (purpose tag) for the AES-256-GCM invite token copy (107). */
export const PROJECT_INVITE_TOKEN_ENCRYPT_SALT = "project-invite-token-v1";
