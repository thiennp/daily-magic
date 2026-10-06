/**
 * Deep link to a member bot's Grok wake-link form on the project page:
 *   /projects/<projectId>#wake-link-<membershipId>
 * The Team column (Access › People › Members) is always mounted, so the hash
 * only picks the row; the panel scrolls to it and expands the form.
 */
export const AWC_GROK_WAKE_LINK_HASH_PREFIX = "wake-link-";

export const awcGrokWakeLinkHash = (membershipId: string): string =>
  `${AWC_GROK_WAKE_LINK_HASH_PREFIX}${encodeURIComponent(membershipId)}`;

export const buildAwcGrokWakeLinkHref = (
  projectId: string,
  membershipId: string,
): string =>
  `/projects/${encodeURIComponent(projectId)}#${awcGrokWakeLinkHash(membershipId)}`;

/** membershipId from `#wake-link-<id>` (with or without '#'), else null. */
export const parseAwcGrokWakeLinkHash = (hash: string): string | null => {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw.startsWith(AWC_GROK_WAKE_LINK_HASH_PREFIX)) {
    return null;
  }
  const encoded = raw.slice(AWC_GROK_WAKE_LINK_HASH_PREFIX.length);
  if (encoded.length === 0) {
    return null;
  }
  try {
    return decodeURIComponent(encoded);
  } catch {
    return null;
  }
};
