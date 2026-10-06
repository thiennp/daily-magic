import { OAUTH_LOCALHOST_HOSTS } from "@/lib/agentAccess/oauth/oauth.constants";

/**
 * Sane redirect_uri policy for DCR:
 * - https://… (any host in v1; product may tighten allowlist later)
 * - http://localhost / 127.0.0.1 / [::1] with any port (desktop loopback)
 * - Reject javascript:, data:, file:, and non-http(s) schemes
 */
export const isAllowedOauthRedirectUri = (value: string): boolean => {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > 2048) {
    return false;
  }
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("file:") ||
    lower.startsWith("vbscript:")
  ) {
    return false;
  }

  const parsed = ((): URL | null => {
    try {
      return new URL(trimmed);
    } catch {
      return null;
    }
  })();
  if (parsed === null) {
    return false;
  }

  if (parsed.username !== "" || parsed.password !== "") {
    return false;
  }

  if (parsed.protocol === "https:") {
    return parsed.hostname.length > 0;
  }

  if (parsed.protocol === "http:") {
    return OAUTH_LOCALHOST_HOSTS.has(parsed.hostname.toLowerCase());
  }

  return false;
};
