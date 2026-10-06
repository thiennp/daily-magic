/**
 * Server allowlist for project_invites.platform (owner picks it in the invite
 * UI). Feeds the join-time delivery_mode; anything else is stored as NULL.
 */
export const PROJECT_INVITE_PLATFORMS = ["grok", "muse"] as const;

export type ProjectInvitePlatformValue =
  (typeof PROJECT_INVITE_PLATFORMS)[number];

export const parseProjectInvitePlatform = (
  value: unknown,
): ProjectInvitePlatformValue | null => {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return PROJECT_INVITE_PLATFORMS.find((p) => p === normalized) ?? null;
};
