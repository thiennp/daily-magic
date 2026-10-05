/**
 * Mask an email for UI (e.g. t***@g***.com).
 * Used when peek/preview exposes invitedEmailMasked, or as a local fallback.
 */
export const maskHumanInviteEmail = (email: string | null | undefined): string | null => {
  if (typeof email !== "string") return null;
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.indexOf("@");
  if (at <= 0 || at === trimmed.length - 1) return null;
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  const dot = domain.lastIndexOf(".");
  if (dot <= 0) return null;
  const name = domain.slice(0, dot);
  const tld = domain.slice(dot + 1);
  const localMasked = `${local[0]}***`;
  const nameMasked = name.length > 0 ? `${name[0]}***` : "***";
  return `${localMasked}@${nameMasked}.${tld}`;
};
