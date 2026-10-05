/** Mask an email for public / mismatch responses: `t***@g***.com`. */
export const maskEmail = (email: string): string => {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf("@");
  if (at <= 0 || at >= trimmed.length - 1) {
    return "***";
  }
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  const dot = domain.lastIndexOf(".");
  if (dot <= 0 || local.length === 0 || domain.length === 0) {
    const domainHead = domain.charAt(0) || "*";
    return `${local.charAt(0)}***@${domainHead}***`;
  }
  const label = domain.slice(0, dot);
  const tld = domain.slice(dot);
  return `${local.charAt(0)}***@${label.charAt(0)}***${tld}`;
};
