export const AGENT_WITCH_LOCAL_HOST_COOKIE = "agent_witch_local_host";

const LOCAL_HOST_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const setAgentWitchLocalHostCookie = (hostname: string): void => {
  if (typeof document === "undefined") {
    return;
  }

  const trimmedHostname = hostname.trim();
  if (trimmedHostname.length === 0) {
    return;
  }

  document.cookie = `${AGENT_WITCH_LOCAL_HOST_COOKIE}=${encodeURIComponent(trimmedHostname)}; path=/; max-age=${LOCAL_HOST_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
};

export const readAgentWitchLocalHostCookie = (): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookiePrefix = `${AGENT_WITCH_LOCAL_HOST_COOKIE}=`;
  const cookiePart = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(cookiePrefix));

  if (cookiePart === undefined) {
    return null;
  }

  const value = decodeURIComponent(cookiePart.slice(cookiePrefix.length)).trim();
  return value.length > 0 ? value : null;
};
