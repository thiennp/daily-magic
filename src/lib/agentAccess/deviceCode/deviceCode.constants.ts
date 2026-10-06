/** RFC 8628 device-code TTLs and poll cadence (S1 locked). */

/** user_code / device_code lifetime. */
export const DEVICE_CODE_TTL_MS = 10 * 60 * 1000;

/** Minimum poll interval (seconds) returned to clients. */
export const DEVICE_CODE_INTERVAL_SECONDS = 5;

/** Access token lifetime for device-issued tokens. */
export const DEVICE_ACCESS_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** Refresh token lifetime for device-issued tokens. */
export const DEVICE_REFRESH_TOKEN_TTL_MS = 90 * 24 * 60 * 60 * 1000;

/** Consonant-only alphabet (no vowels, no 0/1/O/I/L lookalikes). */
export const DEVICE_USER_CODE_ALPHABET = "BCDFGHJKLMNPQRSTVWXZ" as const;

export const DEVICE_USER_CODE_LENGTH = 8;

export const DEVICE_VERIFICATION_PATH = "/device/verify";

export const DEVICE_VERIFICATION_ORIGIN = "https://www.agentwitch.com";

export const DEVICE_VERIFICATION_URI = `${DEVICE_VERIFICATION_ORIGIN}${DEVICE_VERIFICATION_PATH}`;

export const AGENT_ACCESS_REFRESH_TOKEN_PREFIX = "awc_atr_";

/** Rate-limit bucket keys (via consumeAgentAccessBucket). */
export const DEVICE_START_BUCKET = "device_start";
export const DEVICE_VERIFY_BUCKET = "device_verify";

export const DEVICE_START_PER_HOUR = 8;
export const DEVICE_VERIFY_PER_HOUR = 30;

export const DEVICE_CLIENT_NAME_MAX = 80;
export const DEVICE_DISPLAY_NAME_MAX = 80;
