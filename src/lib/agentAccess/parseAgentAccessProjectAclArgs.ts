const readString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

export const parseProjectIdArgs = (
  args: unknown,
): { readonly projectId: string } | null => {
  if (args === null || typeof args !== "object") {
    return null;
  }
  const projectId = readString((args as { projectId?: unknown }).projectId);
  return projectId === null ? null : { projectId };
};

export const parseRequestProjectAccessArgs = (
  args: unknown,
): {
  readonly projectId: string;
  readonly reason: string | null;
  readonly teamLabel: string | null;
} | null => {
  const base = parseProjectIdArgs(args);
  if (base === null || args === null || typeof args !== "object") {
    return null;
  }
  const record = args as {
    reason?: unknown;
    teamLabel?: unknown;
  };
  return {
    projectId: base.projectId,
    reason: readString(record.reason),
    teamLabel: readString(record.teamLabel),
  };
};

export const parseCheckMembershipArgs = (
  args: unknown,
): { readonly projectId: string; readonly userId: string | null } | null => {
  const base = parseProjectIdArgs(args);
  if (base === null || args === null || typeof args !== "object") {
    return null;
  }
  return {
    projectId: base.projectId,
    userId: readString((args as { userId?: unknown }).userId),
  };
};
