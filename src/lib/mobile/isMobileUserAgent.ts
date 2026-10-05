/**
 * Phones and tablets (iPhone, iPad, iPod, Android, Windows Phone, …).
 * "Mobi" is MDN's recommended generic token. Desktop Chrome/Safari/Firefox/Edge
 * on macOS, Windows, and Linux never match. iPadOS in desktop mode sends a Mac
 * UA; see `isIpadDesktopModeClient` for that case.
 */
const MOBILE_USER_AGENT_PATTERN =
  /\b(iPhone|iPad|iPod|Android|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini|webOS|Kindle|Silk)\b|Mobi/i;

export default function isMobileUserAgent(
  userAgent: string | null | undefined,
): boolean {
  if (userAgent === null || userAgent === undefined) {
    return false;
  }

  const trimmed = userAgent.trim();

  return trimmed.length > 0 && MOBILE_USER_AGENT_PATTERN.test(trimmed);
}
