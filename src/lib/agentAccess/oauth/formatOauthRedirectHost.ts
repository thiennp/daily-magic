/**
 * Human-visible host from a registered redirect_uri (e.g. claude.ai).
 * No scheme/path/port for standard https; keeps port for localhost.
 */
export const formatOauthRedirectHost = (redirectUri: string): string | null => {
  try {
    const url = new URL(redirectUri);
    const host = url.hostname.toLowerCase();
    if (host.length === 0) {
      return null;
    }
    if (
      (host === "localhost" || host === "127.0.0.1" || host === "[::1]") &&
      url.port.length > 0
    ) {
      return `${host}:${url.port}`;
    }
    return host;
  } catch {
    return null;
  }
};
