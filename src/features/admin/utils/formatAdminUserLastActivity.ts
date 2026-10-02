/**
 * Format admin `lastActivityAt` for the users table.
 * Null → em dash. Never substitutes createdAt.
 */
const formatAdminUserLastActivity = (lastActivityAt: string | null): string => {
  if (lastActivityAt === null) {
    return "—";
  }

  const date = new Date(lastActivityAt);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default formatAdminUserLastActivity;
