export const PROJECT_CONNECTION_PROVIDERS = [
  "slack",
  "linear",
  "gmail",
  "github",
  "notion",
  "google_drive",
] as const;

export const PROJECT_CONNECTIONS_CALLBACK_PATH =
  "/api/oauth/project-connections/callback";

/** scrypt salt for AES-256-GCM project connection tokens. */
export const PROJECT_CONNECTIONS_ENCRYPT_SALT = "project-connections-v1";

export const PROJECT_CONNECTIONS_OAUTH_STATE_TTL_MS = 15 * 60 * 1000;

/**
 * Providers with full start/callback/disconnect implemented.
 * P1: github + slack. P2: linear + gmail. Notion/Drive: notion + google_drive.
 * Missing provider env still returns start 501 unavailable.
 */
export const PROJECT_CONNECTIONS_LIVE_PROVIDERS = [
  "github",
  "slack",
  "linear",
  "gmail",
  "notion",
  "google_drive",
] as const;

/** @deprecated Prefer PROJECT_CONNECTIONS_LIVE_PROVIDERS (P1+P2+Notion/Drive). */
export const PROJECT_CONNECTIONS_PHASE1_PROVIDERS =
  PROJECT_CONNECTIONS_LIVE_PROVIDERS;
