import { PROJECT_INVITE_URL_PATH_PREFIX } from "@/lib/projects/acl/invites/projectInvite.constants";

/** Extract opaque token from invite URL path `/invite/p/<token>`. */
export const extractProjectInviteTokenFromUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const marker = PROJECT_INVITE_URL_PATH_PREFIX;
    const idx = parsed.pathname.indexOf(marker);
    if (idx < 0) {
      return null;
    }
    const raw = parsed.pathname.slice(idx + marker.length).split("/")[0] ?? "";
    const token = decodeURIComponent(raw).trim();
    return token.length > 0 ? token : null;
  } catch {
    const marker = PROJECT_INVITE_URL_PATH_PREFIX;
    const idx = url.indexOf(marker);
    if (idx < 0) {
      return null;
    }
    const raw = url.slice(idx + marker.length).split(/[/?#]/)[0] ?? "";
    const token = decodeURIComponent(raw).trim();
    return token.length > 0 ? token : null;
  }
};

/** Accept opaque token or full …/invite/p/<token> URL. */
export const normalizeProjectInviteTokenArg = (raw: string): string => {
  const trimmed = raw.trim();
  if (trimmed.includes(PROJECT_INVITE_URL_PATH_PREFIX)) {
    return extractProjectInviteTokenFromUrl(trimmed) ?? trimmed;
  }
  return trimmed;
};
