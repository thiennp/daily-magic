/** DF-036 D4 "expires {Oct 14}": short month + day in the viewer's time zone; "" if unreadable. */
export const formatInviteExpiry = (expiresAt: string, timeZone?: string): string => {
  const date = new Date(expiresAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone });
};
