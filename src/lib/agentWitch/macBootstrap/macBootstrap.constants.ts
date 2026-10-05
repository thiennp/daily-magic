/** One-time Mac bootstrap code lifetime (≤5 minutes). */
export const MAC_BOOTSTRAP_CODE_TTL_MS = 5 * 60 * 1000;

/** Opaque CSPRNG bootstrap code entropy (base64url). */
export const MAC_BOOTSTRAP_CODE_BYTES = 32;

export const MAC_BOOTSTRAP_CLIENT_ID = "mac-app";

export const MAC_BOOTSTRAP_PKCE_METHOD = "S256";

export const MAC_BOOTSTRAP_SCRIPT_ORIGIN = "https://www.agentwitch.com";

export const MAC_BOOTSTRAP_SCRIPT_URL = `${MAC_BOOTSTRAP_SCRIPT_ORIGIN}/install/agent-witch.sh`;

export const MAC_BOOTSTRAP_SCHEME_BASE = "agentwitch-local://install";
