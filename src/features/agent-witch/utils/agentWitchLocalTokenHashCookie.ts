export const AGENT_WITCH_LOCAL_TOKEN_HASH_COOKIE =
  "agent_witch_local_token_hash";

const LOCAL_TOKEN_HASH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const setAgentWitchLocalTokenHashCookie = (tokenHash: string): void => {
  if (typeof document === "undefined") {
    return;
  }

  const trimmed = tokenHash.trim();
  if (trimmed.length === 0) {
    return;
  }

  document.cookie = `${AGENT_WITCH_LOCAL_TOKEN_HASH_COOKIE}=${encodeURIComponent(trimmed)}; path=/; max-age=${LOCAL_TOKEN_HASH_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
};

export const clearAgentWitchLocalTokenHashCookie = (): void => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AGENT_WITCH_LOCAL_TOKEN_HASH_COOKIE}=; path=/; max-age=0; samesite=lax`;
};

export const readAgentWitchLocalTokenHashCookie = (): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookiePrefix = `${AGENT_WITCH_LOCAL_TOKEN_HASH_COOKIE}=`;
  const cookiePart = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(cookiePrefix));

  if (cookiePart === undefined) {
    return null;
  }

  const value = decodeURIComponent(
    cookiePart.slice(cookiePrefix.length),
  ).trim();
  return value.length > 0 ? value : null;
};
