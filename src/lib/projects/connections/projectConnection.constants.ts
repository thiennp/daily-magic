export const PROJECT_CONNECTION_PROVIDERS = [
  "slack",
  "linear",
  "gmail",
  "github",
] as const;

export const PROJECT_CONNECTIONS_CALLBACK_PATH =
  "/api/oauth/project-connections/callback";

/** scrypt salt for AES-256-GCM project connection tokens. */
export const PROJECT_CONNECTIONS_ENCRYPT_SALT = "project-connections-v1";

export const PROJECT_CONNECTIONS_OAUTH_STATE_TTL_MS = 15 * 60 * 1000;

/** Phase 1 providers with full start/callback/disconnect. */
export const PROJECT_CONNECTIONS_PHASE1_PROVIDERS = ["github", "slack"] as const;
