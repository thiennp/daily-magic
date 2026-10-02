export const PROJECT_MESSAGE_SUMMARY_MAX_CHARS = 512;
export const PROJECT_MESSAGE_REFS_MAX_BYTES = 2048;
export const PROJECT_MESSAGE_ALLOWED_REF_KEYS = [
  "prUrl",
  "commitSha",
  "localPath",
  "allowClaimId",
] as const;

export type ProjectMessageRefKey = (typeof PROJECT_MESSAGE_ALLOWED_REF_KEYS)[number];
